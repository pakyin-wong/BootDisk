namespace we {
  export namespace live {
    export class LiveBaListItem extends eui.Component {
      public selected: boolean;
      public itemIndex: number;

      private rect: eui.Rect;
      private _dealerImage: eui.Image;
      private _bigRoad: we.ba.BALobbyBigRoad;
      private _quickbetPanel: we.live.LiveBaQuickBetPanel;
      private _quickbetButton: eui.Button;
      private _quickbetCloseButton: eui.Button;
      private _tableId: string;
      private _dropdown_toggle: eui.Group;
      private _dropdown: we.ui.DropdownList;
      private _group: eui.Group;

      // private _originalyhover: number;
      private _originaly: number;
      private _offsetY: number;
      // private _endanimRunning: boolean = false;

      public constructor() {
        super();
        this.skinName = utils.getSkin('LiveBaListItem');
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this._group.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this._group.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        // this._dropdown.items = ['test 1', 'test 2'];
        this._dropdown.setToggler(this._dropdown_toggle);
        this.mount();
      }

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      public getQuickbetButton() {
        return this._quickbetButton;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x += this.anchorOffsetX;
        this.y += this.anchorOffsetY;
        this._originaly = this.y;
      }

      private onTouchTap(evt: egret.Event) {
        if (evt.target === this._dropdown_toggle) {
          evt.stopPropagation();
          return;
        }
      }

      public onClickButton(evt: egret.Event) {
        if (this.parent && this.parent.parent) {
          this.parent.parent.setChildIndex(<egret.DisplayObjectContainer> this.parent, 1000);
        }

        if (!env.livepageLocked) {
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

      private async mount() {
        const imageResName = Math.round(Math.random()) ? 'temp_baccarat_dealer_1' : 'temp_baccarat_dealer_2';
        this._dealerImage.texture = RES.getRes(imageResName);
        this._quickbetPanel.tableId = this._tableId;
      }

      private onRollover(evt: egret.Event) {
        console.log('LiveBaListItem::onRollover');
        if (!env.livepageLocked) {
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetButton);
          egret.Tween.get(this).to({ scaleX: 1.1, scaleY: 1.1, y: this._originaly }, 250);
          egret.Tween.get(this._quickbetButton).to({ y: 300, alpha: 1 }, 250);
        }
      }

      private onRollout() {
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
