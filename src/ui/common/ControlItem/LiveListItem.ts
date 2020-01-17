namespace we {
  export namespace ui {
    export class LiveListItem extends LiveListSimpleItem {
      protected _dealerImage;

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

      protected initChildren() {
        super.initChildren();
        let imageResName: string;
        switch (Math.round(Math.random() * 2)) {
          case 0:
            imageResName = 'temp_baccarat_dealer_1';
            break;
          case 1:
            imageResName = 'temp_baccarat_dealer_2';
            break;
          case 2:
          default:
            imageResName = 'temp_baccarat_dealer_3';
            break;
        }

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
