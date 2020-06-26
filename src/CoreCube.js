import { Peripheral } from "./Peripheral";

export class CoreCube extends Peripheral {
  static UUID = (id) => `10b2${id}-5b3b-4571-9508-cf3efcd7bbae`;
  static ServiceUuid = CoreCube.UUID("0100");
  static CharacteristicUuid = {
    ID: CoreCube.UUID("0101"),
    MOTOR: CoreCube.UUID("0102")
  };

  static async discover() {
    const device = await super.discover(CoreCube.ServiceUuid);

    const coreCube = new CoreCube(device);
    await coreCube.connect();

    coreCube.startNotification(CoreCube.CharacteristicUuid.ID, (data) => {
      switch (data.getUint8(0)) {
        case 1:
          coreCube.x = data.getUint16(1, true);
          coreCube.y = data.getUint16(3, true);
          coreCube.direction = data.getUint16(5, true);
          break;

        default:
          break;
      }
    });

    return coreCube;
  }

  async move(leftSpeed, rightSpeed, durationMs) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    await this.write(CoreCube.CharacteristicUuid.MOTOR, [
      1,
      1,
      leftSpeed >= 0 ? 1 : 2,
      Math.abs(leftSpeed),
      2,
      rightSpeed >= 0 ? 1 : 2,
      Math.abs(rightSpeed)
    ]);

    this.timer = setTimeout(() => {
      this.stop();
    }, durationMs);
  }

  async stop() {
    await this.write(CoreCube.CharacteristicUuid.MOTOR, [1, 1, 1, 0, 2, 1, 0]);
  }
}
