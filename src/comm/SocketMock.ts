namespace socket {
  export class SockMock {
    constructor() {}

    public connect() {
      // this.client.subscribe(enums.mqtt.subscribe.CONNECT, this.onReceivedMsg);
      /// this.client.connect();
    }

    public enterTable() {}

    public leaveTable() {}

    public getTableList(filter: number) {}

    public getTableInfo() {}

    public bet() {}

    private onReceivedMsg(res) {
      logger.l(res);

      // switch res event / error to handler

      // hard code connect success event
    }
  }
}
