namespace we {
  export namespace overlay {
    export class BetHistory_v2 extends BetHistory {
      private static LIVE = {
        allGame: [GameType.BAC, GameType.BAI, GameType.BAM, GameType.BAS, GameType.LW, GameType.DT, GameType.RO, GameType.ROL, GameType.DI, GameType.DIL].join(','),
        bacarrat: [GameType.BAC, GameType.BAI, GameType.BAM, GameType.BAS].join(','),
        special: [GameType.LW, GameType.ROL, GameType.DIL].join(','),
        dragontiger: [GameType.DT].join(','),
        roulette: [GameType.RO, GameType.ROL].join(','),
        dice: [GameType.DI, GameType.DIL].join(','),
        other: [GameType.LW].join(','),
      };

      protected _mainTab: string = 'all';

      protected _main_select_all: eui.Label;
      protected _main_select_live: eui.Label;
      protected _main_select_lottery: eui.Label;
      protected _main_select_egame: eui.Label;

      protected _live_submenu: eui.List;
      protected _lottery_submenu: eui.List;

      constructor(skin: string = 'BetHistory_v2') {
        super(skin);
      }

      protected initBetHistory() {
        super.initBetHistory();

        this._txt_record_id.renderText = () => `${i18n.t('overlaypanel_bethistorylottery_record_round')}`;

        this._datagroup.itemRendererFunction = this.getItemRenderer.bind(this);

        this._main_select_all.text = i18n.t('overlaypanel_bethistory_tab_all');
        this._main_select_live.text = i18n.t('overlaypanel_bethistory_tab_live');
        this._main_select_lottery.text = i18n.t('overlaypanel_bethistory_tab_lottery');
        this._main_select_egame.text = i18n.t('overlaypanel_bethistory_tab_egame');

        const _liveArrCol: eui.ArrayCollection = new eui.ArrayCollection();
        for (const key in BetHistory_v2.LIVE) {
          _liveArrCol.addItem({
            label: i18n.t(`live.gametype.${key}`),
            val: BetHistory_v2.LIVE[key],
          });
        }
        this._live_submenu.dataProvider = _liveArrCol;
        this._live_submenu.requireSelection = true;
        this._live_submenu.itemRenderer = BetHistorySubMenuIR;

        const _lotteryArrCol: eui.ArrayCollection = new eui.ArrayCollection([
          { label: i18n.t('overlaypanel_bethistorylottery_tab_single'), val: 'single' },
          { label: i18n.t('overlaypanel_bethistorylottery_tab_multi'), val: 'multi' },
        ]);
        this._lottery_submenu.dataProvider = _lotteryArrCol;
        this._lottery_submenu.requireSelection = true;
        this._lottery_submenu.itemRenderer = BetHistorySubMenuIR;

        this._live_submenu.addEventListener(egret.Event.CHANGE, this.onLiveTabbed, this);
        this._lottery_submenu.addEventListener(egret.Event.CHANGE, this.onLotteryTabbed, this);
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
        if (this._mainTab == 'all') {
          return;
        }
        this._mainTab = 'all';
        this.currentState = 'all';
        this._type = -1;
        this._dataColl.removeAll();
        this.search();
      }

      protected onSelectLive() {
        if (this._mainTab == 'live') {
          return;
        }
        this._mainTab = 'live';
        this.currentState = 'live';
        this._type = this._live_submenu.selectedItem.val;
        this._dataColl.removeAll();
        this.search();
      }

      protected onLiveTabbed() {
        this._type = this._live_submenu.selectedItem.val;
        this._dataColl.removeAll();
        this.search();
      }

      protected onLotteryTabbed() {}

      protected onSelectLottery() {
        if (this._mainTab == 'lottery') {
          return;
        }
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
