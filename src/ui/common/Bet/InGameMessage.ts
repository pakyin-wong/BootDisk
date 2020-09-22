namespace we {
  export namespace ui {
    export class InGameMessage extends core.BaseEUI {
      public static readonly INFO: string = 'INFO';
      public static readonly SUCCESS: string = 'SUCCESS';
      public static readonly ERROR: string = 'ERROR';
      public static readonly EXPIRED: string = 'EXPIRED';

      public _infoBg: string;
      public _successBg: string;
      public _errorBg: string;
      public _expiredBg: string;

      private _content: eui.Group;
      private _bg: eui.Image;
      private _label: ui.RunTimeLabel;

      private _isAnimating: boolean;

      public duration: number = 3000;

      protected _nextMessage: ui.InGameMessage;
      protected _nextText: string;
      protected _nextType: any;

      public constructor() {
        super();
        this.visible = false;
        this._isAnimating = false;
        // this.skinName = utils.getSkinByClassname('InGameMessageSkin');
      }

      set infoBg(value: string) {
        this._infoBg = value;
      }

      get infoBg(): string {
        return this._infoBg;
      }

      set successBg(value: string) {
        this._successBg = value;
      }

      get successBg(): string {
        return this._successBg;
      }

      set errorBg(value: string) {
        this._errorBg = value;
      }

      get errorBg(): string {
        return this._errorBg;
      }

      set expiredBg(value: string) {
        this._expiredBg = value;
      }

      get expiredBg(): string {
        return this._expiredBg;
      }

      public showMessage(type: string, message: string, callback?: () => void) {
        if (this._bg) {
          this.setBackground(type);
        }
        this.start(type, message, callback);
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
          case InGameMessage.EXPIRED:
            this._bg.source = this.expiredBg;
            break;
        }
      }

      protected start(type: string, message: string, callback?: () => void) {
        egret.Tween.removeTweens(this);
        this._isAnimating = true;
        if (type === InGameMessage.EXPIRED) {
          const tween = egret.Tween.get(this)
            .call(() => {
              this.startAnimation(type);
              this.visible = false;
              this._label.visible = false;
              this._label.text = message;
            })
            .wait(this.duration)
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
          })
          .wait(200)
          .call(() => {
            if (callback) {
              callback();
            }
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
          case InGameMessage.EXPIRED:
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
