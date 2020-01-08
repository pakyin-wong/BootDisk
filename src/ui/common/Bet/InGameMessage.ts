namespace we {
  export namespace ui {
    export class InGameMessage extends core.BaseEUI {
      public static readonly INFO: string = 'INFO';
      public static readonly SUCCESS: string = 'SUCCESS';
      public static readonly ERROR: string = 'ERROR';

      public _infoBg: string;
      public _successBg: string;
      public _errorBg: string;

      private _content: eui.Group;
      private _bg: eui.Image;
      private _label: ui.RunTimeLabel;

      private _isAnimating: boolean;

      public duration: number = 3000;

      public constructor() {
        super();
        this.visible = false;
        this._isAnimating = false;
        this.skinName = utils.getSkinByClassname('InGameMessageSkin');
      }

      set infoBg(value: string) {
        this._infoBg = value;
      }

      get infoBg() {
        return this._infoBg;
      }

      set successBg(value: string) {
        this._successBg = value;
      }

      get successBg() {
        return this._successBg;
      }

      set errorBg(value: string) {
        this._errorBg = value;
      }

      get errorBg() {
        return this._errorBg;
      }

      public showMessage(type: string, message: string) {
        if (this._bg) {
          this.setBackground(type);
        }
        this.start(type, message);
      }

      protected setBackground(type: string) {
        switch (type) {
          case InGameMessage.INFO:
            this._bg.source = this.infoBg;
            break;
          case InGameMessage.SUCCESS:
            this._bg.source = this.successBg;
            break;
          case InGameMessage.ERROR:
            this._bg.source = this.errorBg;
            break;
        }
      }

      protected start(type: string, message: string) {
        egret.Tween.removeTweens(this);
        this._isAnimating = true;
        const tween = egret.Tween.get(this)
          .call(() => {
            this.startAnimation(type);
            this.visible = true;
            this._label.visible = true;
            this._label.text = message;
          })
          .wait(this.duration)
          .call(() => {
            this.endAnimation(type);
          });
      }

      protected startAnimation(type: string) {
        egret.Tween.removeTweens(this._content);
        this._content.alpha = 0;
        this._content.x = 0;
        this._content.y = this._content.height;
        switch (type) {
          case InGameMessage.INFO:
          case InGameMessage.SUCCESS:
            const move = egret.Tween.get(this._content);
            move.to({ y: 0, alpha: 1 }, 200, egret.Ease.quadOut);
            break;
          case InGameMessage.ERROR:
            const shake = egret.Tween.get(this._content);
            shake
              .to({ y: 0, alpha: 1 }, 200, egret.Ease.quadOut)
              .wait(50)
              .to({ x: 10 }, 50, egret.Ease.bounceOut)
              .to({ x: -10 }, 50, egret.Ease.bounceIn)
              .to({ x: 10 }, 50, egret.Ease.bounceOut)
              .to({ x: 0 }, 100, egret.Ease.bounceIn);
            break;
        }
      }

      protected endAnimation(type: string) {
        egret.Tween.removeTweens(this._content);
        const move = egret.Tween.get(this._content);
        move.to({ y: this._content.height, alpha: 0 }, 200, egret.Ease.quadOut).call(() => {
          this._isAnimating = false;
          this.visible = false;
        });
      }
    }
  }
}
