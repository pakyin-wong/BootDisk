namespace we {
  export namespace ui {
    export class BetCombination extends core.BaseEUI {
      protected _chipLayer: ui.ChipLayer;
      protected _group: eui.Group;
      protected _newBetCombinationTextField: eui.EditableText;
      protected _newBetCombinationAmount: eui.Label;
      // protected _amount: eui.Label;
      protected _frontWidth = 60;
      protected _midWidth = 130;
      protected _endWidth = 100;
      protected _bgheight = 39;
      protected _bgwidth = 290;
      protected _textSize = 17;
      protected _textFieldMaxLimit = 12;
      protected _combinations: any;

      public set chipLayer(value: ui.ChipLayer) {
        this._chipLayer = value;
      }

      protected checkDuplicateName(title: string) {
        let newTitle = title.toString();
        let num = 1;
        let matched = true;

        if (this._combinations) {
          while (matched) {
            if (this._combinations.length === 0) {
              matched = false;
              break;
            }
            for (const value of this._combinations) {
              // console.log('checkDuplicateName():', value.title, title)
              if (value.title === newTitle) {
                matched = true;
                break;
              }
              matched = false;
            }
            if (matched) {
              newTitle = title + '-' + num.toString();
              num++;
            }
          }
        }
        return newTitle;
      }

      protected onUpdateTable(evt: egret.Event) {
        this._group.removeChildren();
        let num = 0;
        if (evt) {
          console.log('BetCombination::onUpdateTable() ', evt.data);
          if (evt.data) {
            this._combinations = evt.data;
            this._combinations.map(value => {
              // if (value instanceof we.data.BetCombination) {
              this._group.addChild(this.oldBetCombination(value));
              // }
              num++;
            });
          }
        }

        if (num > 11) {
          return;
        }

        this._group.addChild(this.newBetCombination());
        num++;

        this.fillEmptyGrids(num);
      }

      protected fillEmptyGrids(startingNum: number) {
        while (startingNum < 12) {
          const emptyGrid = new eui.Component();
          emptyGrid.height = this._bgheight;
          emptyGrid.width = this._bgwidth;
          this._group.addChild(emptyGrid);
          startingNum++;
        }
      }

      protected onClickBetCombination(betCombination: we.data.BetCombination, deleteBtn) {
        return (evt: egret.Event) => {
          if (evt.target === deleteBtn) {
            return;
          }

          if (this._chipLayer) {
            const hashKey = Date.now().toString();
            console.log('onClickBetCombination(betCombination)', betCombination);
            if (betCombination) {
              this._chipLayer.betFieldsUpdate(
                betCombination.optionsList.map(value => {
                  return { field: value.betcode, amount: value.amount };
                }),
                hashKey
              );
            }
          }
        };
      }

      protected oldBetCombination(betCombination: we.data.BetCombination) {
        const bg = this.activeBg();

        const textField = new eui.Label();
        textField.height = this._bgheight;
        textField.width = this._midWidth;
        textField.text = betCombination.title;
        textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        textField.size = this._textSize;

        const star = new eui.Image();
        star.source = 'd_ro_savelayout_star_icon_png';
        star.verticalCenter = 0;
        star.left = 30;

        const front = new eui.Component();
        front.addChild(star);
        // front.addEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteBetCombination(betCombination.id), this);
        front.width = this._frontWidth;
        front.height = this._bgheight;

        const end = new eui.Component();
        end.width = this._endWidth;
        end.height = this._bgheight;

        const amount = new eui.Label();
        amount.text = '$' + (this.getOldBetAmount(betCombination) / 100).toString();
        amount.size = this._textSize;
        amount.verticalCenter = 0;
        amount.left = 20;

        end.addChild(amount);

        const layout = new eui.HorizontalLayout();
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;

        const innerGroup = new eui.Group();
        innerGroup.layout = layout;
        innerGroup.addChild(front);
        innerGroup.addChild(textField);
        innerGroup.addChild(end);
        innerGroup.horizontalCenter = 0;
        innerGroup.addEventListener(mouse.MouseEvent.ROLL_OVER, this.oldBetCombinationRollOver(bg, star, betCombination.id), this);
        innerGroup.addEventListener(mouse.MouseEvent.ROLL_OUT, this.oldBetCombinationRollOut(bg, star, betCombination.id), this);
        innerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetCombination(betCombination, star), this);

        const outerGroup = new eui.Group();
        outerGroup.addChild(bg);
        outerGroup.addChild(innerGroup);

        return outerGroup;
      }

      protected newBetCombinationTextFieldFocus(evt: egret.Event) {
        if (this._newBetCombinationTextField.text === '加入新投注組合') {
          this._newBetCombinationTextField.text = '';
        }
      }

      protected newBetCombinationTextFieldChange(evt: egret.Event) {
        if (this._newBetCombinationTextField.text.length > this._textFieldMaxLimit) {
          this._newBetCombinationTextField.text = this._newBetCombinationTextField.text.substr(0, 12);
        }
      }

      protected newBetCombination() {
        const bg = this.inactiveBg();

        this._newBetCombinationTextField = new eui.EditableText();

        this._newBetCombinationTextField.text = '加入新投注組合';
        this._newBetCombinationTextField.height = this._bgheight;
        this._newBetCombinationTextField.width = this._midWidth;
        this._newBetCombinationTextField.size = this._textSize;
        this._newBetCombinationTextField.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._newBetCombinationTextField.addEventListener(egret.Event.CHANGE, this.newBetCombinationTextFieldChange, this);
        this._newBetCombinationTextField.addEventListener(egret.Event.FOCUS_IN, this.newBetCombinationTextFieldFocus, this);

        const add = new eui.Image();
        add.source = 'd_ro_rm_add_btn_normal_png';
        add.height = 23;
        add.width = 23;
        add.verticalCenter = 0;
        add.left = 30;

        const front = new eui.Component();
        front.addChild(add);
        front.width = this._frontWidth;
        front.height = this._bgheight;

        const end = new eui.Component();
        end.width = this._endWidth;
        end.height = this._bgheight;

        const tick = new eui.Image();
        tick.source = 'd_ro_savelayout_confirm_icon_png';
        tick.verticalCenter = 0;
        tick.right = 20;
        tick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveBetCombination, this);

        this._newBetCombinationAmount = new eui.Label();
        this._newBetCombinationAmount.size = this._textSize;
        this._newBetCombinationAmount.text = '$' + ((this._chipLayer.getTotalCfmBetAmount() + this._chipLayer.getTotalUncfmBetAmount()) / 100).toString();
        this._newBetCombinationAmount.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._newBetCombinationAmount.verticalCenter = 0;
        this._newBetCombinationAmount.left = 20;

        end.addChild(tick);
        end.addChild(this._newBetCombinationAmount);

        const layout = new eui.HorizontalLayout();
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;

        const innerGroup = new eui.Group();
        innerGroup.layout = layout;
        innerGroup.addChild(front);
        innerGroup.addChild(this._newBetCombinationTextField);
        innerGroup.addChild(end);
        innerGroup.horizontalCenter = 0;
        innerGroup.addEventListener(mouse.MouseEvent.ROLL_OUT, this.newBetCombinationRollOut(bg, tick), this);
        innerGroup.addEventListener(mouse.MouseEvent.ROLL_OVER, this.newBetCombinationRollOver(bg, tick), this);

        const outerGroup = new eui.Group();
        outerGroup.addChild(bg);
        outerGroup.addChild(innerGroup);

        return outerGroup;
      }

      protected activeBg() {
        const bg = new eui.Image();
        bg.source = 'd_ro_savelayout_active_bg_png';
        bg.height = this._bgheight;
        bg.width = this._bgwidth;
        return bg;
      }

      protected inactiveBg() {
        const bg = new eui.Image();
        bg.source = 'd_ro_savelayout_inactive_bg_png';
        bg.height = this._bgheight;
        bg.width = this._bgwidth;
        return bg;
      }

      protected renameBg() {
        const bg = new eui.Image();
        bg.height = this._bgheight;
        bg.width = this._bgwidth;
        return bg;
      }

      protected oldBetCombinationRollOver(bg, star: eui.Image, id) {
        return () => {
          bg.source = 'd_ro_savelayout_rename_mode_bg_png';
          star.source = 'd_ro_savelayout_cancel_icon_png';
          star.addEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteBetCombination(id), this);
        };
      }

      protected oldBetCombinationRollOut(bg, star: eui.Image, id) {
        return () => {
          bg.source = 'd_ro_savelayout_active_bg_png';
          star.source = 'd_ro_savelayout_star_icon_png';
          star.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.deleteBetCombination(id), this);
        };
      }

      protected newBetCombinationRollOver(bg, tick) {
        return () => {
          bg.source = 'd_ro_savelayout_rename_mode_bg_png';
          if (this._chipLayer.getTotalCfmBetAmount() + this._chipLayer.getTotalUncfmBetAmount() !== 0) {
            tick.visible = true;
          }
        };
      }

      protected newBetCombinationRollOut(bg, tick) {
        return () => {
          bg.source = 'd_ro_savelayout_inactive_bg_png';
          tick.visible = false;
        };
      }

      protected saveBetCombination() {
        const title = this.checkDuplicateName(this._newBetCombinationTextField.text);
        dir.socket.createCustomBetCombination(title, this.getBetOptions());
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

      protected mount() {
        dir.evtHandler.addEventListener(core.Event.BET_COMBINATION_UPDATE, this.onUpdateTable, this);
        dir.evtHandler.addEventListener(core.Event.BET_COMBINATION_AMOUNT_UPDATE, this.onUpdateAmount, this);
        const layout = new eui.TileLayout();
        layout.orientation = eui.TileOrientation.COLUMNS;
        layout.requestedColumnCount = 2;
        layout.horizontalGap = 25;
        layout.verticalGap = 5;

        this._group = new eui.Group();
        this._group.layout = layout;
        this._group.addChild(this.newBetCombination());
        this.fillEmptyGrids(1);
        this.addChild(this._group);

        dir.socket.getBetCombination();
      }

      protected getOldBetAmount(data: we.data.BetCombination) {
        let amount: number = 0;
        if (data.optionsList) {
          amount = data.optionsList.reduce((a, b) => a + b.amount, 0);
        }
        return amount;
      }

      protected onUpdateAmount(evt: egret.Event) {
        const { amount } = evt.data;
        this._newBetCombinationAmount.text = '$' + (amount / 100).toString();
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.BET_COMBINATION_UPDATE, this.onUpdateTable, this);
        dir.evtHandler.removeEventListener(core.Event.BET_COMBINATION_AMOUNT_UPDATE, this.onUpdateAmount, this);
      }
    }
  }
}
