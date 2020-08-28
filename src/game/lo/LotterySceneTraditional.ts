/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace lo {
    export class LotterySceneTraditional extends core.DesktopBaseGameScene {
      protected _roadmapControl: we.lo.LoRoadmapControl;
      protected _leftGamePanel: we.lo.LoLeftPanel;
      protected _rightGamePanel: we.lo.LoRightPanel;
      protected _bigRoadResultPanel: we.ro.ROBigRoadResultPanel;

      protected _drawerPanel: we.lo.LoRightDrawerPanel;

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('LotterySceneTraditional');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'lottery', tab: 'all' });
      }

      public getTableLayer() {
        return this._tableLayer;
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();

        if (this._leftGamePanel) {
          this._leftGamePanel.setTableInfo(this._tableInfo);
        }
        if (this._rightGamePanel) {
          this._rightGamePanel.setTableInfo(this._tableInfo);
        }
        if (this._drawerPanel) {
          this._drawerPanel.setTableInfo(this._tableInfo);
        }
        this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
        this._roadmapControl = new LoRoadmapControl(this._tableId);
        // if (this._leftGamePanel) {// for testing
        this._roadmapControl.setRoads(this._leftGamePanel, this._rightGamePanel);
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
      }

      public checkResultMessage(resultData = null) {
        const resultNo = (<ro.GameData> this._gameData).value;
        (this._tableLayer as ro.TableLayer).flashFields(`DIRECT_${resultNo}`);
        super.checkResultMessage(resultData);
      }

      protected playResultSoundEffect(totalWin) {
        if (this.hasBet() && !isNaN(totalWin)) {
          dir.audioCtr.playSequence(['player', 'win']);
        } else {
          dir.audioCtr.playSequence(['player', 'win']);
        }
      }
    }
  }
}
