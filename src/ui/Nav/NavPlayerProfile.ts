namespace we {
  export namespace ui {
    export class NavPlayerProfile extends Panel {
      private _maskContainer: eui.Group;
      private _section_main: eui.Group;
      private _section_iconSelect: eui.Group;
      private _playerIcon: eui.Image;
      private _sectionBackIcon: eui.Image;
      private _iconScroller: we.ui.Scroller;

      public constructor() {
        super('NavPlayerProfile');
      }

      protected mount() {
        super.mount();
        // create mask
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRect(this._maskContainer.x, this._maskContainer.y, this._maskContainer.width, this._maskContainer.height);
        shape.graphics.endFill();
        this._maskContainer.addChild(shape);
        this._maskContainer.mask = shape;
        // init scroller
        const grids = new eui.Group();
        const tlayout = new eui.TileLayout();
        const gapSize = 20;
        const paddingHorizontal = 20;
        tlayout.requestedColumnCount = 3;
        tlayout.paddingLeft = paddingHorizontal;
        tlayout.paddingRight = paddingHorizontal;
        tlayout.horizontalGap = gapSize;
        tlayout.verticalGap = gapSize;
        tlayout.columnWidth = (this._iconScroller.width - paddingHorizontal * 2 - gapSize * (tlayout.requestedColumnCount - 1)) / tlayout.requestedColumnCount;
        grids.layout = tlayout;
        for (let i = 1; i <= 8; i += 1) {
          for (let abc = 1; abc <= 2; abc += 1) {
            const image = new eui.Image();
            image.source = RES.getRes(`d_lobby_profile_pic_0${i}_png`);
            image.width = image.height = tlayout.columnWidth;
            grids.addChild(image);
          }
        }
        this._iconScroller.useMiniScrollBar = true;
        this._iconScroller.viewport = grids;

        this.addListeners();
      }

      protected destroy() {
        this.removeListeners();
      }

      private addListeners() {
        this._playerIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToIconSelectSection, this);
        this._sectionBackIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToMainSection, this);
      }

      private removeListeners() {
        this._playerIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToIconSelectSection, this);
        this._sectionBackIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.slideToMainSection, this);
      }

      private slideToIconSelectSection() {
        // cancel current tween
        egret.Tween.removeTweens(this._section_main);
        egret.Tween.removeTweens(this._section_iconSelect);
        // tween move to new position
        egret.Tween.get(this._section_main).to({ $x: -this._section_main.width }, 200);
        egret.Tween.get(this._section_iconSelect).to({ $x: 0 }, 200);
      }

      private slideToMainSection() {
        // cancel current tween
        egret.Tween.removeTweens(this._section_main);
        egret.Tween.removeTweens(this._section_iconSelect);
        // tween move to new position
        egret.Tween.get(this._section_main).to({ $x: 0 }, 200);
        egret.Tween.get(this._section_iconSelect).to({ $x: this._section_iconSelect.width }, 200);
      }
    }
  }
}
