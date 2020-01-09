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
      protected _roadmapLeftPanel: BARoadmapLeftPanel;
      protected _roadmapRightPanel: BARoadmapRightPanel;
      protected _beadRoadResultPanel: BaBeadRoadResultPanel;

      protected _switchBaMode: eui.ToggleSwitch;
      protected _lblBaMode: ui.RunTimeLabel;

      constructor(data: any) {
        super(data);
      }

      protected setSkinName() {
        this.skinName = utils.getSkin('BaccaratScene');
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.updateRoadData(this._tableInfo.roadmap);
        if (this._tableInfo.betInfo) {
          this._roadmapLeftPanel.setGameInfo(this._tableInfo.betInfo.gameroundid, this._tableInfo.betInfo.total);
        }

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
          this._roadmapLeftPanel.beadRoad,
          this._roadmapRightPanel.bigRoad,
          this._roadmapRightPanel.bigEyeRoad,
          this._roadmapRightPanel.smallRoad,
          this._roadmapRightPanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._roadmapRightPanel,
          this._beadRoadResultPanel
        );
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
        if (this._tableInfo.roadmap) {
          this._roadmapControl.updateRoadData(this._tableInfo.roadmap);
        }
        if (this._tableInfo.betInfo) {
          this._roadmapLeftPanel.setGameInfo(this._tableInfo.betInfo.gameroundid, this._tableInfo.betInfo.total);
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        // console.log('BaccaratScene::onRoadDataUpdate');
        const tableInfo = <data.TableInfo> evt.data;
        if (tableInfo.tableid === this._tableId) {
          this._bettingTable.tableId = this._tableId;
          if (tableInfo.roadmap) {
            this._roadmapControl.updateRoadData(tableInfo.roadmap);
          }
          if (tableInfo.betInfo) {
            this._roadmapLeftPanel.setGameInfo(tableInfo.betInfo.gameroundid, tableInfo.betInfo.total);
          }
        }
      }
    }
  }
}
