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
        let num = 0;
        if (evt) {
          console.log('BetCombination::onUpdateTable() ', evt.data);
          if (evt.data) {
            evt.data.map(value => {
              this._group.addChild(this.oldBetCombination(value));
              num++;
            });
          }
        }

        if (num > 11) { return; }

        this._group.addChild(this.newBetCombination());
        num++;

        while (num < 12) {
          const emptyGrid = new eui.Component();
          emptyGrid.height = 20;
          this._group.addChild(emptyGrid);
          num++;
        }
      }

      protected oldBetCombination(betCombination: we.data.BetCombination) {
        const textField = new eui.Label();
        textField.height = 20;
        textField.width = 100;
        textField.text = betCombination.title;

        const cancel = new eui.Image();
        cancel.source = 'd_ba_betcontrol_icon_cancel_png';
        cancel.height = 20;
        cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteBetCombination(betCombination.id), this);

        const layout = new eui.HorizontalLayout();

        const group = new eui.Group();
        group.layout = layout;
        group.addChild(textField);
        group.addChild(cancel);

        return group;
      }

      protected newBetCombination() {
        this._newBetCombinationTextField = new eui.EditableText();
        this._newBetCombinationTextField.height = 20;
        this._newBetCombinationTextField.width = 100;

        const tick = new eui.Image();
        tick.source = 'd_lobby_confirm_btn_normal_png';
        tick.height = 20;
        tick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveBetCombination, this);

        const layout = new eui.HorizontalLayout();

        const group = new eui.Group();
        group.layout = layout;
        group.addChild(this._newBetCombinationTextField);
        group.addChild(tick);

        return group;
      }

      protected saveBetCombination() {
        dir.socket.createCustomBetCombination(this._newBetCombinationTextField.text, this.getBetOptions());
      }

      protected deleteBetCombination(id: string) {
        return () => {
          dir.socket.removeBetCombination(id);
        };
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
        layout.orientation = eui.TileOrientation.COLUMNS;
        layout.requestedColumnCount = 2;

        this._group = new eui.Group();
        this._group.layout = layout;
        const label = new eui.Label();
        label.text = 'xxxxxxxxxxxxxxx';
        this._group.addChild(label);

        this.addChild(this._group);

        dir.socket.getBetCombination();
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.BET_COMBINATION_UPDATE, this.onUpdateTable, this);
      }
    }
  }
}
