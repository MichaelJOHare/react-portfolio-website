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

      const createEngine =
        module.default || module.Sf167Web || module.Sf17179Web;
      sfInstance = await createEngine();

      sfInstance.listen = (line) => postMessage({ type: "info", data: line });
      sfInstance.onError = (line) => postMessage({ type: "error", data: line });

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
