namespace we {
  export namespace ui {
    export class Card extends eui.Component {
      constructor() {
        super();
      }
      protected childrenCreated() {
        super.childrenCreated();
      }
      
      public setCard(resName: string, vertical: boolean) {
        this.removeChildren();
        // console.log('resName', resName);
        if (resName) {
          const card: egret.Bitmap = new egret.Bitmap();
          // console.log(resName);
          // const texName: string = '';
          // if(env.isMobile){
            const texName = `d_common_poker_${vertical ? 'vertical' : 'horizontal'}_${resName}_png`;
          // }
          // else{
          //   const texName = `m_common_poker_${vertical ? 'vertical' : 'horizontal'}_${resName}_png`;
          //   m_sq_bac_small_poker_club2_vertical
          // }

          // card.texture = RES.getRes(core.Card[resName]);
          card.texture = RES.getRes(texName);
          if (vertical) {
            card.width = this.width;
            card.height = this.height;
          } else {
            // console.log('horizontal');
            // card.rotation = 90;
            // card.texture = RES.getRes(core.Card[resName]);
            card.texture = RES.getRes(texName);
            card.width = this.width;
            card.height = this.height;
            // card.width = this.height;
            // card.height = this.width;
            // card.x = 0 + this.width;
            // card.y = 0;
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
}
