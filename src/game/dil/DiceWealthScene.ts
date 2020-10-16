/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace dil {
    export class Scene extends core.DesktopBaseGameScene {
      protected _roadmapControl: we.dil.DilRoadmapControl;
      protected _leftGamePanel: we.dil.LeftPanel;
      protected _rightGamePanel: we.dil.RightPanel;
      protected _beadRoadResultPanel: we.dil.DilBeadRoadResultPanel;

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._leftGamePanel.chipLayer = this._chipLayer;
        this._rightGamePanel.setTableInfo(this._tableInfo);
        this._roadmapControl.setTableInfo(this._tableInfo);
      }

      protected initRoadMap() {
        this._roadmapControl = new we.dil.DilRoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          this._leftGamePanel.beadRoad,
          this._leftGamePanel, 
          this._rightGamePanel, 
          this._beadRoadResultPanel);
      }

      // public backToLobby() {
      //   dir.sceneCtr.goto('lobby', { page: 'live', tab: 'di' });
      // }

      protected setStateIdle(isInit: boolean = false) {
        super.setStateIdle(isInit);
        (<we.dil.ChipLayer>this._chipLayer).clearLuckyNumber();
        (<we.dil.LeftPanel>this._leftGamePanel).clearLuckyNumbers();
      }
      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        (<we.dil.ChipLayer>this._chipLayer).clearLuckyNumber();
        (<we.dil.LeftPanel>this._leftGamePanel).clearLuckyNumbers();
      }
      protected setStateFinish(isInit: boolean = false) {
        super.setStateFinish(isInit);
        if (isInit && this._previousState !== we.core.GameState.FINISH) {
          (<we.dil.LeftPanel>this._leftGamePanel).updateLuckyNumbers();
        }
        (<we.dil.ChipLayer>this._chipLayer).clearLuckyNumber();
        (<dil.ChipLayer>this._chipLayer).showWinningNumber();
      }

      protected setStateRefund(isInit: boolean = false) {
        super.setStateRefund(isInit);
        (<we.dil.ChipLayer>this._chipLayer).clearLuckyNumber();
        (<we.dil.LeftPanel>this._leftGamePanel).clearLuckyNumbers();
      }
      protected setStateShuffle(isInit: boolean = false) {
        super.setStateShuffle(isInit);
        (<we.dil.ChipLayer>this._chipLayer).clearLuckyNumber();
        (<we.dil.LeftPanel>this._leftGamePanel).clearLuckyNumbers();
      }

      protected setStateUnknown(isInit: boolean = false) {
        super.setStateUnknown(isInit);
        (<we.dil.ChipLayer>this._chipLayer).clearLuckyNumber();
        (<we.dil.LeftPanel>this._leftGamePanel).clearLuckyNumbers();
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        if (this._previousState !== we.core.GameState.DEAL || isInit) {
          (<we.dil.ChipLayer>this._chipLayer).showLuckyNumber();
          (<we.dil.LeftPanel>this._leftGamePanel).updateLuckyNumbers();
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const stat = <data.TableInfo>evt.data;
          if (stat.tableid === this._tableId) {
            this._roadmapControl.updateRoadData();
            this._rightGamePanel.updateStat();
          }
        }
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DiceWealthScene');
      }

      public checkResultMessage(resultData = null) {
        (<any>this._gameData).hasBet = this.hasBet();
        super.checkResultMessage(resultData);
      }
    }
  }
}
