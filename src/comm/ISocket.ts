namespace socket {
  export interface ISocket {
    connect();
    enterTable(tableID: number);
    leaveTable(tableID: number);
    getTableList(filter: number);
    getTableInfo();
    onTableListUpdate(evt: egret.Event);
  }
}
