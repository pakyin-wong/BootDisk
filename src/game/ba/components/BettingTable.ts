namespace we {
  export namespace ba {
    export class BettingTable extends eui.Component {
      private gridPlayerPair: BettingTableGrid;
      private gridBankerPair: BettingTableGrid;
      private gridPlayer: BettingTableGrid;
      private gridTie: BettingTableGrid;
      private gridSuperSix: BettingTableGrid;
      private gridBanker: BettingTableGrid;
      private lblNoComm: eui.Label;
      private switchSuperSix: eui.ToggleSwitch;

      private mapping: { [s: string]: BettingTableGrid };

      private uncfmBetDetails: data.BetDetail[];
      private totalUncfmBetAmount: number;
      private betDetails: data.BetDetail[];

      constructor() {
        super();
        this.skinName = utils.getSkin('BettingTable');
      }

      protected childrenCreated() {
        this.changeMethod('normal');
        this.changeLang();
        this.switchSuperSix.addEventListener(
          egret.Event.CHANGE,
          () => {
            this.invalidateState();
          },
          this
        );
        this.mapping = {};
        this.mapping[BetField.BANKER] = this.gridBanker;
        this.mapping[BetField.PLAYER] = this.gridPlayer;
        this.mapping[BetField.TIE] = this.gridTie;
        this.mapping[BetField.BANKER_PAIR] = this.gridBankerPair;
        this.mapping[BetField.PLAYER_PAIR] = this.gridPlayerPair;
        this.mapping[BetField.SUPER_SIX] = this.gridSuperSix;

        this.gridBanker.setFieldName(BetField.BANKER);
        this.gridPlayer.setFieldName(BetField.PLAYER);
        this.gridTie.setFieldName(BetField.TIE);
        this.gridBankerPair.setFieldName(BetField.BANKER_PAIR);
        this.gridPlayerPair.setFieldName(BetField.PLAYER_PAIR);
        this.gridSuperSix.setFieldName(BetField.SUPER_SIX);
        this.resetUnconfirmedBet();

        this.gridPlayerPair.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
        this.gridBankerPair.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
        this.gridPlayer.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
        this.gridTie.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
        this.gridBanker.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
        this.gridSuperSix.addEventListener('TABLE_GRID_CLICK', this.onBetFieldUpdate, this);
      }

      protected getCurrentState() {
        if (this.switchSuperSix.selected) {
          return 'SuperSix';
        } else {
          this.gridSuperSix.setUncfmBet(0);
          return 'Normal';
        }
      }

      protected changeMethod(method: string) {
        switch (method) {
          default:
            const border = 10;
            const textColor = 0xffffff;
            const bgColor = 0x000000;

            this.gridPlayerPair.setStyle(border, textColor, bgColor);
            this.gridBankerPair.setStyle(border, textColor, bgColor);
            this.gridPlayer.setStyle(border, textColor, bgColor);
            this.gridBanker.setStyle(border, textColor, bgColor);
            this.gridSuperSix.setStyle(border, textColor, bgColor);
            this.gridTie.setStyle(border, textColor, bgColor);
        }
      }

      protected changeLang() {
        this.gridPlayerPair.text = i18n.t('baccarat.playerPair');
        this.gridBankerPair.text = i18n.t('baccarat.bankerPair');
        this.gridPlayer.text = i18n.t('baccarat.player');
        this.gridTie.text = i18n.t('baccarat.tie');
        this.gridSuperSix.text = i18n.t('baccarat.superSix');
        this.gridBanker.text = i18n.t('baccarat.banker');
        this.lblNoComm.text = i18n.t('baccarat.noComm');
      }

      public setTouchEnabled(enable: boolean) {
        this.touchEnabled = enable;
        this.touchChildren = enable;
        if (!enable) {
          this.cancelBet();
        }
      }

      public getUnconfirmedBetDetails() {
        return this.uncfmBetDetails;
      }

      public getTotalUncfmBetAmount() {
        return this.totalUncfmBetAmount;
      }

      /*

      public resetUnconfirmedBetDetails() {
        Object.keys(this.mapping).forEach(value => {
          this.mapping[value].setUncfmBet(0);
        });
      }*/

      public updateBetFields(betDetails: data.BetDetail[]) {
        // logger.l('BettingTable::updateBetFields' + betDetails);
        this.betDetails = betDetails;

        // TODO: update the already bet amount of each bet field

        betDetails.map((value, index) => {
          // logger.l('BettingTable::updateBetFields:loop ' + value);
          this.mapping[value.field].setCfmBet(value.amount);
        });
      }

      public showWinFields(betDetails: data.BetDetail[]) {
        // TODO: show the win effect of each win field
        this.betDetails = betDetails;
      }

      public showWinEffect(betDetails: data.BetDetail[]) {
        // TODO: show the win effect of each winning bet
        this.betDetails = betDetails;
      }

      protected onBetFieldUpdate(event: egret.Event) {
        const betDetail: data.BetDetail = event.data;
        // validate bet action
        if (this.validateBetAction(betDetail)) {
          // update the uncfmBetDetails
          for (const detail of this.uncfmBetDetails) {
            if (detail.field === betDetail.field) {
              detail.amount += betDetail.amount;
              break;
            }
          }
          // update the corresponding table grid
          this.mapping[betDetail.field].addUncfmBet(betDetail.amount);
          this.totalUncfmBetAmount += betDetail.amount;
        }
      }

      protected validateBet(): boolean {
        const fieldAmounts = utils.arrayToKeyValue(this.uncfmBetDetails, 'field', 'amount');
        return this.validateFieldAmounts(fieldAmounts, this.totalUncfmBetAmount);
      }

      // check if the current unconfirmed betDetails are valid
      protected validateFieldAmounts(fieldAmounts: {}, totalBetAmount: number): boolean {
        const betLimit: data.BetLimit = env.betLimits[env.currentSelectedBetLimitIndex];
        // TODO: check balance
        const balance = env.balance;
        if (balance < totalBetAmount) {
          egret.log(core.Event.INSUFFICIENT_BALANCE);
          dir.evtHandler.dispatch(core.Event.INSUFFICIENT_BALANCE);
          return false;
        }
        // check betlimit
        const exceedBetLimit =
          Math.abs(fieldAmounts[BetField.BANKER] - fieldAmounts[BetField.PLAYER]) > betLimit.maxLimit ||
          fieldAmounts[BetField.TIE] > betLimit.maxLimit ||
          fieldAmounts[BetField.BANKER_PAIR] > betLimit.maxLimit ||
          fieldAmounts[BetField.PLAYER_PAIR] > betLimit.maxLimit ||
          fieldAmounts[BetField.SUPER_SIX] > betLimit.maxLimit;
        if (exceedBetLimit) {
          egret.log(core.Event.EXCEED_BET_LIMIT);
          dir.evtHandler.dispatch(core.Event.EXCEED_BET_LIMIT);
          return false;
        }
        return true;
      }

      // check if the current bet action is valid
      protected validateBetAction(betDetail: data.BetDetail): boolean {
        const fieldAmounts = utils.arrayToKeyValue(this.uncfmBetDetails, 'field', 'amount');
        fieldAmounts[betDetail.field] += betDetail.amount;
        return this.validateFieldAmounts(fieldAmounts, this.totalUncfmBetAmount + betDetail.amount);
      }

      public resetUnconfirmedBet() {
        this.uncfmBetDetails = [
          { field: BetField.BANKER, amount: 0 },
          { field: BetField.PLAYER, amount: 0 },
          { field: BetField.TIE, amount: 0 },
          { field: BetField.BANKER_PAIR, amount: 0 },
          { field: BetField.PLAYER_PAIR, amount: 0 },
          { field: BetField.SUPER_SIX, amount: 0 },
        ];
        Object.keys(this.mapping).forEach(value => {
          this.mapping[value].setUncfmBet(0);
        });
        this.totalUncfmBetAmount = 0;
      }

      public resetConfirmedBet() {
        this.betDetails = [
          { field: BetField.BANKER, amount: 0 },
          { field: BetField.PLAYER, amount: 0 },
          { field: BetField.TIE, amount: 0 },
          { field: BetField.BANKER_PAIR, amount: 0 },
          { field: BetField.PLAYER_PAIR, amount: 0 },
          { field: BetField.SUPER_SIX, amount: 0 },
        ];
        Object.keys(this.mapping).forEach(value => {
          this.mapping[value].setCfmBet(0);
        });
      }

      public cancelBet() {
        this.resetUnconfirmedBet();
        this.gridTie.cancelBet();
        this.gridBanker.cancelBet();
        this.gridPlayer.cancelBet();
        this.gridPlayerPair.cancelBet();
        this.gridBankerPair.cancelBet();
        this.gridSuperSix.cancelBet();
      }
      public onChangeLang() {
        this.changeLang();
      }
    }
  }
}
