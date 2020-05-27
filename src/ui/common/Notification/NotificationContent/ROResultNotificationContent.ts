namespace we {
  export namespace ui {
    export class ROResultNotificationContent extends ResultNotificationContent {
      constructor() {
        super();
        this.currentState = 'RO';
      }

      protected updateResult(gameType, tabledata) {
        console.log('asdasdasdadadasdad', tabledata);
        const { value, winType } = tabledata;
        const allResult = we.ro.getNeighbour(value, 1);
        this._ROlblResult.text = allResult[1].toString();
        this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
        switch (value) {
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
        // switch (value) {
        //   case 0:
        //     this._resultImage.source = 'd_lw_game_detail_record_bet_east_png';
        //     break;
        //   case 1:
        //     this._resultImage.source = 'd_lw_history_record_east copy 2_png';
        //     break;
        //   case 2:
        //     this._resultImage.source = 'd_lw_history_record_east copy_png';
        //     break;
        //   case 3:
        //     this._resultImage.source = 'd_lw_history_record_east copy 19_png';
        //     break;
        //   case 4:
        //     this._resultImage.source = 'd_lw_history_record_east copy 17_png';
        //     break;
        //   case 5:
        //     this._resultImage.source = 'd_lw_history_record_east copy 22_png';
        //     break;
        //   case 6:
        //     this._resultImage.source = 'd_lw_history_record_east copy 3_png';
        //     break;
        //   default:
        //     break;
        // }
      }

      protected enterRoom() {
        dir.sceneCtr.goto('ro', { tableid: this.tableId });
        this.removeSelf();
      }
    }
  }
}
