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
      getLobbyMaterial(callback: (res: LobbyMaterial) => void);

      getGoodRoad();
      updateCustomGoodRoad(id: string, data: any);
      updateDefaultGoodRoad(ids: string[]);
      createGoodRoad(name: string, pattern: string);
      removeGoodRoadmap(id: string);
    }
  }
}
