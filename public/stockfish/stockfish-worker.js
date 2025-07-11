let sfInstance = null;

onmessage = async (e) => {
  const msg = e.data;

  if (typeof msg === "object" && msg.type === "load-engine") {
    try {
      const data = msg.data;
      const module = await import(
        `/stockfish/${data.version}/${
          data.version === "sf-16" ? "sf16-7" : "sf171-79"
        }.js`
      );

      const createEngine = module.default;
      sfInstance = await createEngine();

      sfInstance.listen = (line) => postMessage({ type: "info", data: line });
      sfInstance.onError = (line) => postMessage({ type: "error", data: line });

      if (data.version === "sf-16") {
        await loadNNUE("/stockfish/sf-16/nn-ecb35f70ff2a.nnue", 0);
      } else {
        await loadNNUE("/stockfish/sf-17/nn-1c0000000000.nnue", 0);
        await loadNNUE("/stockfish/sf-17/nn-37f18f62d772.nnue", 1);
      }

      postMessage({ type: "ready" });
    } catch (err) {
      postMessage({
        type: "error",
        data: "Failed to load engine: " + err.message,
      });
    }
    return;
  }

  if (!sfInstance) {
    postMessage({ type: "error", data: "Engine not yet loaded" });
    return;
  }

  if (typeof msg === "string") {
    try {
      sfInstance.uci(msg);
    } catch (err) {
      postMessage({
        type: "error",
        data: "Failed to execute command: " + err.message,
      });
    }
  } else {
    postMessage({
      type: "error",
      data: "Invalid message format, expected string",
    });
  }
};

async function loadNNUE(url, index) {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  sfInstance.setNnueBuffer(new Uint8Array(buf), index);
}
