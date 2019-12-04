namespace we {
  export namespace live {
    export class LiveBaListItem extends eui.Component {
      public selected: boolean;
      public itemIndex: number;

      private rect: eui.Rect;
      private _dealerImage: eui.Image;
      private _bigRoad: we.ba.BALobbyBigRoad;
      private _quickbetPanel: we.live.LiveBaQuickBetPanel;
      private _quickbetButton: ui.RoundButton;
      private _quickbetEnable: boolean;
      private _tableId: string;
      private _dropdown: live.BetLimitDropdown;
      // private _dropdown_toggle: eui.Group;
      // private _dropdown: we.ui.DropdownList;
      private _group: eui.Group;
      private _tableInfo: data.TableInfo;
      private _betDetails: data.BetDetail[];
      private _previousState: number;
      private _gameData: we.ba.GameData;
      private _timer: we.ba.CountdownTimer;

      // private _originalyhover: number;
      private _originaly: number;
      private _offsetY: number;
      // private _endanimRunning: boolean = false;

      public constructor() {
        super();
        this.skinName = utils.getSkin('LiveBaListItem');
        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.mount();
      }

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      public getQuickbetButton(): ui.RoundButton {
        return this._quickbetButton;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x += this.anchorOffsetX;
        this.y += this.anchorOffsetY;
        this._originaly = this.y;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this._group.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this._group.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        // this._dropdown.items = ['test 1', 'test 2'];
        // this._dropdown.setToggler(this._dropdown_toggle);
        this.mount();
        this.setupTableInfo();
        this.updateGame();
        this.setEventListeners();
        this.setChildIndex(this._timer, 30000);
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

        if (!env.livepageLocked) {
          this._quickbetButton.tweenLabel(!!!env.livepageLocked);
          this.toggleLivePageLock();
          dir.evtHandler.dispatch(we.core.Event.LIVE_PAGE_LOCK);
          if (this.parent.localToGlobal(this.x, this._originaly).y > 900) {
            this._offsetY = this.parent.localToGlobal(this.x, this._originaly).y - 800;
          } else {
            this._offsetY = 0;
          }
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetPanel);
          const p1 = new Promise(resolve =>
            egret.Tween.get(this)
              .to({ y: this._originaly - this._offsetY, scaleX: 1.1, scaleY: 1.1 }, 250)
              .call(resolve)
          );
          const p2 = new Promise(resolve =>
            egret.Tween.get(this._quickbetPanel)
              .to({ y: 378, alpha: 1 }, 250)
              .call(resolve)
          );
          Promise.all([p1, p2]).then(() => {
            this.setChildIndex(this._group, 1000);
            this.setChildIndex(this._quickbetPanel, 1500);
          });
        } else {
          this._quickbetButton.tweenLabel(!!!env.livepageLocked);
          this.setChildIndex(this._quickbetPanel, 1000);
          this.setChildIndex(this._group, 1500);
          this.toggleLivePageLock();
          dir.evtHandler.dispatch(we.core.Event.LIVE_PAGE_LOCK);
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetPanel);
          egret.Tween.get(this).to({ y: this._originaly }, 250);
          egret.Tween.get(this._quickbetPanel).to({ y: 300, alpha: 0 }, 250);
        }
      }

      public toggleLivePageLock() {
        if (env.livepageLocked) {
          env.livepageLocked = null;
        } else {
          env.livepageLocked = this._tableId;
        }
      }

      get dealerImage() {
        return this._dealerImage;
      }

      set dealerImage(value: eui.Image) {
        this._dealerImage = value;
      }

      get bigRoad() {
        return this._bigRoad;
      }

      set bigRoad(value: we.ba.BALobbyBigRoad) {
        this._bigRoad = value;
      }

      private setEventListeners() {
        dir.evtHandler.addEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
      }

      private setupTableInfo() {
        // console.log(env.tableInfoArray);

        env.tableInfoArray.forEach(value => {
          if (value.tableid === this._tableId) {
            this._tableInfo = value;
            this._betDetails = this._tableInfo.bets;
            this._gameData = this._tableInfo.data;
            this._previousState = this._gameData.state;
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
            this._previousState = this._gameData ? this._gameData.state : we.ba.GameState.SHUFFLE;
            this._gameData = <we.ba.GameData> this._tableInfo.data;

            this.updateGame();
          }
        }
      }

      private updateGame() {
        console.log('LiveBaListItem::updateGame() - this._gameData.state ');
        console.log(this._gameData);
        if (!this._gameData) {
          return;
        }
        switch (this._gameData.state) {
          case we.ba.GameState.BET:
            this.setStateBet();
            break;
          default:
            this.setStateOther();
            break;
        }
      }

      protected setStateOther() {
        this.setBetRelatedComponentsVisibility(false);
      }

      protected setStateBet() {
        this._quickbetEnable = true;
        if (this._previousState !== we.ba.GameState.BET) {
          // reset data betinfo

          if (this._betDetails) {
            this._betDetails.splice(0, this._betDetails.length);
          }

          // TODO: show start bet message to the client for few seconds
          this._quickbetPanel.bettingTable.resetUnconfirmedBet();
          this._quickbetPanel.bettingTable.resetConfirmedBet();

          // show the betchipset, countdownTimer, confirm, cancel and other bet related buttons
          this.setBetRelatedComponentsVisibility(true);
          // this.setBetRelatedComponentsTouchEnabled(true);

          // enable betting table
          this._quickbetPanel.bettingTable.setTouchEnabled(true);

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

      private setBetRelatedComponentsVisibility(enable) {
        if (this._quickbetEnable !== enable) {
          if (enable) {
            this._timer.visible = true;
            this.parent.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
            this.parent.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          } else {
            this._timer.visible = false;
            this.parent.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
            this.parent.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
            this.onRollout(null);
          }
        }
        this._quickbetEnable = enable;
      }

      private async mount() {
        const imageResName = Math.round(Math.random()) ? 'temp_baccarat_dealer_1' : 'temp_baccarat_dealer_2';
        this._timer.skinName = utils.getSkin('CountdownTimerRound');
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._quickbetPanel.tableId = this._tableId;
        // this._dropdown.setToggler(this._dropdown_toggle);
        this._dealerImage.texture = RES.getRes(imageResName);
        // this.setChildIndex(this._dropdown_toggle, 20000);
      }

      public onRollover(evt: egret.Event) {
        console.log('LiveBaListItem::onRollover');
        if (!env.livepageLocked) {
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetButton);
          egret.Tween.get(this).to({ scaleX: 1.1, scaleY: 1.1, y: this._originaly }, 250);
          egret.Tween.get(this._quickbetButton).to({ y: 300, alpha: 1 }, 250);
        }
      }

      public onRollout(evt: egret.Event) {
        if (!env.livepageLocked) {
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetButton);
          const tw1 = egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, y: this._originaly }, 250);
          const tw2 = egret.Tween.get(this._quickbetButton).to({ y: 350, alpha: 0 }, 250);
        }
      }
    }
  }
}
