namespace we {
  export namespace dtb {
    export class HistoryCardHolder extends core.BaseEUI implements ui.HistoryCardHolder {
      protected _dragonSum: eui.Label;
      protected _tigerSum: eui.Label;

      protected _dragonCard: ui.Card;
      protected _tigerCard: ui.Card;

      protected _dragonNum: eui.Label;
      protected _tigerNum: eui.Label;

      public setCards(tableId: string) {
        this.setAllCards(false);
        this.setAllSums(false);
        if (!env.tableInfos[tableId].roadmap || !env.tableInfos[tableId].roadmap.gameInfo) {
          return;
        }
        const gameInfos = env.tableInfos[tableId].roadmap.gameInfo;
        const keys = Object.keys(gameInfos);
        if(!keys || keys.length === 0){
          return;
        }
        const latestGameInfo = gameInfos[keys[keys.length - 1]];

        this.setAllSums(true);
        this._dragonSum.text = latestGameInfo.dragonpoint;
        this._tigerSum.text = latestGameInfo.tigerpoint;

        this.setCardGroup([this._dragonCard], [latestGameInfo.b1]);
        this.setCardGroup([this._tigerCard], [latestGameInfo.a1]);
      }

      public setNumber(number: number) {
        this.setAllNums(true)
        this._tigerNum.text = number.toString();
        number--
        this._dragonNum.text = number.toString();
        number--       
      }

      protected setAllSums(state: boolean){
        this._dragonSum.visible = state
        this._tigerSum.visible = state
      }

      protected setAllCards(state: boolean){
          this._tigerCard.visible = state;
          this._dragonCard.visible = state;
      }

      protected setAllNums(state: boolean){
          this._tigerNum.visible = state;
          this._dragonNum.visible = state;
      }

      protected setCardGroup(cards:  ui.Card[], datas) {
        for(let i = 0; i < datas.length; i++){
          if (datas[i]) {
            cards[i].visible = true;
            cards[i].setCard(utils.formatCard(datas[i]));
          } 
        }
      }
    }
  }
}
