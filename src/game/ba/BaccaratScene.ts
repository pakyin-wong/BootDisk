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

      protected setStateBet() {
        super.setStateBet();

        if (this._previousState !== we.core.GameState.BET) {
          if (this._tableLayer) {
            this._tableLayer.totalAmount = { PLAYER: 0, BANKER: 0 };
            this._tableLayer.totalPerson = { PLAYER: 0, BANKER: 0 };
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);

        this._chipLayer.type = we.core.BettingTableType.NORMAL;

        if (this._switchBaMode) {
          this._chipLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
          this._switchBaMode.addEventListener(eui.UIEvent.CHANGE, this.onBaModeToggle, this);
        }

        if (this._lblBaMode) {
          this._lblBaMode.renderText = () => `${i18n.t('baccarat.noCommission')}`;
        }
      }

      protected onBaModeToggle(evt: eui.UIEvent) {
        this._chipLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
        this._tableLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
        this._chipLayer.cancelBet();
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

      public checkResultMessage() {
        let totalWin: number = NaN;
        totalWin = this._tableInfo.totalWin;
        if (this.hasBet()) {
          if (this._gameData && this._gameData.wintype != 0 && !isNaN(totalWin)) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              winType: this._gameData.wintype,
              winAmount: totalWin,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        } else {
          if (this._gameData && this._gameData.wintype != 0) {
            this._resultMessage.showResult(this._tableInfo.gametype, this._gameData.wintype);
            dir.audioCtr.playSequence(['player', 'win']);
          }
        }
      }
    }
  }
}
