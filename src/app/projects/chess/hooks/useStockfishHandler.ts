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
  gameManager: GameManager,
  highlighter: Highlighter,
  version: "sf-16" | "sf-17",
  isBoardFlippedRef: React.RefObject<boolean>,
  classicalEnabled: boolean,
  nnueEnabled: boolean,
  colorChoice: number,
  strengthLevel: number
) => {
  const workerRef = useRef<Worker | null>(null);
  const [engineReady, setEngineReady] = useState(false);
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
  } = gameManager;

  const startWorker = (scriptUrl: string) => {
    if (workerRef.current) return;

    const worker = new window.Worker("/stockfish/stockfish-worker.js", {
      type: "module",
    });
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const msg = e.data;

      if (msg.type === "ready") {
        console.log("Engine ready");

        worker.postMessage("uci");
        worker.postMessage("isready");

        setSkillLevel(strengthLevel);
      }

      if (msg.data === "uciok") {
        console.log("uciok");
        setEngineReady(true);
      } else if (msg.data === "readyok") {
        console.log("readyok");
        const threads = calculateThreadsForNNUE();
        sendCommand(`setoption name Threads value ${threads}`);
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
    //console.log(line);
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
        const legalMoves = gameManager.getLegalMoves();
        const promotionType = determinePromotionType(promotion);
        const fromSq = convertNotationToSquare(from, isBoardFlippedRef.current);
        const toSq = convertNotationToSquare(to, isBoardFlippedRef.current);
        console.log(from, to, fromSq, toSq, board); // board stale reference here?
        if (fromSq && toSq) {
          gameManager.executeMove(
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
        // also stale reference?
        evalProgress += -1;
      }
      console.log(evalProgress);
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

  const setSkillLevel = (skillLevel: number) => {
    const depth = isPlaying ? calculateDepth(skillLevel * 2) : defaultDepth;
    setDepth(depth);
    console.log("setting");
    sendCommand(`setoption name Skill Level value ${skillLevel}`);
  };

  // useEffect because interaction with worker
  useEffect(() => {
    if (!workerRef.current) return;

    sendCommand("stop");
    if (version === "sf-16") {
      sendCommand("setoption name Use NNUE value true");
      sendCommand(
        "setoption name EvalFile value /stockfish/sf-16/nn-ecb35f70ff2a.nnue"
      );
    }

    sendCommand(
      "setoption name EvalFile value /stockfish/sf-17/nn-1c0000000000.nnue"
    );
    sendCommand(
      "setoption name EvalFileSmall value /stockfish/sf-17/nn-37f18f62d772.nnue"
    );

    sendCommand("isready");
  }, [version]);

  // useEffect because of interacting with worker
  useEffect(() => {
    //console.log(shouldFindMove, engineReady);
    if (shouldFindMove && engineReady) {
      const fen = toFEN(
        board,
        players,
        currentPlayerIndex,
        moveHistory,
        halfMoveClock,
        fullMoveNumber,
        isBoardFlippedRef.current
      );

      setEngineReady(false);
      setShouldFindMove(false);
      console.log(fen);
      sendCommand(`position fen ${fen}`);
      sendCommand(`go depth ${depth}`);
    }
  }, [
    shouldFindMove,
    engineReady,
    board,
    players,
    currentPlayerIndex,
    moveHistory,
    halfMoveClock,
    fullMoveNumber,
    depth,
    isBoardFlippedRef.current,
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

    console.log(isAnalysisMode, isEngineTurn);
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
      console.log("stopping");
      sendCommand("stop");
      setShouldStopThinking(false);
      setShouldFindMove(true);
      // maybe set engineReady true?
    }
  }, [shouldStopThinking]);

  return {
    startWorker,
    setShouldStopThinking,
    terminate,
    isRunning,
    depthPercentage,
    evalCentipawn,
  };
};
