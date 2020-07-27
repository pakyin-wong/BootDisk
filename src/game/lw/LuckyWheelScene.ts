/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace lw {
    export class Scene extends core.DesktopBaseGameScene {
      protected _roadmapControl: we.lw.LwRoadmapControl;
      protected _leftGamePanel: we.lw.LwLeftPanel;
      protected _rightGamePanel: we.lw.LwRightPanel;
      protected _bigRoadResultPanel: we.lw.LwBeadRoadResultPanel;

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('LuckyWheelScene');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'lw' });
      }

      public getTableLayer() {
        return this._tableLayer;
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (!evt.data) {
          return;
        }
        for (let i = 0; i < 7; i += 1) {
          this._rightGamePanel[`_lbl_lwValue${i}`].text = evt.data.amount[`LW_${i}`] || 0;
        }
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(evt.data.count));
        logger.l(utils.LogTarget.DEBUG, JSON.stringify(evt.data.amount));

        const betInfo = <data.GameTableBetInfo>evt.data;
        if (betInfo.tableid === this._tableId) {
          this._leftGamePanel._totalBet = evt.data.total;
        }
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
        this._roadmapControl = new we.lw.LwRoadmapControl(this._tableId);
        this._roadmapControl.setRoads(this._leftGamePanel.beadRoad, this._leftGamePanel, this._rightGamePanel, this._bigRoadResultPanel);
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }

      public checkResultMessage() {
        const resultNo = (<lw.GameData> this._gameData).value;
        (this._tableLayer as lw.TableLayer).flashFields(`LW_${parseInt(resultNo, 10) - 1}`);
        super.checkResultMessage();
      }
    }
  }
}
