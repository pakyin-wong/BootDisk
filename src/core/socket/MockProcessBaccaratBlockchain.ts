namespace we {
  export namespace core {
    export class MockProcessBaccaratBlockchain extends MockProcess {
      public static allCards;

      protected firstRoundInterval = 500;
      protected distributeInterval = 15000;
      protected remainingCardCount;
      protected remainingCardCountTillRed = -1;
      protected currentCardIndex;
      protected numberOfCardSet = 8;
      protected randRedCardRange = [250, 290];
      protected randomCards = true;
      public shuffleStateInterval = 15000;

      constructor(socket: SocketMock, gameType = core.GameType.BAC) {
        super(socket, gameType);
      }

      protected resetShoe() {
        this.remainingCardCount = 13 * this.numberOfCardSet;
        this.remainingCardCountTillRed = this.randRedCardRange[0] + Math.random() * (this.randRedCardRange[1] - this.randRedCardRange[0]);
        this.currentCardIndex = 1;
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

      protected async setResults(data: data.TableInfo, results: string[], points: number[]) {
        let idx = 0;
        const gameData = data.data;
        for (const card of results) {
          switch (idx) {
            case 2:
              gameData.a1 = card;
              gameData.bankerpoint = (gameData.bankerpoint + points[idx]) % 10;
              break;
            case 3:
              gameData.a2 = card;
              gameData.bankerpoint = (gameData.bankerpoint + points[idx]) % 10;
              break;
            case 0:
              gameData.b1 = card;
              gameData.playerpoint = (gameData.playerpoint + points[idx]) % 10;
              break;
            case 1:
              gameData.b2 = card;
              gameData.playerpoint = (gameData.playerpoint + points[idx]) % 10;
              break;
            case 5:
              gameData.a3 = card;
              gameData.bankerpoint = (gameData.bankerpoint + points[idx]) % 10;
              break;
            case 4:
              gameData.b3 = card;
              gameData.playerpoint = (gameData.playerpoint + points[idx]) % 10;
              break;
          }
          idx++;
          gameData.previousstate = gameData.state;
          gameData.state = core.GameState.DEAL;

          this.dispatchEvent(data);
          await this.sleep(this.cardInterval);
        }
      }

      public async randomWin(data: data.TableInfo) {
        if (this.remainingCardCountTillRed < 0) {
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
        gameData.a1 = gameData.a2 = gameData.b1 = gameData.b2 = null
        this.dispatchEvent(data);
        await this.sleep(this.distributeInterval);

        await this.setResults(data, ['cluba', 'heartk', 'diamonda', 'spade2', 'diamond6', 'spade9'], [1, 10, 1, 2, 6, 9]);

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

      protected translateCardsToPoints(cards: string[]) {
        const points = new Array();
        for (let i = 0; i < cards.length; i++) {
          switch (cards[i].charAt(cards[i].length - 1)) {
            case '0':
            case 'k':
            case 'q':
            case 'j':
              points.push(10);
              break;
            case 'a':
              points.push(1);
              break;
            default:
              points.push(+cards[i].charAt(cards[i].length - 1));
          }
        }
      }

      public async shuffle(data: data.TableInfo) {
        this.resetShoe();
        const gameData = new bab.GameData();
        data.data = gameData;
        data.bets = [];
        // set to bet state and wait
        gameData.b1 = MockProcessBaccaratBlockchain.allCards[0];
        gameData.currentCardIndex = this.currentCardIndex;

        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.SHUFFLE;
        this.dispatchEvent(data);
        await this.sleep(this.shuffleStateInterval);

        this.currentCardIndex += MockProcessBaccaratBlockchain.allCards[0];

        // done
        logger.l(utils.LogTarget.DEBUG, 'Shuffle Completed');
      }
    }
  }
}
