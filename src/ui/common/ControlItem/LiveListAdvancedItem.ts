namespace we {
  export namespace ui {
    export class LiveListAdvancedItem extends LiveListItem {
      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 350;
        this._originalQuickBetButtonY = 300;
        this._targetQuickbetPanelY = 378;
        this._originalQuickBetPanelY = 100;
        this._offsetLimit = 900;
        this._offsetMovement = 800;
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        const randNo = Math.round(Math.random()) + 1;
        if (tableInfo.gametype === we.core.GameType.DI) {
          this._dealerImage.texture = RES.getRes('advanced_dealer_sicbo_png');
        } else {
          this._dealerImage.texture = RES.getRes('advanced_dealer_' + randNo + '_png');
        }
      }

      protected addRoundCornerMask() {}

      get dealerImage() {
        return this._dealerImage;
      }

      set dealerImage(value: eui.Image) {
        this._dealerImage = value;
      }
    }
  }
}
