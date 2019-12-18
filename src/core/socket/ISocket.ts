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
      getBetHistory(filter: any, callback: (res: any) => void, thisArg: any);

      getGoodRoad(callback: (data: any) => void, thisArg: any);
      updateCustomGoodRoad(id: string, data: any, callback: (data: any) => void, thisArg: any);
      updateDefaultGoodRoad(ids: string[], callback: (data: any) => void, thisArg: any);
      createGoodRoad(name: string, pattern: string, callback: (data: any) => void, thisArg: any);
      removeGoodRoadmap(id: string, callback: (data: any) => void, thisArg: any);
    }
  }
}
