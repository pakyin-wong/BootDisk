/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace bamb {
    export class MobileScene extends bab.MobileScene {
      protected _gameData: data.GameData & data.BlockchainGameData & data.SqueezingBlockchainGameData;
      protected _timeMultiple: number = 1000;
      protected _squeezeTimer: ui.CountdownTimer;
      protected _flipCardHolder: FlipCardHolder;
      protected _particleGroup: eui.Group;
      protected _wholeMoveGroup: eui.Group;
      protected _animRingGroup: eui.Group;
      protected _resultDisplay: ui.IResultDisplay & we.blockchain.CardHolder & we.bamb.MobileCardHolder

      public static resGroups = [core.res.Blockchain, core.res.BlockchainBaccarat, core.res.BlockchainSqueezeBaccarat];

      protected mount() {
        super.mount();
        this._resultDisplay.passFlipCardHolder(this._flipCardHolder);
      }

      protected passBackgroundsToResultDisplay(){
        this._resultDisplay.passBackgrounds({
          wholeMoveGroup: this._wholeMoveGroup,
          animRingGroup: this._animRingGroup,
          particleGroup: this._particleGroup
        })
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainSqueezeBaccaratScene');
        this._skinKey = 'BlockchainSqueezeBaccaratScene';
      }

      protected toggleBottomGamePanel() {
        super.toggleBottomGamePanel();
        if (env.isBottomPanelOpen) {
          this._squeezeTimer.y = 362;
        } else {
          this._squeezeTimer.y = 488;

        }
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        this._squeezeTimer.visible = false;
      }

      protected setStatePeek(isInit: boolean = false) {
        console.log('PEEK', this._gameData.state, this._gameData.gameroundid, (<any>this._gameData).peekstarttime);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);
        if (this._previousState !== we.core.GameState.PEEK || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }

        console.log(this._gameData);
        console.log('timer____ ', this._gameData.countdownA * this._timeMultiple, env.currTime, this._gameData.peekstarttime, this._gameData.starttime);
        const countdownValue = this._gameData.countdownA * this._timeMultiple;
        const remainingTime = this._gameData.countdownA * this._timeMultiple - (env.currTime - this._gameData.peekstarttime);
        this.startTimer(countdownValue, remainingTime);
        this._squeezeTimer.visible = true;
      }

      protected setStatePeekPlayer(isInit: boolean = false) {
        // console.log('PEEK_PLAYER ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);

        if (this._previousState !== we.core.GameState.PEEK_PLAYER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }

        const countdownValue = (<any>this._gameData).countdownB * this._timeMultiple;
        const remainingTime = (<any>this._gameData).countdownB * this._timeMultiple - (env.currTime - (<any>this._gameData).peekstarttime);
        this.startTimer(countdownValue, remainingTime);
        this._squeezeTimer.visible = true;
      }

      protected setStatePeekBanker(isInit: boolean = false) {
        // console.log('PEEK_BANKER ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);
        if (this._previousState !== we.core.GameState.PEEK_BANKER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }

        const countdownValue = (<any>this._gameData).countdownB * this._timeMultiple;
        const remainingTime = (<any>this._gameData).countdownB * this._timeMultiple - (env.currTime - (<any>this._gameData).starttime - (<any>this._gameData).peekstarttime);
        this.startTimer(countdownValue, remainingTime);
        this._squeezeTimer.visible = true;
      }

      protected setStateFinish(isInit: boolean = false) {
        // console.log('FINISH ' + new Date(Date.now()).toString());
        super.setStateFinish(isInit);
        // this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);
        this._squeezeTimer.visible = false;
        this.setResultRelatedComponentsEnabled(true);
      }

      protected startTimer(countdown: number, remaining: number) {
        if (this._squeezeTimer) {
          this._squeezeTimer.visible = true;
          this._squeezeTimer.countdownValue = countdown;
          this._squeezeTimer.remainingTime = remaining;
          this._squeezeTimer.start();
        }
      }

    }
  }
}
