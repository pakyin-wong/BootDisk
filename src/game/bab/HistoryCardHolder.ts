namespace we {
  export namespace bab {
    export class HistoryCardHolder extends core.BaseEUI {
      protected _bankerSum : eui.Label;
      protected _playerSum : eui.Label;

      protected _playerCard1 : ui.Card;
      protected _playerCard2 : ui.Card;
      protected _playerCard3 : ui.Card;
      protected _bankerCard1 : ui.Card;
      protected _bankerCard2 : ui.Card;
      protected _bankerCard3 : ui.Card;

      protected _playeNum1 : eui.Label;
      protected _playeNum2 : eui.Label;
      protected _playeNum3 : eui.Label;
      protected _bankeNum1 : eui.Label;
      protected _bankeNum2 : eui.Label;
      protected _bankeNum3 : eui.Label;

      public setCards(tableId: string) {
          if(!env.tableInfos[tableId].roadmap || !env.tableInfos[tableId].roadmap.gameInfo){
            return;
          }
          const gameInfos = env.tableInfos[tableId].roadmap.gameInfo
          const keys = Object.keys(gameInfos)
          const latestGameInfo = gameInfos[keys[keys.length - 1]]

        this._playerSum.text = (utils.stat.ba.getTotalPoint(latestGameInfo.b1,latestGameInfo.b2,latestGameInfo.b3) % 10).toString();
        this._bankerSum.text = (utils.stat.ba.getTotalPoint(latestGameInfo.a1,latestGameInfo.a2,latestGameInfo.a3) % 10).toString();
        
        this.setCardGroup(this._playerCard1,this._playerCard2, this._playerCard3, latestGameInfo.b1,latestGameInfo.b2,latestGameInfo.b3)
        this.setCardGroup(this._bankerCard1,this._bankerCard2, this._bankerCard3, latestGameInfo.a1,latestGameInfo.a2,latestGameInfo.a3)
      }

      protected setCardGroup(card1, card2 , card3, data1, data2, data3){
        card1.setCard(utils.formatCard(data1));
        card2.setCard(utils.formatCard(data2));
        if(data3 ){
          card3.visible = true;
          card3.setCard(utils.formatCard(data3));
        }else{
          card3.visible = false;
        }
      }
    }
  }
}
