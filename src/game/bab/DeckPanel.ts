namespace we {
  export namespace bab {
    export class DeckPanel extends BasePanel {
      protected _list: eui.List;
      protected _gameData: bab.GameData;

      protected mount() {
        super.mount();
        this._list.itemRenderer = DeckCard;
        this._list.addEventListener(
          'OPEN_CARDINFO_PANEL',
          (evt: egret.Event) => {
            this.dispatchEvent(new egret.Event('OPEN_CARDINFO_PANEL', false, false, evt.data));
          },
          this
        );
      }

      public setValue(gameData: bab.GameData) {
        this._gameData = gameData;
        if (!this._gameData || !this._gameData.maskedcardssnList) {
          return;
        }

        const data = new eui.ArrayCollection(this.convertMaskedCardSsnList());
        this._list.itemRenderer = DeckCard;
        this._list.dataProvider = data;
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
