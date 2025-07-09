import { useEffect, useRef, useState } from "react";

export const useStockfishHandler = (
  classicalEnabled: boolean,
  nnueEnabled: boolean
) => {
  const workerRef = useRef<Worker | null>(null);
  const [engineReady, setEngineReady] = useState(false);

  const startWorker = (scriptUrl: string) => {
    if (workerRef.current) return;

    const worker = new window.Worker(scriptUrl);
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const msg = e.data;
      console.log("Stockfish:", msg);

      if (msg === "uciok") {
        setEngineReady(true);
      }

      if (msg === "readyok") {
        applyNNUEOption();
      }
    };

    worker.postMessage("uci");
    worker.postMessage("isready");
  };

  const sendCommand = (cmd: string) => {
    workerRef.current?.postMessage(cmd);
  };

  const stop = () => {
    sendCommand("stop");
  };

  const terminate = () => {
    workerRef.current?.terminate();
    workerRef.current = null;
    setEngineReady(false);
  };

  const isRunning = () => !!workerRef.current;

  const applyNNUEOption = () => {
    if (!workerRef.current) return;

    const nnueValue = nnueEnabled ? "true" : "false";
    sendCommand(`setoption name Use NNUE value ${nnueValue}`);
  };

  useEffect(() => {
    if (!isRunning() || !engineReady) return;

    stop();
    applyNNUEOption();
    sendCommand("isready");
  }, [nnueEnabled, classicalEnabled]);

  return {
    startWorker,
    sendCommand,
    stop,
    terminate,
    isRunning,
  };
};
