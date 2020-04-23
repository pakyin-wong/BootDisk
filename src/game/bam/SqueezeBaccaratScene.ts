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

      protected setStatePeek(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK || isInit) {
          this._resultDisplay.visible = true;
          this._resultDisplay.updateResult(this._gameData);
        }
      }

      protected setStatePeekPlayer(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK_PLAYER || isInit) {
          this._resultDisplay.visible = true;
          this._resultDisplay.updateResult(this._gameData);
        }
      }

      protected setStatePeekBanker(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK_BANKER || isInit) {
          this._resultDisplay.visible = true;
          this._resultDisplay.updateResult(this._gameData);
        }
      }

      protected setStateFinish(isInit: boolean = false) {
        super.setStateFinish(isInit);
        this._resultDisplay.updateResult(this._gameData);
      }
    }
  }
}
