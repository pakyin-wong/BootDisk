namespace we {
  export namespace blockchain {
    export class DeckCard extends blockchain.BaseCard {
      protected _mask: eui.Component;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('bc.DeckCard');
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

      protected onRollover() {
        if (!this._cardString || this._cardString === 'dim' || this._cardString === 'red' || env.isMobile) {
          return;
        }
        const hoverImage = new eui.Image();
        hoverImage.source = 'd_bcba_panel_shoe_card_fill_hover_png';
        hoverImage.name = 'hover';
        hoverImage.horizontalCenter = 0;
        hoverImage.verticalCenter = 0;
        hoverImage.width = 89;
        hoverImage.height = 138;

        this.addChild(hoverImage);
      }

      protected onRollout() {
        if(env.isMobile){
          return;
        }
        let child = this.getChildByName('hover');
        do {
          if (child && this.contains(child)) {
            this.removeChild(child);
          }
          child = this.getChildByName('hover');
        } while (child);
      }

      protected dataChanged(): void {
        if (this._mask) {
          this.removeChild(this._mask);
          this._mask = null;
        }
        super.dataChanged();
      }

      protected setDimCard() {
        super.setDimCard();
        const rect = new eui.Rect();
        rect.ellipseWidth = 10;
        rect.ellipseHeight = 10;
        rect.height = this.height;
        rect.width = this.width;
        rect.alpha = 0.65;
        rect.fillColor = 0x000000;
        this.addChild(rect);
        this._mask = rect;
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
