namespace we {
  export namespace ro {
    export class SideBetResultMessage extends core.BaseEUI implements we.ui.IGameResultMessage {
      protected _resultImage: eui.Image;
      protected _resultLabel: eui.Label;
      protected _resultLeftLabel: eui.Label;
      protected _resultRightLabel: eui.Label;
      // protected _isAnimating: boolean;

      public duration: number = 1600;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'ro.SideBetResultMessage');
        this.visible = false;
        // this._isAnimating = false;
      }

      public showResult(gameType: core.GameType, resultData: any) {
        this.visible = true;
        const { gameData } = resultData;
        const [numLeft, numCenter, numRight] = we.ro.getNeighbour(gameData.value, 1);

        const mapping = {};
        mapping[`${we.ro.Color.RED}${we.ro.Color.BLACK}${we.ro.Color.GREEN}`] = 'game_list_betarea_result_black_2_png';
        mapping[`${we.ro.Color.RED}${we.ro.Color.BLACK}${we.ro.Color.RED}`] = 'game_list_betarea_result_black_png';
        mapping[`${we.ro.Color.BLACK}${we.ro.Color.GREEN}${we.ro.Color.RED}`] = 'game_list_betarea_result_green_png';
        mapping[`${we.ro.Color.GREEN}${we.ro.Color.RED}${we.ro.Color.BLACK}`] = 'game_list_betarea_result_red_2_png';
        mapping[`${we.ro.Color.BLACK}${we.ro.Color.RED}${we.ro.Color.BLACK}`] = 'game_list_betarea_result_red_png';
        this._resultImage.source = mapping[`${we.ro.RACETRACK_COLOR[numLeft]}${we.ro.RACETRACK_COLOR[numCenter]}${we.ro.RACETRACK_COLOR[numRight]}`];

        this._resultLeftLabel.text = numLeft.toString();
        this._resultLabel.text = numCenter.toString();
        this._resultRightLabel.text = numRight.toString();
      }

      public clearMessage() {
        this.visible = false;
        // this.removeChildren();
      }
    }
  }
}
