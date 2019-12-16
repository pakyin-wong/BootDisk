namespace we {
  export namespace ui {
    export class BetInfoBaItem extends core.BaseEUI {
      private _bettingTable: we.ba.BettingTable;
      private _bettingChip: we.ba.BetChipSet;
      private _tableId: string;
      private _quickbetButton: we.ui.RoundButton;
      private _group: eui.Group;

      private rect: eui.Rect;
      private _dealerImage: eui.Image;
      private _bigRoad: we.ba.BetInfoBigRoad;
      private _quickbetPanel: BetInfoBaQuickBetPanel;
      private _quickbetEnable: boolean = false;
      private _dropdown: live.BetLimitDropdown;
      private _tableInfo: data.TableInfo;
      private _betDetails: data.BetDetail[];
      private _previousState: number;
      private _gameData: we.ba.GameData;
      private _timer: we.ba.CountdownTimer;
      private _mouseOutside: boolean = false;
      private _label: eui.Label;

      public constructor() {
        super('BetInfoBaItem');
      }

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      set labelText(value: string) {
        if (this._label) {
          this._label.text = value;
        }
      }

      get labelText() {
        if (this._label) {
          return this._label.text;
        }
      }

      public getQuickbetButton(): ui.RoundButton {
        return this._quickbetButton;
      }

      protected childrenCreated() {
        super.childrenCreated();
        console.log('BetInfoBaItem::childrenCreated');
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this._group.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this._group.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._timer.skinName = utils.getSkin('CountdownTimerRound');
        this._quickbetPanel.tableId = this._tableId;

        // For Fixed Width Round Corner
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRoundRect(0, 0, this._group.width, this._group.height, 16, 16);
        shape.graphics.endFill();
        this._group.addChild(shape);
        this._group.mask = shape;

        this.setEventListeners();
        // this._group.setChildIndex(this._timer, 2500);
      }

      private onTouchTap(evt: egret.Event) {
        const target = evt.target;
        if (target.parent && target.parent instanceof eui.ItemRenderer) {
          evt.stopPropagation();
          return;
        }
        if (evt.target === this._dropdown.toggler || evt.target === this) {
          evt.stopPropagation();
          return;
        }
      }

      public onClickButton(evt: egret.Event) {
        if (this.parent && this.parent.parent) {
          this.parent.parent.setChildIndex(<egret.DisplayObjectContainer> this.parent, 1000);
        }
      }

      get bigRoad() {
        return this._bigRoad;
      }

      set bigRoad(value: we.ba.BetInfoBigRoad) {
        this._bigRoad = value;
      }

      private setEventListeners() {
        dir.evtHandler.addEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
      }

      public setupTableInfo() {
        logger.l('BetInfoBaItem::setupTableInfo');
        console.log(env.tableInfoArray);
        env.tableInfoArray.forEach(value => {
          if (value.tableid === this._tableId) {
            this._tableInfo = value;
            this._betDetails = this._tableInfo.bets;
            this._gameData = this._tableInfo.data;
            this._previousState = this._gameData ? this._gameData.previousstate : null;
          }
        });
      }

      protected onTableInfoUpdate(evt: egret.Event) {
        // console.log('Baccarat listener');
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this._tableId) {
            // update the scene
            this._tableInfo = tableInfo;
            this._betDetails = tableInfo.bets;
            this._previousState = this._gameData ? this._gameData.previousstate : null;
            this._gameData = <we.ba.GameData> this._tableInfo.data;

            this.updateGame();
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        console.log('BaccaratScene::onRoadDataUpdate');
        const tableInfo = <data.TableInfo> evt.data;
        if (tableInfo.tableid === this._tableId) {
          if (tableInfo.roadmap) {
            this._bigRoad.updateRoadData(tableInfo.roadmap);
          }
        }
      }

      public updateGame() {
        if (!this._gameData) {
          return;
        }
        switch (this._gameData.state) {
          case we.ba.GameState.BET:
            this.setQuickbetPanelVisible(true);
            this.setStateBet();
            break;
          default:
            this.setQuickbetPanelVisible(false);
            break;
        }
      }

      protected setStateBet() {
        if (this._previousState !== we.ba.GameState.BET) {
          // reset data betinfo

          // if (this._betDetails) {
          //   this._betDetails.splice(0, this._betDetails.length);
          // }

          // TODO: show start bet message to the client for few seconds
          this._quickbetPanel.bettingTable.resetUnconfirmedBet();
          this._quickbetPanel.bettingTable.resetConfirmedBet();

          // show the betchipset, countdownTimer, confirm, cancel and other bet related buttons
          // this.setBetRelatedComponentsTouchEnabled(true);

          // enable betting table
          // this._quickbetPanel.bettingTable.setTouchEnabled(true);

          // update the bet amount of each bet field in betting table
          if (this._betDetails) {
            this._quickbetPanel.bettingTable.updateBetFields(this._betDetails);
          }
        }

        // update the countdownTimer
        this.updateCountdownTimer();
      }

      protected updateCountdownTimer() {
        this._timer.countdownValue = this._gameData.countdown * 1000;
        this._timer.remainingTime = this._gameData.countdown * 1000 - (env.currTime - this._gameData.starttime);
        this._timer.start();
      }

      private setQuickbetPanelVisible(enable: boolean) {
        if (this._quickbetEnable !== enable) {
          if (enable) {
            this._timer.visible = true;
            // this.setChildIndex(this._timer, 30000);
            console.log('LiveBaListItem::setQuickbetPanelVisible-enable()' + this.tableId);
          } else {
            this._timer.visible = false;
            console.log('LiveBaListItem::setQuickbetPanelVisible-disable1()' + this.tableId);
            this.setChildIndex(this._quickbetPanel, 1000);
            this.setChildIndex(this._group, 1500);
            this._quickbetButton.tweenLabel(!!!env.livepageLocked);
            egret.Tween.removeTweens(this);
            egret.Tween.removeTweens(this._quickbetPanel);
            egret.Tween.get(this._quickbetPanel).to({ y: 300, alpha: 0 }, 250);
            egret.Tween.removeTweens(this._quickbetButton);
            // const tw1 = egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, y: this._originaly }, 250);
            const tw2 = egret.Tween.get(this._quickbetButton).to({ y: 350, alpha: 0 }, 250);

            setTimeout(() => {
              if (env.livepageLocked === this.tableId) {
                console.log('LiveBaListItem::setQuickbetPanelVisible-disable2()' + this.tableId);
                // this.onClickButton(null);
                dir.evtHandler.dispatch(we.core.Event.LIVE_PAGE_LOCK);
              } else {
                const tw2 = egret.Tween.get(this._quickbetButton).to({ y: 350, alpha: 0 }, 250);
              }
            }, 300);
          }
          this._quickbetEnable = enable;
        }
      }

      public onRollover(evt: egret.Event) {
        console.log('LiveBaListItem::onRollover');
        this._mouseOutside = false;
        if (!env.livepageLocked) {
          // this.setChildIndex(this._timer, 2500);
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetButton);
          // egret.Tween.get(this).to({ scaleX: 1.1, scaleY: 1.1, y: this._originaly }, 250);
          if (this._quickbetEnable) {
            egret.Tween.get(this._quickbetButton).to({ y: 300, alpha: 1 }, 250);
          }
        }
      }

      public onRollout(evt: egret.Event) {
        this._mouseOutside = true;
        if (!env.livepageLocked) {
          // this.setChildIndex(this._timer, 2500);

          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetButton);
          // const tw1 = egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, y: this._originaly }, 250);
          const tw2 = egret.Tween.get(this._quickbetButton).to({ y: 350, alpha: 0 }, 250);
        }
      }
    }
  }
}
