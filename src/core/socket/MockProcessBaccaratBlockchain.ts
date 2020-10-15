namespace we {
  export namespace core {
    export class MockProcessBaccaratBlockchain extends MockProcess {
      public static allCards : string[];
      public static allHash;
      public static allMasked;

      protected firstRoundInterval = 500;
      protected distributeInterval = 2000;
      //protected remainingCardCount;
      //protected remainingCardCountTillRed = -1;
      protected currentCardIndex = 1;
      protected redCardIndex = -1; 
      protected numberOfCardSet = 8;
      protected randRedCardRange = [250, 290];
      protected randomCards = true;

      public shuffleStateInterval = 15000;

      constructor(socket: SocketMock, gameType = core.GameType.BAC) {
        super(socket, gameType);
      }

      protected resetShoe() {
        //this.remainingCardCount = 13 * this.numberOfCardSet;
        this.redCardIndex = this.randRedCardRange[0] + Math.random() * (this.randRedCardRange[1] - this.randRedCardRange[0]);
        this.currentCardIndex = 1;
        this.redCardIndex = this.randRedCardRange[0] + (Math.random() * (this.randRedCardRange[1] - this.randRedCardRange[0]))
        MockProcessBaccaratBlockchain.allCards = this.generateAllCards();
        console.log('check xxxxxxxxxxxxxxxxxx', MockProcessBaccaratBlockchain.allCards);
      }

      protected generateAllCards() {
        if (this.randomCards) {
          return this.generateRandomCards();
        } else {
          return this.generateConstantCards();
        }
      }

      protected generateRandomCards() {
        const suits = ['club', 'diamond', 'heart', 'spade'];
        const numbers = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];

        const cardSetOriginal = new Array();
        for (let i = 0; i < this.numberOfCardSet; i++) {
          suits.map(suit => {
            numbers.map(number => {
              cardSetOriginal.push(suit + number);
            });
          });
        }

        return utils.permutate(cardSetOriginal);
      }

      protected generateConstantCards() {}

      public start(data: data.TableInfo) {
        // random choose a result process
        setTimeout(async () => {
          await this.randomWin(data);
          this.start(data);
        }, this.firstRoundInterval);
      }

      protected shouldDistributeA3(gameData: bab.GameData){ //distribute bankerpoint
        if(gameData.playerpoint === 8 || gameData.playerpoint === 9){
          return false;
        }
        if(gameData.bankerpoint === 8 || gameData.bankerpoint === 9){
          return false;
        }
        if(gameData.bankerpoint >= 0 && gameData.bankerpoint <= 2){
          return true;
        }
        if(gameData.bankerpoint === 3){
          if(gameData.b3 && this.translateCardToPoint(gameData.b3) === 8){
            return false;
          }
          return true;
        }
                if(gameData.bankerpoint === 4){
          if(gameData.b3 && this.translateCardToPoint(gameData.b3) === 0 && this.translateCardToPoint(gameData.b3) === 1 && this.translateCardToPoint(gameData.b3) === 8 && this.translateCardToPoint(gameData.b3) === 9){
            return false;
          }
          return true;
        }
                        if(gameData.bankerpoint === 5){
                          const b3point = this.translateCardToPoint(gameData.b3);
          if(gameData.b3 && ( b3point === 0 || b3point === 1 || b3point === 2 || b3point === 3 || b3point === 8 ||  b3point === 9)){
            return false;
          }
          return true;
        }
        return false;
      }

      protected shouldDistributeB3(gameData: bab.GameData){ //distribute player
        if(gameData.playerpoint === 8 || gameData.playerpoint === 9){
          return false;
        }
        if(gameData.bankerpoint === 8 || gameData.bankerpoint === 9){
          return false;
        }

        if(gameData.playerpoint >= 0 && gameData.playerpoint <= 5){
          if(gameData.bankerpoint === 8 || gameData.bankerpoint === 9){
            return false;
          }
          return true;
        }
        if(gameData.playerpoint >=6 && gameData.playerpoint <= 7){
          return false;
        }
        return false;
      }

      protected async setResults(data: data.TableInfo) {
        const gameData = data.data;
        let interval : number;
        const cards = MockProcessBaccaratBlockchain.allCards.slice(this.currentCardIndex - 1,this.currentCardIndex + 4)
        for (let idx = 0; idx <4; idx++) {
          console.log ('xxxxxxx',idx,data)
          if(gameData.wintype !== null){
            return;
          }
          switch (idx) {
            case 0:
              gameData.b1 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex];
              gameData.b2 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex + 1];
              gameData.playerpoint = utils.getDigit(this.translateCardToPoint(gameData.b1) + this.translateCardToPoint(gameData.b2))
              interval = this.cardInterval
              this.currentCardIndex +=2
              console.log ('xxxxxxx 0',data)

              break;
            case 1:
              gameData.a1 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex];
              gameData.a2 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex + 1];
              gameData.bankerpoint = utils.getDigit(this.translateCardToPoint(gameData.a1) + this.translateCardToPoint(gameData.a2))
              interval = this.cardInterval
              this.currentCardIndex +=2
              break;
            case 2:

              if (this.shouldDistributeB3(gameData)){        
                              interval = this.card3Interval      
                              gameData.b3 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex];
              gameData.playerpoint = gameData.playerpoint + this.translateCardToPoint(gameData.b3)  
                              this.currentCardIndex ++    
         
              }else{
                continue
              }
              break;
            case 3:
 
              if (this.shouldDistributeA3(gameData)){
                             gameData.a3 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex];
              gameData.bankerpoint =  gameData.bankerpoint + this.translateCardToPoint(gameData.a3) 
              interval = this.card3Interval
                this.currentCardIndex ++
              }else{
                continue
              }
              break;
          }
          gameData.previousstate = gameData.state;
          gameData.state = core.GameState.DEAL;

          this.dispatchEvent(data);
          await this.sleep(interval);
        }
      }

      public async randomWin(data: data.TableInfo) {
        if (this.currentCardIndex > this.redCardIndex) {
          await this.shuffle(data);
        }
        await this.decideWin(data);
      }

      public async decideWin(data: data.TableInfo) {
        const gameData = new bab.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        gameData.a1 = gameData.a2 = gameData.a3 = gameData.b1 = gameData.b2 = gameData.b3  = null;
        gameData.wintype = null;
        this.dispatchEvent(data);
        await this.sleep(this.distributeInterval);

        await this.setResults(data);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;
        gameData.wintype = ba.WinType.PLAYER;
        this.updateBetResult(data, [ba.BetField.PLAYER]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l(utils.LogTarget.DEBUG, 'Round Completed');
      }

/*
      protected translateCardsToPoints(cards: string[]) {
        const points = new Array();
        for (let i = 0; i < cards.length; i++) {
          
        }
      }
*/
      protected translateCardToPoint(card: string){
        switch (card.charAt(card.length - 1)) {
            case '0':
            case 'k':
            case 'q':
            case 'j':
              return 10
            case 'a':
              return 1
            default:
              return +card.charAt(card.length - 1);
          }
      }

      public async shuffle(data: data.TableInfo) {
        this.resetShoe();
        const gameData = new bab.GameData();
        data.data = gameData;
        data.bets = [];
        // set to bet state and wait
        gameData.b1 = MockProcessBaccaratBlockchain.allCards[0];
        gameData.currentcardindex = this.currentCardIndex;

        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.SHUFFLE;
        gameData.currentcardindex = this.currentCardIndex
        gameData.redcardindex = this.redCardIndex
        gameData.firstcard = MockProcessBaccaratBlockchain.allCards[0]
        gameData.maskedcardssnList = MockProcessBaccaratBlockchain.allCards

        this.dispatchEvent(data);
        await this.sleep(this.shuffleStateInterval);

        //this.currentCardIndex += MockProcessBaccaratBlockchain.allCards[0];

        // done
        logger.l(utils.LogTarget.DEBUG, 'Shuffle Completed');
      }
    }
  }
}
