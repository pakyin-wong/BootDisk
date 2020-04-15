// TypeScript file
namespace we {
  export namespace di {
    export class MobileSideBetResultMessage extends SideBetResultMessage implements we.ui.IGameResultMessage {
      protected _bg: eui.Image;

      public constructor(skin?: string) {
        super('di.SideBetResultMessage');
        this.visible = false;
        this._isAnimating = false;
      }

      protected getDiceImage(value) {
        return `d_sic_history_lv3_dice-${value}_png`;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        const { winAmount, gameData } = resultData;
        console.log('di.SideBetResultMessage::showResult().resultData ', resultData);
        this.visible = true;
        this._diceGroup.visible = true;
        this._winAmountGroup.visible = false;
        this._dice1.source = this.getDiceImage(gameData.dice1);
        this._dice2.source = this.getDiceImage(gameData.dice2);
        this._dice3.source = this.getDiceImage(gameData.dice3);

        if (!isNaN(winAmount)) {
          this._lblWinAmount.text = utils.formatNumber(winAmount, true);
          if (winAmount > 0) this._bg.source = 'm_sb_panel_gamelist_result_data_win_png';
          else this._bg.source = 'm_sb_panel_gamelist_result_data_lose_png';
        }

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
