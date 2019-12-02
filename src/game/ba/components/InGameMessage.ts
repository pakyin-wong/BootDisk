namespace we {
  export namespace ba {
    export class InGameMessage extends core.BaseEUI {
      private _bg: eui.Image;
      private _label: ui.RunTimeLabel;

      private _isAnimating: boolean;

      public constructor() {
        super();
        this.visible = false;
        this._isAnimating = false;
        this.skinName = utils.getSkinByClassname('InGameMessageSkin');
      }

      public showMessage(type: string, message: string) {
        // this.changeSkin(isWin);
        //   if (this._bg) {
        //     this.setBackground(winType, isWin);
        //   }
        //   this.start(winType, winAmount);
      }

      protected changeSkin() {
        // if (isWin) {
        //   this.skinName = utils.getSkinByClassname('GameResultWinSkin');
        // } else {
        //   this.skinName = utils.getSkinByClassname('GameResultNormalSkin');
        // }
        // this.anchorOffsetX = this.width * 0.5;
        // this.anchorOffsetY = this.height * 0.5;
      }

      protected setBackground() {
        // switch (winType) {
        //   case ba.WinType.BANKER:
        //     if (isWin) {
        //       this._bg.source = 'd_ba_gameresult_bankerelement_png';
        //     } else {
        //       this._bg.source = 'd_ba_gameresult_bankerwin_png';
        //     }
        //     break;
        //   case ba.WinType.PLAYER:
        //     if (isWin) {
        //       this._bg.source = 'd_ba_gameresult_playerelement_png';
        //     } else {
        //       this._bg.source = 'd_ba_gameresult_playerwin_png';
        //     }
        //     break;
        //   case ba.WinType.TIE:
        //     if (isWin) {
        //       this._bg.source = 'd_ba_gameresult_tieelement_png';
        //     } else {
        //       this._bg.source = 'd_ba_gameresult_tie_png';
        //     }
        //     break;
        // }
      }

      protected start() {
        // this._isAnimating = true;
        // if (this._numlabel) {
        //   this._numlabel.text = ``;
        //   this._numlabel.visible = false;
        // }
        // const tween = egret.Tween.get(this)
        //   .call(() => {
        //     const winTypeKey: string = ba.WinType[winType];
        //     const message: string = `result.${winTypeKey}`;
        //     this.visible = true;
        //     this._label.visible = true;
        //     this._label.text = message;
        //   })
        //   .wait(1000);
        // if (!isNaN(winAmount)) {
        //   tween
        //     .call(() => {
        //       const numStr: string = utils.formatNumber(winAmount);
        //       if (this._numlabel) {
        //         this._numlabel.text = `${winAmount > 0 ? '+' : ''}${numStr}`;
        //         this._numlabel.visible = true;
        //         this._label.visible = false;
        //       } else {
        //         this._label.text = `${winAmount > 0 ? '+' : ''}${numStr}`;
        //       }
        //     })
        //     .wait(1000);
        // }
        // tween.call(() => {
        //   this._isAnimating = false;
        //   this.visible = false;
        // });
      }
    }
  }
}
