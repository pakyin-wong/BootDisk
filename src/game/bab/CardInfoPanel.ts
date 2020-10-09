namespace we {
  export namespace bab {
    export class CardInfoPanel extends ui.Panel {
      protected mount() {
        const rect = new eui.Rect();
        rect.width = this.width;
        rect.height = this.height;
        rect.fillColor = 0x33aaff;
        rect.alpha = 0.8
        this.addChild(rect);
      }

      public showDeck() {}

      public showHelp() {}

      public showCardInfo(cardIndex: number) {}
    }
  }
}
