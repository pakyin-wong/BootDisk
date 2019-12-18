namespace we {
  export namespace ui {
    export class AlreadyBetItem extends ui.TableListItem {
      protected rect: eui.Rect;
      protected _bettingTable: we.ba.BettingTable;
      protected _betChipSetGroup: eui.Group;
      protected _betChipSet: we.ba.BetChipSet;
      protected _confirmButton: ui.BaseImageButton;
      protected _resultTable: eui.Image;
      protected _quickbetButton: ui.RoundButton;
      protected _quickbetEnable: boolean = false;
      protected _dropdown: live.BetLimitDropdown;
      protected _bettingGroup: eui.Group;
      protected _resultGroup: eui.Group;
      protected _betDetails: data.BetDetail[];
      protected _previousState: number;
      protected _gameData: we.ba.GameData;
      protected _timer: we.ba.CountdownTimer;
      protected _mouseOutside: boolean = false;
      protected _label: ui.RunTimeLabel;
      protected _cardHolder: we.ba.AlreadyBetCardHolder;
      protected _resultMessage: we.ba.GameResultMessage;

      protected _tweenInterval1: number = 250;

      // protected _originalyhover: number;
      protected _originaly: number;
      protected _originalQuickBetButtonY: number;
      protected _targetQuickBetButtonY: number;
      protected _originalQuickBetPanelY: number;
      protected _targetQuickbetPanelY: number;
      protected _offsetY: number;
      protected _offsetLimit: number;
      protected _offsetMovement: number;
      // private _endanimRunning: boolean = false;

      public constructor(skinName: string = 'AlreadyBetItem') {
        super();
        this.skinName = utils.getSkin(skinName);
        this.touchEnabled = true;

        this.initCustomPos();
        this.initPos();
        this.initChildren();
        this.setEventListeners();
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 100;
        this._originalQuickBetButtonY = 70;
        this._targetQuickbetPanelY = 218;
        this._originalQuickBetPanelY = 0;
        this._offsetLimit = 650;
        this._offsetMovement = 550;
      }

      protected initPos() {
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x += this.anchorOffsetX;
        this.y += this.anchorOffsetY;
        this._originaly = this.y;
      }

      protected initChildren() {
        this._timer.skinName = utils.getSkin('CountdownTimerRound');
        const denominationList = env.betLimits[env.currentSelectedBetLimitIndex].chipList;
        this._betChipSet.setVisibleDenominationCount(2);
        this._betChipSet.setDenominationList(denominationList);

        this._bettingTable.tableId = this._tableId;
        this._bettingTable.init();
        this._bettingTable.type = we.core.BettingTableType.LOBBY;
        this._bettingTable.denomList = denominationList;
        this._bettingTable.getSelectedBetLimitIndex = () => env.currentSelectedBetLimitIndex;
        this._bettingTable.getSelectedChipIndex = this._betChipSet.getSelectedChipIndex.bind(this._betChipSet);
        this._bettingTable.setGameMode(false);

        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRoundRect(0, 0, this.width, this.height, 16, 16);
        shape.graphics.endFill();
        this._bettingGroup.addChild(shape);
        this._bettingGroup.mask = shape;
      }

      public set tableId(value: string) {
        this._tableId = value;
        if (this._bettingTable) {
          this._bettingTable.tableId = value;
        }
      }

      public get tableId() {
        return this._tableId;
      }

      set labelRenderText(value: () => string) {
        if (this._label) {
          this._label.renderText = value;
        }
      }

      get labelRenderText() {
        if (this._label) {
          return this._label.renderText;
        }
        return null;
      }

      public getQuickbetButton(): ui.RoundButton {
        return this._quickbetButton;
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
        this.list.setChildIndex(this.holder, 1000);
        // this.setChildIndex(this._timer, 2500);

        if (!this.list.isLocked) {
          if (this._gameData.state !== we.ba.GameState.BET) {
            return;
          }
          this._quickbetButton.tweenLabel(!this.list.isLocked);
          this.holder.changeState(ui.TableListItemHolder.STATE_FOCUS);
          // this.toggleLivePageLock();
          // dir.evtHandler.dispatch(we.core.Event.LIVE_PAGE_LOCK);
          if (this.parent.localToGlobal(this.x, this._originaly).y > this._offsetLimit) {
            this._offsetY = this.parent.localToGlobal(this.x, this._originaly).y - this._offsetMovement;
          } else {
            this._offsetY = 0;
          }
          egret.Tween.removeTweens(this._betChipSetGroup);

          ///////
          /*
          this.y = this._originaly - this._offsetY;
          this.scaleX = 1.1;
          this.scaleY = 1.1;
          this._quickbetPanel.y = 378;
          this._quickbetPanel.alpha = 1;*/

          const p2 = new Promise(resolve =>
            egret.Tween.get(this._betChipSetGroup)
              .to({ y: this._targetQuickbetPanelY, alpha: 1 }, this._tweenInterval1)
              .call(resolve)
          );
        } else if (this.holder.isFocus) {
          this._quickbetButton.tweenLabel(!this.list.isLocked);
          // this.setChildIndex(this._quickbetPanel, 1000);
          // this.setChildIndex(this._group, 1500);
          // this._quickbetPanel.validateNow();

          egret.Tween.removeTweens(this._betChipSetGroup);
          egret.Tween.get(this._betChipSetGroup).to({ y: this._originalQuickBetPanelY, alpha: 0 }, this._tweenInterval1);

          if (this._mouseOutside) {
            egret.Tween.removeTweens(this._quickbetButton);
            const tw2 = egret.Tween.get(this._quickbetButton).to({ y: this._targetQuickBetButtonY, alpha: 0 }, this._tweenInterval1);
          }
          this.holder.changeState(ui.TableListItemHolder.STATE_NORMAL);
          // this.toggleLivePageLock();
          // dir.evtHandler.dispatch(we.core.Event.LIVE_PAGE_LOCK);
        }
      }

      // public toggleLivePageLock() {
      //   if (!env.livepageLocked) {
      //     env.livepageLocked = this._tableId;
      //   } else if (env.livepageLocked === this._tableId) {
      //     env.livepageLocked = null;
      //   }
      // }

      private setEventListeners() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
        this._bettingGroup.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this._bettingGroup.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        dir.evtHandler.addEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.addEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
      }

      protected onBetDetailUpdate(evt: egret.Event) {
        const tableInfo = <data.TableInfo> evt.data;
        if (tableInfo.tableid === this._tableId) {
          this._betDetails = tableInfo.bets;
          switch (this._gameData.state) {
            case we.ba.GameState.BET:
              this._bettingTable.updateBetFields(this._betDetails);
              break;
            case we.ba.GameState.FINISH:
            default:
              // this.winAmountLabel.visible = true;
              // this.winAmountLabel.text = `This round you got: ${this.totalWin.toString()}`;
              // this.bettingTable.showWinEffect(this.betDetails);
              // this.checkResultMessage(this.tableInfo.totalWin);
              break;
          }
        }
      }

      protected onTableBetInfoUpdate() {
        console.log('LiveBaListSimpleItem::onTableBetInfoUpdate');
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        this._betDetails = this._tableInfo.bets;
        this._gameData = this._tableInfo.data;
        this._previousState = this._gameData ? this._gameData.previousstate : null;
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
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
        }
      }

      public updateGame() {
        console.log('LiveBaListItem::updateGame() - this._gameData.state ');
        console.log(this._gameData);
        if (!this._gameData) {
          return;
        }
        console.log('state:        ' + this._gameData.state);
        switch (this._gameData.state) {
          case we.ba.GameState.IDLE:
            this.setStateIdle();
            break;
          case we.ba.GameState.BET:
            this.setStateBet();
            break;
          case we.ba.GameState.DEAL:
            this.setStateDeal();
            break;
          case we.ba.GameState.FINISH:
            this.setStateFinish();
            break;
          case we.ba.GameState.REFUND:
            this.setStateRefund();
            break;
          case we.ba.GameState.SHUFFLE:
            this.setStateShuffle();
            break;
        }
      }

      protected setStateIdle() {
        if (this._previousState !== we.ba.GameState.IDLE) {
          this._bettingTable.setTouchEnabled(false);
          this._resultGroup.visible = true;
          this._bettingGroup.visible = false;
          this.setQuickbetPanelVisible(false);
        }
      }

      protected setStateBet() {
        if (this._previousState !== we.ba.GameState.BET) {
          this.setQuickbetPanelVisible(true);
          this._bettingTable.resetUnconfirmedBet();
          this._bettingTable.resetConfirmedBet();
          this._bettingTable.setTouchEnabled(true);
          this._bettingGroup.visible = true;
          this._resultGroup.visible = false;
        }
        // update the bet amount of each bet field in betting table
        if (this._betDetails) {
          this._bettingTable.updateBetFields(this._betDetails);
        }

        // update the countdownTimer
        this.updateCountdownTimer();
      }
      protected setStateDeal() {
        if (this._previousState !== we.ba.GameState.DEAL) {
          this._resultGroup.visible = true;
          this._cardHolder.updateResult(this._gameData);
          this._cardHolder.resetCards();
          this._bettingGroup.visible = false;
          this._bettingTable.setTouchEnabled(false);
          this.setQuickbetPanelVisible(false);
        }
        // update card result in cardHolder
        this._cardHolder.updateResult(this._gameData);
      }
      protected setStateFinish() {
        if (this._previousState !== we.ba.GameState.FINISH) {
          this._resultGroup.visible = true;
          this._cardHolder.updateResult(this._gameData);
          this._cardHolder.resetCards();
          this._bettingGroup.visible = false;
          this._bettingTable.setTouchEnabled(false);
          this.setQuickbetPanelVisible(false);

          // TODO: show effect on each winning bet field
          logger.l(`this.gameData.winType ${this._gameData.wintype} ${utils.EnumHelpers.getKeyByValue(we.ba.WinType, this._gameData.wintype)}`);
          this.checkResultMessage(this.tableInfo.totalWin);
        }
      }
      protected setStateRefund() {
        if (this._previousState !== we.ba.GameState.REFUND) {
          this._resultGroup.visible = true;
          this._cardHolder.updateResult(this._gameData);
          this._cardHolder.resetCards();
          this._bettingGroup.visible = false;
          this._bettingTable.setTouchEnabled(false);
          this.setQuickbetPanelVisible(false);

          this._bettingTable.setTouchEnabled(false);
        }
      }
      protected setStateShuffle() {
        this._resultGroup.visible = true;
        this._cardHolder.updateResult(this._gameData);
        this._cardHolder.resetCards();
        this._bettingGroup.visible = false;
        this._bettingTable.setTouchEnabled(false);
        this.setQuickbetPanelVisible(false);
      }

      public checkResultMessage(totalWin: number = NaN) {
        if (this.hasBet()) {
          if (this._gameData && this._gameData.wintype !== we.ba.WinType.NONE && !isNaN(totalWin)) {
            this._resultMessage.showResult(this._gameData.wintype, totalWin);
          }
        } else {
          if (this._gameData && this._gameData.wintype !== we.ba.WinType.NONE) {
            this._resultMessage.showResult(this._gameData.wintype);
          }
        }
      }

      protected hasBet(): boolean {
        if (this._betDetails) {
          for (const betDetail of this._betDetails) {
            if (betDetail.amount > 0) {
              return true;
            }
          }
        }
        return false;
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
            // console.log('LiveBaListItem::setQuickbetPanelVisible-enable()' + this.tableId);
          } else {
            this._timer.visible = false;
            // console.log('LiveBaListItem::setQuickbetPanelVisible-disable1()' + this.tableId);
            /*
            this.setChildIndex(this._quickbetPanel, 1000);
            this.setChildIndex(this._group, 1500);
            */
            this._quickbetButton.tweenLabel(!this.list.isLocked);
            egret.Tween.removeTweens(this);
            egret.Tween.removeTweens(this._betChipSetGroup);

            egret.Tween.get(this._betChipSetGroup).to({ y: this._originalQuickBetPanelY, alpha: 0 }, this._tweenInterval1);
            egret.Tween.removeTweens(this._quickbetButton);
            const tw1 = egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, y: this._originaly }, this._tweenInterval1);
            const tw2 = egret.Tween.get(this._quickbetButton).to({ y: this._originalQuickBetButtonY, alpha: 0 }, this._tweenInterval1);

            setTimeout(() => {
              if (this.holder.isFocus) {
                console.log('LiveBaListItem::setQuickbetPanelVisible-disable2()' + this.tableId);
                // this.onClickButton(null);
                this.holder.changeState(ui.TableListItemHolder.STATE_NORMAL);
                // this.toggleLivePageLock();
                // dir.evtHandler.dispatch(we.core.Event.LIVE_PAGE_LOCK);
              } else {
                const tw2 = egret.Tween.get(this._quickbetButton).to({ y: this._targetQuickBetButtonY, alpha: 0 }, this._tweenInterval1);
                this._quickbetButton.tweenLabel(false);
              }
            }, 300);
          }
          this._quickbetEnable = enable;
        }
      }

      protected mount() {}

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
      }

      public onRollover(evt: egret.Event) {
        console.log('LiveBaListItem::onRollover');
        this._mouseOutside = false;
        if (!this.list.isLocked) {
          // this.setChildIndex(this._timer, 25000);
          egret.Tween.removeTweens(this._quickbetButton);
          if (this._quickbetEnable) {
            egret.Tween.get(this._quickbetButton).to({ y: this._originalQuickBetButtonY, alpha: 1 }, this._tweenInterval1);
          }
        }
      }

      public onRollout(evt: egret.Event) {
        this._mouseOutside = true;
        if (!this.list.isLocked) {
          // this.setChildIndex(this._timer, 2500);

          egret.Tween.removeTweens(this._quickbetButton);
          const tw2 = egret.Tween.get(this._quickbetButton).to({ y: this._targetQuickBetButtonY, alpha: 0 }, 250);
        }
      }

      protected onConfirm(evt: egret.Event) {
        if (this._bettingTable.getTotalUncfmBetAmount() > 0) {
          const bets = this._bettingTable.getUnconfirmedBetDetails();
          this._bettingTable.resetUnconfirmedBet();
          dir.socket.bet(this._tableId, bets);
        }
      }
    }
  }
}
