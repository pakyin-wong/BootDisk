namespace we {
  export namespace ui {
    export class LWResultNotificationContent extends ResultNotificationContent {
      constructor() {
        super();
        this.currentState = 'LW';
      }

      protected updateResult(gameType, tabledata) {
        const { value, winType } = tabledata;
        this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
        switch (value) {
          case 0:
            this._resultImage.source = 'd_lw_game_detail_record_bet_east_png';
            break;
          case 1:
            this._resultImage.source = 'd_lw_history_record_east copy 2_png';
            break;
          case 2:
            this._resultImage.source = 'd_lw_history_record_east copy_png';
            break;
          case 3:
            this._resultImage.source = 'd_lw_history_record_east copy 19_png';
            break;
          case 4:
            this._resultImage.source = 'd_lw_history_record_east copy 17_png';
            break;
          case 5:
            this._resultImage.source = 'd_lw_history_record_east copy 22_png';
            break;
          case 6:
            this._resultImage.source = 'd_lw_history_record_east copy 3_png';
            break;
          default:
            break;
        }
      }

      protected enterRoom() {
        dir.sceneCtr.goto('lw', { tableid: this.tableId });
        this.removeSelf();
      }
    }
  }
}
