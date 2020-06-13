namespace we {
  export namespace ui {
    export class Card extends eui.Component {
      constructor() {
        super();
      }
      protected childrenCreated() {
        super.childrenCreated();
      }
      public setCard(resName: string, vertical: boolean = true) {
        this.removeChildren();
        if (resName) {
          const card: egret.Bitmap = new egret.Bitmap();
          const texName = `d_common_poker_vertical_${resName}_png`;

          card.texture = RES.getRes(texName);
          card.width = this.width;
          card.height = this.height;

          this.addChild(card);
        }
      }

      public clear() {
        this.removeChildren();
      }
    }
  }
}
