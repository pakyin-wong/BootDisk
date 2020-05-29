namespace we {
  export namespace di {
    export class SideBetResultMessage extends core.BaseEUI implements we.ui.IGameResultMessage {
      protected _diceBackground: eui.Image;
      protected _diceGroup: eui.Group;
      protected _winAmountBackground: eui.Image;
      protected _winAmountGroup: eui.Group;
      protected _dice1: eui.Image;
      protected _dice2: eui.Image;
      protected _dice3: eui.Image;
      protected _badgeRed: eui.Label;
      protected _badgeBlue: eui.Label;
      protected _badgeGreen: eui.Label;
      protected _lblSum: eui.Label;
      protected _lblWinAmount: eui.Label;
      protected _isAnimating: boolean;

      public duration: number = 1600;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'di.SideBetResultMessage');
        this.visible = false;
        this._isAnimating = false;
      }

      protected getDiceImage(value) {
        return `d_sic_history_lv3_dice-${value}_png`;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        const { winAmount, gameData } = resultData;

        const { dice1, dice2, dice3, size, odd, total } = <di.GameData> gameData;

        console.log('di.SideBetResultMessage::showResult().resultData ', resultData);
        this.visible = true;
        this._diceGroup.visible = true;
        this._winAmountGroup.visible = false;
        this._dice1.source = this.getDiceImage(dice1);
        this._dice2.source = this.getDiceImage(dice2);
        this._dice3.source = this.getDiceImage(dice3);

        this._lblSum.text = total.toString();

        if (!isNaN(winAmount)) {
          // has bet
          this._diceBackground.source = 'd_sic_game result_bg_01_png';
          this._winAmountBackground.source = 'd_sic_game result_bg_03_png';
          this._lblWinAmount.text = utils.formatNumber(winAmount, true);
        } else {
          // no bet
          this._diceBackground.source = 'd_sic_game result_bg_02_png';
          this._winAmountBackground.source = 'd_sic_game result_bg_04_png';
        }
        this._badgeRed.text = size === 1 ? '小' : '大';
        this._badgeBlue.text = odd === 1 ? '單' : '雙';
        this._badgeGreen.parent.visible = false;
        this.start(gameType, gameData, winAmount);
      }

      public clearMessage() {
        egret.Tween.removeTweens(this);
        this._isAnimating = false;
        this.visible = false;
      }

      protected start(gameType: core.GameType, gameData: number, winAmount: number) {
        egret.Tween.removeTweens(this);
        this._isAnimating = true;
        const tween = egret.Tween.get(this).wait(this.duration);
        if (!isNaN(winAmount)) {
          tween
            .call(() => {
              this._diceGroup.visible = false;
              this._winAmountGroup.visible = true;
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
