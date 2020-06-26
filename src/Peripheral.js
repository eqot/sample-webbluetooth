export class Peripheral {
  device = null;
  characteristics = {};

  static async discover(serviceUuid) {
    return await navigator.bluetooth.requestDevice({
      filters: [{ services: [serviceUuid] }]
    });
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

  async write(characteristicUuid, data) {
    const characteristic = this.characteristics[characteristicUuid];
    if (!characteristic) {
      return;
    }

    await characteristic.writeValue(new Uint8Array(data));
  }

  async startNotification(characteristicUuid, callback) {
    const characteristic = this.characteristics[characteristicUuid];
    if (!characteristic) {
      return;
    }

    await characteristic.startNotifications();

    characteristic.addEventListener("characteristicvaluechanged", (event) => {
      callback(event.target.value);
    });
  }
}
