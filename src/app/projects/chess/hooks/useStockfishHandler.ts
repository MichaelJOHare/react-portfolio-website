import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { toFEN } from "../utils/FEN";
import {
  ColorChoice,
  GameManager,
  Highlighter,
  NO_SELECTION,
  PlayerColor,
  PlayerType,
  StockfishVersion,
} from "../types";
import {
  calculateThreadsForNNUE,
  convertNotationToSquare,
  determinePromotionType,
  getConfigFromLevel,
} from "../utils/stockfish";

type EngineStatus = "idle" | "loaded" | "configured" | "thinking" | "ready";

const IS_SYSTEM_MESSAGE = /^(?:(?:uci|ready)ok$|option name)/;
const INFORMS_CURRENT_MOVE = /pv (\w{4})/;
const FOUND_BEST_MOVE = /^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/;
const INFORMS_DEPTH = /^info .*\bdepth (\d+) .*\bnps (\d+)/;
const INFORMS_WDL = /wdl (\d+) (\d+) (\d+)/;
const INFORMS_MATE = /score mate (\-?\d+)/;

export const useStockfishHandler = (
  gameManager: GameManager,
  highlighter: Highlighter,
  colorChoice: number,
  strengthLevel: number,
) => {
  const workerRef = useRef<Worker | null>(null);
  const gmRef = useRef(gameManager);
  const engineStatusRef = useRef<EngineStatus>("idle");
  const depthRef = useRef<number>(24);
  const hasConfiguredEngine = useRef<boolean>(false);
  const wasInterruptedRef = useRef(false);
  const lastDepthUpdateRef = useRef<number>(0);
  const lastArrowUpdateRef = useRef<number>(0);
  const [evalCentipawn, setEvalCentipawn] = useState(50);
  const [depthPercentage, setDepthPercentage] = useState(0);
  const defaultDepth = 24;
  const engineOptionsRef = useRef<{
    colorChoice: ColorChoice;
    strengthLevel: number;
  }>({ colorChoice, strengthLevel });

  const debouncedSetEvalCentipawn = useMemo(
    () => debounce((val: number) => setEvalCentipawn(val), 100),
    [setEvalCentipawn],
  );
  const debouncedAddStockfishArrow = useMemo(
    () =>
      debounce((from: string, to: string) => {
        highlighter.addStockfishBestMoveArrow({ from, to });
      }, 50),
    [highlighter],
  );

  const sendCommand = (cmd: string) => {
    workerRef.current?.postMessage(cmd);
  };

  const configureEngine = useCallback(
    (skillLevel: number, version: StockfishVersion) => {
      const { colorChoice, strengthLevel } = engineOptionsRef.current;
      const isPlaying =
        colorChoice !== ColorChoice.NONE && strengthLevel !== NO_SELECTION;
      const { skill, depth } = getConfigFromLevel(skillLevel);
      const effectiveDepth = isPlaying ? depth : defaultDepth;
      const threads = calculateThreadsForNNUE();
      depthRef.current = effectiveDepth;
      sendCommand(`setoption name Skill Level value ${skill}`);
      sendCommand(`setoption name Threads value ${threads}`);
      if (version === "sf-16") {
        sendCommand("setoption name Use NNUE value true");
      }
      sendCommand("setoption name UCI_ShowWDL value true");
      sendCommand("ucinewgame");

      sendCommand("isready");
    },
    [],
  );

  const requestStockfishMove = useCallback(() => {
    if (engineStatusRef.current !== "ready") return;

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

    sendCommand(`position fen ${fen}`);
    sendCommand(`go depth ${depthRef.current}`);
    engineStatusRef.current = "thinking";
  }, []);

  const interruptEngine = useCallback(() => {
    wasInterruptedRef.current = true;
    sendCommand("stop");
    sendCommand("isready");
  }, []);

  const terminate = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    hasConfiguredEngine.current = false;
    engineStatusRef.current = "ready";
  }, []);

  const handleDepthMessage = useCallback(
    (line: string) => {
      const { colorChoice, strengthLevel } = engineOptionsRef.current;
      const isPlaying =
        colorChoice !== ColorChoice.NONE && strengthLevel !== NO_SELECTION;
      const currentDepth = parseInt(line.match(INFORMS_DEPTH)![1], 10);
      const currentTime = Date.now();
      const percent = (currentDepth / defaultDepth) * 100;
      setDepthPercentage(percent);

      if (
        currentDepth === 1 ||
        (currentDepth - lastDepthUpdateRef.current >= 3 &&
          currentTime - lastArrowUpdateRef.current >= 3000)
      ) {
        const moveData = line.match(INFORMS_CURRENT_MOVE);
        if (moveData) {
          const from = moveData[1].substring(0, 2);
          const to = moveData[1].substring(2, 4);
          lastDepthUpdateRef.current = currentDepth;
          lastArrowUpdateRef.current = currentTime;

          if (!isPlaying) debouncedAddStockfishArrow(from, to);
        }
      }
    },
    [debouncedAddStockfishArrow],
  );

  const handleBestMove = useCallback(
    (line: string) => {
      const { colorChoice, strengthLevel } = engineOptionsRef.current;
      const isPlaying =
        colorChoice !== ColorChoice.NONE && strengthLevel !== NO_SELECTION;
      const [, from, to, promotion] = line.match(FOUND_BEST_MOVE)!;
      const promotionType = determinePromotionType(promotion);

      if (wasInterruptedRef.current) {
        wasInterruptedRef.current = false;
        engineStatusRef.current = "ready";
        requestStockfishMove();
        return;
      }

      if (isPlaying) {
        const legalMoves = gmRef.current.getLegalMoves();
        const players = gmRef.current.players;
        const currentPlayer = players[gmRef.current.currentPlayerIndex];

        const fromSq = convertNotationToSquare(from);
        const toSq = convertNotationToSquare(to);

        const isEngineTurn = currentPlayer.type === PlayerType.COMPUTER;

        if (fromSq && toSq && isEngineTurn) {
          const delay = Math.random() * (1400 - 600) + 600;
          setTimeout(() => {
            gmRef.current.executeMove(
              fromSq.row,
              fromSq.col,
              toSq.row,
              toSq.col,
              legalMoves,
              promotionType,
            );
            highlighter.addPreviousMoveSquares(fromSq, toSq); //maybe do this in executeMove in gameManager?
          }, delay);
        }
      } else {
        debouncedAddStockfishArrow(from, to);
      }

      engineStatusRef.current = "ready";
    },
    [requestStockfishMove, debouncedAddStockfishArrow, highlighter],
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
      const line = typeof event === "object" ? event.data : event;

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
      if (scriptUrl === StockfishVersion.NONE) {
        return;
      }
      terminate();

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
          engineStatusRef.current = "loaded";
        } else if (msg.data === "readyok") {
          if (engineStatusRef.current === "loaded") {
            configureEngine(strengthLevel, scriptUrl);
            engineStatusRef.current = "configured";
            return;
          }

          if (engineStatusRef.current === "configured") {
            engineStatusRef.current = "ready";
            requestStockfishMove();
          }

          if (wasInterruptedRef.current) {
            wasInterruptedRef.current = false;
            engineStatusRef.current = "ready";
            requestStockfishMove();
            return;
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
    [
      strengthLevel,
      requestStockfishMove,
      configureEngine,
      handleEngineMessage,
      terminate,
    ],
  );

  /* USE EFFECTS FOR USEREF UPDATEs */

  useEffect(() => {
    gmRef.current = gameManager;
  }, [gameManager]);

  useEffect(() => {
    engineOptionsRef.current = { colorChoice, strengthLevel };
  }, [colorChoice, strengthLevel]);

  /* USE EFFECTS FOR USEREF UPDATES */

  return {
    startWorker,
    interruptEngine,
    depthPercentage,
    evalCentipawn,
  };
};
