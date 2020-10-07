namespace we {
  export namespace ui {
    export class ResultNotificationItem extends NotificationItem {
      constructor(state: number = NotificationItemHolder.STATE_NORMAL) {
        super(state);
      }

      protected createNormalContent() {
        switch (this.tableInfo.gametype) {
          // BAC = 0, // classic baccarat
          // BAS = 1, // speed baccarat
          // BAI = 2, // insurance baccarat
          // BAM = 18, // squeeze baccarat
          // DT = 5, // Dragon Tiger
          // RO = 14, // Roulette
          // ROL = 17, // Roulette (God of Wealth) // L stands for luck
          // DI = 12, // Dice
          // LW = 16, // Lucky Wheel
          // // MJ = 13, // MaJong
          case 0:
          case 1:
          case 2:
            this._content = new BAResultNotificationContent(); // BA
            break;
          case 5:
            this._content = new DTResultNotificationContent(); // DT
            break;
          case 16:
            this._content = new LWResultNotificationContent(); // LW
            break;
          case 14:
            this._content = new ROResultNotificationContent(); // RO
            break;
          case 12:
            this._content = new DIResultNotificationContent(); // DI
            break;
          case 17:
            this._content = new DLResultNotificationContent(); // DIL
          default:
            break;
        }
        // this._content = new ResultNotificationContent();
        if (this.tableInfo && this._content) {
          this._content.setData(this.tableInfo);
        }
      }

      protected createQuickBetContent() {
        super.createQuickBetContent();
        const skinName = this.getQuickBetContentSkinName();
        this._quickBetContent = new NotificationQuickBetContent(skinName);
        this._quickBetContent.scaleX = 1.05;
        this._quickBetContent.scaleY = 1.05;
        this._quickBetContent.top = 8;
        // this._quickBetContent.setData(this.tableInfo);
      }

      protected getQuickBetContentSkinName() {
        const gameType = this.tableInfo.gametype;
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
            return 'BaQuickBetContainerSkin';
          case core.GameType.DT:
            return 'DtQuickBetContainerSkin';
          case core.GameType.LW:
            return 'LwQuickBetContainerSkin';
          case core.GameType.RO:
            return 'RoQuickBetContainerSkin';
          case core.GameType.DI:
            return 'DiQuickBetContainerSkin';
          // case we.core.GameType.BAC:
          // case we.core.GameType.BAS:
          // case we.core.GameType.BAI:
          //   this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
          //   switch (winType) {
          //     case ba.WinType.BANKER:
          //       this._resultRect.fillColor = 0xff0000;
          //       break;
          //     case ba.WinType.PLAYER:
          //       this._resultRect.fillColor = 0x0000ff;
          //       break;
          //     case ba.WinType.TIE:
          //       this._resultRect.fillColor = 0x00ff00;
          //       break;
          //   }
          //   break;
          // case we.core.GameType.DT:
          // default:
          //   this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
          //   switch (winType) {
          //     case dt.WinType.DRAGON:
          //       this._resultRect.fillColor = 0x0000ff;
          //       break;
          //     case dt.WinType.TIGER:
          //       this._resultRect.fillColor = 0xff0000;
          //       break;
          //     case dt.WinType.TIE:
          //       this._resultRect.fillColor = 0x00ff00;
          //       break;
          //   }
          //   break;
        }
      }
    }
  }
}
