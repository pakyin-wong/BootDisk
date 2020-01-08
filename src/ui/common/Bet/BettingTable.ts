namespace we {
  export namespace ui {
    export class BettingTable extends ui.Panel {
      protected _gridPlayerPair: BettingTableGrid;
      protected _gridBankerPair: BettingTableGrid;
      protected _gridPlayer: BettingTableGrid;
      protected _gridTie: BettingTableGrid;
      protected _gridSuperSix: BettingTableGrid;
      protected _gridSuperSixBanker: BettingTableGrid;
      protected _gridBanker: BettingTableGrid;
      protected _tableId: string;
      protected _type: we.core.BettingTableType;
      protected _denomList: number[];
      protected _denomLayer: eui.Component;
      protected _getSelectedChipIndex: () => number;
      protected _getSelectedBetLimitIndex: () => number;
      protected _undoStack: we.utils.UndoStack;
      protected mapping: { [s: string]: BettingTableGrid };

      protected _uncfmBetDetails: data.BetDetail[];
      protected totalUncfmBetAmount: number;
      protected betDetails: data.BetDetail[];

      constructor() {
        super();
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
      }

      protected destroy() {
        // dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, function () {}, this);
      }

      public onTableListUpdate() { }

      set denomList(value: number[]) {
        this._denomList = value;
      }

      get denomList() {
        return this._denomList;
      }

      set uncfmBetDetails(value: data.BetDetail[]) {
        this._uncfmBetDetails = value;
      }

      get uncfmBetDetails() {
        return this._uncfmBetDetails;
      }

      set tableId(value: string) {
        this._tableId = value;
      }

      get tableId() {
        return this._tableId;
      }

      set type(value: we.core.BettingTableType) {
        this._type = value;
      }

      get type() {
        return this._type;
      }

      set undoStack(value: we.utils.UndoStack) {
        this._undoStack = value;
      }

      get undoStack() {
        return this._undoStack;
      }

      protected createMapping() {
        this.mapping = {};
        this.mapping[ba.BetField.PLAYER] = this._gridPlayer;
        this.mapping[ba.BetField.BANKER] = this._gridBanker;
        this.mapping[ba.BetField.PLAYER_PAIR] = this._gridPlayerPair;
        this.mapping[ba.BetField.TIE] = this._gridTie;
        this.mapping[ba.BetField.BANKER_PAIR] = this._gridBankerPair;
        this.mapping[ba.BetField.SUPER_SIX_BANKER] = this._gridSuperSixBanker;
        this.mapping[ba.BetField.SUPER_SIX] = this._gridSuperSix;
      }

      protected setFieldNames() {
        this._gridPlayer.setFieldName(ba.BetField.PLAYER);
        this._gridBanker.setFieldName(ba.BetField.BANKER);
        this._gridPlayerPair.setFieldName(ba.BetField.PLAYER_PAIR);
        this._gridTie.setFieldName(ba.BetField.TIE);
        this._gridBankerPair.setFieldName(ba.BetField.BANKER_PAIR);
        this._gridSuperSixBanker.setFieldName(ba.BetField.SUPER_SIX_BANKER);
        this._gridSuperSix.setFieldName(ba.BetField.SUPER_SIX);
      }

      protected setDenomLists() {
        this._gridPlayer.denomList = this._denomList;
        this._gridBanker.denomList = this._denomList;
        this._gridPlayerPair.denomList = this._denomList;
        this._gridTie.denomList = this._denomList;
        this._gridBankerPair.denomList = this._denomList;
        this._gridSuperSixBanker.denomList = this._denomList;
        this._gridSuperSix.denomList = this._denomList;
      }

      // Must be called if you change skin
      public init() {
        this.createMapping();
        this.setFieldNames();
        this.setDenomLists();
        this.changeLang();
        this.resetUnconfirmedBet();
        this.addTouchTapListeners();
      }

      set denomLayer(value: eui.Component) {
        this._denomLayer = value;
      }

      get denomLayer() {
        if (this._denomLayer) {
          return this._denomLayer;
        }
        if (!this._gridPlayer) {
          return null;
        }
        if (!we.utils.convertToBoolean(this._gridPlayer.hasDenomLayer)) {
          return null;
        }
        this._denomLayer = new eui.Component();
        Object.keys(this.mapping).map(value => {
          if (we.utils.convertToBoolean(this.mapping[value].hasDenomLayer)) {
            this.setDenomGrid(this.mapping[value]);
            this._denomLayer.addChild(this.mapping[value].denomLayer);
          }
        });
        /*
        if (we.utils.convertToBoolean(this._gridPlayer.hasDenomLayer)) {
          this.setDenomGrid(this._gridPlayer);
          this._denomLayer.addChild(this._gridPlayer.denomLayer);
        }
        if (we.utils.convertToBoolean(this._gridBanker.hasDenomLayer)) {
          this.setDenomGrid(this._gridBanker);
          this._denomLayer.addChild(this._gridBanker.denomLayer);
        }
        if (we.utils.convertToBoolean(this._gridPlayerPair.hasDenomLayer)) {
          this.setDenomGrid(this._gridPlayerPair);
          this._denomLayer.addChild(this._gridPlayerPair.denomLayer);
        }
        if (we.utils.convertToBoolean(this._gridTie.hasDenomLayer)) {
          this.setDenomGrid(this._gridTie);
          this._denomLayer.addChild(this._gridTie.denomLayer);
        }
        if (we.utils.convertToBoolean(this._gridBankerPair.hasDenomLayer)) {
          this.setDenomGrid(this._gridBankerPair);
          this._denomLayer.addChild(this._gridBankerPair.denomLayer);
        }
        if (we.utils.convertToBoolean(this._gridSuperSixBanker.hasDenomLayer)) {
          this.setDenomGrid(this._gridSuperSixBanker);
          this._denomLayer.addChild(this._gridSuperSixBanker.denomLayer);
        }
        if (we.utils.convertToBoolean(this._gridSuperSix.hasDenomLayer)) {
          this.setDenomGrid(this._gridSuperSix);
          this._denomLayer.addChild(this._gridSuperSix.denomLayer);
        }
        */

        this._denomLayer.touchEnabled = false;
        this._denomLayer.touchChildren = false;

        return this._denomLayer;
      }

      public isAlreadyBet() {
        const result = Object.keys(this.mapping).reduce((acc, cur) => {
          return this.mapping[cur].getCfmBet() > 0 || acc;
        }, false);
        return result;
      }

      protected setDenomGrid(grid: BettingTableGrid) {
        grid.denomLayer.x = grid.x;
        grid.denomLayer.y = grid.y;
        grid.denomLayer.width = grid.width;
        grid.denomLayer.height = grid.height;
      }

      public addRolloverListeners() {
        Object.keys(this.mapping).forEach(value => {
          this.mapping[value].addRolloverEffect();
        });
      }
      public removeRolloverListeners() {
        Object.keys(this.mapping).forEach(value => {
          this.mapping[value].removeRolloverEffect();
        });
      }

      public addTouchTapListeners() {
        Object.keys(this.mapping).forEach(value => {
          this.mapping[value].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(this.mapping[value]), this);
        });
      }

      public removeTouchTapListeners() {
        Object.keys(this.mapping).forEach(value => {
          this.mapping[value].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(this.mapping[value]), this);
        });
      }

      public removeAllMouseListeners() {
        this.removeRolloverListeners();
        this.removeTouchTapListeners();
      }

      public addAllMouseListeners() {
        this.addRolloverListeners();
        this.addTouchTapListeners();
      }

      public setGameMode(isNoCommission: boolean) {
        this.currentState = isNoCommission ? 'SuperSix' : 'Normal';
        this._gridPlayer.draw();
        this._gridBanker.draw();
        this._gridPlayerPair.draw();
        this._gridTie.draw();
        this._gridBankerPair.draw();
        this._gridSuperSixBanker.draw();
        this._gridSuperSix.draw();
      }

      protected changeLang() {
        this._gridPlayer.text = i18n.t('baccarat.player');
        this._gridBanker.text = i18n.t('baccarat.banker');
        this._gridPlayerPair.text = i18n.t('baccarat.playerPair');
        this._gridTie.text = i18n.t('baccarat.tie');
        this._gridBankerPair.text = i18n.t('baccarat.bankerPair');
        this._gridSuperSixBanker.text = i18n.t('baccarat.banker');
        this._gridSuperSix.text = i18n.t('baccarat.superSix');
      }

      public setTouchEnabled(enable: boolean) {
        this.touchEnabled = enable;
        this.touchChildren = enable;
        if (!enable) {
          this.cancelBet();
        }
      }

      public getUnconfirmedBetDetails() {
        return this._uncfmBetDetails;
      }

      public getTotalUncfmBetAmount() {
        return this.totalUncfmBetAmount;
      }

      public updateBetFields(betDetails: data.BetDetail[]) {
        this.betDetails = betDetails;

        // TODO: update the already bet amount of each bet field
        betDetails.map((value, index) => {
          if (this.mapping[value.field]) {
            this.mapping[value.field].setCfmBet(value.amount);
          }
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

      protected onBetFieldUpdate(grid: BettingTableGrid) {
        return (event: egret.Event) => {
          const betDetail = { field: grid.getFieldName(), amount: grid.getAmount() };
          // validate bet action
          if (this.validateBetAction(betDetail)) {
            // update the uncfmBetDetails
            for (const detail of this._uncfmBetDetails) {
              if (detail.field === betDetail.field) {
                detail.amount += betDetail.amount;
                break;
              }
            }
            // update the corresponding table grid
            this.undoStack.push(new Date().getTime(), we.utils.clone({ fieldName: grid.getFieldName(), amount: grid.getAmount() }), this.undoBetFieldUpdate.bind(this));
            this.mapping[betDetail.field].addUncfmBet(betDetail.amount);
            this.totalUncfmBetAmount += betDetail.amount;
          }
          grid.draw();
        };
      }

      protected undoBetFieldUpdate(data: { fieldName: string; amount: number }) {
        this.mapping[data.fieldName].reduceUnCfmBet(data.amount);
        this.totalUncfmBetAmount -= data.amount;
        this._uncfmBetDetails.forEach(value => {
          if (value.field === data.fieldName) {
            value.amount -= data.amount;
          }
        });

        /* else{
          this._uncfmBetDetails[data.fieldName] = new we.data.BetDetail();
          this._uncfmBetDetails[data.fieldName].amount = -
        } */
      }

      public onDoublePressed() {
        this._undoStack.push(new Date().getTime(), we.utils.clone(this._uncfmBetDetails), this.undoDoubleBetFields.bind(this));
        this.doubleBetFields();
      }

      public undoDoubleBetFields(betDetails: data.BetDetail[]) {
        betDetails.map(value => {
          this.mapping[value.field].setUncfmBet(value.amount);
        });
        this._uncfmBetDetails = betDetails;
      }

      public doubleBetFields() {
        const validDoubleBet = Object.keys(this.mapping).reduce((acc, cur) => {
          if (this.mapping[cur].getCfmBet() === 0) {
            return acc && true;
          }
          const betDetail = { field: cur, amount: this.mapping[cur].getCfmBet() };
          return this.validateBetAction(betDetail) ? acc && true : false;
        }, true);
        if (!validDoubleBet) {
          return;
        }
        Object.keys(this.mapping).map(value => {
          const addedAmount = this.mapping[value].getCfmBet();
          if (addedAmount > 0) {
            this.mapping[value].addUncfmBet(addedAmount);
            this.totalUncfmBetAmount += addedAmount;
            this.mapping[value].draw();
            for (const detail of this._uncfmBetDetails) {
              if (detail.field === value) {
                detail.amount += addedAmount;
                break;
              }
            }
          }
        });
      }

      public onRepeatPressed() {
        this._undoStack.push(new Date(), we.utils.clone(this._uncfmBetDetails), this.undoRepeatBetFields.bind(this));
        this.repeatBetFields();
      }

      protected undoRepeatBetFields(betDetails: data.BetDetail[]) {
        betDetails.map(value => {
          this.mapping[value.field].setUncfmBet(value.amount);
        });
        this._uncfmBetDetails = betDetails;
      }

      public repeatBetFields() {
        if (!env.tableInfos[this._tableId].prevbets || !env.tableInfos[this._tableId].prevroundid) {
          return;
        }
        if (env.tableInfos[this._tableId].prevroundid !== env.tableInfos[this._tableId].prevbetsroundid) {
          return;
        }
        const validRepeatBet = Object.keys(this.mapping).map(value => {
          if (this.mapping[value].getCfmBet() === 0) {
            return true;
          }
          let betDetail = { field: value, amount: 0 };
          for (const bets of env.tableInfos[this._tableId].prevbets) {
            if (bets.field === value) {
              betDetail = { field: value, amount: bets.amount };
            }
          }
          if (this.validateBetAction(betDetail)) {
            return true;
          }
          return false;
        });
        for (const valid of validRepeatBet) {
          if (!valid) {
            return;
          }
        }
        env.tableInfos[this._tableId].prevbets.map(value => {
          this.mapping[value.field].addUncfmBet(value.amount);
          this.totalUncfmBetAmount += value.amount;
          this.mapping[value.field].draw();
          for (const detail of this._uncfmBetDetails) {
            if (detail.field === value.field) {
              detail.amount += value.amount;
              break;
            }
          }
        });
      }

      set getSelectedChipIndex(value: () => number) {
        this._getSelectedChipIndex = value;
        this._gridPlayer.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridBanker.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridPlayerPair.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridTie.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridBankerPair.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridSuperSixBanker.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridSuperSix.getSelectedChipIndex = this._getSelectedChipIndex;
      }

      get getSelectedChipIndex() {
        return this._getSelectedChipIndex;
      }

      set getSelectedBetLimitIndex(value: () => number) {
        this._getSelectedBetLimitIndex = value;
        this._gridPlayer.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridBanker.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridPlayerPair.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridTie.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridBankerPair.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridSuperSixBanker.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridSuperSix.getSelectedBetLimit = this._getSelectedBetLimitIndex;
      }

      get getSelectedBetLimitIndex() {
        return this._getSelectedBetLimitIndex;
      }

      protected validateBet(): boolean {
        const fieldAmounts = utils.arrayToKeyValue(this._uncfmBetDetails, 'field', 'amount');
        return this.validateFieldAmounts(fieldAmounts, this.totalUncfmBetAmount);
      }

      // check if the current unconfirmed betDetails are valid
      protected validateFieldAmounts(fieldAmounts: {}, totalBetAmount: number): boolean {
        const betLimit: data.BetLimit = env.betLimits[this._getSelectedBetLimitIndex()];
        // TODO: check balance
        const balance = env.balance;
        if (balance < totalBetAmount) {
          this.dispatchEvent(new egret.Event(core.Event.INSUFFICIENT_BALANCE));
          return false;
        }
        const exceedBetLimit =
          Math.abs(fieldAmounts[ba.BetField.BANKER] - fieldAmounts[ba.BetField.PLAYER]) > betLimit.maxlimit ||
          Math.abs(fieldAmounts[ba.BetField.SUPER_SIX_BANKER] - fieldAmounts[ba.BetField.PLAYER]) > betLimit.maxlimit ||
          fieldAmounts[ba.BetField.TIE] > betLimit.maxlimit ||
          fieldAmounts[ba.BetField.BANKER_PAIR] > betLimit.maxlimit ||
          fieldAmounts[ba.BetField.PLAYER_PAIR] > betLimit.maxlimit ||
          fieldAmounts[ba.BetField.SUPER_SIX] > betLimit.maxlimit;
        if (exceedBetLimit) {
          dir.evtHandler.dispatch(core.Event.EXCEED_BET_LIMIT);
          return false;
        }
        return true;
      }

      // check if the current bet action is valid
      protected validateBetAction(betDetail: data.BetDetail): boolean {
        const fieldAmounts = utils.arrayToKeyValue(this._uncfmBetDetails, 'field', 'amount');
        fieldAmounts[betDetail.field] += betDetail.amount;
        return this.validateFieldAmounts(fieldAmounts, this.totalUncfmBetAmount + betDetail.amount);
      }

      public pushUnconfirmedBetToWaitingConfirmBet() {
        this._uncfmBetDetails = [
          { field: ba.BetField.BANKER, amount: 0 },
          { field: ba.BetField.PLAYER, amount: 0 },
          { field: ba.BetField.TIE, amount: 0 },
          { field: ba.BetField.BANKER_PAIR, amount: 0 },
          { field: ba.BetField.PLAYER_PAIR, amount: 0 },
          { field: ba.BetField.SUPER_SIX, amount: 0 },
          { field: ba.BetField.SUPER_SIX_BANKER, amount: 0 },
        ];
        if (this.mapping) {
          Object.keys(this.mapping).forEach(value => {
            // TODO To be filled
            // this.mapping[value].pushUnconfirmedBetToWaitingConfirmBet();
          });
        }
        this.totalUncfmBetAmount = 0;
      }

      public resetUnconfirmedBet() {
        this._uncfmBetDetails = [
          { field: ba.BetField.BANKER, amount: 0 },
          { field: ba.BetField.PLAYER, amount: 0 },
          { field: ba.BetField.TIE, amount: 0 },
          { field: ba.BetField.BANKER_PAIR, amount: 0 },
          { field: ba.BetField.PLAYER_PAIR, amount: 0 },
          { field: ba.BetField.SUPER_SIX, amount: 0 },
          { field: ba.BetField.SUPER_SIX_BANKER, amount: 0 },
        ];
        if (this.mapping) {
          Object.keys(this.mapping).forEach(value => {
            this.mapping[value].setUncfmBet(0);
          });
        }
        this.totalUncfmBetAmount = 0;
      }

      public resetConfirmedBet() {
        this.betDetails = [
          { field: ba.BetField.BANKER, amount: 0 },
          { field: ba.BetField.PLAYER, amount: 0 },
          { field: ba.BetField.TIE, amount: 0 },
          { field: ba.BetField.BANKER_PAIR, amount: 0 },
          { field: ba.BetField.PLAYER_PAIR, amount: 0 },
          { field: ba.BetField.SUPER_SIX, amount: 0 },
          { field: ba.BetField.SUPER_SIX_BANKER, amount: 0 },
        ];
        if (this.mapping) {
          Object.keys(this.mapping).forEach(value => {
            this.mapping[value].setCfmBet(0);
          });
        }
      }

      public onCancelPressed() {
        this._undoStack.push(null, we.utils.clone(this._uncfmBetDetails), this.undoCancelBet.bind(this));
        this.cancelBet();
      }

      public cancelBet() {
        this.resetUnconfirmedBet();
        this._gridPlayer.cancelBet();
        this._gridBanker.cancelBet();
        this._gridPlayerPair.cancelBet();
        this._gridTie.cancelBet();
        this._gridBankerPair.cancelBet();
        this._gridSuperSixBanker.cancelBet();
        this._gridSuperSix.cancelBet();
      }

      public undoCancelBet(betDetails: data.BetDetail[]) {
        if (betDetails) {
          betDetails.forEach(value => {
            if (value) {
              this.mapping[value.field].setUncfmBet(value.amount);
            }
          });
          this._uncfmBetDetails = betDetails;
        }
      }

      public onChangeLang() {
        this.changeLang();
      }

      public getBetchipLayer(): eui.Component {
        return this._denomLayer;
      }
    }
  }
}
