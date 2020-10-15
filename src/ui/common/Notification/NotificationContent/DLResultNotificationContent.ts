namespace we {
  export namespace ui {
    export class DLResultNotificationContent extends ResultNotificationContent {
      private colorIndex: string[] = ['yellow', 'orange', 'red', 'pink', 'purple', 'blue', 'indigo', 'green', 'green', 'indigo', 'blue', 'purple', 'pink', 'red', 'orange', 'yellow'];

      constructor() {
        super();
        this.currentState = 'DL';
      }

      // protected getDiceImage(value) {
      //   return `d_sic_history_lv3_dice-${value}_png`;
      // }
      // this._borderImage.source = (env.isMobile ? 'm' : 'd') + '_gfsb_panel_roadmap_record_multiple_' + this.colorIndex[value.v - 3] + '_png';
      // this._iconTopText.text = value.odds + 'X';
      protected updateResult(gameType, tabledata) {
        // console.log('[gameType,tabledata]', [gameType, tabledata]);
        const { dice1, dice2, dice3, luckynumber } = tabledata;
        const gameResult = dice1 + dice2 + dice3;
        let luckynumberOdd;
        // console.log('gameResult', [gameResult, typeof gameResult]);
        // console.log('luckynumber', luckynumber);
        // console.log('object.keys(luckynumber)[0]', [Object.keys(luckynumber)[0], typeof Object.keys(luckynumber)[0]]);
        if (gameResult.toString() in luckynumber) {
          // console.log('gameResult.toString() in luckynumber', gameResult.toString() in luckynumber);
          this._lblDilLuckyResult.visible = true;
          this._lblDilnonLuckyResult.visible = false;
          luckynumberOdd = luckynumber[gameResult.toString()];
          this._lblDilResultTop.text = luckynumberOdd + 'X';
          this._lblDilResultBottom.text = gameResult;
          this._DLresultImage.source = (env.isMobile ? 'm' : 'd') + '_gfsb_panel_roadmap_record_multiple_' + this.colorIndex[gameResult - 3] + '_png';
          // console.log('luckynumberOdd', luckynumberOdd);
        } else {
          // console.log('gameResult.toString() in luckynumber', gameResult.toString() in luckynumber);
          this._lblDilLuckyResult.visible = false;
          this._lblDilnonLuckyResult.visible = true;
          this._lblDilResult1.text = gameResult;
        }
        // this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
        // if (dice1 && dice2 && dice3) {
        //   this._DIresultImage1.source = this.getDiceImage(dice1);
        //   this._DIresultImage2.source = this.getDiceImage(dice2);
        //   this._DIresultImage3.source = this.getDiceImage(dice3);
        // }
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
        dir.sceneCtr.goto('di', { tableid: this.tableId });
        this.removeSelf();
      }
    }
  }
}
