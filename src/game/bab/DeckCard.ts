namespace we {
    export namespace bab {
        export class DeckCard extends eui.ItemRenderer {
            protected _cardImage: eui.Image;
            protected _cardString: string;
            protected _cardIndex: number;
            protected _cardIndexLabel: eui.Label;
            protected _cardIndexBg: ui.RoundRectShape;

            public constructor(){
                super();
                this.skinName='skin_desktop.bab.DeckCard'
            }
            protected childrenCreated() {
                super.childrenCreated();
                this.mount();
            }

            protected mount() {
            }

            protected dataChanged(): void {
                this._cardString = this.data.cardString
                this._cardIndex = this.data.cardIndex;
                this.updateCardImage();
                this.updateCardIndex();
            }

            protected updateCardImage() {
                let resName;
                if(!this._cardString){
                    return;
                }
                if(this._cardString[0] === '*'){
                   this._cardImage.source = utils.getCardResName('back')
                   return;
                }
                if(this._cardString === 'red'){
                   this._cardImage.source = utils.getCardResName('red')
                   this._cardIndexBg.visible = false;
                   this._cardIndexLabel.visible = false;
                   return;
                }
                console.log('deckcard', this._cardString)
                
            }

            protected updateCardIndex(){
                if(this._cardIndex){
                    this._cardIndexLabel.text = this._cardIndex.toString();
                }
            }



        }
    }
}
