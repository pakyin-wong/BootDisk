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
        if (!env.isFirstTimeBam) {
          const tutorial = new SqueezeTutorial('SqueezeTutorial');
          tutorial.x = 106;
          tutorial.y = 171;
          tutorial.isDraggable = true;
          tutorial.isEdgeDismissable = true;
          this.addChild(tutorial);
          env.isFirstTimeBam = true;
        }
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('SqueezeBaccaratScene');
      }

      protected setStateDeal(isInit: boolean = false) {}

      protected setStatePeek(isInit: boolean = false) {
        // console.log('PEEK ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        if (this._previousState !== we.core.GameState.PEEK || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
      }

      protected setStatePeekPlayer(isInit: boolean = false) {
        // console.log('PEEK_PLAYER ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);

        if (this._previousState !== we.core.GameState.PEEK_PLAYER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
      }

      protected setStatePeekBanker(isInit: boolean = false) {
        // console.log('PEEK_BANKER ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        if (this._previousState !== we.core.GameState.PEEK_BANKER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
      }

      protected setStateFinish(isInit: boolean = false) {
        // console.log('FINISH ' + new Date(Date.now()).toString());
        super.setStateFinish(isInit);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        this.setResultRelatedComponentsEnabled(true);
      }
    }
  }
}
