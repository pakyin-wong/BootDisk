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
          case core.GameType.BAS:
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAM:
          case core.GameType.BAB:
            this._content = new BAResultNotificationContent(); // BA
            break;
          case core.GameType.DT:
            this._content = new DTResultNotificationContent(); // DT
            break;
          case core.GameType.LW:
            this._content = new LWResultNotificationContent(); // LW
            break;
          case core.GameType.RO:
          case core.GameType.ROL:
            this._content = new ROResultNotificationContent(); // RO
            break;
          case core.GameType.DI:
            this._content = new DIResultNotificationContent(); // DI
            break;
          case core.GameType.DIL:
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
        // const skinName = this.getQuickBetContentSkinName();
        this._quickBetContent = new NotificationQuickBetContent();
        const gameType = utils.getGameTypeNamespace(this.tableInfo.gametype);
        this._quickBetContent.itemInitHelper = new we[gameType].SideListItemInitHelper();

        this._quickBetContent.scaleX = 1.05;
        this._quickBetContent.scaleY = 1.05;
        this._quickBetContent.top = 8;
        // this._quickBetContent.setData(this.tableInfo);
      }

      // protected getQuickBetContentSkinName() {
      //   const gameType = this.tableInfo.gametype;
      //   switch (gameType) {
      //     case core.GameType.BAC:
      //     case core.GameType.BAI:
      //     case core.GameType.BAS:
      //       return 'BaQuickBetContainerSkin';
      //     case core.GameType.DT:
      //       return 'DtQuickBetContainerSkin';
      //     case core.GameType.LW:
      //       return 'LwQuickBetContainerSkin';
      //     case core.GameType.RO:
      //       return 'RoQuickBetContainerSkin';
      //     case core.GameType.DI:
      //       return 'DiQuickBetContainerSkin';
      //   }
      // }
    }
  }
}
