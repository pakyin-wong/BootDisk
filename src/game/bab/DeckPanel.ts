namespace we {
  export namespace bab {
    export class DeckPanel extends BasePanel {
      protected _list: eui.List;
      protected _gameData: bab.GameData;

      protected mount() {
        super.mount();
        this._list.itemRenderer = DeckCard;
      }

      public setValue(gameData: bab.GameData) {
        this._gameData = gameData;
        if (!this._gameData || !this._gameData.maskedcardssnList) {
          return;
        }

        const data = new eui.ArrayCollection(this.convertMaskedCardSsnList());

        this._list.dataProvider = data;
        this._list.itemRenderer = DeckCard;
      }

      protected convertMaskedCardSsnList() {
        const arr = new Array();
        for (let i = 0; i < this._gameData.maskedcardssnList.length; i++) {
          arr.push({ cardIndex: i + 1, cardString: this._gameData.maskedcardssnList[i] });
          if (i === this._gameData.redcardindex) {
            arr.push({ cardIndex: null, cardString: 'red' });
          }
        }
        return arr;
      }
    }
  }
}
