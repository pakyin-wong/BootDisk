namespace we {
  export namespace ui {
    export class BettingTable extends ui.Panel {
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

      public onTableListUpdate() {}

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

      protected createMapping() {}

      protected setFieldNames() {
        Object.keys(this.mapping).map(value => {
          this.mapping[value].setFieldName(value);
        });
      }

      protected setDenomLists() {
        Object.keys(this.mapping).map(value => {
          this.mapping[value].denomList = this._denomList;
        });
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

        if (!this.mapping) {
          return null;
        }

        for (const grid of Object.keys(this.mapping)) {
          if (!this.mapping[grid]) {
            return null;
          }
          if (!we.utils.convertToBoolean(this.mapping[grid].hasDenomLayer)) {
            return null;
          }
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
        Object.keys(this.mapping).map(value => {
          this.mapping[value].draw();
        });
      }

      protected changeLang() {}

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
        Object.keys(this.mapping).map(value => {
          this.mapping[value].getSelectedChipIndex = this._getSelectedChipIndex;
        });
      }

      get getSelectedChipIndex() {
        return this._getSelectedChipIndex;
      }

      set getSelectedBetLimitIndex(value: () => number) {
        this._getSelectedBetLimitIndex = value;
        Object.keys(this.mapping).map(value => {
          this.mapping[value].getSelectedBetLimit = this._getSelectedBetLimitIndex;
        });
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
        const exceedBetLimit = this.isExceedBetLimit(fieldAmounts, betLimit);

        if (exceedBetLimit) {
          dir.evtHandler.dispatch(core.Event.EXCEED_BET_LIMIT);
          return false;
        }
        return true;
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimit) {
        return false;
      }

      // check if the current bet action is valid
      protected validateBetAction(betDetail: data.BetDetail): boolean {
        const fieldAmounts = utils.arrayToKeyValue(this._uncfmBetDetails, 'field', 'amount');
        fieldAmounts[betDetail.field] += betDetail.amount;
        return this.validateFieldAmounts(fieldAmounts, this.totalUncfmBetAmount + betDetail.amount);
      }

      public pushUnconfirmedBetToWaitingConfirmBet() {
        this._uncfmBetDetails = new Array();
        Object.keys(ba.BetField).map(value => {
          this._uncfmBetDetails.push({ field: value, amount: 0 });
        });
        /*
        this._uncfmBetDetails = [
          { field: ba.BetField.BANKER, amount: 0 },
          { field: ba.BetField.PLAYER, amount: 0 },
          { field: ba.BetField.TIE, amount: 0 },
          { field: ba.BetField.BANKER_PAIR, amount: 0 },
          { field: ba.BetField.PLAYER_PAIR, amount: 0 },
          { field: ba.BetField.SUPER_SIX, amount: 0 },
          { field: ba.BetField.SUPER_SIX_BANKER, amount: 0 },
        ];
        */
        if (this.mapping) {
          Object.keys(this.mapping).forEach(value => {
            // TODO To be filled
            // this.mapping[value].pushUnconfirmedBetToWaitingConfirmBet();
          });
        }
        this.totalUncfmBetAmount = 0;
      }

      public resetUnconfirmedBet() {
        this._uncfmBetDetails = new Array();
        Object.keys(ba.BetField).map(value => {
          this._uncfmBetDetails.push({ field: value, amount: 0 });
        });
        /*
        this._uncfmBetDetails = [
          { field: ba.BetField.BANKER, amount: 0 },
          { field: ba.BetField.PLAYER, amount: 0 },
          { field: ba.BetField.TIE, amount: 0 },
          { field: ba.BetField.BANKER_PAIR, amount: 0 },
          { field: ba.BetField.PLAYER_PAIR, amount: 0 },
          { field: ba.BetField.SUPER_SIX, amount: 0 },
          { field: ba.BetField.SUPER_SIX_BANKER, amount: 0 },
        ];
        */
        if (this.mapping) {
          Object.keys(this.mapping).forEach(value => {
            this.mapping[value].setUncfmBet(0);
          });
        }
        this.totalUncfmBetAmount = 0;
      }

      public resetConfirmedBet() {
        this.betDetails = new Array();
        Object.keys(ba.BetField).map(value => {
          this.betDetails.push({ field: value, amount: 0 });
        });
        /*
        this.betDetails = [
          { field: ba.BetField.BANKER, amount: 0 },
          { field: ba.BetField.PLAYER, amount: 0 },
          { field: ba.BetField.TIE, amount: 0 },
          { field: ba.BetField.BANKER_PAIR, amount: 0 },
          { field: ba.BetField.PLAYER_PAIR, amount: 0 },
          { field: ba.BetField.SUPER_SIX, amount: 0 },
          { field: ba.BetField.SUPER_SIX_BANKER, amount: 0 },
        ];
        */
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
        Object.keys(this.mapping).map(value => {
          this.mapping[value].cancelBet();
        });
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
