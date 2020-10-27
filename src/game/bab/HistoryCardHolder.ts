namespace we {
  export namespace bab {
    export class HistoryCardHolder extends core.BaseEUI implements ui.HistoryCardHolder {
      protected _bankerSum: eui.Label;
      protected _playerSum: eui.Label;

      protected _playerCard1: ui.Card;
      protected _playerCard2: ui.Card;
      protected _playerCard3: ui.Card;
      protected _bankerCard1: ui.Card;
      protected _bankerCard2: ui.Card;
      protected _bankerCard3: ui.Card;

      protected _playerNum1: eui.Label;
      protected _playerNum2: eui.Label;
      protected _playerNum3: eui.Label;
      protected _bankerNum1: eui.Label;
      protected _bankerNum2: eui.Label;
      protected _bankerNum3: eui.Label;

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
        this._playerSum.text = (utils.stat.ba.getTotalPoint(latestGameInfo.b1, latestGameInfo.b2, latestGameInfo.b3) % 10).toString();
        this._bankerSum.text = (utils.stat.ba.getTotalPoint(latestGameInfo.a1, latestGameInfo.a2, latestGameInfo.a3) % 10).toString();

        this.setCardGroup([this._playerCard1, this._playerCard2, this._playerCard3], [latestGameInfo.b1, latestGameInfo.b2, latestGameInfo.b3]);
        this.setCardGroup([this._bankerCard1, this._bankerCard2, this._bankerCard3], [latestGameInfo.a1, latestGameInfo.a2, latestGameInfo.a3]);
      }

      public setNumber(number: number) {
        console.log('number',number);
        this.setAllNums(true)
        if(this._bankerCard3.visible){
          this._bankerNum3.text = number.toString();
          number--;
        }else{
          this._bankerNum3.visible = false;
        }
        if(this._playerCard3.visible){
          this._playerNum3.text = number.toString();
          number--;
        }else{
          this._playerNum3.visible = false;
        }
        this._bankerNum2.text = number.toString();
        number--
        this._playerNum2.text = number.toString();
        number--
        this._bankerNum1.text = number.toString();
        number--
        this._playerNum1.text = number.toString();
        number--
        
      }

      protected setAllSums(state: boolean){
        this._bankerSum.visible = state
        this._playerSum.visible = state
      }

      protected setAllCards(state: boolean){
          this._playerCard1.visible = state;
          this._playerCard2.visible = state;
          this._playerCard3.visible = state;
          this._bankerCard1.visible = state;
          this._bankerCard2.visible = state;
          this._bankerCard3.visible = state;
      }

      protected setAllNums(state: boolean){
          this._playerNum1.visible = state;
          this._playerNum2.visible = state;
          this._playerNum3.visible = state;  
          this._bankerNum1.visible = state;
          this._bankerNum2.visible = state;
          this._bankerNum3.visible = state;
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
