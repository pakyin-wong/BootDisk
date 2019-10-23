namespace socket {
  export class SocketComm implements ISocket {
    private client: PlayerClient;

    constructor() {
      this.client = new PlayerClient({
        playerID: 'BMJCP2DH5S5VCC8S9RHG',
        secret: '4114f79f17c28ec6bfa01b80a28870a7',
        connectTimeout: 1000 * 1000, // To avoid disconnect,
        authhost: 'http://18.139.237.86:8080/liveplayer/api/auth',
        hostname: '18.139.237.86', // RabbitMQ hostname
        path: '/ws', // Path of RabbitMQ websocket
        port: '15675', // RabbitMQ websocket port
      });
      // Listen the the ready event
      // This event will fire after connection established and init ready

      // Call this to connect the backend

      console.log(this.client);
      logger.l('MQTTSocketComm is created');
    }
    // Handler for Ready event
    public handleReady(o: any) {
      // return data with struct PlayerSession
      console.log('handleReady');
    }

    public connect() {
      console.log('PlayerClient::connect()', this.client);

      this.client.subscribe('READY', this.handleReady, this);
      this.client.connect();
    }
    public enterTable(tableID: number) {}
    public leaveTable(tableID: number) {}
    public getTableList(filter: number) {}
    public getTableInfo() {}

    private mockEnterTable;

    private onReceivedMsg(res) {
      logger.l(res);

      // switch res event / error to handler

      // hard code connect success event
    }

    public onTableListUpdate(evt: egret.Event) {}

    public bet(tableID: number, betDetails: BetDetail[]) {}

    public getTableHistory() {}
  }
}
