namespace we {
  export namespace bab {
    export class BaseCard extends eui.ItemRenderer {
      protected _cardImage: eui.Image;
      protected _cardString: string;
      protected _cardIndex: number;
      protected _cardIndexLabel: eui.Label;
      protected _cardIndexBg: ui.RoundRectShape;

      protected childrenCreated() {
        super.childrenCreated();
        this.mount();
      }

      protected mount() {}

      public dataUpdate(cardString: string, cardIndex: number) {
        this._cardString = cardString;
        this._cardIndex = cardIndex;
        this.updateCardImage();
        this.updateCardIndex();
      }

      protected dataChanged(): void {
        this.dataUpdate(this.data.cardString, this.data.cardIndex)
      }

      protected updateCardImage() {
        let resName;
        if (!this._cardString) {
          return;
        }
        if (this._cardString[0] === '*') {
          this._cardImage.source = utils.getCardResName('back');
          return;
        }
        if (this._cardString === 'dim') {
          this.setDimCard();
        }
        if (this._cardString === 'red') {
          this.setRedCard();
          return;
        }
        this._cardImage.source = utils.getCardResName(this.getUnmaskedCardRes(this._cardString));
      }

      protected setDimCard(){
         this._cardImage.source = utils.getCardResName('back');
      }

      protected setRedCard(){
          this._cardImage.source = utils.getCardResName('red');
          this._cardIndexBg && (this._cardIndexBg.visible = false);
          this._cardIndexLabel && (this._cardIndexLabel.visible = false);
      }

      protected updateCardIndex() {
        if (this._cardIndex && this._cardIndexLabel) {
          this._cardIndexLabel.text = this._cardIndex.toString();
        }
      }

      protected getUnmaskedCardRes(cardString: string) {
        if (!cardString || cardString.length < 3) {
          return '';
        }
        const number = +cardString.slice(0, 2);
        const type = cardString[2];
        let cardsuit = '';
        let cardface = number.toString();
        switch (type) {
          case 'C':
            cardsuit = 'clover';
            break;
          case 'D':
            cardsuit = 'diamond';
            break;
          case 'H':
            cardsuit = 'heart';
            break;
          case 'S':
            cardsuit = 'spade';
            break;
        }
        switch (number) {
          case 1:
            cardface = 'A';
            break;
          case 11:
            cardface = 'J';
            break;
          case 12:
            cardface = 'Q';
            break;
          case 13:
            cardface = 'K';
            break;
        }
        return cardsuit + cardface;
      }
    }
  }
}
