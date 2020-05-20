namespace we {
  export namespace ui {
    export abstract class ResultNotificationContent extends ui.ControlItem {
      protected _lblName: RunTimeLabel;
      protected _lblWinAMount: eui.Label;
      protected _resultRect: eui.Rect;
      protected _resultImage: eui.Image;
      protected _DIresultImage1: eui.Image;
      protected _DIresultImage2: eui.Image;
      protected _DIresultImage3: eui.Image;
      protected _lblResult: RunTimeLabel;
      protected _ROlblResult: RunTimeLabel;

      protected _btnQuickBet: BaseImageButton;
      protected _btnDismiss: BaseImageButton;
      protected _touchArea: eui.Component;

      public duration: number = 4000;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('ResultNotificationSkin');
        if (env.isMobile) {
        } else {
          this._btnDismiss.label.renderText = () => i18n.t('mobile_notification_close_button_label');
          this._btnQuickBet.label.renderText = () => i18n.t('mobile_notification_quick_bet_button_label');
        }
        this._btnDismiss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this._btnQuickBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quickBet, this);
        this._touchArea.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterRoom, this);
      }
      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        const tableNo = tableInfo.tablename;
        const winAmount = tableInfo.totalWin;
        const tabledata = tableInfo.data;
        const gameType = tableInfo.gametype;
        const winType = tableInfo.data.wintype;
        console.log(tableInfo)

        this._lblName.renderText = () => `${i18n.t('gametype_' + we.core.GameType[gameType])} ${tableNo}`;
        this._lblWinAMount.text = `${winAmount >= 0 ? '+' : ''}${utils.formatNumber(winAmount)}`;
        this.updateResult(gameType, tabledata);
      }

      protected abstract updateResult(gameType, winType);
      // { // need to be abstract calss
      // switch (gameType) {
      //   case we.core.GameType.BAC:
      //   case we.core.GameType.BAS:
      //   case we.core.GameType.BAI:
      //     this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
      //     switch (winType) {
      //       case ba.WinType.BANKER:
      //         this._resultRect.fillColor = 0xff0000;
      //         break;
      //       case ba.WinType.PLAYER:
      //         this._resultRect.fillColor = 0x0000ff;
      //         break;
      //       case ba.WinType.TIE:
      //         this._resultRect.fillColor = 0x00ff00;
      //         break;
      //     }
      //     break;
      //   case we.core.GameType.DT:
      //     this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
      //     switch (winType) {
      //       case dt.WinType.DRAGON:
      //         this._resultRect.fillColor = 0x0000ff;
      //         break;
      //       case dt.WinType.TIGER:
      //         this._resultRect.fillColor = 0xff0000;
      //         break;
      //       case dt.WinType.TIE:
      //         this._resultRect.fillColor = 0x00ff00;
      //         break;
      //     }
      //     break;
      // }
      // }

      protected removeSelf() {
        this.dispatchEvent(new egret.Event('DISMISS'));
      }

      protected quickBet() {
        this.dispatchEvent(new egret.Event('QUICK_BET'));
      }

      protected abstract enterRoom();
      // {
      //   switch (this.tableInfo.gametype) {
      //     case core.GameType.BAC:
      //     case core.GameType.BAI:
      //     case core.GameType.BAS:
      //       dir.sceneCtr.goto('ba', { tableid: this.tableId });
      //       break;
      //     case core.GameType.DT:
      //       dir.sceneCtr.goto('dt', { tableid: this.tableId });
      //       break;
      //     case core.GameType.RO:
      //       dir.sceneCtr.goto('ro', { tableid: this.tableId });
      //       break;
      //     case core.GameType.DI:
      //       dir.sceneCtr.goto('di', { tableid: this.tableId });
      //       break;
      //   }
      //   this.removeSelf();
      // }
    }
  }
}
