namespace we {
  export namespace ui {
    export class BetCombination extends core.BaseEUI {
      protected _chipLayer: ui.ChipLayer;
      protected _group: eui.Group;
      protected _newBetCombinationTextField: eui.EditableText;
      protected _bgheight = 30;
      protected _bgwidth = 158;

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

        if (num > 11) {
          return;
        }

        this._group.addChild(this.newBetCombination());
        num++;

        while (num < 12) {
          const emptyGrid = new eui.Component();
          emptyGrid.height = this._bgheight;
          emptyGrid.width = 138;
          this._group.addChild(emptyGrid);
          num++;
        }
      }

      protected onClickBetCombination(betCombination: we.data.BetCombination) {
        return () => {
          if (this._chipLayer) {
            const hashKey = Date.now().toString();
            if (betCombination) {
              this._chipLayer.betFieldsUpdate(betCombination.toBetDetails(), hashKey);
            }
          }
        };
      }

      protected oldBetCombination(betCombination: we.data.BetCombination) {
        const bg = new eui.Rect();
        bg.ellipseWidth = 10;
        bg.ellipseWidth = 10;
        bg.height = this._bgheight;
        bg.width = 138;
        bg.fillColor = 0xc0c0c0;

        bg.addEventListener(mouse.MouseEvent.ROLL_OVER, () => (bg.fillColor = 0x303030), this);
        bg.addEventListener(mouse.MouseEvent.ROLL_OUT, () => (bg.fillColor = 0xc0c0c0), this);
        bg.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onClickBetCombination(betCombination), this);

        const textField = new eui.Label();
        textField.height = this._bgheight;
        textField.width = 100;
        textField.text = betCombination.title;

        const cancel = new eui.Image();
        cancel.source = 'd_ba_betcontrol_icon_cancel_png';
        cancel.height = this._bgheight;
        cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteBetCombination(betCombination.id), this);

        const layout = new eui.HorizontalLayout();

        const innerGroup = new eui.Group();
        innerGroup.layout = layout;
        innerGroup.addChild(textField);
        innerGroup.addChild(cancel);
        innerGroup.horizontalCenter = 0;
        innerGroup.verticalCenter = 0;

        const outerGroup = new eui.Group();
        outerGroup.width = 138;
        outerGroup.addChild(bg);
        outerGroup.addChild(innerGroup);

        return outerGroup;
      }

      protected newBetCombination() {
        const bg = new eui.Rect();
        bg.ellipseWidth = 10;
        bg.ellipseWidth = 10;
        bg.height = this._bgheight;
        bg.width = 138;
        bg.fillColor = 0xc0c0c0;

        this._newBetCombinationTextField = new eui.EditableText();
        this._newBetCombinationTextField.height = this._bgheight;
        this._newBetCombinationTextField.width = 100;
        this._newBetCombinationTextField.size = 18;

        const tick = new eui.Image();
        tick.source = 'd_lobby_confirm_btn_normal_png';
        tick.height = this._bgheight;
        tick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveBetCombination, this);

        const layout = new eui.HorizontalLayout();
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;

        const innerGroup = new eui.Group();
        innerGroup.layout = layout;
        innerGroup.addChild(this._newBetCombinationTextField);
        innerGroup.addChild(tick);
        innerGroup.horizontalCenter = 0;
        innerGroup.verticalCenter = 0;

        const outerGroup = new eui.Group();
        outerGroup.width = 138;
        outerGroup.addChild(bg);
        outerGroup.addChild(innerGroup);

        return outerGroup;
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
        const uncfmBets = this._chipLayer.getUnconfirmedBetDetails();
        console.log(uncfmBets);
        const cfmBets = this._chipLayer.getConfirmedBetDetails();
        console.log(cfmBets);
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
          betOp.field = value.field;
          uncfmBetOptions.push(betOp);
        });

        const cfmBetOptions = new Array<we.data.BetValueOption>();
        cfmBets.map(value => {
          if (value.amount === 0) {
            return;
          }
          const betOp = new we.data.BetValueOption();
          betOp.amount = value.amount;
          betOp.field = value.field;
          cfmBetOptions.push(betOp);
        });

        const betOptions = new Array<we.data.BetValueOption>();
        uncfmBetOptions.map(v1 => {
          const betOp = new we.data.BetValueOption();
          betOp.field = v1.field;
          betOp.amount = v1.amount;
          cfmBetOptions.map(v2 => {
            if (v1.field === v2.field) {
              betOp.amount += v2.amount;
            }
          });
          betOptions.push(betOp);
        });
        cfmBetOptions.map(v1 => {
          uncfmBetOptions.map(v2 => {
            if (v1.field === v2.field) {
              return;
            }
          });
          const betOp = new we.data.BetValueOption();
          betOp.field = v1.field;
          betOp.amount = v1.amount;
          betOptions.push(betOp);
        });
        return betOptions;
      }

      protected mount() {
        dir.evtHandler.addEventListener(core.Event.BET_COMBINATION_UPDATE, this.onUpdateTable, this);
        const layout = new eui.TileLayout();
        layout.orientation = eui.TileOrientation.COLUMNS;
        layout.requestedColumnCount = 2;
        layout.horizontalGap = 5;
        layout.verticalGap = 5;

        this._group = new eui.Group();
        this._group.layout = layout;
        this._group.verticalCenter = 0;
        this._group.horizontalCenter = 0;
        this._group.addChild(this.newBetCombination());
        let num = 1;

        while (num < 12) {
          const emptyGrid = new eui.Component();
          emptyGrid.height = this._bgheight;
          emptyGrid.width = 138;
          this._group.addChild(emptyGrid);
          num++;
        }

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
