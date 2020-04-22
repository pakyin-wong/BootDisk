namespace we {
  export namespace core {
    export class MockProcessRouletteWealth extends we.core.MockProcessRoulette {
      constructor(socket: SocketMock, gameType = core.GameType.ROL) {
        super(socket, gameType);
      }

      protected async setResults(data: data.TableInfo, results: string[], points: number[]) {
        const idx = 0;
        const gameData = data.data;
        console.log(data);

        if (gameData) {
          gameData.value = points[0];
          gameData.previousstate = gameData.state;
          gameData.state = core.GameState.DEAL;
          this.dispatchEvent(data);
        }
      }

      public async game(data: data.TableInfo) {
        const gameData = new rol.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        this.dispatchEvent(data);
        await this.sleep(gameData.countdown * 1000);

        // set to deal state and start showing the result
        gameData.previousstate = gameData.state;
        gameData.state = core.GameState.DEAL;

        this.dispatchEvent(data);
        await this.sleep(this.startCardInterval);
        const gameResult = Math.floor(Math.random() * 37);
        logger.l('GameResult: ', gameResult);
        logger.l('GameResult.toString(): ', gameResult.toString());

        await this.setResults(data, [gameResult.toString()], [gameResult]);

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

      protected async initGameData(data: data.TableInfo, gameData: data.GameData) {
        super.initGameData(data, gameData);
        (<we.rol.GameData> gameData).luckynumber = {
          0: 100,
          2: 100,
          10: 30,
        };
      }
    }
  }
}
