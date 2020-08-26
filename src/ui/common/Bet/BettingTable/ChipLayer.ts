namespace we {
  export namespace ui {
    export abstract class ChipLayer extends ui.Panel {
      protected _tableId: string;
      protected _type: we.core.BettingTableType;
      protected _denomList: number[];
      protected _tableLayer: TableLayer;
      protected _betChipSet: BetChipSet & eui.Component;

      protected _getSelectedChipIndex: () => number;
      protected _getSelectedBetLimitIndex: () => number;
      protected _undoStack: we.utils.UndoStack;

      protected _mouseAreaMapping: { [s: string]: any };
      protected _betChipStackMapping: { [s: string]: BetChipStack };

      protected _betField: any;

      protected _uncfmBetDetails: data.BetDetail[];
      protected _cfmBetDetails: data.BetDetail[];

      public onConfirmPressed: (e: egret.Event) => void;

      constructor(skinName?: string) {
        super(skinName);
        this._cfmBetDetails = [];
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
      }

      protected destroy() {
        super.destroy();
        // dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, function () {}, this);
      }

      public onTableListUpdate() {}

      set betField(value: any) {
        this._betField = value;
      }

      get betField() {
        return this._betField;
      }

      set denomList(value: number[]) {
        this._denomList = value;
        this.passDenomListToBetChipStack();
      }

      get denomList() {
        return this._denomList;
      }

      set tableLayer(value: TableLayer) {
        this._tableLayer = value;
      }

      get tableLayer() {
        return this._tableLayer;
      }

      set betChipSet(value: BetChipSet & eui.Component) {
        this._betChipSet = value;
      }

      get betChipSet() {
        return this._betChipSet;
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

      protected passDenomListToBetChipStack() {
        if (!this._betChipStackMapping) {
          return;
        }
        Object.keys(this._betChipStackMapping).forEach(value => {
          if (this._betChipStackMapping[value]) {
            this._betChipStackMapping[value].denomList = this._denomList;
          }
        });
      }

      // Must be called if you change skin
      public init() {
        this.createMapping();
        this.restructureChildren();
        this.passDenomListToBetChipStack();
        this.resetUnconfirmedBet();
        this.addAllMouseListeners();
      }

      public addBetToBetField(fieldName, amount) {
        const grid = this.getUncfmBetByField(fieldName);
        grid.amount += amount;
      }

      public updateBetField(fieldName, amount) {
        const grid = this.getUncfmBetByField(fieldName);
        grid.amount = amount;
      }

      public updateBetChipUncfmBet(fieldName, amount) {
        if (this._betChipStackMapping[fieldName]) {
          this._betChipStackMapping[fieldName].uncfmBet = amount * this.getRate(fieldName);
          this._betChipStackMapping[fieldName].draw();
        }
      }

      protected restructureChildren() {
        Object.keys(this._betChipStackMapping).forEach(value => {
          const chipStack = this._betChipStackMapping[value];
          if (this._betChipStackMapping[value]) {
            const parent = chipStack.parent;
            if (parent !== this) {
              chipStack.verticalCenter = NaN;
              chipStack.horizontalCenter = NaN;
              chipStack.x = parent.x + parent.width * 0.5;
              chipStack.y = parent.y + parent.height * 0.5;
              chipStack.width = 0;
              chipStack.height = 0;
              chipStack.validateNow();
              this.addChild(chipStack);
            }
          }
        });
      }

      public isAlreadyBet() {
        if (this._cfmBetDetails) {
          const result = this._cfmBetDetails.reduce((acc, cur) => {
            return cur.amount > 0 || acc;
          }, false);
          return result;
        }
        return null;
      }

      public addRolloverListeners() {
        Object.keys(this._mouseAreaMapping).forEach(value => {
          if (this._mouseAreaMapping[value]) {
            this._mouseAreaMapping[value].addEventListener(mouse.MouseEvent.ROLL_OVER, this.onGridRolloverEvent, this);
          }
        });
      }

      public removeRolloverListeners() {
        Object.keys(this._mouseAreaMapping).forEach(value => {
          if (this._mouseAreaMapping[value]) {
            this._mouseAreaMapping[value].removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onGridRolloverEvent, this);
          }
        });
      }

      public addRolloutListeners() {
        Object.keys(this._mouseAreaMapping).forEach(value => {
          if (this._mouseAreaMapping[value]) {
            this._mouseAreaMapping[value].addEventListener(mouse.MouseEvent.ROLL_OUT, this.onGridRolloutEvent, this);
          }
        });
      }

      public removeRolloutListeners() {
        Object.keys(this._mouseAreaMapping).forEach(value => {
          if (this._mouseAreaMapping[value]) {
            this._mouseAreaMapping[value].removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onGridRolloutEvent, this);
          }
        });
      }

      public onGridRolloverEvent(evt: egret.Event) {
        const target = evt.target;
        const fieldName = utils.EnumHelpers.getKeyByValue(this._mouseAreaMapping, target);
        this.onGridRollover(fieldName);
      }

      public onGridRollover(fieldName: string) {
        this._tableLayer.onRollover(fieldName);
      }

      public onGridRolloutEvent(evt: egret.Event) {
        const target = evt.target;
        const fieldName = utils.EnumHelpers.getKeyByValue(this._mouseAreaMapping, target);
        this.onGridRollout(fieldName);
      }

      public onGridRollout(fieldName: string) {
        this._tableLayer.onRollout(fieldName);
      }

      public addTouchTapListeners() {
        Object.keys(this._mouseAreaMapping).forEach(value => {
          if (this._mouseAreaMapping[value]) {
            this._mouseAreaMapping[value].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdateEvent, this);
            mouse.setButtonMode(this._mouseAreaMapping[value], true);
          }
        });
      }

      public removeTouchTapListeners() {
        Object.keys(this._mouseAreaMapping).forEach(value => {
          if (this._mouseAreaMapping[value]) {
            this._mouseAreaMapping[value].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdateEvent, this);
          }
        });
      }

      public removeAllMouseListeners() {
        this.removeRolloverListeners();
        this.removeRolloutListeners();
        this.removeTouchTapListeners();
      }

      public addAllMouseListeners() {
        this.addRolloverListeners();
        this.addRolloutListeners();
        this.addTouchTapListeners();
      }

      public setState(state: string) {
        this.currentState = state;
      }

      protected changeLang() {}

      public setTouchEnabled(enable: boolean) {
        this.touchEnabled = enable;
        if (enable) {
          this.addAllMouseListeners();
        } else {
          this.removeAllMouseListeners();
        }
        // this.touchChildren = false;
        // Object.keys(this._mouseAreaMapping).forEach(value => {
        //   if (this._mouseAreaMapping[value]) {
        //     this._mouseAreaMapping[value].touchEnabled = enable;
        //     this._mouseAreaMapping[value].touchChildren = false;
        //   }
        // });

        if (!enable) {
          this.cancelBet();
        }
      }

      public getConfirmedBetDetails() {
        return this._cfmBetDetails;
      }

      public getUnconfirmedBetDetails() {
        return this._uncfmBetDetails;
      }

      public getTotalUncfmBetAmount() {
        if (this._uncfmBetDetails) {
          return this._uncfmBetDetails.reduce((a, b) => a + b.amount, 0);
        }
        return 0;
      }

      public getTotalCfmBetAmount() {
        if (this._cfmBetDetails) {
          return this._cfmBetDetails.reduce((a, b) => a + b.amount, 0);
        }
        return 0;
      }

      public updateBetFields(betDetails: data.BetDetail[]) {
        this._cfmBetDetails = betDetails;

        // update the already bet amount of each bet field
        this._cfmBetDetails.map((value, index) => {
          if (this._betChipStackMapping[value.field]) {
            this._betChipStackMapping[value.field].cfmBet = value.amount * this.getRate(value.field);
            this._betChipStackMapping[value.field].draw();
          }
        });
      }

      public showWinFields(betDetails: data.BetDetail[]) {
        // TODO: show the win effect of each win field
        this._cfmBetDetails = betDetails;
      }

      public showWinEffect(betDetails: data.BetDetail[]) {
        // TODO: show the win effect of each winning bet
        this._cfmBetDetails = betDetails;
      }

      protected getUncfmBetByField(fieldName: string) {
        for (const value of this._uncfmBetDetails) {
          if (value.field === fieldName) {
            return value;
          }
        }
      }

      protected getOrderAmount() {
        return env.betLimits[this._getSelectedBetLimitIndex()].chips[this._getSelectedChipIndex()];
      }

      public onBetFieldUpdateEvent(evt: egret.Event) {
        const target = evt.target;
        const fieldName = utils.EnumHelpers.getKeyByValue(this._mouseAreaMapping, target);
        this.onBetFieldUpdate(fieldName);
      }

      // public onBetFieldsUpdate(fieldNames: string[], hashkey: string = null) {
      //   fieldNames.map(fieldName => {
      //     const betDetail = { field: fieldName, amount: this.getOrderAmount() };
      //     if (!this.validateBetAction(betDetail)) {
      //       return;
      //     }
      //   });

      //   fieldNames.map(fieldName => {
      //     this.addBetToBetField(fieldName, this.getOrderAmount());
      //     this.undoStack.push(hashkey, we.utils.clone({ field: fieldName, amount: this.getOrderAmount() }), this.undoBetFieldUpdate.bind(this));
      //     this.updateBetChipUncfmBet(fieldName, this.getUncfmBetByField(fieldName).amount);
      //   });
      // }

      public betFieldsUpdate(betDetails: data.BetDetail[], hashkey: string = null) {
        // TODO: check total bet value and see if its greater than balance, if yes, insufficient balance
        betDetails.map(value => {
          if (!this.validateBetAction(value)) {
            return;
          }
        });

        betDetails.map(value => {
          this.addBetToBetField(value.field, value.amount);
          this.undoStack.push(hashkey, we.utils.clone(betDetails), this.undoBetFieldUpdate.bind(this));
          this.updateBetChipUncfmBet(value.field, this.getUncfmBetByField(value.field).amount);
        });
      }

      public onBetFieldUpdate(fieldName, hashkey: string = null) {
        const betDetail = { field: fieldName, amount: this.getOrderAmount() };
        // validate bet action
        if (this.validateBetAction(betDetail)) {
          this.addBetToBetField(fieldName, betDetail.amount);
          this.undoStack.push(hashkey, we.utils.clone({ field: fieldName, amount: betDetail.amount }), this.undoBetFieldUpdate.bind(this));
          this.updateBetChipUncfmBet(fieldName, this.getUncfmBetByField(fieldName).amount);

          if (env.autoConfirmBet && this.onConfirmedPress) {
            this.onConfirmedPress();
          }
        }
      }

      protected undoBetFieldUpdate(data: { field: string; amount: number }) {
        if (this._betChipStackMapping[data.field]) {
          this._betChipStackMapping[data.field].uncfmBet -= data.amount * this.getRate(data.field);
          this._betChipStackMapping[data.field].draw();
        }
        this._uncfmBetDetails.forEach(value => {
          if (value.field === data.field) {
            value.amount -= data.amount;
          }
        });
      }

      public onDoublePressed() {
        this._undoStack.push(new Date().getTime(), we.utils.clone(this._uncfmBetDetails), this.undoDoubleBetFields.bind(this));
        this.doubleBetFields();
      }

      public undoDoubleBetFields(betDetails: data.BetDetail[]) {
        betDetails.map(value => {
          if (this._betChipStackMapping[value.field]) {
            this._betChipStackMapping[value.field].uncfmBet = value.amount * this.getRate(value.field);
            this._betChipStackMapping[value.field].draw();
          }
        });

        this._uncfmBetDetails = betDetails;
      }

      public doubleBetFields() {
        const validDoubleBet = this._cfmBetDetails.reduce((acc, cur) => {
          if (cur.amount === 0) {
            return acc && true;
          }
          const betDetail = { field: cur.field, amount: cur.amount };
          return this.validateBetAction(betDetail) ? acc && true : false;
        }, true);
        if (!validDoubleBet) {
          return;
        }
        this._cfmBetDetails.map(value => {
          const addedAmount = value.amount;
          if (addedAmount > 0) {
            if (this._betChipStackMapping[value.field]) {
              this._betChipStackMapping[value.field].uncfmBet += addedAmount * this.getRate(value.field);
              this._betChipStackMapping[value.field].draw();
            }
            for (const detail of this._uncfmBetDetails) {
              if (detail.field === value.field) {
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
          this.getUncfmBetByField(value.field).amount = value.amount;
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
        const validRepeatBet = this._cfmBetDetails.reduce((acc, cur) => {
          if (cur.amount === 0) {
            return acc && true;
          }
          const betDetail = { field: cur.field, amount: cur.amount };
          return this.validateBetAction(betDetail) ? acc && true : false;
        }, true);
        if (!validRepeatBet) {
          return;
        }
        env.tableInfos[this._tableId].prevbets.map(value => {
          this._betChipStackMapping[value.field].uncfmBet = value.amount * this.getRate(value.field);
          this._betChipStackMapping[value.field].draw();
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
      }

      get getSelectedChipIndex() {
        return this._getSelectedChipIndex;
      }

      set getSelectedBetLimitIndex(value: () => number) {
        this._getSelectedBetLimitIndex = value;
      }

      get getSelectedBetLimitIndex() {
        return this._getSelectedBetLimitIndex;
      }

      // Tick button
      public validateBet(): boolean {
        const fieldAmounts = utils.arrayToKeyValue(this._uncfmBetDetails, 'field', 'amount');

        // clamp bet amount with current balance
        const totalUncfmAmount = this.getTotalUncfmBetAmount();
        const balance = env.balance;
        if (balance < totalUncfmAmount) {
          this.dispatchEvent(new egret.Event(core.Event.INSUFFICIENT_BALANCE));
          return false;
        }

        return this.validateFieldAmounts(fieldAmounts, null, true);
      }

      // check if the current unconfirmed betDetails are valid
      protected validateFieldAmounts(fieldAmounts: {}, betDetail: data.BetDetail = null, checkLowerLimit: boolean = false): boolean {
        const betLimit: data.BetLimitSet = env.betLimits[this._getSelectedBetLimitIndex()];

        let exceedBetLimit = false;
        if (checkLowerLimit) {
          // exceedBetLimit = this.isExceedLowerBetLimit(fieldAmounts, betLimit);
        } else {
          exceedBetLimit = this.isExceedUpperBetLimit(fieldAmounts, betLimit, betDetail);
        }

        if (exceedBetLimit) {
          const data = { exceedLower: checkLowerLimit };
          this.dispatchEvent(new egret.Event(core.Event.EXCEED_BET_LIMIT, false, false, data));
          return false;
        }
        return true;
      }

      // All amounts = betting value + uncfmvalue + cfmamount
      protected getAllValue(fieldAmounts, fieldname: string) {
        let total = 0;
        // fieldAmount has already included the uncfm values
        if (fieldAmounts && fieldAmounts[fieldname]) {
          total += fieldAmounts[fieldname];
        }
        this._cfmBetDetails.map(value => {
          if (value.field === fieldname) {
            total += value.amount;
          }
        });
        return total;
      }

      protected abstract isExceedUpperBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet, betDetail: data.BetDetail);
      protected abstract isExceedLowerBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet);

      protected checkLimit(checkBet, betDetail, maxlimit) {
        if (checkBet > maxlimit) {
          betDetail.amount += maxlimit - checkBet;
          if (betDetail.amount === 0) {
            return true;
          }
        }
        return false;
      }

      // check if the current bet action is valid, betDetail.amount could be updated based on the limits
      public validateBetAction(betDetail: data.BetDetail): boolean {
        const fieldAmounts = utils.arrayToKeyValue(this._uncfmBetDetails, 'field', 'amount');
        // fieldAmounts[betDetail.field] += betDetail.amount;

        // clamp bet amount with current balance
        const totalUncfmAmount = this.getTotalUncfmBetAmount() + betDetail.amount;
        const balance = env.balance;
        if (balance < totalUncfmAmount) {
          betDetail.amount += balance - totalUncfmAmount;
          if (betDetail.amount <= 0) {
            this.dispatchEvent(new egret.Event(core.Event.INSUFFICIENT_BALANCE));
            return false;
          }
        }

        return this.validateFieldAmounts(fieldAmounts, betDetail);
      }

      public resetUnconfirmedBet() {
        this._uncfmBetDetails = new Array();
        Object.keys(this._betField).map(value => {
          this._uncfmBetDetails.push({ field: value, amount: 0 });
        });
        if (this._betChipStackMapping) {
          Object.keys(this._betChipStackMapping).forEach(value => {
            if (this._betChipStackMapping[value]) {
              this._betChipStackMapping[value].uncfmBet = 0;
              this._betChipStackMapping[value].draw();
            }
          });
        }
      }

      public resetConfirmedBet() {
        this._cfmBetDetails = new Array();
        Object.keys(this._cfmBetDetails).map(value => {
          this._cfmBetDetails.push({ field: value, amount: 0 });
        });
        if (this._betChipStackMapping) {
          Object.keys(this._betChipStackMapping).forEach(value => {
            if (this._betChipStackMapping[value]) {
              this._betChipStackMapping[value].cfmBet = 0;
              this._betChipStackMapping[value].draw();
            }
          });
        }
      }

      public onCancelPressed() {
        this._undoStack.push(null, we.utils.clone(this._uncfmBetDetails), this.undoCancelBet.bind(this));
        this.cancelBet();
      }

      public cancelBet() {
        this.resetUnconfirmedBet();
        Object.keys(this._betChipStackMapping).map(value => {
          if (this._betChipStackMapping[value]) {
            this._betChipStackMapping[value].uncfmBet = 0;
            this._betChipStackMapping[value].draw();
          }
        });
      }

      public undoCancelBet(betDetails: data.BetDetail[]) {
        if (betDetails) {
          /*
          betDetails.forEach(value => {
            if (!this.validateBetAction(value)) {
              return;
            }
          });
          */
          betDetails.forEach(value => {
            if (value) {
              this.updateBetChipUncfmBet(value.field, value.amount);
            }
          });
          this._uncfmBetDetails = betDetails;
        }
      }

      public onChangeLang() {
        this.changeLang();
      }

      protected getRate(fieldName): number {
        return 1;
      }
    }
  }
}
