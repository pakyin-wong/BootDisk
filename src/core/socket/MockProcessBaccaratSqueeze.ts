namespace we {
  export namespace core {
    export class MockProcessBaccaratSqueeze extends MockProcess {
      public countdownA: number = 8;
      public countdownB: number = 4;

      constructor(socket: SocketMock, gameType = core.GameType.BAC) {
        super(socket, gameType);
      }

      protected async setResults(data: data.TableInfo, results: string[], points: number[]) {
        const idx = 0;
        const gameData = data.data;

        // PEEK
        gameData.countdownA = this.countdownA;
        gameData.a1 = results[0];
        gameData.bankerpoint = (gameData.bankerpoint + points[idx]) % 10;
        gameData.a2 = results[1];
        gameData.bankerpoint = (gameData.bankerpoint + points[idx]) % 10;
        gameData.b1 = results[2];
        gameData.playerpoint = (gameData.playerpoint + points[idx]) % 10;
        gameData.b2 = results[3];
        gameData.playerpoint = (gameData.playerpoint + points[idx]) % 10;
        gameData.state = core.GameState.PEEK;
        gameData.peekstarttime = Date.now();
        gameData.countdown = this.countdownA;
        this.dispatchEvent(data);
        await this.sleep(this.countdownA * 1000 + 1000);

        // PEEK_PLAYER
        if (results[5]) {
          gameData.b3 = results[5];
          gameData.playerpoint = (gameData.playerpoint + points[idx]) % 10;
          gameData.state = core.GameState.PEEK_PLAYER;
          gameData.peekstarttime = Date.now();
          gameData.countdownB = this.countdownB;
          this.dispatchEvent(data);
          await this.sleep(this.countdownB * 1000 + 1000);
        }

        // PEEK_BANKER
        if (results[4]) {
          gameData.a3 = results[4];
          gameData.bankerpoint = (gameData.bankerpoint + points[idx]) % 10;
          gameData.state = core.GameState.PEEK_BANKER;
          gameData.peekstarttime = Date.now();
          gameData.countdownB = this.countdownB;
          this.dispatchEvent(data);
          await this.sleep(this.countdownB * 1000 + 1000);
        }
      }

      public async randomWin(data: data.TableInfo) {
        const rand = Math.floor(Math.random() * (this.endRand - this.startRand)) + this.startRand;
        switch (rand) {
          case 0:
            await this.playerWin(data);
            break;
          case 1:
            await this.bankerWin(data);
            break;
          case 2:
            await this.bankerPairWin(data);
            break;
          case 3:
            await this.bankerWinPlayerPair(data);
            break;
          case 4:
            await this.tie(data);
            break;
          case 5:
            await this.shuffle(data);
            break;
          default:
            await this.shuffle(data);
            break;
        }
      }

      public async playerWin(data: data.TableInfo) {
        const gameData = new ba.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);

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

      public async bankerWin(data: data.TableInfo) {
        const gameData = new ba.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);

        await this.setResults(data, ['cluba', 'heartq', 'diamond6', 'spade3'], [1, 10, 6, 3]);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;
        gameData.wintype = ba.WinType.BANKER;
        this.updateBetResult(data, [ba.BetField.BANKER]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l(utils.LogTarget.DEBUG, 'Round Completed');
      }

      public async bankerPairWin(data: data.TableInfo) {
        const gameData = new ba.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        await this.setResults(data, ['hearta', 'club6', 'diamond4', 'spade4'], [1, 6, 4, 4]);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;
        gameData.wintype = ba.WinType.BANKER;
        this.updateBetResult(data, [ba.BetField.BANKER, ba.BetField.BANKER_PAIR]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l(utils.LogTarget.DEBUG, 'Round Completed');
      }

      public async bankerWinPlayerPair(data: data.TableInfo) {
        const gameData = new ba.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);

        await this.setResults(data, ['hearta', 'cluba', 'diamond4', 'spade3'], [1, 1, 4, 3]);

        // set to finish state and calculate the bet result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.FINISH;
        gameData.wintype = ba.WinType.BANKER;
        this.updateBetResult(data, [ba.BetField.BANKER, ba.BetField.PLAYER_PAIR]);
        this.dispatchEvent(data);
        await this.sleep(this.finishStateInterval);

        // done
        logger.l(utils.LogTarget.DEBUG, 'Round Completed');
      }

      public async tie(data: data.TableInfo) {
        const gameData = new ba.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;
        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);

        await this.setResults(data, ['diamond5', 'spade3', 'cluba', 'heart7'], [5, 3, 1, 7]);

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
