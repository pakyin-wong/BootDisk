namespace socket {
  export class SocketComm implements ISocket {
    private client: PlayerClient;

    constructor() {
      this.client = new PlayerClient({            
    playerID: 'BMJCP2DH5S5VCC8S9RHG', // Change this for different player, will replace later for oauth
    authhost:'http://18.139.237.86:8080/liveplayer/api/auth',
    hostname:"18.139.237.86", // RabbitMQ hostname
    path:"/ws",       // Path of RabbitMQ websocket 
    port:"15675",     // RabbitMQ websocket port        
}) 
// Listen the the ready event
// This event will fire after connection established and init ready
this.client.subscribe("READY",handleReady,this)

// Call this to connect the backend

      logger.l('MQTTSocketComm is created');
    }
    // Handler for Ready event
public handleReady(playerProfile:PlayerSession){
  // return data with struct PlayerSession
}



    public connect() {
      this.client.connect()

      this.client.subscribe(enums.mqtt.subscribe.CONNECT, this.onReceivedMsg);
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
