namespace we {
  export namespace ui {
    export class ChipLayer extends core.BaseEUI {
      protected _tableId: string;
      protected _type: we.core.BettingTableType;
      protected _denomList: number[];
      protected _denomLayer: eui.Component;
      protected _getSelectedChipIndex: () => number;
      protected _getSelectedBetLimitIndex: () => number;
      protected _undoStack: we.utils.UndoStack;
      protected _mapping: { [s: string]: BettingTableGrid };
      protected _betField: any;

      protected _uncfmBetDetails: data.BetDetail[];
      protected totalUncfmBetAmount: number;
      protected betDetails: data.BetDetail[];
      protected _totalPerson: any; // Total Person for each grid
      protected _totalAmount: any; // Total amount for each grid

      constructor() {
        super();
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
      }

      protected destroy() {
        // dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, function () {}, this);
      }

      public onTableListUpdate() {}

      set totalPerson(persons: any) {
        this._totalPerson = persons;
        if (this._mapping) {
          Object.keys(persons).map(value => {
            if (this._mapping[value]) {
              this._mapping[value].totalPerson = persons[value];
            }
          });
        }
      }

      get totalPerson() {
        return this._totalPerson;
      }

      set totalAmount(amounts: any) {
        this._totalAmount = amounts;
        if (this._mapping) {
          Object.keys(amounts).map(value => {
            if (this._mapping[value]) {
              this._mapping[value].totalAmount = amounts[value];
            }
          });
        }
      }

      get totalAmount() {
        return this._totalAmount;
      }

      set betField(value: any) {
        this._betField = value;
      }

      get betField() {
        return this._betField;
      }

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
        Object.keys(this._mapping).map(value => {
          this._mapping[value].setFieldName(value);
        });
      }

      protected setDenomLists() {
        Object.keys(this._mapping).map(value => {
          this._mapping[value].denomList = this._denomList;
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

        if (!this._mapping) {
          return null;
        }

        for (const grid of Object.keys(this._mapping)) {
          if (!this._mapping[grid]) {
            return null;
          }
          if (!we.utils.convertToBoolean(this._mapping[grid].hasDenomLayer)) {
            return null;
          }
        }

        this._denomLayer = new eui.Component();
        Object.keys(this._mapping).map(value => {
          if (we.utils.convertToBoolean(this._mapping[value].hasDenomLayer)) {
            this.setDenomGrid(this._mapping[value]);
            this._denomLayer.addChild(this._mapping[value].denomLayer);
          }
        });

        this._denomLayer.touchEnabled = false;
        this._denomLayer.touchChildren = false;

        return this._denomLayer;
      }

      public isAlreadyBet() {
        const result = Object.keys(this._mapping).reduce((acc, cur) => {
          return this._mapping[cur].getCfmBet() > 0 || acc;
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
        Object.keys(this._mapping).forEach(value => {
          this._mapping[value].addRolloverEffect();
        });
      }
      public removeRolloverListeners() {
        Object.keys(this._mapping).forEach(value => {
          this._mapping[value].removeRolloverEffect();
        });
      }

      public addTouchTapListeners() {
        Object.keys(this._mapping).forEach(value => {
          this._mapping[value].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(value), this);
        });
      }

      public removeTouchTapListeners() {
        Object.keys(this._mapping).forEach(value => {
          this._mapping[value].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(value), this);
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
        Object.keys(this._mapping).map(value => {
          this._mapping[value].draw();
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
          if (this._mapping[value.field]) {
            this._mapping[value.field].setCfmBet(value.amount);
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

      protected onBetFieldUpdate(fieldname: string) {
        return () => {
          const grid = this._mapping[fieldname];
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
            this._mapping[betDetail.field].addUncfmBet(betDetail.amount);
            this.totalUncfmBetAmount += betDetail.amount;
          }
          grid.draw();
        };
      }

      protected undoBetFieldUpdate(data: { fieldName: string; amount: number }) {
        this._mapping[data.fieldName].reduceUnCfmBet(data.amount);
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
          this._mapping[value.field].setUncfmBet(value.amount);
        });
        this._uncfmBetDetails = betDetails;
      }

      public doubleBetFields() {
        const validDoubleBet = Object.keys(this._mapping).reduce((acc, cur) => {
          if (this._mapping[cur].getCfmBet() === 0) {
            return acc && true;
          }
          const betDetail = { field: cur, amount: this._mapping[cur].getCfmBet() };
          return this.validateBetAction(betDetail) ? acc && true : false;
        }, true);
        if (!validDoubleBet) {
          return;
        }
        Object.keys(this._mapping).map(value => {
          const addedAmount = this._mapping[value].getCfmBet();
          if (addedAmount > 0) {
            this._mapping[value].addUncfmBet(addedAmount);
            this.totalUncfmBetAmount += addedAmount;
            this._mapping[value].draw();
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
          this._mapping[value.field].setUncfmBet(value.amount);
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
        const validRepeatBet = Object.keys(this._mapping).map(value => {
          if (this._mapping[value].getCfmBet() === 0) {
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
          this._mapping[value.field].addUncfmBet(value.amount);
          this.totalUncfmBetAmount += value.amount;
          this._mapping[value.field].draw();
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
        Object.keys(this._mapping).map(value => {
          this._mapping[value].getSelectedChipIndex = this._getSelectedChipIndex;
        });
      }

      get getSelectedChipIndex() {
        return this._getSelectedChipIndex;
      }

      set getSelectedBetLimitIndex(value: () => number) {
        this._getSelectedBetLimitIndex = value;
        Object.keys(this._mapping).map(value => {
          this._mapping[value].getSelectedBetLimit = this._getSelectedBetLimitIndex;
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
        Object.keys(this._betField).map(value => {
          this._uncfmBetDetails.push({ field: value, amount: 0 });
        });
        if (this._mapping) {
          Object.keys(this._mapping).forEach(value => {
            // TODO To be filled
            // this._mapping[value].pushUnconfirmedBetToWaitingConfirmBet();
          });
        }
        this.totalUncfmBetAmount = 0;
      }

      public resetUnconfirmedBet() {
        this._uncfmBetDetails = new Array();
        Object.keys(this._betField).map(value => {
          this._uncfmBetDetails.push({ field: value, amount: 0 });
        });
        if (this._mapping) {
          Object.keys(this._mapping).forEach(value => {
            this._mapping[value].setUncfmBet(0);
          });
        }
        this.totalUncfmBetAmount = 0;
      }

      public resetConfirmedBet() {
        this.betDetails = new Array();
        Object.keys(this._betField).map(value => {
          this.betDetails.push({ field: value, amount: 0 });
        });
        if (this._mapping) {
          Object.keys(this._mapping).forEach(value => {
            this._mapping[value].setCfmBet(0);
          });
        }
      }

      public onCancelPressed() {
        this._undoStack.push(null, we.utils.clone(this._uncfmBetDetails), this.undoCancelBet.bind(this));
        this.cancelBet();
      }

      public cancelBet() {
        this.resetUnconfirmedBet();
        Object.keys(this._mapping).map(value => {
          this._mapping[value].cancelBet();
        });
      }

      public undoCancelBet(betDetails: data.BetDetail[]) {
        if (betDetails) {
          betDetails.forEach(value => {
            if (value) {
              this._mapping[value.field].setUncfmBet(value.amount);
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
