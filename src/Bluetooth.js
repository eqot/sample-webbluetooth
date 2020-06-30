function send(method, params) {
  const message = {
    jsonrpc: "2.0",
    method,
    params
  };
  window.parent.postMessage(JSON.stringify(message), "*");
}

class Bluetooth {
  static requestDevice(options) {
    send("requestDevice");

    return new Promise((resolve) => {
      console.log(options);
      resolve(new Device());
    });
  }
}

class Gatt {
  async connect() {
    send("connect3");

    return this;
  }

  async getPrimaryServices() {
    send("getPrimaryServices");

    return [];
  }
}

class Device {
  constructor() {
    this.gatt = new Gatt();
  }

  async write(uuid, data, withoutResponse) {
    send("write", {
      uuid,
      data,
      withoutResponse
    });
  }
}

// if (!navigator.bluetooth) {
//   navigator.bluetooth = Bluetooth;
//   console.info("Use replaced bluetooth functionality");
// } else {
//   console.info("Use browser's bluetooth functionality");
// }

Object.defineProperty(navigator, "bluetooth", {
  value: Bluetooth
  // configurable: true
});
