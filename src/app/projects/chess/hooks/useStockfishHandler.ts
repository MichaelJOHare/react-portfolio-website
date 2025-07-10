import { useCallback, useEffect, useRef, useState } from "react";
import { GameManager, Highlighter, PlayerColor } from "../types";
import {
  calculateDepth,
  calculateThreadsForNNUE,
  convertNotationToSquare,
  determinePromotionType,
  getArrowFromMove,
} from "../utils/stockfish";
import { toFEN } from "../utils/FEN";

const IS_SYSTEM_MESSAGE = /^(?:(?:uci|ready)ok$|option name)/;
const INFORMS_CURRENT_MOVE = /pv (\w{2}\w{2})/;
const FOUND_BEST_MOVE = /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/;
const INFORMS_DEPTH = /^info .*\bdepth (\d+) .*\bnps (\d+)/;
const INFORMS_SCORE = /^info .*\bscore (\w+) (-?\d+)/;
const INFORMS_MATE = /score mate (\-?\d+)/;

export const useStockfishHandler = (
  gameManager: GameManager,
  highlighter: Highlighter,
  classicalEnabled: boolean,
  nnueEnabled: boolean,
  colorChoice: number,
  strengthLevel: number
) => {
  const workerRef = useRef<Worker | null>(null);
  const moveInProgressRef = useRef(false);
  const [engineReady, setEngineReady] = useState(false);
  const [shouldFindMove, setShouldFindMove] = useState(false);
  const [evalCentipawn, setEvalCentipawn] = useState(50);
  const [depth, setDepth] = useState<number | null>(null);
  const [lastDepthUpdate, setLastDepthUpdate] = useState(0);
  const [lastArrowUpdate, setLastArrowUpdate] = useState(0);
  const isPlaying = colorChoice !== -1 && strengthLevel !== -1;
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

    const worker = new window.Worker(scriptUrl);
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const msg = e.data;

      if (msg === "uciok") {
        setEngineReady(true);
      } else if (msg === "readyok") {
        applyNNUEOption();
      } else {
        handleEngineMessage(msg);
      }
    };

    worker.postMessage("uci");
    worker.postMessage("isready");
    if (isPlaying) {
      setSkillLevel(strengthLevel);
    } else {
      setSkillLevel(20);
    }
  };

  const handleEngineMessage = (event: MessageEvent) => {
    const line = typeof event === "object" ? event.data : event;
    console.log(line);
    if (INFORMS_DEPTH.test(line)) {
      const currentDepth = parseInt(line.match(INFORMS_DEPTH)[1], 10);
      const currentTime = Date.now();
      const depthProgress = document.getElementById("depth-progress");

      if (depthProgress) {
        const depthPercentage = (currentDepth / 24) * 100;
        depthProgress.setAttribute("value", depthPercentage.toString());
      }

      if (
        currentDepth === 1 ||
        (currentDepth - lastDepthUpdate >= 3 &&
          currentTime - lastArrowUpdate >= 3000)
      ) {
        const moveData = line.match(INFORMS_CURRENT_MOVE);
        const from = moveData[1].substring(0, 2);
        const to = moveData[1].substring(2, 4);
        const arrowCoords = getArrowFromMove({ from, to });
        setLastDepthUpdate(currentDepth);
        setLastArrowUpdate(currentTime);
        if (!isPlaying) highlighter.addStockfishBestMoveArrow(arrowCoords);
      }
    }
    if (FOUND_BEST_MOVE.test(line)) {
      const [, from, to, promotion] = line.match(FOUND_BEST_MOVE);
      if (isPlaying) {
        const legalMoves = gameManager.getLegalMoves();
        const promotionType = determinePromotionType(promotion);
        const fromSq = convertNotationToSquare(from);
        const toSq = convertNotationToSquare(to);
        if (fromSq && toSq) {
          console.log(fromSq, toSq, legalMoves, promotionType);
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
        const arrowCoords = getArrowFromMove({ from, to });
        highlighter.addStockfishBestMoveArrow(arrowCoords);
      }
      setEngineReady(true);
      moveInProgressRef.current = false;
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
      setEvalCentipawn(evalProgress);

      if (INFORMS_MATE.test(line)) {
        setEvalCentipawn(100);
      }
    }
  };

  const sendCommand = (cmd: string) => {
    workerRef.current?.postMessage(cmd);
  };

  const stopEngineThinking = () => {
    sendCommand("stop"); // figure out how to make this work
  };

  const terminate = () => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setEngineReady(false);
  };

  const isRunning = () => !!workerRef.current;

  const setSkillLevel = (skillLevel: number) => {
    const depth = isPlaying ? calculateDepth(skillLevel * 2) : 24; // test 24
    setDepth(depth);
    sendCommand(`setoption name Skill Level value ${skillLevel}`);
  };

  const applyNNUEOption = useCallback(() => {
    if (!workerRef.current) return;

    const nnueValue = nnueEnabled ? "true" : "false";
    const threads = nnueEnabled ? calculateThreadsForNNUE() : 1;
    sendCommand(`setoption name Threads value ${threads}`);
    sendCommand(`setoption name Use NNUE value ${nnueValue}`);
  }, [nnueEnabled]);

  // useEffect required since a new set option needs to be sent when classical or nnue is enabled/disabled
  useEffect(() => {
    if (!workerRef.current || !engineReady) return;

    sendCommand("stop");

    const nnueValue = nnueEnabled ? "true" : "false";
    const threads = nnueEnabled ? calculateThreadsForNNUE() : 1;
    sendCommand(`setoption name Threads value ${threads}`);
    sendCommand(`setoption name Use NNUE value ${nnueValue}`);

    sendCommand("isready");
  }, [nnueEnabled, classicalEnabled, engineReady]);

  // useEffect required since you can't access document elements outside of it
  useEffect(() => {
    const evalGauge = document.getElementById("eval-gauge");
    if (evalGauge) {
      if (
        players[currentPlayerIndex].color === PlayerColor.BLACK &&
        evalCentipawn < 50
      ) {
        evalGauge.setAttribute("value", (100 - evalCentipawn).toString());
      } else if (
        players[currentPlayerIndex].color === PlayerColor.BLACK &&
        evalCentipawn > 50
      ) {
        evalGauge.setAttribute("value", (evalCentipawn * -1).toString());
      } else {
        evalGauge.setAttribute("value", evalCentipawn.toString());
      }
    }
  }, [evalCentipawn, currentPlayerIndex, players]);

  // useEffect because of interacting with worker
  useEffect(() => {
    if (shouldFindMove && engineReady && !moveInProgressRef.current) {
      moveInProgressRef.current = true;

      const fen = toFEN(
        board,
        players,
        currentPlayerIndex,
        moveHistory,
        halfMoveClock,
        fullMoveNumber
      );

      setEngineReady(false);
      setShouldFindMove(false);
      workerRef.current?.postMessage(`position fen ${fen}`);
      workerRef.current?.postMessage(`go depth ${depth}`);
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
  ]);

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
  }, [
    isPlaying,
    nnueEnabled,
    classicalEnabled,
    players,
    currentPlayerIndex,
    colorChoice,
    moveHistory.length,
  ]);

  return {
    startWorker,
    stopEngineThinking,
    terminate,
    isRunning,
  };
};
