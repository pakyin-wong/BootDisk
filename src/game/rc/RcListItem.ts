namespace we {
  export namespace rc {
    export class RcListItem extends lo.LotteryListItem {
      protected _roadPanel: rc.RcLobbyRoadPanel;

      public constructor(skinName: string = null) {
        super(skinName);
        this._roadPanel = new rc.RcLobbyRoadPanel();
      }
    }
  }
}
