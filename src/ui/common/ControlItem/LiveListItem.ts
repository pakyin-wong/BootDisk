namespace we {
  export namespace ui {
    export class LiveListItem extends LiveListSimpleItem {
      protected _dealerImage;

      public constructor(gameType: core.GameType, skinName: string = null) {
        super(gameType, skinName);
        this._gameType = gameType;
      }

      protected initCustomPos() {
        this._targetQuickBetButtonY = 350;
        this._originalQuickBetButtonY = 300;
        this._targetQuickbetPanelY = 378;
        this._originalQuickBetPanelY = 100;
        this._offsetLimit = 900;
        this._offsetMovement = 800;
      }

      protected initChildren() {
        super.initChildren();
        const randNo = Math.round(Math.random() * 4) + 1;
        this._dealerImage.texture = RES.getRes('temp_baccarat_dealer_' + randNo);
      }

      get dealerImage() {
        return this._dealerImage;
      }

      set dealerImage(value: eui.Image) {
        this._dealerImage = value;
      }
    }
  }
}
