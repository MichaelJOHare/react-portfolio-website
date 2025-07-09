import { useEffect, useRef } from "react";

export const useStockfishHandler = () => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new window.Worker("/stockfish/stockfish-16.js");
    const worker = workerRef.current;

    worker.onmessage = (e) => {
      console.log("Stockfish:", e.data);
    };

    worker.postMessage("uci");
    worker.postMessage("isready");

    return () => {
      worker.terminate();
    };
  }, []);

  const sendCommand = (cmd: string) => {
    workerRef.current?.postMessage(cmd);
  };

  return { sendCommand, terminate: () => workerRef.current?.terminate() };
};
