export class WebBridge {
  static connections = {};
  static connectionIndex = 0;

  connectionId = 0;

  static async connect() {
    return new Promise((resolve) => {
      WebBridge.send(WebBridge.connectionIndex, "bridge:connect");

      WebBridge.connections[WebBridge.connectionIndex] = { resolve };

      WebBridge.connectionIndex++;
    });
  }

  static send(connectionId, method, params) {
    const message = {
      type: "toio",
      connectionId,
      jsonrpc: "2.0",
      method,
      params
    };
    window.parent.postMessage(message, "*");
  }

  constructor(connectionId) {
    this.connectionId = connectionId;
  }
}

window.addEventListener("message", (event) => {
  // console.log(event.data);

  const { type, connectionId, message } = event.data;

  if (type !== "toio") {
    return;
  }

  const connection = WebBridge.connections[connectionId];
  if (!connection || !connection.resolve) {
    return;
  }

  switch (message) {
    case "bridge:connected": {
      const bridge = new WebBridge(connectionId);
      connection.resolve(bridge);

      break;
    }

    default:
      break;
  }
});
