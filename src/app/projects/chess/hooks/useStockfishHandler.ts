import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import {
  toFEN,
  calculateThreadsForNNUE,
  convertNotationToSquare,
  determinePromotionType,
  getConfigFromLevel,
} from "../utils";
import {
  EngineOptions,
  GameManager,
  Highlighter,
  NO_CHOICE,
  PlayerColor,
  PlayerType,
  StockfishVersion,
} from "../types";

type EngineStatus =
  | "idle"
  | "loaded"
  | "configured"
  | "thinking"
  | "ready"
  | "interrupted"
  | "stopped";

type EngineState = {
  status: EngineStatus;
  depth: number;
  moveTime: number;
  lastDepthUpdate: number;
  lastArrowUpdate: number;
};

const IS_SYSTEM_MESSAGE = /^(?:(?:uci|ready)ok$|option name)/;
const INFORMS_CURRENT_MOVE = /pv (\w{4})/;
const FOUND_BEST_MOVE = /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/;
const INFORMS_DEPTH = /^info .*\bdepth (\d+) .*\bnps (\d+)/;
const INFORMS_WDL = /wdl (\d+) (\d+) (\d+)/;
const INFORMS_MATE = /score mate (\-?\d+)/;

export const useStockfishHandler = (
  gameManager: GameManager,
  highlighter: Highlighter,
  engineOptions: EngineOptions,
) => {
  const [evalCentipawn, setEvalCentipawn] = useState(50);
  const [depthPercentage, setDepthPercentage] = useState(0);
  const workerRef = useRef<Worker | null>(null);
  const gmRef = useRef<GameManager>(gameManager);
  const engineOptionsRef = useRef<EngineOptions>(engineOptions);
  const engineStateRef = useRef<EngineState>({
    status: "idle",
    depth: NO_CHOICE,
    moveTime: NO_CHOICE,
    lastDepthUpdate: 0,
    lastArrowUpdate: 0,
  });

  const debouncedSetEvalCentipawn = useMemo(
    () => debounce((val: number) => setEvalCentipawn(val), 50),
    [setEvalCentipawn],
  );
  const debouncedAddStockfishArrow = useMemo(
    () =>
      debounce((from: string, to: string) => {
        highlighter.addStockfishBestMoveArrow({ from, to });
      }, 50),
    [highlighter],
  );

  const isRunning = () => {
    return workerRef.current !== null;
  };

  const isPlaying = () => {
    const { colorChoice, strengthChoice } = engineOptionsRef.current;
    return colorChoice !== NO_CHOICE && strengthChoice !== NO_CHOICE;
  };

  const sendCommand = (cmd: string) => {
    workerRef.current?.postMessage(cmd);
  };

  const interruptEngineThinking = useCallback(() => {
    engineStateRef.current.status = "interrupted";
    sendCommand("stop");
    sendCommand("isready");
  }, []);

  const stopEngineThinking = useCallback(() => {
    engineStateRef.current.status = "stopped";
    sendCommand("stop");
  }, []);

  const terminateWorker = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    engineStateRef.current.status = "idle";
  }, []);

  const configureEngine = useCallback((version: StockfishVersion) => {
    const { strengthChoice } = engineOptionsRef.current;
    const { skill, depth, time } = getConfigFromLevel(strengthChoice);
    engineStateRef.current.depth = depth;
    engineStateRef.current.moveTime = time;
    const threads = calculateThreadsForNNUE();
    if (version === StockfishVersion.SF16) {
      sendCommand("setoption name Use NNUE value true");
    }
    sendCommand(`setoption name Skill Level value ${skill}`);
    sendCommand(`setoption name Threads value ${threads}`);
    sendCommand("setoption name UCI_ShowWDL value true");
    sendCommand("ucinewgame");

    sendCommand("isready");
  }, []);

  const requestStockfishMove = useCallback(() => {
    if (engineStateRef.current.status !== "ready") return;

    const {
      board,
      players,
      currentPlayerIndex,
      moveHistory,
      halfMoveClock,
      fullMoveNumber,
    } = gmRef.current;

    const movesHistory = moveHistory.map((record) => record.move);
    const fen = toFEN(
      board,
      players,
      currentPlayerIndex,
      movesHistory,
      halfMoveClock,
      fullMoveNumber,
    );
    const { moveTime } = engineStateRef.current;
    const goString = moveTime > 0 ? `movetime ${moveTime}` : "";

    sendCommand(`position fen ${fen}`);
    sendCommand(`go depth ${engineStateRef.current.depth} ${goString}`);
    engineStateRef.current.status = "thinking";
  }, []);

  const handleBestMove = useCallback(
    (line: string) => {
      const playing = isPlaying();
      const [, from, to, promotion] = line.match(FOUND_BEST_MOVE)!;
      const promotionType = determinePromotionType(promotion);

      if (engineStateRef.current.status === "stopped") {
        engineStateRef.current.status = "ready";
        return;
      }

      if (engineStateRef.current.status === "interrupted") {
        engineStateRef.current.status = "ready";
        requestStockfishMove();
        return;
      }

      if (playing) {
        const legalMoves = gmRef.current.getLegalMoves();
        const players = gmRef.current.players;
        const currentPlayerIndex = gmRef.current.currentPlayerIndex;
        const currentPlayer = players[currentPlayerIndex];

        const fromSq = convertNotationToSquare(from);
        const toSq = convertNotationToSquare(to);

        const isEngineTurn = currentPlayer.type === PlayerType.COMPUTER;

        if (fromSq && toSq && isEngineTurn) {
          const minDelay = 600;
          const maxDelay = 1400;
          const delay = Math.random() * (maxDelay - minDelay) + minDelay;
          setTimeout(() => {
            gmRef.current.executeMove(
              fromSq.row,
              fromSq.col,
              toSq.row,
              toSq.col,
              legalMoves,
              promotionType,
            );
            highlighter.addPreviousMoveSquares(fromSq, toSq);
          }, delay);
        }
      } else {
        debouncedAddStockfishArrow(from, to);
      }

      engineStateRef.current.status = "ready";
    },
    [requestStockfishMove, debouncedAddStockfishArrow, highlighter],
  );

  const handleDepthMessage = useCallback(
    (line: string) => {
      const playing = isPlaying();
      const currentDepth = parseInt(line.match(INFORMS_DEPTH)![1], 10);
      const currentTime = Date.now();
      const percent = (currentDepth / engineStateRef.current.depth) * 100;
      setDepthPercentage(percent);

      if (
        currentDepth === 1 ||
        (currentDepth - engineStateRef.current.lastDepthUpdate >= 3 &&
          currentTime - engineStateRef.current.lastArrowUpdate >= 3000)
      ) {
        const moveData = line.match(INFORMS_CURRENT_MOVE);
        if (moveData) {
          const from = moveData[1].substring(0, 2);
          const to = moveData[1].substring(2, 4);
          engineStateRef.current.lastDepthUpdate = currentDepth;
          engineStateRef.current.lastArrowUpdate = currentTime;

          if (!playing) debouncedAddStockfishArrow(from, to);
        }
      }
    },
    [debouncedAddStockfishArrow],
  );

  const handleWDLMessage = useCallback(
    (line: string) => {
      if (INFORMS_MATE.test(line)) {
        setEvalCentipawn(100);
        return;
      }

      const match = line.match(INFORMS_WDL);
      if (match) {
        const win = parseInt(match[1], 10);
        const draw = parseInt(match[2], 10);
        const loss = parseInt(match[3], 10);
        const total = win + draw + loss;

        if (total > 0) {
          const { players, currentPlayerIndex } = gmRef.current;
          let winProb = win / total + 0.5 * (draw / total);
          if (players[currentPlayerIndex].color === PlayerColor.BLACK) {
            winProb = 1 - winProb;
          }
          debouncedSetEvalCentipawn(winProb * 100);
        }
      }
    },
    [debouncedSetEvalCentipawn],
  );

  const handleEngineMessage = useCallback(
    (event: MessageEvent) => {
      const line = event.data;

      if (INFORMS_DEPTH.test(line)) {
        handleDepthMessage(line);
      }

      if (FOUND_BEST_MOVE.test(line)) {
        handleBestMove(line);
      }

      if (!IS_SYSTEM_MESSAGE.test(line)) {
        if (INFORMS_WDL.test(line) || INFORMS_MATE.test(line)) {
          handleWDLMessage(line);
          return;
        }
      }
    },
    [handleBestMove, handleDepthMessage, handleWDLMessage],
  );

  const startWorker = useCallback(
    (scriptUrl: StockfishVersion) => {
      const worker = new window.Worker("/stockfish/stockfish-worker.js", {
        type: "module",
      });
      workerRef.current = worker;

      worker.onmessage = (e) => {
        const msg = e.data;

        if (msg.type === "ready") {
          sendCommand("uci");
        } else if (msg.data === "uciok") {
          sendCommand("isready");
          engineStateRef.current.status = "loaded";
        } else if (msg.data === "readyok") {
          if (engineStateRef.current.status === "loaded") {
            configureEngine(scriptUrl);
            engineStateRef.current.status = "configured";
            return;
          }

          if (engineStateRef.current.status === "interrupted") {
            engineStateRef.current.status = "ready";
            requestStockfishMove();
            return;
          }

          if (engineStateRef.current.status === "configured") {
            engineStateRef.current.status = "ready";
            requestStockfishMove();
          }
        } else {
          handleEngineMessage(msg);
        }
      };

      worker.postMessage({
        type: "load-engine",
        data: { version: scriptUrl },
      });
    },
    [requestStockfishMove, configureEngine, handleEngineMessage],
  );

  /* USE EFFECTS FOR UPDATING USEREFs THAT HAVE EXTERNAL DEPENDENCIES */

  useEffect(() => {
    gmRef.current = gameManager;
  }, [gameManager]);

  useEffect(() => {
    engineOptionsRef.current = engineOptions;
  }, [engineOptions]);

  /* USE EFFECTS FOR UPDATING USEREFs THAT HAVE EXTERNAL DEPENDENCIES */

  return {
    startWorker,
    configureEngine,
    isRunning,
    terminateWorker,
    interruptEngineThinking,
    stopEngineThinking,
    depthPercentage,
    evalCentipawn,
  };
};
