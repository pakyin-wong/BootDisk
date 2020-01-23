// This file contains global typing definitions.
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
      updateSetting(key: string, value: string);
      getGoodRoad();
      updateCustomGoodRoad(id: string, data: any);
      updateDefaultGoodRoad(ids: string[]);
      createGoodRoad(name: string, pattern: string);
      removeGoodRoadmap(id: string);
      resetGoodRoadmap();
    }

    export interface IErrorKind {
      code: number;
      detail?: string;
      id?: string;
      status?: string;
      timestamp?: number;
    }

    export interface IRemoteResourceItem {
      imageUrl: string;
      image: egret.Texture;
      link: string;
      loaded: boolean;
    }
  }
}
