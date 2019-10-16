namespace components {
  export class Card extends eui.Component {
    constructor() {
      super();
    }
    protected childrenCreated() {
      super.childrenCreated();
    }
    public setCard(resName: string) {
      const card: egret.Bitmap = new egret.Bitmap();
      console.log(resName);

      card.texture = RES.getRes(resName);
      card.width = this.width;
      card.height = this.height;

      this.addChild(card);
    }
  }
}
