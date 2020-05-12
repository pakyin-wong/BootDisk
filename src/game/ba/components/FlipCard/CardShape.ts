namespace we {
  export namespace ba {
    export class CardShape extends egret.DisplayObjectContainer {
      // Shape in container (for mask)
      protected cardWidth: number;
      protected cardHeight: number;

      public shape: egret.Shape;

      constructor(w: number, h: number) {
        super();
        this.cardWidth = w;
        this.cardHeight = h;
        this.shape = new egret.Shape();
        this.addChild(this.shape);

        const gr = this.shape.graphics;
        gr.clear();
        gr.beginFill(0x00ff00, 1);
        gr.drawRect(0, 0, this.cardWidth, this.cardHeight);
        gr.endFill();
      }
    }
  }
}
