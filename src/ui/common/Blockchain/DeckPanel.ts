namespace we {
  export namespace blockchain {
    export class DeckPanel extends BasePanel {
      protected _list: eui.List;
      protected _gameData: data.GameData & data.BlockchainGameData;
      protected _scroller: ui.Scroller;

      protected mount() {
        super.mount();
        this._list.itemRenderer = this.getItemRenderer();
        this._list.addEventListener(
          'OPEN_CARDINFO_PANEL',
          (evt: egret.Event) => {
            this.dispatchEvent(new egret.Event('OPEN_CARDINFO_PANEL', false, false, evt.data));
          },
          this
        );
        this._list.addEventListener(
          'CLOSE',
          (evt: egret.Event) => {
            this.hide();
          },
          this
        );
      }

      public setValue(gameData: data.GameData & data.BlockchainGameData) {
        this._gameData = gameData;
        if (!this._gameData || !this._gameData.maskedcardssnList) {
          return;
        }

        const data = new eui.ArrayCollection(this.convertMaskedCardSsnList());
        this._list.itemRenderer = this.getItemRenderer();
        this._list.dataProvider = data;
      }

      protected getItemRenderer(){
        return DeckCard;
      }

      protected convertMaskedCardSsnList() {
        const arr = new Array();
        for (let i = 0; i < this._gameData.maskedcardssnList.length; i++) {
          if (i > 0 && i < we.utils.stat.ba.translateCardToNumber(this._gameData.firstcard) + 1) {
            arr.push({ cardIndex: i + 1, cardString: 'dim' });
          } else {
            arr.push({ cardIndex: i + 1, cardString: this._gameData.maskedcardssnList[i] });
          }
          if (i === this._gameData.redcardindex - 1) {
            arr.push({ cardIndex: null, cardString: 'red' });
          }
        }
        return arr;
      }

      public resizeHeight(height: number){
        const diff = height - this.height
        this.height = height
        this._scroller.height += diff;
        this._scroller.invalidateSize();
        this._scroller.invalidateProperties();
      }
    }
  }
}
