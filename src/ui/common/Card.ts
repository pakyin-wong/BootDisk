namespace we {
  export namespace ui {
    export class Card extends eui.Component {
      protected texName: string;

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
          if (!env.isMobile) {
            this.texName = `d_common_poker_vertical_${resName}_png`;
          } else {
            if (resName === 'back') {
              this.texName = 'm_sq_bac_small_poker_backside_png';
            } else {
              this.texName = `m_sq_bac_small_poker_${resName}_vertical_png`;
            }
          }

          card.texture = RES.getRes(this.texName);
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
