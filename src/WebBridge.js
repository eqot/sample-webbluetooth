export class WebBridge {
  static connections = {};
  static connectionIndex = 0;

  id = 0;
  resolve = null;

  constructor() {
    this.id = WebBridge.connectionIndex;
    WebBridge.connections[this.id] = this;

    WebBridge.connectionIndex++;
  }

  async connect() {
    return this.send("bridge:connect");
  }

  async send(method, params) {
    return new Promise((resolve) => {
      this.resolve = resolve;

      const message = {
        jsonrpc: "2.0",
        type: "toio",
        method,
        params,
        id
      };
      window.parent.postMessage(message, "*");
    });
  }
}

window.addEventListener("message", (event) => {
  // console.log(event.data);

  const { type, result, id } = event.data;

  if (type !== "toio") {
    return;
  }

  const connection = WebBridge.connections[id];
  if (!connection || !connection.resolve) {
    return;
  }

  if (result === null) {
    connection.resolve();
    connection.resolve = null;
  }
});
