/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace rol {
    export class Scene extends ro.Scene {
      protected _dealRelatedGroup: eui.Group;
      protected _lucky1: eui.Image;
      protected _lucky1No: eui.Label;
      protected _lucky1Odd: eui.Label;
      protected _lucky2: eui.Image;
      protected _lucky2No: eui.Label;
      protected _lucky2Odd: eui.Label;
      protected _lucky3: eui.Image;
      protected _lucky3No: eui.Label;
      protected _lucky3Odd: eui.Label;

      protected mount() {
        super.mount();
        this._leftGamePanel.chipLayer = this._chipLayer;
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'rol' });
      }
      protected setStateIdle(isInit: boolean = false) {
        super.setStateIdle(isInit);
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.rol.RolLeftPanel> this._leftGamePanel).clearLuckyNumbers();
      }
      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.rol.RolLeftPanel> this._leftGamePanel).clearLuckyNumbers();
      }
      protected setStateFinish(isInit: boolean = false) {
        super.setStateFinish(isInit);
        if (this._previousState !== we.core.GameState.FINISH || isInit) {
          (<we.rol.RolLeftPanel> this._leftGamePanel).updateLuckyNumbers();
        }
      }

      protected setStateRefund(isInit: boolean = false) {
        super.setStateRefund(isInit);
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.rol.RolLeftPanel> this._leftGamePanel).clearLuckyNumbers();
      }
      protected setStateShuffle(isInit: boolean = false) {
        super.setStateShuffle(isInit);
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.rol.RolLeftPanel> this._leftGamePanel).clearLuckyNumbers();
      }

      protected setStateUnknown(isInit: boolean = false) {
        super.setStateUnknown(isInit);
        (<we.rol.ChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.rol.RolLeftPanel> this._leftGamePanel).clearLuckyNumbers();
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        if (this._previousState !== we.core.GameState.DEAL || isInit) {
          (<we.rol.ChipLayer> this._chipLayer).showLuckyNumber();
          (<we.rol.RolLeftPanel> this._leftGamePanel).updateLuckyNumbers();
        }
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RouletteWealthScene');
      }
    }
  }
}
