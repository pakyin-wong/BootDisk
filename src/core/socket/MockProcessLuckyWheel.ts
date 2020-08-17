namespace we {
  export namespace core {
    export class MockProcessLuckyWheel extends MockProcess {
      constructor(socket: SocketMock, gameType = core.GameType.LW) {
        super(socket, gameType);
      }

      protected async setResults(data: data.TableInfo, results: string[], points: number[]) {
        const idx = 0;
        const gameData = data.data;
        gameData.value = results[0];
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
        const gameData = new lw.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);
        const gameResult = Math.floor(1 + Math.random() * 6);
        logger.l(utils.LogTarget.DEBUG, 'GameResult: ', gameResult);
        logger.l(utils.LogTarget.DEBUG, 'GameResult.toString(): ', gameResult.toString());

        await this.setResults(data, [`0${gameResult.toString()}`], [gameResult]);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;
        gameData.wintype = ba.WinType.TIE;
        this.updateBetResult(data, [ba.BetField.TIE]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l(utils.LogTarget.DEBUG, 'Round Completed');
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
        logger.l(utils.LogTarget.DEBUG, 'Shuffle Completed');
      }
    }
  }
}
