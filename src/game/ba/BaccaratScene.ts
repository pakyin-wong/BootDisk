/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace ba {
    export class Scene extends core.DesktopBaseGameScene {
      protected _roadmapControl: BARoadmapControl;
      protected _leftGamePanel: BARoadmapLeftPanel;
      protected _rightGamePanel: BARoadmapRightPanel;
      protected _beadRoadResultPanel: BaBeadRoadResultPanel;

      protected _switchBaMode: eui.ToggleSwitch;
      protected _lblBaMode: ui.RunTimeLabel;
      protected _flipCard: FlipCard;

      constructor(data: any) {
        super(data);
        // this._leftGamePanel = this._roadmapLeftPanel;onTableInfoUpdate
        // this._rightGamePanel = this._roadmapRightPanel;
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BaccaratScene');
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);

        if (this._previousState !== we.core.GameState.BET) {
          if (this._tableLayer) {
            (<we.ba.TableLayer>this._tableLayer).totalAmount = { PLAYER: 0, BANKER: 0 };
            (<we.ba.TableLayer>this._tableLayer).totalPerson = { PLAYER: 0, BANKER: 0 };
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

      protected onTableBetInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo>evt.data;
          if (betInfo.tableid === this._tableId) {
            // update the scene
            (<we.ba.TableLayer>this._tableLayer).totalAmount = evt.data.amount;
            (<we.ba.TableLayer>this._tableLayer).totalPerson = evt.data.count;
          }
        }
      }

      public checkResultMessage() {
        const totalWin: number = this._tableInfo.totalWin;

        if (!(this._gameData && this._gameData.wintype != 0)) {
          return;
        }

        let subject;

        switch (this._tableInfo.gametype) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
          case core.GameType.BAM: {
            (this._tableLayer as ba.TableLayer).flashFields(this._gameData, this._switchBaMode.selected);
            switch (this._gameData.wintype) {
              case ba.WinType.BANKER: {
                subject = 'banker';
                break;
              }
              case ba.WinType.PLAYER: {
                subject = 'player';
                break;
              }
              case ba.WinType.TIE: {
                subject = 'player';
                break;
              }
              default:
                break;
            }
            break;
          }
          case core.GameType.DT: {
            (this._tableLayer as dt.TableLayer).flashFields(this._gameData);
            switch (this._gameData.wintype) {
              case dt.WinType.DRAGON: {
                subject = 'player';
                break;
              }
              case dt.WinType.TIGER: {
                subject = 'banker';
                break;
              }
              case dt.WinType.TIE: {
                subject = 'banker';
                break;
              }
              default:
                break;
            }
            break;
          }
          default:
            break;
        }

        if (this.hasBet() && !isNaN(totalWin)) {
          this._resultMessage.showResult(this._tableInfo.gametype, {
            winType: this._gameData.wintype,
            winAmount: totalWin,
          });
          dir.audioCtr.playSequence([subject, 'win']);
        } else {
          this._resultMessage.showResult(this._tableInfo.gametype, {
            winType: this._gameData.wintype,
            winAmount: NaN,
          });
          dir.audioCtr.playSequence([subject, 'win']);
        }
      }
    }
  }
}
