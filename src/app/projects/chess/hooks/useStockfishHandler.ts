import { useEffect, useRef, useState } from "react";
import { GameManager, Highlighter, PlayerColor } from "../types";
import {
  calculateDepth,
  calculateThreadsForNNUE,
  convertNotationToSquare,
  determinePromotionType,
} from "../utils/stockfish";
import { toFEN } from "../utils/FEN";

const IS_SYSTEM_MESSAGE = /^(?:(?:uci|ready)ok$|option name)/;
const INFORMS_CURRENT_MOVE = /pv (\w{4})/;
const FOUND_BEST_MOVE = /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/;
const INFORMS_DEPTH = /^info .*\bdepth (\d+) .*\bnps (\d+)/;
const INFORMS_SCORE = /^info .*\bscore (\w+) (-?\d+)/;
const INFORMS_MATE = /score mate (\-?\d+)/;

export const useStockfishHandler = (
  gameManagerRef: React.RefObject<GameManager>,
  highlighter: Highlighter,
  version: "sf-16" | "sf-17",
  isBoardFlipped: boolean,
  classicalEnabled: boolean,
  nnueEnabled: boolean,
  colorChoice: number,
  strengthLevel: number
) => {
  const workerRef = useRef<Worker | null>(null);
  const isBoardFlippedRef = useRef(isBoardFlipped);
  const [engineReady, setEngineReady] = useState(false);
  const [engineConfigured, setEngineConfigured] = useState(false);
  const hasConfiguredEngine = useRef(false);
  const [shouldStopThinking, setShouldStopThinking] = useState(false);
  const [shouldFindMove, setShouldFindMove] = useState(false);
  const [evalCentipawn, setEvalCentipawn] = useState(50);
  const [depthPercentage, setDepthPercentage] = useState(0);
  const [depth, setDepth] = useState(-1);
  const [lastDepthUpdate, setLastDepthUpdate] = useState(0);
  const [lastArrowUpdate, setLastArrowUpdate] = useState(0);
  const isPlaying = colorChoice !== -1 && strengthLevel !== -1;
  const defaultDepth = 24;
  const {
    board,
    players,
    currentPlayerIndex,
    moveHistory,
    halfMoveClock,
    fullMoveNumber,
  } = gameManagerRef.current;

  const startWorker = (scriptUrl: string) => {
    if (workerRef.current) return;

    const worker = new window.Worker("/stockfish/stockfish-worker.js", {
      type: "module",
    });
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const msg = e.data;

      if (msg.type === "ready") {
        console.log("Engine loaded");

        sendCommand("uci");
        sendCommand("isready");
      } else if (msg.data === "uciok") {
        console.log("uciok");
        setEngineReady(true);
      } else if (msg.data === "readyok") {
        console.log("readyok");
        if (!hasConfiguredEngine.current) {
          hasConfiguredEngine.current = true;
          configureEngine(strengthLevel);
        } else {
          setEngineConfigured(true);
        }
      } else {
        handleEngineMessage(msg);
      }
    };

    worker.postMessage({
      type: "load-engine",
      data: { version: scriptUrl },
    });
  };

  const handleEngineMessage = (event: MessageEvent) => {
    const line = typeof event === "object" ? event.data : event;
    console.log(line);
    if (INFORMS_DEPTH.test(line)) {
      const currentDepth = parseInt(line.match(INFORMS_DEPTH)[1], 10);
      const currentTime = Date.now();
      const percent = (currentDepth / defaultDepth) * 100;
      setDepthPercentage(percent);
      if (
        currentDepth === 1 ||
        (currentDepth - lastDepthUpdate >= 3 &&
          currentTime - lastArrowUpdate >= 3000)
      ) {
        const moveData = line.match(INFORMS_CURRENT_MOVE);
        const from = moveData[1].substring(0, 2);
        const to = moveData[1].substring(2, 4);
        setLastDepthUpdate(currentDepth);
        setLastArrowUpdate(currentTime);
        if (!isPlaying) highlighter.addStockfishBestMoveArrow({ from, to });
      }
    }
    if (FOUND_BEST_MOVE.test(line)) {
      const [, from, to, promotion] = line.match(FOUND_BEST_MOVE);
      if (isPlaying) {
        const legalMoves = gameManagerRef.current.getLegalMoves();
        const promotionType = determinePromotionType(promotion);
        const fromSq = convertNotationToSquare(from, isBoardFlippedRef.current);
        const toSq = convertNotationToSquare(to, isBoardFlippedRef.current);
        if (fromSq && toSq) {
          // implement delay
          gameManagerRef.current.executeMove(
            fromSq.row,
            fromSq.col,
            toSq.row,
            toSq.col,
            legalMoves,
            promotionType
          );
        }
      } else {
        highlighter.addStockfishBestMoveArrow({ from, to });
      }
      setEngineReady(true);
    }
    if (IS_SYSTEM_MESSAGE.test(line)) {
      return;
    }
    if (INFORMS_SCORE.test(line) || INFORMS_MATE.test(line)) {
      let evalValue = parseInt(line.match(INFORMS_SCORE)[2], 10);
      let evalProgress = 50;
      const evalCap = 500;

      if (evalValue > evalCap) evalValue = evalCap;
      if (evalValue < -evalCap) evalValue = -evalCap;

      evalProgress = ((evalValue + evalCap) / (2 * evalCap)) * 100;
      evalProgress = Math.max(0, Math.min(100, evalProgress));
      if (players[currentPlayerIndex].color === PlayerColor.BLACK) {
        evalProgress = 100 - evalProgress;
      }
      setEvalCentipawn(evalProgress);

      if (INFORMS_MATE.test(line)) {
        setEvalCentipawn(100);
      }
    }
  };

  const sendCommand = (cmd: string) => {
    workerRef.current?.postMessage(cmd);
  };

  const terminate = () => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setEngineReady(false);
  };

  const isRunning = () => !!workerRef.current;

  const configureEngine = (skillLevel: number) => {
    const threads = calculateThreadsForNNUE();
    const depth = isPlaying ? calculateDepth(skillLevel * 2) : defaultDepth;
    setDepth(depth);
    sendCommand(`setoption name Skill Level value ${skillLevel}`);
    sendCommand(`setoption name Threads value ${threads}`);
    if (version === "sf-16") {
      sendCommand("setoption name Use NNUE value true"); // might not be needed?
    }
    console.log("stockfish options configured");

    sendCommand("isready");
  };

  // useEffect because if version changes, it needs to kill and restart with correct nnue file
  useEffect(() => {
    if (!workerRef.current) return;
    terminate();

    startWorker(version);
  }, [version]);

  // useEffect because of interacting with worker
  useEffect(() => {
    if (shouldFindMove && engineReady && engineConfigured) {
      const fen = toFEN(
        board,
        players,
        currentPlayerIndex,
        moveHistory,
        halfMoveClock,
        fullMoveNumber,
        isBoardFlipped
      );

      setEngineReady(false);
      setShouldFindMove(false);
      sendCommand(`position fen ${fen}`);
      sendCommand(`go depth ${depth}`);
    }
  }, [
    shouldFindMove,
    engineReady,
    engineConfigured,
    board,
    players,
    currentPlayerIndex,
    moveHistory,
    halfMoveClock,
    fullMoveNumber,
    depth,
    isBoardFlipped,
  ]);

  // useEffect because need to split up shouldFindMove and findMove to prevent circular dependency
  useEffect(() => {
    const isAnalysisMode = !isPlaying && (nnueEnabled || classicalEnabled);
    const isEngineTurn =
      isPlaying &&
      ((players[currentPlayerIndex].color === PlayerColor.WHITE &&
        colorChoice === 1) ||
        (players[currentPlayerIndex].color === PlayerColor.BLACK &&
          colorChoice === 0));

    if (isAnalysisMode || isEngineTurn) {
      setShouldFindMove(true);
    }
    if (!isAnalysisMode) {
      highlighter.clearStockfishBestMoveArrow(); // does this need to be in useEffect? probably don't want highlighter in this dep array
    }
  }, [
    isPlaying,
    nnueEnabled,
    classicalEnabled,
    players,
    currentPlayerIndex,
    colorChoice,
    moveHistory.length,
  ]);

  // useEffect because of interaction with worker
  useEffect(() => {
    if (shouldStopThinking) {
      sendCommand("stop");
      setShouldStopThinking(false);
      setShouldFindMove(true);
      // maybe set engineReady true?
    }
  }, [shouldStopThinking]);

  // useEffect to prevent stale closure in handleEngineMessage
  useEffect(() => {
    isBoardFlippedRef.current = isBoardFlipped;
  }, [isBoardFlipped]);

  return {
    startWorker,
    setShouldStopThinking,
    terminate,
    isRunning,
    depthPercentage,
    evalCentipawn,
  };
};
