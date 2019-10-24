namespace socket {
  export interface ISocket {
    connect();
    enterTable(tableID: number);
    leaveTable(tableID: number);
    getTableList(filter: number);
    bet(tableID: number, betDetails: BetDetail[]);
    getTableHistory();
  }
}
