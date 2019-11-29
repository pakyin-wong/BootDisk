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
      private _dropdown_toggle: eui.Group;
      private _dropdown: we.ui.DropdownList;

      private _originalx: number;
      private _originaly: number;

      public constructor() {
        super();
        this.skinName = utils.getSkin('LiveBaccaratListItem');
        this.touchEnabled = true;
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapWhole, this);
        this._quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickButton, this);
        this._dropdown.items = ['test 1', 'test 2']
        this._dropdown.setToggler(this._dropdown_toggle);
        this._dropdown.dismissOnClickOutside = true;
        this.mount();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x += this.anchorOffsetX;
        this.y += this.anchorOffsetY;
      }

      public onTouchTapWhole(evt: egret.Event) {
        if (evt.target === this._quickbetButton) {
          return;
        }
        console.log('we.live.LiveBaccartListItem::onclick - tableid' + this._tableId);
        dir.socket.enterTable(this._tableId);
        dir.sceneCtr.goto('ba', { tableid: this._tableId });
      }

      public onClickButton(evt: egret.Event) {
        if (env.livepageLocked) {
          env.livepageLocked = null;
        } else {
          env.livepageLocked = this._tableId;
        }
        dir.evtHandler.dispatch(we.core.Event.LIVE_PAGE_LOCK);
        if (env.livepageLocked) {
          egret.Tween.get(this._quickbetPanel).to({ y: 378, alpha: 1 }, 1000);
        } else {
          egret.Tween.get(this._quickbetPanel).to({ y: 300, alpha: 0 }, 1000);
        }
      }

      public setTableId(value: string) {
        this._tableId = value;
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
          const tw1 = egret.Tween.get(this).to({ scaleX: 1.05, scaleY: 1.05 }, 1000);
          const tw2 = egret.Tween.get(this._quickbetButton).to({ y: 300, alpha: 1 }, 1000);
        }
      }

      private onRollout() {
        if (!env.livepageLocked) {
          egret.Tween.removeTweens(this);
          egret.Tween.removeTweens(this._quickbetButton);
          const tw1 = egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 1000);
          const tw2 = egret.Tween.get(this._quickbetButton).to({ y: 350, alpha: 0 }, 1000);
        }
      }
    }
  }
}
