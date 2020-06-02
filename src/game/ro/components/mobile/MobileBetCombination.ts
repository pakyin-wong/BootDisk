namespace we {
  export namespace ro {
    export class MobileBetCombination extends ui.Panel {
      protected _chipLayer: ui.ChipLayer;

      public maxDisplay: number = 12;
      public minDisplay: number = 6;

      protected _txt_betCombination: ui.RunTimeLabel;
      protected _txt_edit: ui.RunTimeLabel;
      protected _txt_complete: ui.RunTimeLabel;

      protected _existitems: MobileBetCombinationItem[];
      protected _createItem: MobileBetCombinationCreateItem;
      protected _evtHandler: egret.EventDispatcher;

      protected _container: eui.Group;
      protected _datas;
      protected _edit: boolean = false;

      public constructor() {
        super();
        this.hideOnStart = true;
        this.isPoppable = true;
        this.dismissOnClickOutside = true;
      }

      protected mount() {
        super.mount();

        this._evtHandler = new egret.EventDispatcher();

        this._existitems = [];
        for (let i = 0; i < this.maxDisplay; i++) {
          this._existitems.push(new MobileBetCombinationItem(this._evtHandler));
        }

        this._createItem = new MobileBetCombinationCreateItem(this._evtHandler);

        this._txt_betCombination.renderText = () => `${i18n.t('roulette.customBet')}`;
        this._txt_edit.renderText = () => `${i18n.t('roulette.edit')}`;
        this._txt_complete.renderText = () => `${i18n.t('roulette.complete')}`;

        dir.evtHandler.addEventListener(core.Event.BET_COMBINATION_UPDATE, this.onUpdateTable, this);
        dir.evtHandler.addEventListener(core.Event.BET_COMBINATION_AMOUNT_UPDATE, this.onUpdateAmount, this);

        this._evtHandler.addEventListener('SELECT', this.onClickBetCombination, this);
        this._evtHandler.addEventListener('REMOVE', this.deleteBetCombination, this);
        this._evtHandler.addEventListener('CREATE', this.saveBetCombination, this);

        utils.addButtonListener(this._txt_edit, this.onEditPressed, this);
        utils.addButtonListener(this._txt_complete, this.onCompletePressed, this);

        dir.socket.getBetCombination();
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.BET_COMBINATION_UPDATE, this.onUpdateTable, this);
        dir.evtHandler.removeEventListener(core.Event.BET_COMBINATION_AMOUNT_UPDATE, this.onUpdateAmount, this);

        this._evtHandler.removeEventListener('SELECT', this.onClickBetCombination, this);
        this._evtHandler.removeEventListener('REMOVE', this.deleteBetCombination, this);
        this._evtHandler.removeEventListener('CREATE', this.saveBetCombination, this);

        utils.removeButtonListener(this._txt_edit, this.onEditPressed, this);
        utils.removeButtonListener(this._txt_complete, this.onCompletePressed, this);

        this._container.removeChildren();
        for (const i of this._existitems) {
          i.gc();
        }
        this._createItem.gc();
      }

      public set chipLayer(value: ui.ChipLayer) {
        this._chipLayer = value;
      }

      protected checkDuplicateName(title: string) {
        if (!this._datas) {
          return title;
        }

        let newTitle = title.toString();
        let num = 1;
        let matched;

        do {
          matched = false;
          for (const value of this._datas) {
            if (value.title === newTitle) {
              newTitle = title + '-' + num.toString();
              num++;
              matched = true;
              break;
            }
          }
        } while (matched);

        return newTitle;
      }

      protected onUpdateTable(evt: egret.Event) {
        if (evt && evt.data) {
          this._datas = evt.data;
        }

        this.render();
      }

      protected render() {
        this._container.removeChildren();

        if (this._datas) {
          let count = 0;
          for (const v of this._datas) {
            if (v instanceof we.data.BetCombination) {
              this._existitems[count].data = v;
              this._container.addChild(this._existitems[count]);
              this._existitems[count].currentState = this._edit ? 'edit' : 'normal';
              count++;
            }
          }
        }

        if (this._container.numChildren < this.maxDisplay) {
          this._createItem.init();
          this._container.addChild(this._createItem);
        }

        this.currentState = this._container.numChildren > this.minDisplay ? 'large' : 'normal';

        this._createItem.visible = !this._edit;
        this._txt_edit.visible = !this._edit;
        this._txt_complete.visible = this._edit;
      }

      protected onClickBetCombination(e: egret.Event) {
        if (!this._chipLayer) {
          return;
        }

        const betCombination = e.data;
        const hashKey = Date.now().toString();

        if (betCombination) {
          this._chipLayer.betFieldsUpdate(
            betCombination.optionsList.map(value => {
              return { field: value.betcode, amount: value.amount };
            }),
            hashKey
          );
        }
      }

      protected saveBetCombination() {
        const title = this.checkDuplicateName(this._createItem.title);
        dir.socket.createCustomBetCombination(title, this.getBetOptions());
      }

      protected deleteBetCombination(e: egret.Event) {
        const id = e.data.id;
        dir.socket.removeBetCombination(id);
      }

      protected onUpdateAmount(evt: egret.Event) {
        const { amount } = evt.data;
        this._createItem.amount = amount;
      }

      protected onEditPressed() {
        if (this._container.numChildren > 1) {
          this._edit = true;
          this.render();
        }
      }

      protected onCompletePressed() {
        this._edit = false;
        this.render();
      }

      protected getBetOptions() {
        const uncfmBets = this._chipLayer.getUnconfirmedBetDetails();
        const cfmBets = this._chipLayer.getConfirmedBetDetails();
        const betOptions = this.mergeBets(uncfmBets, cfmBets);
        return betOptions;
      }

      protected mergeBets(uncfmBets, cfmBets) {
        const uncfmBetOptions = new Array<we.data.BetValueOption>();
        uncfmBets.map(value => {
          if (value.amount === 0) {
            return;
          }
          const betOp = new we.data.BetValueOption();
          betOp.amount = value.amount;
          betOp.betcode = value.field;
          uncfmBetOptions.push(betOp);
        });

        const cfmBetOptions = new Array<we.data.BetValueOption>();
        cfmBets.map(value => {
          if (value.amount === 0) {
            return;
          }
          const betOp = new we.data.BetValueOption();
          betOp.amount = value.amount;
          betOp.betcode = value.field;
          cfmBetOptions.push(betOp);
        });

        const betOptions = new Array<we.data.BetValueOption>();
        uncfmBetOptions.map(v1 => {
          const betOp = new we.data.BetValueOption();
          betOp.betcode = v1.betcode;
          betOp.amount = v1.amount;
          cfmBetOptions.map(v2 => {
            if (v1.betcode === v2.betcode) {
              betOp.amount += v2.amount;
            }
          });
          betOptions.push(betOp);
        });
        cfmBetOptions.map(v1 => {
          uncfmBetOptions.map(v2 => {
            if (v1.betcode === v2.betcode) {
              return;
            }
          });
          const betOp = new we.data.BetValueOption();
          betOp.betcode = v1.betcode;
          betOp.amount = v1.amount;
          betOptions.push(betOp);
        });
        return betOptions;
      }
    }
  }
}
