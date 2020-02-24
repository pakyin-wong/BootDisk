namespace we {
  export namespace ui {
    export class GamePanelTabButton extends core.BaseEUI {
      private tweenDuration: number = 250;

      private _badge: eui.Group;
      private _badgeLabel: eui.Group;
      private _label: ui.RunTimeLabel;
      private _background: eui.Image;
      public labelKey: string;

      private _content: eui.Group;

      private _focus: boolean;

      constructor() {
        super();
      }

      protected mount() {
        super.mount();
        this._content.removeChild(this._label);
        this.addEventListeners();
      }

      protected destroy() {
        super.mount();
        this.removeEventListeners();
      }

      protected addEventListeners() {
      }

      protected removeEventListeners() {

      }

      public set focus(value: boolean) {
        this._focus = value;
        this._setFocus(value);
      }

      public get focus(): boolean {
        return this._focus;
      }

      private _setFocus(isFocus) {
        if (this._focus === isFocus) return;
        this.setBadgeVisible(!isFocus);
        this.setBackgroundVisible(isFocus);
        if (isFocus) {
          this._content.addChild(this._label);
        } else {
          this._content.removeChild(this._label);
        }
      }

      public $setWidth(value: number) {
        value = isNaN(value) ? NaN : value;
        if (this.$explicitWidth == value) {
          return;
        }
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ $explicitWidth: value }, this.tweenDuration);
        // this.$explicitWidth = value;
      }

      private setBadgeVisible(isVisible) {
        if (isVisible) {
          this._badge.visible = true;
          this._badge.scaleX = 0;
          this._badge.scaleY = 0;
          egret.Tween.removeTweens(this._badge);
          egret.Tween.get(this._badge).to({
            scaleX: 1, scaleY: 1
          }, this.tweenDuration, egret.Ease.elasticOut);
        } else {
          egret.Tween.removeTweens(this._badge);
          egret.Tween.get(this._badge).to({
            scaleX: 0, scaleY: 0
          }, this.tweenDuration, egret.Ease.elasticIn).call(() => {
            this._badge.visible = false;
          });
        }
      }

      private setBackgroundVisible(isVisible) {
        if (isVisible) {
          egret.Tween.get(this).to({ alpha: 1 }, this.tweenDuration * 0.5);
        } else {
          egret.Tween.get(this).to({ alpha: 0 }, this.tweenDuration * 0.5);
        }
      }
    }
  }
}