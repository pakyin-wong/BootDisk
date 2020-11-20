/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace bamb {
    export class Scene extends bab.Scene {
      protected _squeezeTimer: ui.CountdownTimer;
      public static resGroups = [core.res.Blockchain, core.res.BlockchainSqueezeBaccarat];

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainSqueezeBaccaratScene');
        this._skinKey = 'BlockchainBaccaratScene';
      }

      protected setStateBet(isInit: boolean) {
        super.setStateBet(isInit);
        this._squeezeTimer.visible = false;
      }

      public updateGame(isInit: boolean = false) {
        super.updateGame(isInit);
        console.log('updateGame state: ', this._gameData.state, this._gameData)
      }

      protected setStatePeek(isInit: boolean = false) {
        // console.log('PEEK ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        if (this._previousState !== we.core.GameState.PEEK || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }


        const countdownValue = (<any>this._gameData).countdownA * 1000;
        const remainingTime = (<any>this._gameData).countdownA * 1000 - (env.currTime - (<any>this._gameData).peekstarttime);
        this.startTimer(countdownValue, remainingTime)
      }

      protected setStatePeekPlayer(isInit: boolean = false) {
        // console.log('PEEK_PLAYER ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);

        if (this._previousState !== we.core.GameState.PEEK_PLAYER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }

        const countdownValue = (<any>this._gameData).countdownB * 1000;
        const remainingTime = (<any>this._gameData).countdownB * 1000 - (env.currTime - (<any>this._gameData).peekstarttime);
        this.startTimer(countdownValue, remainingTime)

      }

      protected setStatePeekBanker(isInit: boolean = false) {
        // console.log('PEEK_BANKER ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        if (this._previousState !== we.core.GameState.PEEK_BANKER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }

        const countdownValue = (<any>this._gameData).countdownB * 1000;
        const remainingTime = (<any>this._gameData).countdownB * 1000 - (env.currTime - (<any>this._gameData).starttime - (<any>this._gameData).peekstarttime);
        this.startTimer(countdownValue, remainingTime)

      }

      protected setStateFinish(isInit: boolean = false) {
        // console.log('FINISH ' + new Date(Date.now()).toString());
        super.setStateFinish(isInit);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        this.setResultRelatedComponentsEnabled(true);
      }

      protected startTimer(countdown: number, remaining: number) {
        if (this._squeezeTimer) {
          this._squeezeTimer.visible = true;
          this._squeezeTimer.countdownValue = countdown
          this._squeezeTimer.remainingTime = remaining
          this._squeezeTimer.start();
        }
      }
    }
  }
}
