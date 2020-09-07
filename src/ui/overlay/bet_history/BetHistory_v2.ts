namespace we {
  export namespace overlay {
    export class BetHistory_v2 extends BetHistory {
      protected _mainTab: string = 'all';

      protected _main_select_all: egret.DisplayObject;
      protected _main_select_live: egret.DisplayObject;
      protected _main_select_lottery: egret.DisplayObject;
      protected _main_select_egame: egret.DisplayObject;

      constructor(skin: string = 'BetHistory_v2') {
        super(skin);
      }

      protected initBetHistory() {
        super.initBetHistory();
        this._datagroup.itemRendererFunction = this.getItemRenderer.bind(this);

        utils.addButtonListener(this._main_select_all, this.onSelectAll, this);
        utils.addButtonListener(this._main_select_live, this.onSelectLive, this);
        utils.addButtonListener(this._main_select_lottery, this.onSelectLottery, this);
        utils.addButtonListener(this._main_select_egame, this.onSelectEgame, this);
      }

      protected getItemRenderer(data) {
        switch (this._mainTab) {
          case 'live':
            return betHistory.BetHistoryItem_v2;
          case 'lottery':
            return betHistory.BetHistoryItemLottery_v2;
          case 'all':
          default:
            switch (data.gametype) {
              case GameType.LO:
                return betHistory.BetHistoryItemLottery;
              default:
                return betHistory.BetHistoryItem;
            }
        }
      }

      protected onSelectAll() {
        if (this._mainTab == 'all') { return; }
        this._mainTab = 'all';
        this.currentState = 'all';
        this._type = -1;
        this._dataColl.removeAll();
        this.search();
      }

      protected onSelectLive() {
        if (this._mainTab == 'live') { return; }
        this._mainTab = 'live';
        this.currentState = 'live';
        this._type = GameType.BAC;
        this._dataColl.removeAll();
        this.search();
      }

      protected onSelectLottery() {
        if (this._mainTab == 'lottery') { return; }
        this._mainTab = 'lottery';
        this.currentState = 'lottery';
        this._type = GameType.LO;
        this._dataColl.removeAll();
        this.search();
      }

      protected onSelectEgame() {}
    }
  }
}
