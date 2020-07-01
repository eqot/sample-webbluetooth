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
  // console.log(event);
  console.log(event.data);
  // try {
  // const data = JSON.parse(event.data);
  const { type, connectionId, message } = event.data;

  if (data.type !== "toio") {
    return;
  }

  console.log(0);

  const connection = WebBridge.connections[connectionId];
  if (!connection || !connection.resolve) {
    return;
  }
  console.log(1);

  switch (message) {
    case "bridge:connected": {
      const bridge = new WebBridge(connectionId);
      connection.resolve(bridge);

      console.log("resolved", connectionId);

      break;
    }

    default:
      break;
  }
  console.log(2);
  // } catch (e) {}
});
