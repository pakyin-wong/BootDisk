namespace we {
  export namespace ba {
    export class CardFaceImage extends egret.DisplayObjectContainer {
      // Card image in container
      protected cardWidth: number;
      protected cardHeight: number;

      public cardImage: eui.Image;
      public cardFaceNumberMask: eui.Image;

      constructor(w: number, h: number) {
        super();
        this.cardWidth = w;
        this.cardHeight = h;
        this.cardImage = new eui.Image();
        this.addChild(this.cardImage);

        this.cardFaceNumberMask = new eui.Image();
        this.cardFaceNumberMask.source = 'd_sq_ba_large_poker_card_mask_png';
        this.cardFaceNumberMask.height = h;
        this.cardFaceNumberMask.width = w;
        this.addChild(this.cardFaceNumberMask);
      }

      public setCardImage(imgSource: string) {
        this.cardImage.source = imgSource;
        this.cardImage.width = this.cardWidth;
        this.cardImage.height = this.cardHeight;
        this.cardFaceNumberMask.width = this.cardWidth;
        this.cardFaceNumberMask.height = this.cardHeight;
      }
    }
  }
}
