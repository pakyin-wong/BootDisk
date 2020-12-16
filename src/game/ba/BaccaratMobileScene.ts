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
      protected _bottomGamePanel: ui.MobileBottomCommonPanel;
      protected _beadRoadResultPanel: BaBeadRoadResultPanel;

      protected _switchBaMode: eui.ToggleSwitch;
      protected _lblBaMode: ui.RunTimeLabel;

      // protected _baGameIDText: ui.RunTimeLabel;
      // protected _baGameID: ui.RunTimeLabel;

      protected _verticalGroup: eui.Group;
      protected _BAgoodRoadLabel: ui.GoodRoadLabel;
      protected _tableInfoPanel: TableInfoPanel;

      protected _originBetRelatedGroupY: number;

      protected _common_listpanel: ui.BaseImageButton;

      protected _shuffleMessage: ui.ShuffleMessage;

      constructor(data: any) {
        super(data);
        // dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);
        // this.skinName = utils.getSkinByClassname('BaccaratScene');
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BaccaratScene');
        this._skinKey = 'BaccaratScene';
      }

      protected mount() {
        super.mount();
        this.onMatchGoodRoadUpdate();
        // this.addListeners();
      }

      // public destroy() {
      //   super.destroy();
      //   // this.removeListeners();
      // }

      protected addListeners() {
        // this._bottomGamePanel._arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
        // this._bottomGamePanel._arrowUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
      }

      protected removeListeners() {
        // this._bottomGamePanel._arrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
        // this._bottomGamePanel._arrowUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
      }

      protected setStateIdle(isInit: boolean) {
        super.setStateIdle(isInit);
        if (env.orientation === 'landscape') {
          egret.Tween.get(this._tableLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
        }
      }

      protected setStateBet(isInit: boolean) {
        super.setStateBet(isInit);
        if (env.orientation === 'landscape') {
          egret.Tween.removeTweens(this._tableLayer);
          egret.Tween.removeTweens(this._chipLayer);

          egret.Tween.get(this._tableLayer).to({ scaleX: 1, scaleY: 1 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 1, scaleY: 1 }, 250);
        }
        // this._baGameID.renderText = () => `${this._tableInfo.data.gameroundid}`;
        // this._totalBet.renderText = () => `$ ${this._tableInfo.totalBet}`;

        if (this._previousState !== we.core.GameState.BET || isInit) {
          if (this._tableLayer) {
            (<we.ba.TableLayer>this._tableLayer).totalAmount = { PLAYER: 0, BANKER: 0, SUPER_SIX_BANKER: 0 };
            (<we.ba.TableLayer>this._tableLayer).totalPerson = { PLAYER: 0, BANKER: 0, SUPER_SIX_BANKER: 0 };
          }
        }
      }

      protected setStateDeal(isInit: boolean) {
        super.setStateDeal(isInit);
        if (env.orientation === 'landscape') {
          egret.Tween.get(this._tableLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
        }
      }

      public updateGame(isInit: boolean = false) {
        if (!this._gameData) {
          return;
        }
        this._shuffleMessage && this._shuffleMessage.hide();
        super.updateGame(isInit);
      }

      protected setStateShuffle(isInit: boolean = false) {
        super.setStateShuffle(isInit);
        
        if(this._shuffleMessage) {
          this._shuffleMessage.show();
        }else{
          this._message.showMessage(ui.InGameMessage.INFO, i18n.t('baccarat.shuffling'), null, true);
        }
        if (this._tableLayer) {
          (<we.ba.TableLayer>this._tableLayer).totalAmount = { PLAYER: 0, BANKER: 0, SUPER_SIX_BANKER: 0 };
          (<we.ba.TableLayer>this._tableLayer).totalPerson = { PLAYER: 0, BANKER: 0, SUPER_SIX_BANKER: 0 };
        }
      }

      // protected setStateFinish(isInit: boolean) {
      //   super.setStateFinish(isInit);
      //   if (this._resultDisplay && env.orientation === 'portrait') {
      //     //   egret.Tween.removeTweens(this._betRelatedGroup);
      //     //   egret.Tween.get(this._betRelatedGroup)
      //     // .to({ y: enable ? this._originBetRelatedGroupY : this._originBetRelatedGroupY + 120, alpha: enable ? 1 : 0 }, 400, egret.Ease.getElasticInOut(1, 400));
      //   }
      // }
      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        // if (this._betRelatedGroup && env.orientation === 'portrait') {
        if (this._betRelatedGroup) {
          egret.Tween.removeTweens(this._betRelatedGroup);
          egret.Tween.get(this._betRelatedGroup).to({ y: enable ? this._originBetRelatedGroupY : this._originBetRelatedGroupY + 120, alpha: enable ? 1 : 0 }, 400, egret.Ease.getElasticInOut(1, 400));
        }

        // this.setSwitchBAMode(enable);
      }

      // protected setSwitchBAMode(enable: boolean) {
      //   this._switchBaMode.enabled = enable;
      // }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        super.setResultRelatedComponentsEnabled(enable);
        if (this._resultDisplay && env.orientation === 'portrait') {
          this.showResultDisplay(enable);
        }
      }

      protected showResultDisplay(isShow: boolean) {
        if (this._alwaysShowResult) {
          this._resultDisplay.visible = true;
          return;
        }
        egret.Tween.removeTweens(this._resultDisplay);
        if (isShow) {
          egret.Tween.get(this._resultDisplay).to({ y: 40, alpha: 1 }, 400);
        } else {
          egret.Tween.get(this._resultDisplay).to({ y: 232, alpha: 0 }, 10);
        }
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);

        this._tableLayer.type = we.core.BettingTableType.NORMAL;
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._originBetRelatedGroupY = this._betRelatedGroup.y;

        if (this._switchBaMode) {
          this._tableLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
          this._chipLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
          // this._switchBaMode.addEventListener(eui.UIEvent.CHANGE, this.onBaModeToggle, this);
        }

        if (this._lblBaMode) {
          this._lblBaMode.renderText = () => `${i18n.t('baccarat.noCommission')}`;
        }

        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setToggler(this._lblRoomInfo);
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }

        /*
        if (this._bottomGamePanel.normalChartPanel) {
          this._bottomGamePanel.normalChartPanel.tableId = this._tableId;
        }

        if (this._bottomGamePanel.normalPairChartPanel) {
          this._bottomGamePanel.normalPairChartPanel.tableId = this._tableId;
        }

        if (this._bottomGamePanel.shoeChartPanel) {
          this._bottomGamePanel.shoeChartPanel.tableId = this._tableId;
        }

        if (this._bottomGamePanel.shoePairChartPanel) {
          this._bottomGamePanel.shoePairChartPanel.tableId = this._tableId;
        }
        */

        this.changeHandMode();

        this.setChipPanelPos();
        this.setGoodRoadLabel();

        // this._baGameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
        // this._baGameID.renderText = () => `${this._tableInfo.data.gameroundid}`;
        if (env.isMobile) {
          dir.monitor._sideGameList.setToggler(this._common_listpanel);
        }
        // dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);
      }

      protected setGoodRoadLabel() {
        this._BAgoodRoadLabel.visible = false;
      }

      protected addEventListeners() {
        super.addEventListeners();
        if (this._switchBaMode) {
          this._switchBaMode.addEventListener(eui.UIEvent.CHANGE, this.onBaModeToggle, this);
        }
        dir.evtHandler.addEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
        dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);
        this._bottomGamePanel._arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
        this._bottomGamePanel._arrowUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        if (this._switchBaMode) {
          this._switchBaMode.removeEventListener(eui.UIEvent.CHANGE, this.onBaModeToggle, this);
        }
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
        dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);
        this._bottomGamePanel._arrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
        this._bottomGamePanel._arrowUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
      }

      protected changeHandMode() {
        if (env.leftHandMode) {
          this.currentState = 'left_hand_mode';
        } else {
          this.currentState = 'right_hand_mode';
        }
        this.invalidateState();
      }

      // protected createVerticalLayout() {
      //   const vLayout: eui.VerticalLayout = new eui.VerticalLayout();
      //   vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
      //   vLayout.gap = 24;
      //   this._verticalGroup.layout = vLayout;
      // }

      protected setChipPanelPos() {
        // if (env.orientation === 'portrait') {
        //   if (this._bottomGamePanel.isPanelOpen) {
        //     this._betPanelGroup.scaleY = 1;
        //     this._betPanelGroup.y = 0;
        //     this._betChipSetPanel.y = 986;
        //   } else {
        //     this._betPanelGroup.scaleY = -1;
        //     this._betPanelGroup.y = 762;
        //     this._betChipSetPanel.y = 500;
        //   }
        // } else {
        //   this._betChipSetPanel.y = -480;
        // }
      }

      protected showBetChipPanel() {
        this.setChipPanelPos();
        super.showBetChipPanel();
      }

      protected hideBetChipPanel() {
        this.setChipPanelPos();
        super.hideBetChipPanel();
      }

      protected onBaModeToggle(evt: eui.UIEvent) {
        this._chipLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
        this._tableLayer.currentState = this._switchBaMode.selected ? 'SuperSix' : 'Normal';
        this._chipLayer.cancelBet();
      }

      protected initRoadMap() {
        this._roadmapControl = new BARoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          (<ba.MobileBottomGamePanel>this._bottomGamePanel)._roadmapPanel.beadRoad,
          (<ba.MobileBottomGamePanel>this._bottomGamePanel)._roadmapPanel.bigRoad,
          (<ba.MobileBottomGamePanel>this._bottomGamePanel)._roadmapPanel.bigEyeRoad,
          (<ba.MobileBottomGamePanel>this._bottomGamePanel)._roadmapPanel.smallRoad,
          (<ba.MobileBottomGamePanel>this._bottomGamePanel)._roadmapPanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          (<ba.MobileBottomGamePanel>this._bottomGamePanel)._roadmapPanel,
          this._beadRoadResultPanel
        );
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        if (evt && evt.data) {
          const stat = <data.TableInfo>evt.data;
          if (stat.tableid === this._tableId) {
            this._roadmapControl.updateRoadData();
          }
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo>evt.data;
          if (betInfo.tableid === this._tableId) {
            (<we.ba.TableLayer>this._tableLayer).totalAmount = evt.data.amount;
            (<we.ba.TableLayer>this._tableLayer).totalPerson = evt.data.count;
          }
        }
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();

        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }
      }

      protected onMatchGoodRoadUpdate() {
        super.onMatchGoodRoadUpdate();
        if (this._tableInfo.goodRoad) {
          this._BAgoodRoadLabel.visible = true;
          this._BAgoodRoadLabel.label.size = 36;
          const goodRoadData = this._tableInfo.goodRoad;
          const goodRoadName: string = goodRoadData.custom ? goodRoadData.name : i18n.t(`goodroad.${goodRoadData.roadmapid}`);
          this._BAgoodRoadLabel.renderText = () => goodRoadName;
        } else {
          this._BAgoodRoadLabel.visible = false;
        }
      }

      protected async onOrientationChange() {
        // this.onExit();
        const temp = this.getSelectedBA();
        super.onOrientationChange(temp);
        this.onMatchGoodRoadUpdate();
        // this._switchBaMode.selected = temp;
        // this.onEnter();
        // this.updateSkin('BaccaratScene', true);
        // this.changeHandMode();
      }

      protected getSelectedBA() {
        return this._switchBaMode.selected;
      }

      // check if game mode btn (e.g. BA) is selected
      protected checkGameMode(value: boolean) {
        super.checkGameMode(value);
        this._switchBaMode.selected = value;
      }

      protected checkBetChipPanel() {
        if (this._betChipSetPanel.visible === true) {
          this.setChipPanelPos();
        }
      }

      protected playResultSoundEffect(totalWin) {
        let subject;

        switch (this._tableInfo.gametype) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
          case core.GameType.BAM:
          case core.GameType.BAB:
          case core.GameType.BASB:
          case core.GameType.BAMB: {
            // (this._tableLayer as ba.TableLayer).flashFields(this._gameData, this._switchBaMode.selected);
            (this._tableLayer as ba.TableLayer).flashFields(this._gameData, this._switchBaMode.enabled);
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

    }
  }
}
