import React from "react";

import "./Bluetooth";
import { WebBridge } from "./WebBridge";

/*
class BleDevice {
  device = null;
  characteristics = {};

  static async discover(serviceUuid) {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [serviceUuid] }]
    });

    return new BleDevice(device);
  }

  constructor(device) {
    this.device = device;
  }

  async connect() {
    const gattServer = await this.device.gatt.connect();

    for (const service of await gattServer.getPrimaryServices()) {
      for (const characteristic of await service.getCharacteristics()) {
        this.characteristics[characteristic.uuid] = characteristic;
      }
    }
  }

  write(characteristicUuid, data) {
    const characteristic = this.characteristics[characteristicUuid];
    if (!characteristic) {
      return;
    }

    characteristic.writeValue(new Uint8Array(data));
  }
}
*/

export default function App() {
  let coreCube;

  const move = (leftSpeed, rightSpeed, durationMs) => {
    coreCube.write("10b20102-5b3b-4571-9508-cf3efcd7bbae", [
      2,
      1,
      leftSpeed >= 0 ? 1 : 2,
      Math.abs(leftSpeed),
      2,
      rightSpeed >= 0 ? 1 : 2,
      Math.abs(rightSpeed),
      durationMs / 10
    ]);
  };

  const moveForward = () => move(30, 30, 250);
  const moveBackward = () => move(-30, -30, 250);
  const turnLeft = () => move(-30, 30, 250);
  const turnRight = () => move(30, -30, 250);

  return (
    <div className="App">
      <h2>toio Core Cube コントローラー</h2>

      <button
        onClick={async () => {
          // coreCube = await BleDevice.discover("10b20100-5b3b-4571-9508-cf3efcd7bbae");
          // await coreCube.connect();

          const bridge = await WebBridge.connect();
          console.log(bridge);
        }}
      >
        接続
      </button>
      <br />

      <button onClick={moveForward}>前進</button>
      <button onClick={moveBackward}>後進</button>
      <button onClick={turnLeft}>左回転</button>
      <button onClick={turnRight}>右回転</button>
    </div>
  );
}
