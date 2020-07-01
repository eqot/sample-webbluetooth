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
}

window.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log(data);

  const connection = WebBridge.connections[data.id];
  if (!connection || !connection.resolve) {
    return;
  }

  switch (data.message) {
    case "bridge:connected": {
      const bridge = new WebBridge(data.connectionId);
      connection.resolve(data);
    }
  }
});
