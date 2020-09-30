namespace we {
  export namespace lw {
    export class SideBetResultMessage extends core.BaseEUI implements we.ui.IGameResultMessage {
      protected _resultGroup: eui.Group;
      protected _winAmountGroup: eui.Group;
      protected _resultImage: eui.Image;
      protected _resultBackground: eui.Image;
      protected _lblWinAmount: eui.Label;
      protected _isAnimating: boolean;

      public duration: number = 1600;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'lw.SideBetResultMessage');
        this.visible = false;
        this._isAnimating = false;
      }

      protected getResultImage(value): any {
        switch (value) {
          case '01':
            return 'd_lw_listpenal_result_east_png';
          case '02':
            return 'd_lw_listpenal_result_south_png';
          case '03':
            return 'd_lw_listpenal_result_west_png';
          case '04':
            return 'd_lw_listpenal_result_north_png';
          case '05':
            return 'd_lw_listpenal_result_white_png';
          case '06':
            return 'd_lw_listpenal_result_red_png';
          case '07':
            return 'd_lw_listpenal_result_green_png';
        }
        return null;
      }

      protected getBannerImage(value): any {
        switch (value) {
          case '01':
            return 'd_lw_listpenal_result_money_bg_east_png';
          case '02':
            return 'd_lw_listpenal_result_money_bg_south_png';
          case '03':
            return 'd_lw_listpenal_result_money_bg_west_png';
          case '04':
            return 'd_lw_listpenal_result_money_bg_north_png';
          case '05':
            return 'd_lw_listpenal_result_money_bg_white_png';
          case '06':
            return 'd_lw_listpenal_result_money_bg_gold_png';
          case '07':
            return 'd_lw_listpenal_result_money_bg_gold_png';
        }
        return null;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        const { winAmount, gameData } = resultData;
        // console.log('di.SideBetResultMessage::showResult().resultData ', resultData);
        this.visible = true;
        this._resultGroup.visible = true;
        this._winAmountGroup.visible = false;
        this._resultImage.source = this.getResultImage(gameData.value);
        this._resultBackground.source = this.getBannerImage(gameData.value);

        if (!isNaN(winAmount)) {
          this._lblWinAmount.text = utils.formatNumber(winAmount, true);
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
              this._resultGroup.visible = false;
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
