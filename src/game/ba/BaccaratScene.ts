/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace ba {
    export class Scene extends core.BaseGameScene {
      protected _roadmapControl: BARoadmapControl;
      protected _leftGamePanel: BARoadmapLeftPanel;
      protected _rightGamePanel: BARoadmapRightPanel;
      protected _beadRoadResultPanel: BaBeadRoadResultPanel;

      protected _switchBaMode: eui.ToggleSwitch;
      protected _lblBaMode: ui.RunTimeLabel;

      constructor(data: any) {
        super(data);
        // this._leftGamePanel = this._roadmapLeftPanel;
        // this._rightGamePanel = this._roadmapRightPanel;
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BaccaratScene');
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);

        this._bettingTable.type = we.core.BettingTableType.NORMAL;

        if (this._switchBaMode) {
          this._bettingTable.setGameMode(this._switchBaMode.selected);
          this._switchBaMode.addEventListener(eui.UIEvent.CHANGE, this.onBaModeToggle, this);
        }

        this._lblBaMode.renderText = () => `${i18n.t('baccarat.noCommission')}`;
      }

      protected onBaModeToggle(evt: eui.UIEvent) {
        this._bettingTable.setGameMode(this._switchBaMode.selected);
      }

      protected initRoadMap() {
        this._roadmapControl = new BARoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          this._leftGamePanel.beadRoad,
          this._rightGamePanel.bigRoad,
          this._rightGamePanel.bigEyeRoad,
          this._rightGamePanel.smallRoad,
          this._rightGamePanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._rightGamePanel,
          this._beadRoadResultPanel
        );
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }
    }
  }
}
