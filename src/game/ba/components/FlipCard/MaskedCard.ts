namespace we {
  export namespace ba {
    export class MaskedCard extends egret.DisplayObjectContainer {
      protected cardWidth: number;
      protected cardHeight: number;

      public cardImage: eui.Image;
      public cardMask: eui.Rect;

      constructor(w: number, h: number) {
        super();
        this.cardWidth = w;
        this.cardHeight = h;

        this.cardImage = new eui.Image();
        this.cardMask = new eui.Rect(this.cardWidth, this.cardHeight, 0x00ff00);
      }

      public initCard() {
        this.cardImage.source = 'd_common_poker_vertical_hearts_q_png';
        this.cardImage.width = this.cardWidth;
        this.cardImage.height = this.cardHeight;
        this.addChild(this.cardImage);

        /*this.cardMask = new eui.Rect(this.cardWidth, this.cardHeight, 0xff0000);
        this.cardMask.width = this.cardWidth;
        this.cardMask.height = this.cardHeight;
        this.cardImage.mask = this.cardMask;
        this.addChild(this.cardMask);*/


        this.cardMask = new eui.Rect(this.cardWidth, this.cardHeight, 0xff0000);

        this.cardImage.mask = this.cardMask;
        this.addChild(this.cardMask);
      }

    }
  }
}
