// namespace we {
//   export namespace lw {
//     // export enum WinType {
//     //   NONE,
//     //   DRAGON,
//     //   TIGER,
//     //   TIE,
//     // }

//     export const BetField = {
//       LW_0: 'LW_0',
//       LW_1: 'LW_1',
//       LW_2: 'LW_2',
//       LW_3: 'LW_3',
//       LW_4: 'LW_4',
//       LW_5: 'LW_5',
//       LW_6: 'LW_6',
//     };
//   }
// }
namespace we {
  export namespace ui {
    export class LWResultNotificationContent extends ResultNotificationContent {
      constructor() {
        super();
        this.currentState = 'LW';
        // this.skinName = utils.getSkinByClassname('ResultNotificationSkin');
        // if (env.isMobile) {
        // } else {
        //   this._btnDismiss.label.renderText = () => i18n.t('mobile_notification_close_button_label');
        //   this._btnQuickBet.label.renderText = () => i18n.t('mobile_notification_quick_bet_button_label');
        // }
        // this._btnDismiss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        // this._btnQuickBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quickBet, this);
        // this._touchArea.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
      }
      //   public setData(tableInfo: data.TableInfo) {
      //     super.setData(tableInfo);
      //     const tableNo = tableInfo.tablename;
      //     const winAmount = tableInfo.totalWin;
      //     const winType = tableInfo.data.wintype;
      //     const gameType = tableInfo.gametype;

      //     this._lblName.renderText = () => `${i18n.t('gametype_' + we.core.GameType[gameType])} ${tableNo}`;
      //     this._lblWinAMount.text = `${winAmount >= 0 ? '+' : ''}${utils.formatNumber(winAmount)}`;
      //     this.updateResult(gameType, winType);
      //   }

      protected updateResult(gameType, tabledata) {
        const { value, winType } = tabledata;
        console.log('value , winType ', [value, winType]);
        // need to be abstract calss
        // switch (gameType) {
        //   case we.core.GameType.BAC:
        //   case we.core.GameType.BAS:
        //   case we.core.GameType.BAI:
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

        // switch (winType) {
        //   case ba.WinType.BANKER:
        //     this._resultRect.fillColor = 0xff0000;
        //     break;
        //   case ba.WinType.PLAYER:
        //     this._resultRect.fillColor = 0x0000ff;
        //     break;
        //   case ba.WinType.TIE:
        //     this._resultRect.fillColor = 0x00ff00;
        //     break;
        // }
        // break;
        //   case we.core.GameType.DT:
        //     this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
        // switch (winType) {
        //   case dt.WinType.DRAGON:
        //     this._resultRect.fillColor = 0x0000ff;
        //     break;
        //   case dt.WinType.TIGER:
        //     this._resultRect.fillColor = 0xff0000;
        //     break;
        //   case dt.WinType.TIE:
        //     this._resultRect.fillColor = 0x00ff00;
        //     break;
        // }
        // break;
      }

      //   protected removeSelf() {
      //     this.dispatchEvent(new egret.Event('DISMISS'));
      //   }

      //   protected quickBet() {
      //     this.dispatchEvent(new egret.Event('QUICK_BET'));
      //   }

      protected enterRoom() {
        // switch (this.tableInfo.gametype) {
        //   case core.GameType.BAC:
        //   case core.GameType.BAI:
        //   case core.GameType.BAS:
        // dir.sceneCtr.goto('ba', { tableid: this.tableId });
        // break;
        //   case core.GameType.DT:
        dir.sceneCtr.goto('lw', { tableid: this.tableId });
        //     break;
        //   case core.GameType.RO:
        //     dir.sceneCtr.goto('ro', { tableid: this.tableId });
        //     break;
        //   case core.GameType.DI:
        //     dir.sceneCtr.goto('di', { tableid: this.tableId });
        //     break;
        // }
        this.removeSelf();
      }
    }
  }
}
