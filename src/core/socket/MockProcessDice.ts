namespace we {
  export namespace core {
    export class MockProcessDice extends MockProcess {
      constructor(socket: SocketMock, gameType = core.GameType.DI) {
        super(socket, gameType);
      }

      protected async setResults(data: data.TableInfo, results: string[], points: number[]) {
        const idx = 0;
        const gameData = data.data;
        gameData.dice1 = points[0];
        gameData.dice2 = points[1];
        gameData.dice3 = points[2];
        gameData.total = points[0] + points[1] + points[2];
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;

        this.dispatchEvent(data);
      }

      public async randomWin(data: data.TableInfo) {
        const rand = Math.floor(Math.random() * (this.endRand - this.startRand)) + this.startRand;
        if (rand < 5) {
          await this.game(data);
        } else {
          await this.shuffle(data);
        }
      }

      public async game(data: data.TableInfo) {
        const gameData = new di.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);
        const gameResult1 = Math.floor(Math.random() * 6) + 1;
        const gameResult2 = Math.floor(Math.random() * 6) + 1;
        const gameResult3 = Math.floor(Math.random() * 6) + 1;
        logger.l('GameResult: ', gameResult1, gameResult2, gameResult3);

        await this.setResults(data, [gameResult1.toString(), gameResult2.toString(), gameResult3.toString()], [gameResult1, gameResult2, gameResult3]);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;
        gameData.wintype = ba.WinType.TIE;
        this.updateBetResult(data, [ba.BetField.TIE]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l('Round Completed');
      }

      public async shuffle(data: data.TableInfo) {
        const gameData = new ba.GameData();
        data.data = gameData;
        data.bets = [];
        // set to bet state and wait
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.SHUFFLE;
        this.dispatchEvent(data);
        await this.sleep(this.shuffleStateInterval);

        // done
        logger.l('Shuffle Completed');
      }
    }
  }
}
