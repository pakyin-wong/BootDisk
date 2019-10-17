namespace socket {
  export interface ISocket {
    client: TestClient;

    connect();
    enterTable(tableID: number);
    leaveTable(tableID: number);
    getTableList(filter: number);
    getTableInfo();
  }
}
