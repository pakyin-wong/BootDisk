namespace we {
  export namespace ba {
    export class FrontCard extends egret.DisplayObjectContainer {
      //a card bottom-left aligned with the anchor point
      protected cardWidth: number;
      protected cardHeight: number;

      public cardImage: eui.Image;

      constructor(w: number, h: number) {
        super();
        this.cardWidth = w;
        this.cardHeight = h;

        this.cardImage = new eui.Image();
      }

      public initCard() {
        this.cardImage.source = 'd_common_poker_vertical_hearts_q_png';
        this.cardImage.width = this.cardWidth;
        this.cardImage.height = this.cardHeight;
        this.addChild(this.cardImage);

        this.cardImage.y = -this.cardHeight;
        this.cardImage.x = 0;
      }

    }
  }
}
