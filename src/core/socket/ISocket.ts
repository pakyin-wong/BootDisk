namespace we {
  export namespace core {
    export interface ISocket {
      getStaticInitData(callback: (res: any) => void, thisArg: any);
      connect();
      enterTable(tableID: string);
      leaveTable(tableID: string);
      getTableList(filter?: string);
      bet(tableID: string, betDetails: data.BetDetail[]);
      getTableHistory();
    }
  }
}
