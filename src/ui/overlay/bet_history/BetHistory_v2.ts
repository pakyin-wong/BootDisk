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

      private static LOTTERY = {
        allLotteryGame: [GameType.LO, GameType.RC].join(','),
        lottery: [GameType.LO].join(','),
        race: [GameType.RC].join(','),
      };

      protected _mainTab: string = 'all';
      protected _loTab: string = 'single';

      protected _main_select_all: eui.Label;
      protected _main_select_live: eui.Label;
      protected _main_select_lottery: eui.Label;
      protected _main_select_egame: eui.Label;

      protected _txt_lcb_cbetid: eui.Label;
      protected _txt_lcb_date: eui.Label;
      protected _txt_lcb_game: eui.Label;
      protected _txt_lcb_start: eui.Label;
      protected _txt_lcb_total: eui.Label;
      protected _txt_lcb_count: eui.Label;
      protected _txt_lcb_betamount: eui.Label;
      protected _txt_lcb_status: eui.Label;

      protected _live_submenu: eui.List;
      protected _lottery_switch: eui.List;
      protected _lottery_submenu: eui.List;

      protected _cbet_details: betHistory.LoContinuousBetDetails;
      protected _popupbet_detail: betHistory.LoPopupBetDetail;

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

        const key = 'overlaypanel_bethistorylottery_continuousbetdetails_';
        this._txt_lcb_cbetid.text = i18n.t(`${key}cbetid`);
        this._txt_lcb_date.text = i18n.t(`${key}date`);
        this._txt_lcb_game.text = i18n.t(`${key}game`);
        this._txt_lcb_start.text = i18n.t(`${key}start`);
        this._txt_lcb_total.text = i18n.t(`${key}total`);
        this._txt_lcb_count.text = i18n.t(`${key}count`);
        this._txt_lcb_betamount.text = i18n.t(`${key}betamount`);
        this._txt_lcb_status.text = i18n.t(`${key}status`);

        // Live game list menu
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

        // Lottery Switch
        const _loSwitchArrCol: eui.ArrayCollection = new eui.ArrayCollection([
          { label: i18n.t('overlaypanel_bethistorylottery_tab_single'), val: 'single' },
          { label: i18n.t('overlaypanel_bethistorylottery_tab_multi'), val: 'multi' },
        ]);
        this._lottery_switch.dataProvider = _loSwitchArrCol;
        this._lottery_switch.requireSelection = true;
        this._lottery_switch.itemRenderer = BetHistorySubMenuIR;

        // Lottery game list menu
        const _loArrCol: eui.ArrayCollection = new eui.ArrayCollection([]);
        for (const key in BetHistory_v2.LOTTERY) {
          _loArrCol.addItem({
            label: i18n.t(`lottery.gametype.${key}`),
            val: BetHistory_v2.LOTTERY[key],
          });
        }
        this._lottery_submenu.dataProvider = _loArrCol;
        this._lottery_submenu.requireSelection = true;
        this._lottery_submenu.itemRenderer = BetHistorySubMenuIR;
      }

      protected addListeners() {
        super.addListeners();

        this._live_submenu.addEventListener(egret.Event.CHANGE, this.onLiveTabbed, this);
        this._lottery_switch.addEventListener(egret.Event.CHANGE, this.onLotterySwitch, this);
        this._lottery_submenu.addEventListener(egret.Event.CHANGE, this.onLotteryTabbed, this);
        utils.addButtonListener(this._main_select_all, this.onSelectAll, this);
        utils.addButtonListener(this._main_select_live, this.onSelectLive, this);
        utils.addButtonListener(this._main_select_lottery, this.onSelectLottery, this);
        utils.addButtonListener(this._main_select_egame, this.onSelectEgame, this);

        dir.evtHandler.addEventListener('BETHISTORY_SHOW_CONTINUOUS_BET_DETAIL', this.onCBetDetails, this);
        dir.evtHandler.addEventListener('BETHISTORY_SHOW_POPUP_BET_DETAIL', this.onPopupBetDetails, this);
      }

      protected removeListeners() {
        super.removeListeners();

        this._live_submenu.removeEventListener(egret.Event.CHANGE, this.onLiveTabbed, this);
        this._lottery_switch.removeEventListener(egret.Event.CHANGE, this.onLotterySwitch, this);
        this._lottery_submenu.removeEventListener(egret.Event.CHANGE, this.onLotteryTabbed, this);
        utils.removeButtonListener(this._main_select_all, this.onSelectAll, this);
        utils.removeButtonListener(this._main_select_live, this.onSelectLive, this);
        utils.removeButtonListener(this._main_select_lottery, this.onSelectLottery, this);
        utils.removeButtonListener(this._main_select_egame, this.onSelectEgame, this);

        dir.evtHandler.removeEventListener('BETHISTORY_SHOW_CONTINUOUS_BET_DETAIL', this.onCBetDetails, this);
        dir.evtHandler.removeEventListener('BETHISTORY_SHOW_POPUP_BET_DETAIL', this.onPopupBetDetails, this);
      }

      protected getItemRenderer(data) {
        switch (this._mainTab) {
          case 'live':
            return betHistory.BetHistoryItem_v2;
          case 'lottery':
            switch (this._loTab) {
              case 'multi':
                return betHistory.BetHistoryItemLotteryCB;
              default:
              case 'single':
                return betHistory.BetHistoryItemLottery_v2;
            }
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
        this._page = 1;
        this.search();
      }

      protected onSelectLive() {
        if (this._mainTab == 'live') {
          return;
        }
        this._mainTab = 'live';
        this.currentState = 'live';
        this._type = this._live_submenu.selectedItem.val;
        this._page = 1;
        this.search();
      }

      protected onLiveTabbed() {
        this._type = this._live_submenu.selectedItem.val;
        this._page = 1;
        this.search();
      }

      protected onLotterySwitch() {
        this._loTab = this._lottery_switch.selectedItem.val;
        this.currentState = this._loTab == 'single' ? 'lottery' : 'lotteryC';
        this._page = 1;
        this.search();
      }

      protected onLotteryTabbed() {
        this._type = this._lottery_submenu.selectedItem.val;
        this._page = 1;
        this.search();
      }

      protected onSelectLottery() {
        if (this._mainTab == 'lottery') {
          return;
        }
        this._mainTab = 'lottery';
        this.currentState = this._loTab == 'single' ? 'lottery' : 'lotteryC';
        this._type = GameType.LO;
        this._page = 1;
        this.search();
      }

      protected onSelectEgame() {}

      protected onCBetDetails(e: egret.Event) {
        this._cbet_details.betid = e.data;
        this._cbet_details.show();
      }

      protected onPopupBetDetails(e: egret.Event) {
        this._popupbet_detail.id = e.data;
        this._popupbet_detail.show();
      }

      protected search() {
        this._dataColl.removeAll();
        clearTimeout(this._searchDelay);
        const opt = this.searchOpt;

        if (this._mainTab == 'lottery' && this._loTab == 'multi') {
          dir.socket.getLotteryContinuousBetHistory(opt, this.update, this);
        } else {
          dir.socket.getBetHistory(opt, this.update, this);
        }
      }
    }
  }
}
