namespace we {
  export namespace ba {
    export class CardImage extends egret.DisplayObjectContainer {
      // Card image in container
      protected cardWidth: number;
      protected cardHeight: number;

      public cardImage: eui.Image;

      constructor(w: number, h: number) {
        super();
        this.cardWidth = w;
        this.cardHeight = h;
        this.cardImage = new eui.Image();
        this.addChild(this.cardImage);
      }

      public setCardImage(imgSource: string) {
        this.cardImage.source = imgSource;
        this.cardImage.width = this.cardWidth;
        this.cardImage.height = this.cardHeight;
      }
    }
  }
}
