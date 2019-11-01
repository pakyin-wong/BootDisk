namespace components {
  export class Card extends eui.Component {
    constructor() {
      super();
    }
    protected childrenCreated() {
      super.childrenCreated();
    }
    public setCard(resName: string, vertical: boolean) {
      this.removeChildren();
      if (resName) {
        const card: egret.Bitmap = new egret.Bitmap();
        // console.log(resName);

        card.texture = RES.getRes(enums.card[resName]);
        if (vertical) {
          card.width = this.width;
          card.height = this.height;
        } else {
          card.rotation = 90;
          card.texture = RES.getRes(enums.card[resName]);
          card.width = this.height;
          card.height = this.width;
          card.x = 0 + this.width;
          card.y = 0;
        }
        this.addChild(card);
      }
    }

    /*
    public setHCard(resName: string) {
      this.removeChildren()
            if (resName){
      const card: egret.Bitmap = new egret.Bitmap();
      console.log(resName);
      card.rotation = 90;
      card.texture = RES.getRes(enums.card[resName]);
      card.width = this.height;
      card.height = this.width;
      card.x = 0 + this.width;
      card.y = 0;

      this.addChild(card);
            }
    }
    */

    public clear() {
      this.removeChildren();
    }
  }
}
