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
      protected _minimizedTableLayer: MinimizedTableLayer;

      // protected _switchBaMode: eui.ToggleSwitch;
      protected _switchBaMode: ui.BaseButton;
      protected _lblBaMode: ui.RunTimeLabel;
      protected _goodRoadLabel: ui.GoodRoadLabel;

      // protected _timer: any;

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
            (<we.ba.TableLayer | we.dt.TableLayer> this._tableLayer).totalAmount = { PLAYER: 0, BANKER: 0, SUPER_SIX_BANKER: 0, DRAGON: 0, TIGER: 0 };
            (<we.ba.TableLayer | we.dt.TableLayer> this._tableLayer).totalPerson = { PLAYER: 0, BANKER: 0, SUPER_SIX_BANKER: 0, DRAGON: 0, TIGER: 0 };
          }
        }
        if (this._minimizedTableLayer) {
          this._minimizedTableLayer.updateBetLabel(true);
        }
      }

      private hideTooltipTimeout;

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        // const test = this._timer.countdownValue;
        const test = this._betRelatedGroup._timer.countdownValue;
        this._roadmapControl.setTableInfo(this._tableInfo);

        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._chipLayer.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          ({ stageX, stageY }) => {
            if (this._gameData.state !== we.core.GameState.BET) {
              // remove existing tooltip
              clearTimeout(this.hideTooltipTimeout);
              dir.tooltipCtr.removeTooltips();
              dir.tooltipCtr.displayTooltip(stageX, stageY, '请等候下一局');
              this.hideTooltipTimeout = setTimeout(() => {
                dir.tooltipCtr.removeTooltips();
              }, 2000);
            }
          },
          false
        );

        // if (this._switchBaMode) {
        //   this._chipLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
        //   this._switchBaMode.addEventListener(eui.UIEvent.CHANGE, this.onBaModeToggle, this);
        // }

        if (this._switchBaMode) {
          this._switchBaMode.active = false;
          this._chipLayer.currentState = this._switchBaMode.active ? 'SuperSix' : 'Normal';
          this._switchBaMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBaModeToggle, this);
        }

        if (this._lblBaMode) {
          this._lblBaMode.renderText = () => `${i18n.t('baccarat.noCommission')}`;
        }

        // if (env.isMobile) {
        //   dir.moniter._sideGameList.setToggler(this._common_listpanel);
        // }
        // if (this._goodRoadLabel) {
        //   this._goodRoadLabel.visible = false;
        // }
        this.onMatchGoodRoadUpdate();
      }

      protected onTableInfoUpdate(evt: egret.Event) {
        super.onTableInfoUpdate(evt);
        if (this._gameData.state === we.core.GameState.BET && this._gameData.state !== this._previousState) {
          // clear tooltip when enter BET again
          // dir.tooltipCtr.removeTooltips();
          // Don't remove it here as other non-click triggered tooltip will be removed as well
          // Let it auto remove in 2 second
        }
      }

      protected onBaModeToggle(evt: eui.UIEvent) {
        // if (this._switchBaMode) {
        //   this._chipLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
        //   this._tableLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
        //   this._chipLayer.cancelBet();
        // }
        if (this._switchBaMode) {
          this._switchBaMode.active = !this._switchBaMode.active;
          this._chipLayer.currentState = this._switchBaMode.active ? 'SuperSix' : 'Normal';
          this._tableLayer.currentState = this._switchBaMode.active ? 'SuperSix' : 'Normal';
          if (this._minimizedTableLayer) {
            this._minimizedTableLayer.currentState = this._switchBaMode.active ? 'SuperSix' : 'Normal';
          }
          this._chipLayer.cancelBet();
        }
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

      protected onMatchGoodRoadUpdate() {
        super.onMatchGoodRoadUpdate();
        if (this._goodRoadLabel) {
          if (this._tableInfo.goodRoad) {
            this._goodRoadLabel.visible = true;
            const goodRoadData = this._tableInfo.goodRoad;
            const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
            this._goodRoadLabel.renderText = () => goodRoadName;
          } else {
            this._goodRoadLabel.visible = false;
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const stat = <data.TableInfo> evt.data;
          if (stat.tableid === this._tableId) {
            this._roadmapControl.updateRoadData();
          }
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (!evt || !evt.data) {
          return;
        }
        const betInfo = <data.GameTableBetInfo> evt.data;
        if (betInfo.tableid === this._tableId) {
          // update the scene
          (<we.ba.TableLayer | we.dt.TableLayer> this._tableLayer).totalAmount = evt.data.amount;
          (<we.ba.TableLayer | we.dt.TableLayer> this._tableLayer).totalPerson = evt.data.count;
          if (this._minimizedTableLayer) {
            this._minimizedTableLayer.updateBetLabel(false, betInfo);
          }
        }
      }

      protected setStateShuffle(isInit: boolean = false) {
        super.setStateShuffle(isInit);
        this._message.showMessage(ui.InGameMessage.INFO, i18n.t('baccarat.shuffling'),null, true);
        if (this._tableLayer) {
          (<we.ba.TableLayer | we.dt.TableLayer> this._tableLayer).totalAmount = { PLAYER: 0, BANKER: 0, SUPER_SIX_BANKER: 0, DRAGON: 0, TIGER: 0 };
          (<we.ba.TableLayer | we.dt.TableLayer> this._tableLayer).totalPerson = { PLAYER: 0, BANKER: 0, SUPER_SIX_BANKER: 0, DRAGON: 0, TIGER: 0 };
        }
      }

      public checkResultMessage() {
        if (this._gameData.wintype == 0) {
          return;
        }
        super.checkResultMessage();
      }

      protected playResultSoundEffect(totalWin) {
        let subject;

        switch (this._tableInfo.gametype) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
          case core.GameType.BAM:
          case core.GameType.BAB:
          case core.GameType.BAMB: {
            // (this._tableLayer as ba.TableLayer).flashFields(this._gameData, this._switchBaMode.selected);
            (this._tableLayer as ba.TableLayer).flashFields(this._gameData, this._switchBaMode.active);
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
          case core.GameType.DT:
          case core.GameType.DTB: {
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
          dir.audioCtr.playSequence([subject, 'win']);
        } else {
          dir.audioCtr.playSequence([subject, 'win']);
        }
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        if (this._switchBaMode) {
          this._switchBaMode.enabled = enable;
        }
      }
    }
  }
}
