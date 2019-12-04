namespace we {
  export namespace ba {
    export class GameResultMessage extends core.BaseEUI {
      private _bg: eui.Image;
      private _label: eui.IDisplayText & egret.DisplayObject;
      private _numlabel: eui.IDisplayText & egret.DisplayObject;

      private _isAnimating: boolean;

      public duration: number = 1600;

      public constructor() {
        super();
        this.visible = false;
        this._isAnimating = false;
      }

      public showResult(winType: ba.WinType, winAmount: number = NaN) {
        const isWin = !isNaN(winAmount) && winAmount > 0;
        egret.Tween.removeTweens(this);
        this.changeSkin(isWin);
        if (this._bg) {
          this.setBackground(winType, isWin);
        }
        this.start(winType, winAmount);
      }

      protected changeSkin(isWin: boolean) {
        if (isWin) {
          this.skinName = utils.getSkinByClassname('GameResultWinSkin');
        } else {
          this.skinName = utils.getSkinByClassname('GameResultNormalSkin');
        }
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
      }

      protected setBackground(winType: ba.WinType, isWin: boolean) {
        switch (winType) {
          case ba.WinType.BANKER:
            if (isWin) {
              this._bg.source = 'd_ba_gameresult_bankerelement_png';
            } else {
              this._bg.source = 'd_ba_gameresult_bankerwin_png';
            }
            break;
          case ba.WinType.PLAYER:
            if (isWin) {
              this._bg.source = 'd_ba_gameresult_playerelement_png';
            } else {
              this._bg.source = 'd_ba_gameresult_playerwin_png';
            }
            break;
          case ba.WinType.TIE:
            if (isWin) {
              this._bg.source = 'd_ba_gameresult_tieelement_png';
            } else {
              this._bg.source = 'd_ba_gameresult_tie_png';
            }
            break;
        }
      }

      protected start(winType: ba.WinType, winAmount: number) {
        this._isAnimating = true;
        if (this._numlabel) {
          this._numlabel.text = ``;
          this._numlabel.visible = false;
        }
        const tween = egret.Tween.get(this)
          .call(() => {
            const winTypeKey: string = ba.WinType[winType];
            const message: string = i18n.t(`baccarat.result.${winTypeKey}`);
            this.visible = true;
            this._label.visible = true;
            this._label.text = message;
          })
          .wait(this.duration);
        if (!isNaN(winAmount)) {
          tween
            .call(() => {
              const numStr: string = utils.formatNumber(winAmount);
              if (this._numlabel) {
                this._numlabel.text = `${winAmount > 0 ? '+' : ''}${numStr}`;
                this._numlabel.visible = true;
                this._label.visible = false;
              } else {
                this._label.text = `${winAmount > 0 ? '+' : ''}${numStr}`;
              }
            })
            .wait(this.duration);
        }
        tween.call(() => {
          this._isAnimating = false;
          this.visible = false;
        });
      }
    }
  }
}
