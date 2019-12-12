namespace we {
  export namespace live {
    export class LiveBaListItem extends LiveBaListSimpleItem {
      protected _dealerImage;
      public constructor(skinName: string = 'LiveBaListItem') {
        super(skinName);
      }
      protected async mount() {
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
