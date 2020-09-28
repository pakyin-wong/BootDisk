// TypeScript file
namespace we {
  export namespace rc {
    export class RCTraditionalBettingPanel extends lo.SSCTraditionalBettingPanel {
      protected _lblResultBall5: ui.RunTimeLabel;
      protected _lblResultBall6: ui.RunTimeLabel;
      protected _lblResultBall7: ui.RunTimeLabel;
      protected _lblResultBall8: ui.RunTimeLabel;
      protected _lblResultBall9: ui.RunTimeLabel;

      protected _lblLastBall5: ui.RunTimeLabel;
      protected _lblLastBall6: ui.RunTimeLabel;
      protected _lblLastBall7: ui.RunTimeLabel;
      protected _lblLastBall8: ui.RunTimeLabel;
      protected _lblLastBall9: ui.RunTimeLabel;

      protected _lblPrevBall5: ui.RunTimeLabel;
      protected _lblPrevBall6: ui.RunTimeLabel;
      protected _lblPrevBall7: ui.RunTimeLabel;
      protected _lblPrevBall8: ui.RunTimeLabel;
      protected _lblPrevBall9: ui.RunTimeLabel;

      constructor(skin: string = null) {
        super(skin);
        this.initSkin();
      }

      protected initSkin() {
        this.skinName = 'skin_desktop.rc.RCTraditionalBettingPanel';
      }

      public updateBetInfo(data) {
        super.updateBetInfo(data);
        switch (data.state) {
          case core.GameState.DEAL:
          case core.GameState.FINISH:
            this._lblResultBall5.renderText = () => (data.ball5 >= 0 ? `${data.ball5}` : '-');
            this._lblResultBall6.renderText = () => (data.ball6 >= 0 ? `${data.ball6}` : '-');
            this._lblResultBall7.renderText = () => (data.ball7 >= 0 ? `${data.ball7}` : '-');
            this._lblResultBall8.renderText = () => (data.ball8 >= 0 ? `${data.ball8}` : '-');
            this._lblResultBall9.renderText = () => (data.ball9 >= 0 ? `${data.ball9}` : '-');
            break;
          default:
            this._lblCurrentRoundState.renderText = () => `${i18n.t('lo_fun_lastRound')}`;
        }
      }
      public updateBetTableInfo(info) {
        super.updateBetTableInfo(info);
        if (info.gamestatistic.loresults) {
          const data = info.gamestatistic.loresults;
          let index = data.length - 1;

          this._lblCurrentRoundState.renderText = () => `${data[index].Roundnumber + i18n.t('lo_fun_drawingRound')}`;
          this._lblResultBall5.renderText = () => (data[index].Data.ball5 >= 0 ? `${data[index].Data.ball5}` : '-');
          this._lblResultBall6.renderText = () => (data[index].Data.ball6 >= 0 ? `${data[index].Data.ball6}` : '-');
          this._lblResultBall7.renderText = () => (data[index].Data.ball7 >= 0 ? `${data[index].Data.ball7}` : '-');
          this._lblResultBall8.renderText = () => (data[index].Data.ball8 >= 0 ? `${data[index].Data.ball8}` : '-');
          this._lblResultBall9.renderText = () => (data[index].Data.ball9 >= 0 ? `${data[index].Data.ball9}` : '-');

          if (data.length >= 2) {
            index = data.length - 2;

            this._lblLastRound.renderText = () => `${data[index].Roundnumber}`;
            this._lblLastBall5.renderText = () => (data[index].Data.ball5 >= 0 ? `${data[index].Data.ball5}` : '-');
            this._lblLastBall6.renderText = () => (data[index].Data.ball6 >= 0 ? `${data[index].Data.ball6}` : '-');
            this._lblLastBall7.renderText = () => (data[index].Data.ball7 >= 0 ? `${data[index].Data.ball7}` : '-');
            this._lblLastBall8.renderText = () => (data[index].Data.ball8 >= 0 ? `${data[index].Data.ball8}` : '-');
            this._lblLastBall9.renderText = () => (data[index].Data.ball9 >= 0 ? `${data[index].Data.ball9}` : '-');
          }
          if (data.length >= 3) {
            index = data.length - 3;

            this._lblPrevRound.renderText = () => `${data[index].Roundnumber}`;
            this._lblPrevBall5.renderText = () => (data[index].Data.ball5 >= 0 ? `${data[index].Data.ball5}` : '-');
            this._lblPrevBall6.renderText = () => (data[index].Data.ball6 >= 0 ? `${data[index].Data.ball6}` : '-');
            this._lblPrevBall7.renderText = () => (data[index].Data.ball7 >= 0 ? `${data[index].Data.ball7}` : '-');
            this._lblPrevBall8.renderText = () => (data[index].Data.ball8 >= 0 ? `${data[index].Data.ball8}` : '-');
            this._lblPrevBall9.renderText = () => (data[index].Data.ball9 >= 0 ? `${data[index].Data.ball9}` : '-');
          }
        }
      }
    }
  }
}
