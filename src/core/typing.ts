// This file contains global typing definitions.
namespace we {
  export namespace core {
    export interface ISocket {
      getGameStatusBA(hostID: string, option: number, index:number, callback?: Function): void;
      getGameStatusDT(hostID: string, option: number, index:number, callback?: Function): void;
      getStaticInitData(callback: (res: any) => void, thisArg: any);
      getStaticInitDataAsync?(callback: (res: any) => void, thisArg: any);
      connect();
      enterTable(tableID: string);
      leaveTable(tableID: string);
      getTableList(filter?: string);
      bet(tableID: string, betDetails: data.BetDetail[], callback: (result) => void);
      lotteryContinuousBet(tableID: string, betDetails: data.BetDetail[], roundBetDetails: data.LotteryBetCommand[], callback: (result) => void);
      getTableHistory();
      getBetHistory(filter: any, callback: (res: any) => void, thisArg: any);
      getLobbyMaterial(callback: (res: any) => void); // res: LobbyMaterial to any, since it could be error
      getLobbyMaterialAsync(callback: (res: any) => void, thisArg: any);
      updateSetting(key: string, value: string);
      getGoodRoad();
      batchUpdateAllGoodRoad(updatedefaultItem: any[], updatecustomItem: any[]);
      updateCustomGoodRoad(id: string, data: any);
      updateDefaultGoodRoad(ids: string[]);
      createGoodRoad(name: string, pattern: string);
      removeGoodRoadmap(id: string);
      resetGoodRoadmap();
      createCustomBetCombination(title: string, betOptions: we.data.BetValueOption[]);
      getBetCombination();
      removeBetCombination(id: string);
      sendVerifyInfo(id: string, pattern: string[], callback: (data: any) => void, thisArg);
      retryPlayerClient(functionName: string, args: any[]);
      getBalance();
      getPlayerProfileSummary(callback: (data: any) => void);
      getPlayerStatistic(filter: any, callback: (data: any) => void);
      getPlayerLotteryStatistic(filter: any);
      getLotteryContinuousBetDetail(betid: string, callback: (res: any) => void, thisArg: any);
      getLotteryContinuousBetHistory(filter: any, callback: (res: any) => void, thisArg: any);
      getLotteryBetDetail(filter: any, callback: (res: any) => void, thisArg: any);
      cancelBet(tableID: string, betID: string, gametype: string, callback: (res: any) => void, thisArg: any);
    }

    export interface ILobbyRoad {
      updateLobbyRoadData(roadmapData: any);
    }

    export interface IErrorKind {
      code: number;
      error?: string;
      detail?: string;
      priority?: number;
      action?: string;
      method?: string;
      timestamp?: number;
      args?: any[];

      debug?: string; //
      id?: string; //
      status?: string; //
    }

    export interface IRemoteResourceItem {
      imageUrl: string;
      image: egret.Texture;
      link: string;
      loaded: boolean;
      title?: string;
      description?: string;
    }

    export interface IContentInitializer {
      initContent(root: eui.Component);
      reloadBanners();
    }
  }
}
