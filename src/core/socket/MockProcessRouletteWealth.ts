namespace we {
  export namespace core {
    export class MockProcessRouletteWealth extends we.core.MockProcessRoulette {
      constructor(socket: SocketMock, gameType = core.GameType.ROL) {
        super(socket, gameType);
      }

      public async game(data: data.TableInfo) {
        const gameData = new rol.GameData();
        // set to bet state and wait
        await this.initGameData(data, gameData);
        gameData.luckynumber = {
          0: 100,
          2: 100,
          11: 30,
        }
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
    }
  }
}
