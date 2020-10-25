namespace we {
  export namespace bab {
    export class DeckCard extends BaseCard {
      public constructor() {
        super();
        this.skinName = 'skin_desktop.bab.DeckCard';
      }

      protected mount() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        mouse.setButtonMode(this, true);
      }

      protected onTouchTap() {
        this.parent.dispatchEvent(new egret.Event('OPEN_CARDINFO_PANEL', false, false, this._cardIndex));
        this.parent.dispatchEvent(new egret.Event('CLOSE'));
      }

      protected onRollover(){
        if(!this._cardString || this._cardString === 'dim' || this._cardString === 'red') {
            return;
        }
        const hoverImage = new eui.Image();
        hoverImage.source =   'd_bcba_panel_shoe_card_fill_hover_png'
        hoverImage.name = 'hover'
        hoverImage.horizontalCenter = 0  
        hoverImage.verticalCenter = 0 
        hoverImage.width=89 
        hoverImage.height=138
        this.addChild(hoverImage)
      }

      protected onRollout(){
        let child = this.getChildByName('hover')
        do{
          if(child && this.contains(child)){
            this.removeChild(child)
          }
          child = this.getChildByName('hover')
        }while(child)
      }

      protected setDimCard() {
        super.setDimCard();
        const mask = new ui.RoundRectShape();
        mask.height = this.height;
        mask.width = this.width;
        mask.alpha = 0.65;
        mask.stroke = 0;
        mask.cornerTL_TR_BL_BR = '5,5,5,5';
        mask.fillColor = '0x000000';
        this.addChild(mask);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        mouse.setButtonMode(this, false);
      }

      protected setRedCard() {
        super.setRedCard();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        mouse.setButtonMode(this, false);
      }
    }
  }
}
