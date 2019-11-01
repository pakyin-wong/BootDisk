namespace socket {
  export class MockProcess {
    private _sleepCounter = {
      tableInfoListInternal: 0,
      tableInfoList: 0,
      baccaratInternal: 0,
      baccarat: 0,
    };
    private _sleepCounterReset = {
      tableInfoList: false,
      baccarat: false,
    };

    private socket: SocketMock;

    private roundID: number = 1;
    public finishStateInterval: number = 5000;
    public shuffleStateInterval: number = 10000;
    public cardInterval: number = 1000;
    public startCardInterval: number = 2000;
    public betStateInterval: number = 10;

    public startRand = 0;
    public endRand = 6;

    constructor(socket: SocketMock) {
      this.socket = socket;
    }

    private async sleep(ms, sleepCounter: string) {
      return new Promise(r => (this._sleepCounter[sleepCounter] = setTimeout(r, ms)));
    }

    public startBaccarat(data: TableInfo) {
      // random choose a result process
      setTimeout(() => {
        this.randomWin(data).then(() => {
          this.startBaccarat(data);
        });
      });
    }

    public stopBaccarat() {
      clearTimeout(this._sleepCounter.tableInfoListInternal);
    }

    private async setCards(data: TableInfo, cards: string[]) {
      let idx = 0;
      const gameData = data.data;
      for (const card of cards) {
        switch (idx++) {
          case 2:
            gameData.a1 = card;
            break;
          case 3:
            gameData.a2 = card;
            break;
          case 0:
            gameData.b1 = card;
            break;
          case 1:
            gameData.b2 = card;
            break;
          case 5:
            gameData.a3 = card;
            break;
          case 4:
            gameData.b3 = card;
            break;
        }
        this.dispatchEvent(data);
        await this.sleep(this.cardInterval, 'tableInfoListInternal');
      }
    }

    private updateBetResult(data: TableInfo, winningFields: string[]) {
      for (const winningField of winningFields) {
        let isMatch = false;
        for (const betDetail of data.bets) {
          if (betDetail.field === winningField) {
            betDetail.iswin = 1;
            betDetail.winamount = betDetail.amount;
            isMatch = true;
            break;
          }
        }
        if (!isMatch) {
          data.bets.push({
            field: winningField,
            winamount: 0,
            iswin: 1,
          });
        }
      }
      this.socket.dispatchBetInfoUpdateEvent(data);
    }

    private async initGameData(data: TableInfo, gameData: baccarat.GameData) {
      await this.sleep(3000 + Math.random() * 5000, 'tableInfoListInternal');
      data.data = gameData;
      data.bets = [];
      gameData.state = enums.baccarat.GameState.BET;
      gameData.starttime = Date.now();
      gameData.countdown = this.betStateInterval;
      gameData.gameroundid = (this.roundID++).toString();
    }

    private dispatchEvent(data: TableInfo) {
      this.socket.dispatchInfoUpdateEvent(data);
      this.socket.dispatchListUpdateEvent(data);
    }

    public async randomWin(data: TableInfo) {
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

    public async playerWin(data: TableInfo) {
      const gameData = new baccarat.GameData();
      // set to bet state and wait
      await this.initGameData(data, gameData);
      this.dispatchEvent(data);
      await this.sleep(gameData.countdown * 1000, 'tableInfoListInternal');

      // set to deal state and start showing the result
      gameData.state = enums.baccarat.GameState.DEAL;
      this.dispatchEvent(data);
      await this.sleep(this.startCardInterval, 'tableInfoListInternal');

      await this.setCards(data, ['cluba', 'heartk', 'diamonda', 'spade2', 'diamond6', 'spade9']);

      // set to finish state and calculate the bet result
      gameData.state = enums.baccarat.GameState.FINISH;
      gameData.wintype = enums.baccarat.FinishType.PLAYER_WIN;
      this.updateBetResult(data, [enums.baccarat.BetField.PLAYER]);
      this.dispatchEvent(data);
      await this.sleep(this.finishStateInterval, 'tableInfoListInternal');

      // done
      egret.log('Round Completed');
    }

    public async bankerWin(data: TableInfo) {
      const gameData = new baccarat.GameData();
      // set to bet state and wait
      await this.initGameData(data, gameData);
      this.dispatchEvent(data);
      await this.sleep(gameData.countdown * 1000, 'tableInfoListInternal');

      // set to deal state and start showing the result
      gameData.state = enums.baccarat.GameState.DEAL;
      this.dispatchEvent(data);
      await this.sleep(this.startCardInterval, 'tableInfoListInternal');

      await this.setCards(data, ['cluba', 'heartq', 'diamond6', 'spade3']);

      // set to finish state and calculate the bet result
      gameData.state = enums.baccarat.GameState.FINISH;
      gameData.wintype = enums.baccarat.FinishType.BANKER_WIN;
      this.updateBetResult(data, [enums.baccarat.BetField.BANKER]);
      this.dispatchEvent(data);
      await this.sleep(this.finishStateInterval, 'tableInfoListInternal');

      // done
      egret.log('Round Completed');
    }

    public async bankerPairWin(data: TableInfo) {
      const gameData = new baccarat.GameData();
      // set to bet state and wait
      await this.initGameData(data, gameData);
      this.dispatchEvent(data);
      await this.sleep(gameData.countdown * 1000, 'tableInfoListInternal');

      // set to deal state and start showing the result
      gameData.state = enums.baccarat.GameState.DEAL;
      this.dispatchEvent(data);
      await this.sleep(this.finishStateInterval, 'tableInfoListInternal');

      await this.setCards(data, ['hearta', 'club6', 'diamond4', 'spade4']);

      // set to finish state and calculate the bet result
      gameData.state = enums.baccarat.GameState.FINISH;
      gameData.wintype = enums.baccarat.FinishType.BANKER_WIN;
      this.updateBetResult(data, [enums.baccarat.BetField.BANKER, enums.baccarat.BetField.BANKER_PAIR]);
      this.dispatchEvent(data);
      await this.sleep(this.finishStateInterval, 'tableInfoListInternal');

      // done
      egret.log('Round Completed');
    }

    public async bankerWinPlayerPair(data: TableInfo) {
      const gameData = new baccarat.GameData();
      // set to bet state and wait
      await this.initGameData(data, gameData);
      this.dispatchEvent(data);
      await this.sleep(gameData.countdown * 1000, 'tableInfoListInternal');

      // set to deal state and start showing the result
      gameData.state = enums.baccarat.GameState.DEAL;
      this.dispatchEvent(data);
      await this.sleep(this.startCardInterval, 'tableInfoListInternal');

      await this.setCards(data, ['hearta', 'cluba', 'diamond4', 'spade3']);

      // set to finish state and calculate the bet result
      gameData.state = enums.baccarat.GameState.FINISH;
      gameData.wintype = enums.baccarat.FinishType.BANKER_WIN;
      this.updateBetResult(data, [enums.baccarat.BetField.BANKER, enums.baccarat.BetField.PLAYER_PAIR]);
      this.dispatchEvent(data);
      await this.sleep(this.finishStateInterval, 'tableInfoListInternal');

      // done
      egret.log('Round Completed');
    }

    public async tie(data: TableInfo) {
      const gameData = new baccarat.GameData();
      // set to bet state and wait
      await this.initGameData(data, gameData);
      this.dispatchEvent(data);
      await this.sleep(gameData.countdown * 1000, 'tableInfoListInternal');

      // set to deal state and start showing the result
      gameData.state = enums.baccarat.GameState.DEAL;
      this.dispatchEvent(data);
      await this.sleep(this.startCardInterval, 'tableInfoListInternal');

      await this.setCards(data, ['diamond5', 'spade3', 'cluba', 'heart7']);

      // set to finish state and calculate the bet result
      gameData.state = enums.baccarat.GameState.FINISH;
      gameData.wintype = enums.baccarat.FinishType.TIE;
      this.updateBetResult(data, [enums.baccarat.BetField.TIE]);
      this.dispatchEvent(data);
      await this.sleep(this.finishStateInterval, 'tableInfoListInternal');

      // done
      egret.log('Round Completed');
    }

    public async shuffle(data: TableInfo) {
      const gameData = new baccarat.GameData();
      data.data = gameData;
      data.bets = [];
      // set to bet state and wait
      gameData.state = enums.baccarat.GameState.SHUFFLE;
      this.dispatchEvent(data);
      await this.sleep(this.shuffleStateInterval, 'tableInfoListInternal');

      // done
      egret.log('Shuffle Completed');
    }
  }
}