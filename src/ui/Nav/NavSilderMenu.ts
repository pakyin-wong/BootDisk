namespace we {
  export namespace ui {
    export class NavSilderMenu extends core.BaseEUI {
      private _overlayMask: egret.Shape;
      private _sliderMenu: NavSideMenu;

      public constructor() {
        super();
      }

      protected mount() {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;

        if (env.isMobile) {
          this._sliderMenu = new NavSideMenu(true);
          this._sliderMenu.isPoppable = true;
          this._sliderMenu.dismissOnClickOutside = true;
          this._sliderMenu.isFocusItem = true;

          this._overlayMask = new egret.Shape();
          this._overlayMask.graphics.beginFill(0x000000, 0.3);
          this._overlayMask.graphics.drawRect(0, 0, this.width, this.height);
          this._overlayMask.graphics.endFill();

          this.visible = false;

          this.addChild(this._overlayMask);
          this.addChild(this._sliderMenu);

          this.addListeners();
        }
      }

      protected addListeners() {
        dir.evtHandler.$addListener(core.Event.TOGGLE_SILDER_MENU, this.onToggle, this);
      }

      protected onToggle(e: egret.Event) {
        this.show();
      }

      public async show() {
        if (this.visible) {
          return;
        }

        this.visible = true;
        this._overlayMask.alpha = 0;
        egret.Tween.removeTweens(this._overlayMask);
        egret.Tween.get(this._overlayMask).to({ alpha: 1 }, 250);

        this._sliderMenu.once('close', this.onItemClose, this);
        this._sliderMenu.show();
      }

      public hide() {
        this._sliderMenu.removeEventListener('close', this.onItemClose, this);
        this._sliderMenu.hide();
        this.fadeout();
      }

      private onItemClose() {
        this._sliderMenu.removeEventListener('close', this.onItemClose, this);
        this.fadeout();
      }

      private fadeout() {
        egret.Tween.removeTweens(this._overlayMask);
        egret.Tween.get(this._overlayMask)
          .to({ alpha: 0 }, 250)
          .call(() => {
            this.visible = false;
          }, this);
      }
    }
  }
}
