namespace we {
  export namespace dtb {
    export class MobileHistoryCardHolder extends blockchain.BasePanel implements ui.HistoryCardHolder {
      protected _gameData: data.GameData & data.BlockchainGameData

      protected _dragonSum: eui.Label;
      protected _tigerSum: eui.Label;

      protected _dragonCard: ui.Card;
      protected _tigerCard: ui.Card;

      protected _dragonNum: eui.Label;
      protected _tigerNum: eui.Label;

      public setValue(gameData : data.GameData & data.BlockchainGameData){
        this._gameData = gameData;
      }

      public update(gameData: data.GameData & data.BlockchainGameData,tableId: string){
        this.setValue(gameData)
        if( this.checkFirstRound()){
            this.setAllCards(false)
            this.setAllNums(false)
            this.setAllSums(false)
        }else{          
          this.setCards(tableId)
          let count = ['d','t'].reduce((prev, key)=>{
            return prev + (gameData[key]!=''?1:0)
          },1);
          if (count==1) count = 0;
          this.setNumber(this._gameData.currentcardindex-count);
        }
      }

      public checkFirstRound(){ // run after setNumber
        if(this._gameData.maskedcardssnList && this._gameData.maskedcardssnList[0] && this._gameData.maskedcardssnList[0] != '*'){
          const firstNumber = this.getUnmaskedCardNumber(this._gameData.maskedcardssnList[0]);
          if(firstNumber + 1 >= this._gameData.currentcardindex){
            return true;
          }
        }
        return false;
      }

      protected getUnmaskedCardNumber(cardString: string) {
        if (!cardString || cardString.length < 3) {
          return -9999;
        }
        const number = +cardString.slice(0, 2);
        return number;
      }


      protected createBg(){
        // if(env.isMobile){
        //   this._panelBgSource = 'm_bcba_resultarea_panel_prevresult_png';
        // }

        // const image = new eui.Image();
        // image.width = this.width;
        // image.height = this.height;
        // image.source = this._panelBgSource;
        // image.scale9Grid = new egret.Rectangle(169, 118, 2, 802);
        // this.content && this.content.addChildAt(image, 0);
      }

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
