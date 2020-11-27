/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace dtb {
    export class MobileScene extends bab.MobileScene {
      protected _roadmapControl: dt.DTRoadmapControl;
      protected _bottomGamePanel: ui.MobileBottomCommonPanel & dt.MobileBottomGamePanel;

      protected _beadRoadResultPanel: dt.DTBeadRoadResultPanel;

      // protected _dtGameIDText: ui.RunTimeLabel;
      // protected _dtGameID: ui.RunTimeLabel;

      protected _verticalGroup: eui.Group;

      // private _common_listpanel: ui.BaseImageButton;
      protected _originBetRelatedGroupY: number;

      public static resGroups = [core.res.Blockchain, core.res.BlockchainDragonTiger];

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();
        this.addListeners();
      }

      protected showSumGroup() {
        (<we.dtb.MobileCardHolder> this._resultDisplay).showSumGroup();
      }

      protected hideSumGroup() {
        (<we.dtb.MobileCardHolder> this._resultDisplay).hideSumGroup();
      }

      protected initVariables() {
        this._portraitButtonExpandedDealY = 947;
        this._portraitButtonExpandedBetY = 800;
        this._portraitButtonCollapsedDealY = 1455;
        this._portraitButtonCollapsedBetY = 1307;
      }

      protected setGoodRoadLabel() {}

      protected setSwitchBAMode(enable: boolean) {}

      protected onMatchGoodRoadUpdate() {}

      public destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected addListeners() {
        this._bottomGamePanel._arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
        this._bottomGamePanel._arrowUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
      }

      protected removeListeners() {
        this._bottomGamePanel._arrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
        this._bottomGamePanel._arrowUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkBetChipPanel, this);
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
        // this._dtGameID.renderText = () => `${this._tableInfo.data.gameroundid}`;
        // this._totalBet.renderText = () => `$ ${this._tableInfo.totalBet}`;
        if (this._previousState !== we.core.GameState.BET || isInit) {
          if (this._tableLayer) {
            (<we.dt.TableLayer> this._tableLayer).totalAmount = { DRAGON: 0, TIGER: 0 };
            (<we.dt.TableLayer> this._tableLayer).totalPerson = { DRAGON: 0, TIGER: 0 };
          }
        }
        if (this._resultDisplay && env.orientation === 'portrait') {
          egret.Tween.removeTweens(this._resultDisplay);
          egret.Tween.get(this._resultDisplay).to({ y: 232 }, 10);
          //   egret.Tween.get(this._betRelatedGroup)
          // .to({ y: enable ? this._originBetRelatedGroupY : this._originBetRelatedGroupY + 120, alpha: enable ? 1 : 0 }, 400, egret.Ease.getElasticInOut(1, 400));
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
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._originBetRelatedGroupY = this._betRelatedGroup.y;

        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setToggler(this._lblRoomInfo);
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }

        if (this._bottomGamePanel._statisticChartPanel) {
          this._bottomGamePanel._statisticChartPanel.setValue(this._tableInfo);
        }

        this.changeHandMode();

        // if (this._bottomGamePanel._betLimitDropDownBtn) {
        //   this.initBottomBetLimitSelector();
        // }

        // this._dtGameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
        // this._dtGameID.renderText = () => `${this._tableInfo.data.gameroundid}`;

        dir.monitor._sideGameList.setToggler(this._common_listpanel);

        this.setChipPanelPos();
      }

      // protected initBottomBetLimitSelector() {
      //   const betLimitList = env.betLimits;
      //   const betLimitItems = betLimitList.map(data => {
      //     return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
      //   });
      //   const dropdownSource = betLimitList.map((data, index) => {
      //     return ui.NewDropdownItem(index, () => `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`);
      //   });
      //   const selectedIndex = env.currentSelectedBetLimitIndex;
      //   utils.DropdownCreator.new({
      //     toggler: this._bottomGamePanel._betLimitDropDownBtn,
      //     review: this._bottomGamePanel._betLimitDropDownBtn,
      //     arrCol: new eui.ArrayCollection(dropdownSource),
      //     title: () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`,
      //     selected: 0,
      //   });
      //   this.updateBetLimit(selectedIndex);
      //   this._bottomGamePanel._betLimitDropDownBtn.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
      // }

      // protected updateBetLimit(selectedIndex) {
      //   super.updateBetLimit(selectedIndex);
      //   const bottomBetLimitList = env.betLimits;
      //   const bottomBetLimitItems = bottomBetLimitList.map(data => {
      //     return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
      //   });
      //   if (this._bottomGamePanel._betLimitDropDownBtn) {
      //     this._bottomGamePanel._betLimitDropDownBtn.renderText = () => ` ${bottomBetLimitItems.length > 0 ? bottomBetLimitItems[selectedIndex] : ''}`;
      //   }
      // }

      protected addEventListeners() {
        super.addEventListeners();
        dir.evtHandler.addEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
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
        //     this._betChipSetPanel.y = 1080;
        //   } else {
        //     this._betPanelGroup.scaleY = -1;
        //     this._betPanelGroup.y = 762;
        //     this._betChipSetPanel.y = 600;
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

      protected initRoadMap() {
        this._roadmapControl = new dt.DTRoadmapControl(this._tableId);
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
        if (evt && evt.data) {
          const stat = <data.TableInfo> evt.data;
          if (stat.tableid === this._tableId) {
            this._roadmapControl.updateRoadData();
          }
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo> evt.data;
          if (betInfo.tableid === this._tableId) {
            (<we.dt.TableLayer> this._tableLayer).totalAmount = evt.data.amount;
            (<we.dt.TableLayer> this._tableLayer).totalPerson = evt.data.count;
          }
        }
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }
        if (this._bottomGamePanel._statisticChartPanel) {
          this._bottomGamePanel._statisticChartPanel.setValue(this._tableInfo);
        }
      }

      protected checkBetChipPanel() {
        if (this._betChipSetPanel.visible === true) {
          this.setChipPanelPos();
        }
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainDragonTigerScene');
        this._skinKey = 'BlockchainDragonTigerScene';
      }

      protected getSelectedBA() {
        return false;
      }

      protected checkGameMode(value: boolean) {
        return null;
      }
    }
  }
}
