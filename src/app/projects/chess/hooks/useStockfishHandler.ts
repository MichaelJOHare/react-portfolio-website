import { useCallback, useEffect, useRef, useState } from "react";
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
const INFORMS_WDL = /wdl (\d+) (\d+) (\d+)/;
const INFORMS_MATE = /score mate (\-?\d+)/;

export const useStockfishHandler = (
  gameManager: GameManager,
  highlighter: Highlighter,
  version: "sf-16" | "sf-17",
  isBoardFlipped: boolean,
  colorChoice: number,
  strengthLevel: number
) => {
  const workerRef = useRef<Worker | null>(null);
  const gmRef = useRef(gameManager);
  const highlighterRef = useRef(highlighter);
  const isBoardFlippedRef = useRef(isBoardFlipped);
  const [engineReady, setEngineReady] = useState(false);
  const [engineConfigured, setEngineConfigured] = useState(false);
  const hasConfiguredEngine = useRef(false);
  const [shouldStopThinking, setShouldStopThinking] = useState(false);
  const [shouldFindMove, setShouldFindMove] = useState(false);
  const [evalCentipawn, setEvalCentipawn] = useState(50);
  const [depthPercentage, setDepthPercentage] = useState(0);
  const [depth, setDepth] = useState(-1);
  const lastDepthUpdateRef = useRef(0);
  const lastArrowUpdateRef = useRef(0);
  const isPlaying = colorChoice !== -1 && strengthLevel !== -1;
  const defaultDepth = 24;

  const configureEngine = useCallback(
    (skillLevel: number) => {
      const threads = calculateThreadsForNNUE();
      const depth = isPlaying ? calculateDepth(skillLevel * 2) : defaultDepth;
      console.log(depth);
      setDepth(depth);
      sendCommand(`setoption name Skill Level value ${skillLevel}`);
      sendCommand(`setoption name Threads value ${threads}`);
      if (version === "sf-16") {
        sendCommand("setoption name Use NNUE value true"); // might not be needed?
      }
      sendCommand("setoption name UCI_ShowWDL value true");
      sendCommand("ucinewgame");
      console.log("stockfish options configured");

      sendCommand("isready");
    },
    [isPlaying, version]
  );

  const resetEngine = useCallback(() => {
    setShouldStopThinking(true);
    hasConfiguredEngine.current = false;
    sendCommand("ucinewgame");
    sendCommand("isready");
  }, []);

  const terminate = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setEngineReady(false);
    setEngineConfigured(false);
  }, []);

  const handleEngineMessage = useCallback(
    (event: MessageEvent) => {
      const line = typeof event === "object" ? event.data : event;
      console.log(line);
      if (INFORMS_DEPTH.test(line)) {
        const currentDepth = parseInt(line.match(INFORMS_DEPTH)[1], 10);
        const currentTime = Date.now();
        const percent = (currentDepth / defaultDepth) * 100;
        setDepthPercentage(percent);
        if (
          currentDepth === 1 ||
          (currentDepth - lastDepthUpdateRef.current >= 3 &&
            currentTime - lastArrowUpdateRef.current >= 3000)
        ) {
          //                                                              debounce this and maybe move into seprate function
          const moveData = line.match(INFORMS_CURRENT_MOVE);
          const from = moveData[1].substring(0, 2);
          const to = moveData[1].substring(2, 4);
          lastDepthUpdateRef.current = currentDepth;
          lastArrowUpdateRef.current = currentTime;
          if (!isPlaying)
            highlighterRef.current.addStockfishBestMoveArrow({ from, to });
        }
      }
      if (FOUND_BEST_MOVE.test(line)) {
        const [, from, to, promotion] = line.match(FOUND_BEST_MOVE);
        if (isPlaying) {
          const legalMoves = gmRef.current.getLegalMoves();
          const promotionType = determinePromotionType(promotion);
          const players = gmRef.current.players;
          const currentPlayerIndex = gmRef.current.currentPlayerIndex;
          const fromSq = convertNotationToSquare(
            from,
            isBoardFlippedRef.current
          );
          const toSq = convertNotationToSquare(to, isBoardFlippedRef.current);
          const isEngineTurn =
            (players[currentPlayerIndex].color === PlayerColor.WHITE &&
              colorChoice === 1) ||
            (players[currentPlayerIndex].color === PlayerColor.BLACK &&
              colorChoice === 0);

          if (fromSq && toSq && isEngineTurn) {
            // intentional delay to make computer move feel more natural
            const delay = Math.random() * (1400 - 600) + 600;
            console.log(delay);
            setTimeout(() => {
              gmRef.current.executeMove(
                fromSq.row,
                fromSq.col,
                toSq.row,
                toSq.col,
                legalMoves,
                promotionType
              );
              highlighterRef.current.addPreviousMoveSquares(fromSq, toSq);
            }, delay);
          }
        } else {
          highlighterRef.current.addStockfishBestMoveArrow({ from, to });
        }
        setEngineReady(true);
      }
      if (IS_SYSTEM_MESSAGE.test(line)) {
        return;
      }
      if (INFORMS_WDL.test(line) || INFORMS_MATE.test(line)) {
        if (INFORMS_MATE.test(line)) {
          setEvalCentipawn(100);
          return;
        }

        if (INFORMS_WDL.test(line)) {
          const match = line.match(INFORMS_WDL);
          if (match) {
            const win = parseInt(match[1], 10);
            const draw = parseInt(match[2], 10);
            const loss = parseInt(match[3], 10);
            const total = win + draw + loss;

            if (total > 0) {
              const { players, currentPlayerIndex } = gmRef.current;
              let winProb = win / total + 0.5 * (draw / total);

              const currentPlayerColor = players[currentPlayerIndex].color;
              if (currentPlayerColor === PlayerColor.BLACK) {
                winProb = 1 - winProb;
              }

              const evalProgress = winProb * 100;
              setEvalCentipawn(evalProgress);
            }
            return;
          }
        }
      }
    },
    [colorChoice, isPlaying]
  );

  const startWorker = useCallback(
    (scriptUrl: string) => {
      terminate();

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
            setShouldFindMove(true);
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
    [strengthLevel, configureEngine, handleEngineMessage, terminate]
  );

  const sendCommand = (cmd: string) => {
    workerRef.current?.postMessage(cmd);
  };

  const isRunning = () => !!workerRef.current;

  // useEffect because if version changes, it needs to kill and restart with correct nnue file
  useEffect(() => {
    if (!workerRef.current) return;
    terminate();
    setEngineConfigured(false);
    hasConfiguredEngine.current = false;
    setShouldFindMove(true);

    startWorker(version);
  }, [version, startWorker, terminate]);

  // useEffect because need to find new move based on deps changing
  useEffect(() => {
    if (shouldFindMove && engineReady && engineConfigured) {
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
        isBoardFlipped
      );

      setEngineReady(false);
      setShouldFindMove(false); // should some of these state setting/reactions be calls to functions instead?
      sendCommand(`position fen ${fen}`);
      sendCommand(`go depth ${depth}`);
    }
  }, [shouldFindMove, engineReady, engineConfigured, depth, isBoardFlipped]);

  // useEffect because of interaction with worker
  useEffect(() => {
    if (shouldStopThinking) {
      sendCommand("stop");
      setShouldStopThinking(false);
      setShouldFindMove(true);
      // maybe set engineReady true?
    }
  }, [shouldStopThinking]);

  /* USEREF UPDATE EFFECTS */

  useEffect(() => {
    gmRef.current = gameManager;
  }, [gameManager]);

  useEffect(() => {
    highlighterRef.current = highlighter;
  }, [highlighter]);

  useEffect(() => {
    isBoardFlippedRef.current = isBoardFlipped;
  }, [isBoardFlipped]);

  /* USEREF UPDATE EFFECTS */

  return {
    startWorker,
    resetEngine,
    setShouldStopThinking,
    terminate,
    isRunning,
    depthPercentage,
    evalCentipawn,
  };
};
