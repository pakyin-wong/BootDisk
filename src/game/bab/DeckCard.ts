namespace we {
  export namespace bab {
    export class DeckCard extends BaseCard {
      public constructor() {
        super();
        this.skinName = 'skin_desktop.bab.DeckCard';
      }

      protected mount() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        mouse.setButtonMode(this,true)
      }

      protected onTouchTap() {
        this.parent.dispatchEvent(new egret.Event('OPEN_CARDINFO_PANEL', false, false, this._cardIndex));
        this.parent.dispatchEvent(new egret.Event('CLOSE'));
      }

      protected setDimCard() {
        super.setDimCard();
        const mask = new ui.RoundRectShape();
        mask.height = this.height
        mask.width = this.width
        mask.alpha = 0.65
        mask.stroke = 0
        mask.cornerTL_TR_BL_BR = '5,5,5,5'
        mask.fillColor = '0x000000'
        this.addChild(mask)
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        mouse.setButtonMode(this,false)
      }

      protected setRedCard() {
        super.setRedCard();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        mouse.setButtonMode(this,false)
      }
    }
  }
}
