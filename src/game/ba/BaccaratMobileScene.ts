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

      protected _baGameIDText: ui.RunTimeLabel;
      protected _baGameID: ui.RunTimeLabel;

      protected _verticalGroup: eui.Group;
      protected _BAgoodRoadLabel: ui.GoodRoadLabel;
      protected _tableInfoPanel: TableInfoPanel;

      protected _originBetRelatedGroupY: number;

      private _common_listpanel: ui.BaseImageButton;

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
          egret.Tween.get(this._tableLayer).to({ scaleX: 1, scaleY: 1 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 1, scaleY: 1 }, 250);
        }
        this._baGameID.renderText = () => `${this._tableInfo.tableid}`;
        // this._totalBet.renderText = () => `$ ${this._tableInfo.totalBet}`;

        if (this._previousState !== we.core.GameState.BET) {
          if (this._tableLayer) {
            (<we.ba.TableLayer>this._tableLayer).totalAmount = { PLAYER: 0, BANKER: 0 };
            (<we.ba.TableLayer>this._tableLayer).totalPerson = { PLAYER: 0, BANKER: 0 };
          }
        }
        if (this._resultDisplay && env.orientation === 'portrait') {
          egret.Tween.removeTweens(this._resultDisplay);
          egret.Tween.get(this._resultDisplay).to({ y: 232 }, 10);
        }
      }

      protected setStateDeal(isInit: boolean) {
        super.setStateDeal(isInit);
        if (env.orientation === 'landscape') {
          egret.Tween.get(this._tableLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
        }
        if (this._resultDisplay && env.orientation === 'portrait') {
          egret.Tween.removeTweens(this._resultDisplay);
          egret.Tween.get(this._resultDisplay).to({ y: 40 }, 400);
          //   egret.Tween.get(this._betRelatedGroup)
          // .to({ y: enable ? this._originBetRelatedGroupY : this._originBetRelatedGroupY + 120, alpha: enable ? 1 : 0 }, 400, egret.Ease.getElasticInOut(1, 400));
        }
      }

      // protected setStateFinish(isInit: boolean) {
      //   super.setStateFinish(isInit);
      //   console.log('hihi');
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
        this._BAgoodRoadLabel.visible = false;

        this._baGameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
        if (env.isMobile) {
          dir.monitor._sideGameList.setToggler(this._common_listpanel);
        }
        // dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);
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
          this._bottomGamePanel._roadmapPanel.beadRoad,
          this._bottomGamePanel._roadmapPanel.bigRoad,
          this._bottomGamePanel._roadmapPanel.bigEyeRoad,
          this._bottomGamePanel._roadmapPanel.smallRoad,
          this._bottomGamePanel._roadmapPanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._bottomGamePanel._roadmapPanel,
          this._beadRoadResultPanel
        );
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        this._roadmapControl.updateRoadData();
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
      }

      protected onMatchGoodRoadUpdate() {
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

      protected onOrientationChange() {
        // this.onExit();
        const temp = this._switchBaMode.selected;
        super.onOrientationChange(temp);
        // this._switchBaMode.selected = temp;
        // this.onEnter();
        // this.updateSkin('BaccaratScene', true);
        // this.changeHandMode();
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
    }
  }
}
