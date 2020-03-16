namespace we {
  export namespace ui {
    export class BetCombination extends core.BaseEUI {
      protected _chipLayer: ui.ChipLayer;
      protected _group: eui.Group;
      protected _newBetCombinationTextField: eui.EditableText;

      public set chipLayer(value: ui.ChipLayer) {
        this._chipLayer = value;
      }

      protected onUpdateTable(evt: egret.Event) {
        this._group.removeChildren();
        if (evt) {
          console.log('BetCombination::onUpdateTable() ', evt.data);
          /*
          if (evt.data) {
            evt.data.map(value => {
              this._group.addChild(this.newBetCombination());
            });
          }
          */
        }
        this._group.addChild(this.newBetCombination());
      }

      protected newBetCombination() {
        const group = new eui.Group();
        this._newBetCombinationTextField = new eui.EditableText();
        this._newBetCombinationTextField.height = 50;
        this._newBetCombinationTextField.width = 100;
        const tick = new eui.Image();
        tick.source = 'd_lobby_confirm_btn_normal_png';
        tick.x = 100;
        tick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveBetCombination, this);
        group.addChild(this._newBetCombinationTextField);
        group.addChild(tick);
        return group;
      }

      protected saveBetCombination() {
        dir.socket.createCustomBetCombination(this._newBetCombinationTextField.text, this.getBetOptions());
      }

      protected getBetOptions() {
        const betOptions = new Array<we.data.BetValueOption>();
        if (this._chipLayer.betField) {
          Object.keys(this._chipLayer.betField).map(fieldKey => {
            this._chipLayer.uncfmBetDetails.map(uncfmBetDetail => {
              if (fieldKey === uncfmBetDetail.field) {
              }
            });
          });
        }
        const betOp = new we.data.BetValueOption();
        betOp.amount = 1000;
        betOp.field = ro.BetField.BIG;
        betOptions.push(betOp);
        return betOptions;
      }

      protected mount() {
        dir.evtHandler.addEventListener(core.Event.BET_COMBINATION_UPDATE, this.onUpdateTable, this);
        const layout = new eui.TileLayout();
        layout.orientation = eui.TileOrientation.ROWS;
        layout.requestedRowCount = 2;

        this._group = new eui.Group();
        this._group.layout = layout;
        const label = new eui.Label();
        label.text = 'xxxxxxxxxxxxxxx';
        this._group.addChild(label);

        this.addChild(this._group);

        this.onUpdateTable(null);
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.BET_COMBINATION_UPDATE, this.onUpdateTable, this);
      }
    }
  }
}
