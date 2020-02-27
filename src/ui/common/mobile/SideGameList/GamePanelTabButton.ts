namespace we {
  export namespace ui {
    export class GamePanelTabButton extends core.BaseEUI {
      private tweenDuration: number = 250;

      private _badge: eui.Group;
      private _label: ui.RunTimeLabel;
      private _image: eui.Image;
      private _badgeLabel: eui.Label;
      private _background: eui.Image;
      public labelKey: string = '';
      public imageKey: string = '';

      private _content: eui.Group;

      private _focus: boolean;

      constructor() {
        super();
      }

      protected mount() {
        super.mount();
        this._content.removeChild(this._label);
        this._background.alpha = 0;
        this.width = this._content.width;
        this._label.renderText = () => i18n.t(this.labelKey);
        this._image.source = `${this.imageKey}_dim_png`;
        this._badge.visible = false;
        this.addEventListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeEventListeners();
      }

      protected addEventListeners() {}

      protected removeEventListeners() {}

      public set focus(value: boolean) {
        if (this._focus === value) {
          return;
        }
        this._focus = value;
        this._setFocus(value);
      }

      public get focus(): boolean {
        return this._focus;
      }

      private _setFocus(isFocus) {
        this.setBadgeVisible(!isFocus);
        this.setBackgroundVisible(isFocus);
        if (isFocus) {
          this._content.addChild(this._label);
          this.validateNow();
          egret.Tween.removeTweens(this);
          egret.Tween.get(this).to({ width: this._content.measuredWidth + 40 }, this.tweenDuration);
          this._image.source = `${this.imageKey}_png`;
        } else {
          if (this._label.parent) {
            this._content.removeChild(this._label);
          }
          this.validateNow();
          egret.Tween.removeTweens(this);
          egret.Tween.get(this).to({ width: this._content.measuredWidth + 40 }, this.tweenDuration);
          this._image.source = `${this.imageKey}_dim_png`;
        }
      }

      private setBadgeVisible(isVisible) {
        if (isVisible) {
          if (parseInt(this._badgeLabel.text, 10) <= 0) {
            return;
          }
          this._badge.visible = true;
          this._badge.scaleX = 0;
          this._badge.scaleY = 0;
          egret.Tween.removeTweens(this._badge);
          egret.Tween.get(this._badge).to(
            {
              scaleX: 1,
              scaleY: 1,
            },
            this.tweenDuration,
            egret.Ease.backOut
          );
        } else {
          if (!this._badge.visible) {
            return;
          }
          egret.Tween.removeTweens(this._badge);
          egret.Tween.get(this._badge)
            .to(
              {
                scaleX: 0,
                scaleY: 0,
              },
              this.tweenDuration,
              egret.Ease.backIn
            )
            .call(() => {
              this._badge.visible = false;
            });
        }
      }

      private setBackgroundVisible(isVisible) {
        if (isVisible) {
          egret.Tween.get(this._background).to({ alpha: 1 }, this.tweenDuration * 0.5);
        } else {
          egret.Tween.get(this._background).to({ alpha: 0 }, this.tweenDuration * 0.5);
        }
      }

      public setBadge(value: number) {
        this._badgeLabel.text = value.toString();
        if (!this.focus) {
          if (value > 0) {
            this.setBadgeVisible(true);
            this._label.renderText = () => `${i18n.t(this.labelKey)} (${value})`;
          } else {
            this.setBadgeVisible(false);
            this._label.renderText = () => `${i18n.t(this.labelKey)}`;
          }
        }
      }
    }
  }
}
