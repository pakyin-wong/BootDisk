namespace we {
  export namespace ba {
    export class BaLiveListItem extends BaLiveListSimpleItem {
      protected _dealerImage;

      public constructor(skinName: string = 'BaLiveListItemSkin') {
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

      protected initChildren() {
        super.initChildren();
        const imageResName = Math.round(Math.random()) ? 'temp_baccarat_dealer_1' : 'temp_baccarat_dealer_2';
        this._dealerImage.texture = RES.getRes(imageResName);
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
