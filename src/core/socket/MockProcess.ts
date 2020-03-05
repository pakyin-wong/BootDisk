namespace we {
  export namespace core {
    export class MockProcess {
      protected socket: SocketMock;

      protected roundID: number = 1;
      public finishStateInterval: number = 5000;
      public shuffleStateInterval: number = 10000;
      public cardInterval: number = 1000;
      public startCardInterval: number = 2000;
      public betStateInterval: number = 10;

      public startRand = 0;
      public endRand = 6;

      public gameType = core.GameType.BAC;

      constructor(socket: SocketMock, gameType = core.GameType.BAC) {
        this.socket = socket;
        this.gameType = gameType;
      }

      protected async sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
      }

      public start(data: data.TableInfo) {
        // random choose a result process
        setTimeout(() => {
          this.randomWin(data).then(() => {
            this.start(data);
          });
        });
      }

      protected async setResults(data: data.TableInfo, results: string[], points: number[]) {}

      protected updateBetResult(data: data.TableInfo, winningFields: string[]) {
        let totalWin = 0;
        for (const betDetail of data.bets) {
          let isMatch = false;
          for (const winningField of winningFields) {
            if (betDetail.field === winningField) {
              betDetail.iswin = 1;
              betDetail.winamount = betDetail.amount * 2;
              totalWin += betDetail.amount * 2;
              isMatch = true;
              break;
            }
          }
          if (!isMatch) {
            if (betDetail.amount) {
              betDetail.winamount = -betDetail.amount;
              totalWin -= betDetail.amount;
            }
          }
        }
        data.totalWin = totalWin; // this.computeTotalWin(tableInfo.bets);
        this.checkResultNotificationReady(data);

        this.socket.dispatchBetInfoUpdateEvent(data);
      }

      protected hasBet(tableInfo: data.TableInfo): boolean {
        if (tableInfo.bets) {
          for (const betDetail of tableInfo.bets) {
            if (betDetail.amount > 0) {
              return true;
            }
          }
        }
        return false;
      }
      public checkResultNotificationReady(tableInfo: data.TableInfo) {
        if (tableInfo.data) {
          if (this.hasBet(tableInfo)) {
            if (
              tableInfo.data &&
              tableInfo.data.previousstate !== core.GameState.FINISH &&
              tableInfo.data.state === core.GameState.FINISH &&
              tableInfo.data.wintype !== 0 &&
              !isNaN(tableInfo.totalWin)
            ) {
              const data = {
                tableid: tableInfo.tableid,
              };
              const notification: data.Notification = {
                type: core.NotificationType.Result,
                data,
              };
              dir.evtHandler.dispatch(core.Event.NOTIFICATION, notification);
            }
          }
        }
      }

      protected async initGameData(data: data.TableInfo, gameData: data.GameData) {
        await this.sleep(3000 + Math.random() * 5000);
        data.data = gameData;
        data.bets = [];
        gameData.previousstate = gameData.state ? gameData.state : null;
        gameData.state = core.GameState.BET;
        gameData.starttime = Date.now();
        gameData.countdown = this.betStateInterval;
        gameData.gameroundid = (this.roundID++).toString();
      }

      protected dispatchEvent(data: data.TableInfo) {
        this.socket.dispatchInfoUpdateEvent(data);
      }

      public async randomWin(data: data.TableInfo) {
        const rand = Math.floor(Math.random() * (this.endRand - this.startRand)) + this.startRand;
        switch (rand) {
          default:
            await this.sleep(10000);
            break;
        }
      }
    }
  }
}
