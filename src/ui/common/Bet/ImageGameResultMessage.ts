namespace we {
  export namespace ui {
    export class ImageGameResultMessage extends core.BaseEUI implements IGameResultMessage {
      protected _bg: eui.Image;
      protected _label: eui.IDisplayText & egret.DisplayObject;
      protected _numlabel: eui.IDisplayText & egret.DisplayObject;

      protected _isAnimating: boolean;

      public duration: number = 1600;

      public constructor() {
        super();
        this.visible = false;
        this._isAnimating = false;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        const { winType, winAmount } = resultData;
        const isWin = !isNaN(winAmount) && winAmount > 0;
        egret.Tween.removeTweens(this);
        this.changeSkin(isWin);
        if (this._bg) {
          this.setBackground(gameType, winType, isWin);
        }
        this.start(gameType, winType, winAmount);
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

      protected setBackground(gameType: core.GameType, winType: number, isWin: boolean) {
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
            switch (winType) {
              case ba.WinType.BANKER:
                this.setBackgroundImage('ba', 'red', isWin);
                break;
              case ba.WinType.PLAYER:
                this.setBackgroundImage('ba', 'blue', isWin);
                break;
              case ba.WinType.TIE:
                this.setBackgroundImage('ba', 'green', isWin);
                break;
            }
            break;
          case core.GameType.DT:
            switch (winType) {
              case dt.WinType.DRAGON:
                this.setBackgroundImage('dt', 'blue', isWin);
                break;
              case dt.WinType.TIGER:
                this.setBackgroundImage('dt', 'red', isWin);
                break;
              case dt.WinType.TIE:
                this.setBackgroundImage('dt', 'green', isWin);
                break;
            }
            break;
          case core.GameType.RO:
            break;
        }
      }

      protected setBackgroundImage(gametype: string, type: string, isWin: boolean) {
        switch (type) {
          case 'red':
            if (isWin) {
              this._bg.source = `d_ba_gameresult_bankerelement_png`;
            } else {
              this._bg.source = `d_ba_gameresult_bankerwin_png`;
            }
            break;
          case 'blue':
            if (isWin) {
              this._bg.source = `d_ba_gameresult_playerelement_png`;
            } else {
              this._bg.source = `d_ba_gameresult_playerwin_png`;
            }
            break;
          case 'green':
            if (isWin) {
              this._bg.source = `d_ba_gameresult_tieelement_png`;
            } else {
              this._bg.source = `d_ba_gameresult_tie_png`;
            }
            break;
        }
      }

      public clearMessage() {
        egret.Tween.removeTweens(this);
        this._isAnimating = false;
        this.visible = false;
      }

      protected start(gameType: core.GameType, winType: number, winAmount: number) {
        egret.Tween.removeTweens(this);
        this._isAnimating = true;
        if (this._numlabel) {
          this._numlabel.text = ``;
          this._numlabel.visible = false;
        }
        const tween = egret.Tween.get(this)
          .call(() => {
            const message: string = i18n.t(utils.getWinMessageKey(gameType, winType));
            this.visible = true;
            this._label.visible = true;
            this._label.text = message;
          })
          .wait(this.duration);
        if (!isNaN(winAmount)) {
          tween
            .call(() => {
              const numStr: string = utils.formatNumber(winAmount, true);
              if (this._numlabel) {
                this._numlabel.text = `${winAmount > 0 ? '+' : ''}${numStr}`;
                this._numlabel.visible = true;
                this._label.visible = false;
              } else {
                this._label.text = `${winAmount > 0 ? '+' : ''}${numStr}`;
              }
            })
            .wait(this.duration);
        } else {
          tween.wait(this.duration);
        }
        tween.call(() => {
          this._isAnimating = false;
          this.visible = false;
        });
      }
    }
  }
}
