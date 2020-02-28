/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace ba {
    export class MobileScene extends core.MobileBaseGameScene {
      protected _roadmapControl: BARoadmapControl;
      protected _bottomGamePanel: MobileBottomGamePanel;
      protected _beadRoadResultPanel: BaBeadRoadResultPanel;

      protected _switchBaMode: eui.ToggleSwitch;
      protected _lblBaMode: ui.RunTimeLabel;

      protected _tableInfoPanel: ui.TableInfoPanel;

      constructor(data: any) {
        super(data);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BaccaratScene');
      }

      protected setStateBet() {
        super.setStateBet();

        if (this._previousState !== we.core.GameState.BET) {
          if (this._tableLayer) {
            (<we.ba.TableLayer> this._tableLayer).totalAmount = { PLAYER: 0, BANKER: 0 };
            (<we.ba.TableLayer> this._tableLayer).totalPerson = { PLAYER: 0, BANKER: 0 };
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
          this._bottomGamePanel.beadRoad,
          this._bottomGamePanel.bigRoad,
          this._bottomGamePanel.bigEyeRoad,
          this._bottomGamePanel.smallRoad,
          this._bottomGamePanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._bottomGamePanel,
          this._beadRoadResultPanel
        );
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo> evt.data;
          if (betInfo.tableid === this._tableId) {
            // update the scene
            (<we.ba.TableLayer> this._tableLayer).totalAmount = evt.data.amount;
            (<we.ba.TableLayer> this._tableLayer).totalPerson = evt.data.count;
          }
        }
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
      }

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (this._tableInfo.totalWin) {
          totalWin = this._tableInfo.totalWin;
        }
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
            this._resultMessage.showResult(this._tableInfo.gametype, {
              winType: this._gameData.wintype,
              winAmount: NaN,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        }
      }
    }
  }
}