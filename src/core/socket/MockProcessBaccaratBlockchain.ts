namespace we {
  export namespace core {
    export class MockProcessBaccaratBlockchain extends MockProcess {
      public static allCards: string[];
      public static allHash;
      public static allMasked;

      protected firstRoundInterval = 500;
      protected distributeInterval = 2000;
      // protected remainingCardCount;
      // protected remainingCardCountTillRed = -1;
      protected currentCardIndex = 1;
      protected redCardIndex = -1;
      protected numberOfCardSet = 8;
      protected randRedCardRange = [250, 290];
      protected randomCards = true;
      public betStateInterval: number = 30;

      public shuffleStateInterval = 70000;

      constructor(socket: SocketMock, gameType = core.GameType.BAC) {
        super(socket, gameType);
      }

      protected resetShoe() {
        // this.remainingCardCount = 13 * this.numberOfCardSet;
        this.redCardIndex = this.randRedCardRange[0] + Math.random() * (this.randRedCardRange[1] - this.randRedCardRange[0]);
        this.redCardIndex = Math.round(this.redCardIndex);
        this.currentCardIndex = 1;
        MockProcessBaccaratBlockchain.allCards = this.generateAllCards();
        // console.log('resetShoe allCards:', MockProcessBaccaratBlockchain.allCards);
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
        (async () => {
          await utils.sleep(1500);
          await this.randomWin(data);
          this.start(data);
        })();
        // random choose a result process
        /*
        setTimeout(async () => {
          await this.randomWin(data);
          this.start(data);
        }, this.firstRoundInterval);
        */
      }

      protected shouldDistributeA3(gameData: bab.GameData) {
        // distribute bankerpoint
        if (gameData.playerpoint === 8 || gameData.playerpoint === 9) {
          return false;
        }
        if (gameData.bankerpoint === 8 || gameData.bankerpoint === 9) {
          return false;
        }
        if (gameData.bankerpoint >= 0 && gameData.bankerpoint <= 2) {
          return true;
        }
        if (gameData.bankerpoint === 3) {
          if (gameData.b3 && utils.stat.ba.translateCardToPoint(gameData.b3) === 8) {
            return false;
          }
          return true;
        }
        if (gameData.bankerpoint === 4) {
          if (!gameData.b3) {
            return true;
          }
          const b3point = utils.stat.ba.translateCardToPoint(gameData.b3);
          if (b3point === 0 || b3point === 1 || b3point === 8 || b3point === 9) {
            return false;
          }
          return true;
        }
        if (gameData.bankerpoint === 5) {
          if (!gameData.b3) {
            return true;
          }
          const b3point = utils.stat.ba.translateCardToPoint(gameData.b3);
          if (b3point === 0 || b3point === 1 || b3point === 2 || b3point === 3 || b3point === 8 || b3point === 9) {
            return false;
          }
          return true;
        }
        if (gameData.bankerpoint === 6) {
          if (!gameData.b3) {
            return false;
          }
          const b3point = utils.stat.ba.translateCardToPoint(gameData.b3);
          if (b3point === 6 || b3point === 7) {
            return false;
          }
          return true;
        }
        return false;
      }

      protected shouldDistributeB3(gameData: bab.GameData) {
        // distribute player
        if (gameData.playerpoint === 8 || gameData.playerpoint === 9) {
          return false;
        }
        if (gameData.bankerpoint === 8 || gameData.bankerpoint === 9) {
          return false;
        }

        if (gameData.playerpoint >= 0 && gameData.playerpoint <= 5) {
          if (gameData.bankerpoint === 8 || gameData.bankerpoint === 9) {
            return false;
          }
          return true;
        }
        if (gameData.playerpoint >= 6 && gameData.playerpoint <= 7) {
          return false;
        }
        return false;
      }

      protected async setResults(data: data.TableInfo) {
        const gameData = data.data;
        let interval: number;
        const cards = MockProcessBaccaratBlockchain.allCards.slice(this.currentCardIndex - 1, this.currentCardIndex + 4);
        for (let idx = 0; idx < 4; idx++) {
          switch (idx) {
            case 0:
              gameData.b1 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex];
              gameData.b2 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex + 1];
              gameData.playerpoint = utils.getDigit(utils.stat.ba.translateCardToPoint(gameData.b1) + utils.stat.ba.translateCardToPoint(gameData.b2));
              interval = this.cardInterval;
              this.currentCardIndex += 2;
              console.log('setResults case: ', idx, data);

              break;
            case 1:
              gameData.a1 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex];
              gameData.a2 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex + 1];
              gameData.bankerpoint = utils.getDigit(utils.stat.ba.translateCardToPoint(gameData.a1) + utils.stat.ba.translateCardToPoint(gameData.a2));
              interval = this.cardInterval;
              this.currentCardIndex += 2;
              console.log('setResults case: ', idx, data);

              break;
            case 2:
              if (this.shouldDistributeB3(gameData)) {
                interval = this.card3Interval;
                gameData.b3 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex];
                gameData.playerpoint = gameData.playerpoint + utils.stat.ba.translateCardToPoint(gameData.b3);
                this.currentCardIndex++;
                console.log('setResults case: ', idx, data);
              } else {
                continue;
              }
              break;
            case 3:
              if (this.shouldDistributeA3(gameData)) {
                gameData.a3 = MockProcessBaccaratBlockchain.allCards[this.currentCardIndex];
                gameData.bankerpoint = gameData.bankerpoint + utils.stat.ba.translateCardToPoint(gameData.a3);
                interval = this.card3Interval;
                this.currentCardIndex++;
                console.log('setResults case: ', idx, data);
              } else {
                continue;
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
        console.log('randomWin', this.currentCardIndex, this.redCardIndex);
        if (this.currentCardIndex > this.redCardIndex) {
          await this.shuffle(data);
        }
        await this.decideWin(data);
      }

      public async decideWin(data: data.TableInfo) {
        const gameData = data.data;
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        gameData.a1 = gameData.a2 = gameData.a3 = gameData.b1 = gameData.b2 = gameData.b3 = null;
        gameData.wintype = null;
        this.dispatchEvent(data);
        await this.sleep(this.distributeInterval);

        await this.setResults(data);

        utils.stat.ba.translateCardToPoint(gameData.a3);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;

        // point
        if (gameData.playerpoint === gameData.bankerpoint) {
          gameData.wintype = ba.WinType.TIE;
        } else if (gameData.playerpoint > gameData.bankerpoint) {
          gameData.wintype = ba.WinType.PLAYER;
        } else {
          gameData.wintype = ba.WinType.BANKER;
        }

        this.updateBetResult(data, [ba.BetField.PLAYER]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l(utils.LogTarget.DEBUG, 'Round Completed');
      }

      protected async initGameData(data: data.TableInfo, gameData: data.GameData) {
        await this.sleep(3000 + Math.random() * 5000);
        data.data = gameData;
        data.bets = [];
        data.totalBet = 0;
        gameData.previousstate = gameData.state ? gameData.state : null;
        gameData.state = core.GameState.BET;
        gameData.starttime = Date.now();
        gameData.countdown = this.betStateInterval;
        gameData.gameroundid = (this.roundID++).toString();
      }

      public async shuffle(data: data.TableInfo) {
        console.log('MockProcess shuffle 1');
        this.resetShoe();
        const gameData = new bab.GameData();
        data.data = gameData;
        data.bets = [];
        // set to bet state and wait
        gameData.b1 = MockProcessBaccaratBlockchain.allCards[0];
        gameData.currentcardindex = this.currentCardIndex;
        gameData.maskedcardssnList = MockProcessBaccaratBlockchain.allCards;
        gameData.hashedcardsList = MockProcessBaccaratBlockchain.allCards;

        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.SHUFFLE;
        gameData.currentcardindex = this.currentCardIndex;
        gameData.redcardindex = this.redCardIndex;
        gameData.firstcard = MockProcessBaccaratBlockchain.allCards[0];
        console.log('MockProcess shuffle 2', data);
        this.dispatchEvent(data);
        await this.sleep(this.shuffleStateInterval);
        console.log('MockProcess shuffle 3', data);

        // this.currentCardIndex += MockProcessBaccaratBlockchain.allCards[0];

        // done
        logger.l(utils.LogTarget.DEBUG, 'Shuffle Completed');
      }
    }
  }
}
