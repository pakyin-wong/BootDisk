namespace we {
  export namespace bab {
    export class DeckCard extends BaseCard {
      public constructor() {
        super();
        this.skinName = 'skin_desktop.bab.DeckCard';
      }

      protected mount() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
      }

      protected onTouchTap() {
        this.parent.dispatchEvent(new egret.Event('OPEN_CARDINFO_PANEL', false, false, this._cardIndex));
      }
    }
  }
}
