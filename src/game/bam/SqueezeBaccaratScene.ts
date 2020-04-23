/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace bam {
    export class Scene extends ba.Scene {
      // protected _flipCard;

      protected initChildren() {
        super.initChildren();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('SqueezeBaccaratScene');
      }

      protected setStateDeal(isInit: boolean = false) {}

      protected setStatePeek(isInit: boolean = false) {
        console.log('PEEK');
        this._resultDisplay.updateResult(this._gameData);
        if (this._previousState !== we.core.GameState.PEEK || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
      }

      protected setStatePeekPlayer(isInit: boolean = false) {
        this._resultDisplay.updateResult(this._gameData);
        console.log('PEEK_PLAYER');
        if (this._previousState !== we.core.GameState.PEEK_PLAYER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
      }

      protected setStatePeekBanker(isInit: boolean = false) {
        this._resultDisplay.updateResult(this._gameData);
        if (this._previousState !== we.core.GameState.PEEK_BANKER || isInit) {
          console.log('PEEK_BANKER');
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
      }

      protected setStateFinish(isInit: boolean = false) {
        console.log('FINISH');
        super.setStateFinish(isInit);
        this._resultDisplay.updateResult(this._gameData);
        this.setResultRelatedComponentsEnabled(true);
      }
    }
  }
}
