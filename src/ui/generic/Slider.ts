namespace we {
  export namespace ui {
    export class Slider extends core.BaseEUI {
      //   public customSkin:string = "baseSlider";
      private _mask: egret.Shape;
      private _toggle: egret.DisplayObject;
      private _bg: egret.DisplayObject;
      private _bar: egret.DisplayObject;
      private _max: number = 1;
      private _v: number = 0;
      private _stageX: number;

      constructor() {
        super();
        //  this.skinName = utils.getSkin(this.customSkin);
      }

      protected mount() {
        this._mask = new egret.Shape();
        this._mask.graphics.beginFill(0x000000, 1);
        this._mask.graphics.drawRect(0, 0, this._bar.width, this._bar.height);
        this._mask.graphics.endFill();
        this.addChild(this._mask);
        this._mask.$x = this._bar.$x;
        this._mask.$y = this._bar.$y;
        this._bar.mask = this._mask;

        this._toggle.$addListener(egret.TouchEvent.TOUCH_BEGIN, this.onToggleClick, this);

        this.render();
      }

      protected onToggleClick() {
        this._stageX = this.localToGlobal(this.$x, this.$y).x;
        this.stage.$addListener(egret.TouchEvent.TOUCH_MOVE, this.onToggleMove, this);
        this.stage.$addListener(egret.TouchEvent.TOUCH_END, this.onToggleRelease, this);
      }

      protected onToggleMove(e: egret.TouchEvent) {
        const movedTo = Math.max(this._stageX, Math.min(e.$stageX, this._stageX + this.width - this._toggle.width)) - this._stageX;
        this.value = this._max * (movedTo / (this.width - this._toggle.width));
      }

      protected onToggleRelease() {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onToggleMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onToggleRelease, this);
      }

      public set maximum(m: number) {
        this._max = m;
        this.render();
      }

      public set value(v: number) {
        this._v = v;
        this.render();
      }

      private render() {
        this._mask.$setScaleX(this._v / this._max);
        this._toggle.$x = (this.width - this._toggle.width) * (this._v / this._max);
      }
    }
  }
}
