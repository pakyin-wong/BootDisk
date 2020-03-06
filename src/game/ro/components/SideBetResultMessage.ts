namespace we {
  export namespace ro {
    export class SideBetResultMessage extends core.BaseEUI implements we.ui.IGameResultMessage {
      protected _resultImage: eui.Image;
      protected _resultLabel: eui.Label;
      protected _resultLeftLabel: eui.Label;
      protected _resultRightLabel: eui.Label;
      // protected _isAnimating: boolean;

      public duration: number = 1600;

      public constructor() {
        super('ro/GameResult/SideBetResultMessage');
        this.visible = false;
        // this._isAnimating = false;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        console.log('ro.SideBetResultMessage::showResult().resultData ', resultData);
        this.visible = true;
        const resultValue = resultData.value;
        const allResult = we.ro.getNeighbour(resultValue, 1);
        this._resultLeftLabel.text = allResult[0].toString();
        this._resultLabel.text = allResult[1].toString();
        this._resultRightLabel.text = allResult[2].toString();
        switch (we.ro.RACETRACK_COLOR[resultValue]) {
          case we.ro.Color.RED:
            this._resultImage.source = 'd_lobby_ro_panel_gamelist_gameresult_red_win_png';
            break;
          case we.ro.Color.BLACK:
            this._resultImage.source = 'd_lobby_ro_panel_gamelist_gameresult_black_win_png';
            break;
          case we.ro.Color.GREEN:
          default:
            this._resultImage.source = 'd_lobby_ro_panel_gamelist_gameresult_green_win_png';
            break;
        }
      }

      public clearMessage() {
        this.visible = false;
        // this.removeChildren();
      }
    }
  }
}
