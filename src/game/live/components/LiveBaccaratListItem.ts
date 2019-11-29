namespace we {
  export namespace live {
    export class LiveBaccaratListItem extends eui.Component {
      public selected: boolean;
      public itemIndex: number;

      private rect: eui.Rect;
      private _dealerImage: eui.Image;
      private _bigRoad: we.ba.BALobbyBigRoad;
      private _quickbetPanel: we.live.LiveQuickBetPanel;
      private _quickbetButton: eui.Button;
      private _quickbetCloseButton: eui.Button;
      private _tableId: string;
      private _group: eui.Group;

      // private _originalyhover: number;
      private _originaly: number;
      private _offsetY: number;
      // private _endanimRunning: boolean = false;
      public constructor() {
        super();
        this.skinName = utils.getSkin('LiveBaccaratListItem');
        this.touchEnabled = true;
        this._group.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this._group.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this.mount();
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
          egret.Tween.get(this).to({ y: this._originaly - this._offsetY, scaleX: 1.1, scaleY: 1.1 }, 1000);
          egret.Tween.get(this._quickbetPanel).to({ y: 378, alpha: 1 }, 1000);
        } else {
          this.toggleLivePageLock();
          dir.evtHandler.dispatch(we.core.Event.LIVE_PAGE_LOCK);
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetPanel);
          egret.Tween.get(this).to({ y: this._originaly }, 1000);
          egret.Tween.get(this._quickbetPanel).to({ y: 300, alpha: 0 }, 1000);
        }
      }

      public setTableId(value: string) {
        this._tableId = value;
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
        try {
          console.log('LiveBaccaratListItem::mount');
          await RES.loadGroup('temp');
        } catch (e) {
          console.log('LiveBaccaratListItem::mount error');
        }
        const imageResName = Math.round(Math.random()) ? 'temp_baccarat_dealer_1' : 'temp_baccarat_dealer_2';
        this._dealerImage.texture = RES.getRes(imageResName);
      }

      private onRollover(evt: egret.Event) {
        console.log('LiveBaccaratListItem::onRollover');
        if (!env.livepageLocked) {
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetButton);
          egret.Tween.get(this).to({ scaleX: 1.1, scaleY: 1.1, y: this._originaly }, 1000);
          egret.Tween.get(this._quickbetButton).to({ y: 300, alpha: 1 }, 1000);
        }
      }

      private onRollout() {
        if (!env.livepageLocked) {
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetButton);
          const tw1 = egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, y: this._originaly }, 1000);
          const tw2 = egret.Tween.get(this._quickbetButton).to({ y: 350, alpha: 0 }, 1000);
        }
      }
    }
  }
}
