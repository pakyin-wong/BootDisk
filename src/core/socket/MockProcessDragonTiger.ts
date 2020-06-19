namespace we {
  export namespace core {
    export class MockProcessDragonTiger extends MockProcess {
      constructor(socket: SocketMock, gameType = core.GameType.DT) {
        super(socket, gameType);
      }

      protected async setResults(data: data.TableInfo, results: string[], points: number[]) {
        let idx = 0;
        const gameData = data.data;
        for (const card of results) {
          switch (idx) {
            case 0:
              gameData.d = card;
              gameData.dragonpoint = (gameData.dragonpoint + points[idx]) % 10;
              break;
            case 1:
              gameData.t = card;
              gameData.tigerpoint = (gameData.tigerpoint + points[idx]) % 10;
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
        const rand = Math.floor(Math.random() * (this.endRand - this.startRand)) + this.startRand;
        switch (rand) {
          case 0:
            await this.dragonWin(data);
            break;
          case 1:
            await this.tigerWin(data);
            break;
          case 2:
            await this.tie(data);
            break;
          case 3:
            await this.shuffle(data);
            break;
          default:
            await this.shuffle(data);
            break;
        }
      }

      public async dragonWin(data: data.TableInfo) {
        const gameData = new dt.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);

        await this.setResults(data, ['cluba', 'heartk'], [11, 10]);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;
        gameData.wintype = dt.WinType.DRAGON;
        this.updateBetResult(data, [dt.BetField.DRAGON]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l(utils.LoggerTarget.DEBUG, 'Round Completed');
      }

      public async tigerWin(data: data.TableInfo) {
        const gameData = new dt.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);

        await this.setResults(data, ['club2', 'heart9'], [2, 9]);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;
        gameData.wintype = dt.WinType.TIGER;
        this.updateBetResult(data, [dt.BetField.TIGER]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l(utils.LoggerTarget.DEBUG, 'Round Completed');
      }

      public async tie(data: data.TableInfo) {
        const gameData = new dt.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);

        await this.setResults(data, ['diamond5', 'spade5'], [5, 5]);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;
        gameData.wintype = dt.WinType.TIE;
        this.updateBetResult(data, [dt.BetField.TIE]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l(utils.LoggerTarget.DEBUG, 'Round Completed');
      }

      public async shuffle(data: data.TableInfo) {
        const gameData = new dt.GameData();
        data.data = gameData;
        data.bets = [];
        // set to bet state and wait
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.SHUFFLE;
        this.dispatchEvent(data);
        await this.sleep(this.shuffleStateInterval);

        // done
        logger.l(utils.LoggerTarget.DEBUG, 'Shuffle Completed');
      }
    }
  }
}
