/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace dil {
    export class MobileScene extends core.MobileBaseGameScene {
      protected _roadmapControl: DilRoadmapControl;
      protected _bottomGamePanel: MobileBottomGamePanel;
      protected _dilGameIDText: ui.RunTimeLabel;
      protected _dilGameID: ui.RunTimeLabel;
      protected _totalBet: ui.RunTimeLabel;
      protected _totalBetText: ui.RunTimeLabel;
      protected _verticalGroup: eui.Group;

      protected _chipLayer: MobileChipLayer;

      protected _luckyCoinGroup: LuckyCoinGroup;

      private _common_listpanel: ui.BaseImageButton;

      constructor(data: any) {
        super(data);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DiceWealthScene');
        this._skinKey = 'DiceWealthScene';
      }

      protected mount() {
        super.mount();
        this.addListeners();
      }

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
        (<we.dil.MobileChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.dil.LuckyCoinGroup> this._luckyCoinGroup).clearLuckyNumbers();
      }

      protected setStateBet(isInit: boolean) {
        super.setStateBet(isInit);
        this._dilGameID.renderText = () => `${this._tableInfo.tableid}`;
        this._totalBet.renderText = () => `${this._tableInfo.totalBet}`;
        (<we.dil.MobileChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.dil.LuckyCoinGroup> this._luckyCoinGroup).clearLuckyNumbers();
      }

      protected setStateDeal(isInit: boolean) {
        super.setStateDeal(isInit);
        if (this._previousState !== we.core.GameState.DEAL || isInit) {
          (<we.dil.MobileChipLayer> this._chipLayer).showLuckyNumber();
          (<we.dil.LuckyCoinGroup> this._luckyCoinGroup).updateLuckyNumbers(this._gameData, this._chipLayer);
        }
      }

      protected setStateFinish(isInit: boolean = false) {
        super.setStateFinish(isInit);
        if (isInit && this._previousState !== we.core.GameState.FINISH) {
          (<we.dil.LuckyCoinGroup> this._luckyCoinGroup).updateLuckyNumbers(this._gameData, this._chipLayer);
        }
        (<we.dil.MobileChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.dil.MobileChipLayer> this._chipLayer).showWinningNumber();
      }

      protected setStateRefund(isInit: boolean = false) {
        super.setStateRefund(isInit);
        (<we.dil.MobileChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.dil.LuckyCoinGroup> this._luckyCoinGroup).clearLuckyNumbers();
      }
      protected setStateShuffle(isInit: boolean = false) {
        super.setStateShuffle(isInit);
        (<we.dil.MobileChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.dil.LuckyCoinGroup> this._luckyCoinGroup).clearLuckyNumbers();
      }

      protected setStateUnknown(isInit: boolean = false) {
        super.setStateUnknown(isInit);
        (<we.dil.MobileChipLayer> this._chipLayer).clearLuckyNumber();
        (<we.dil.LuckyCoinGroup> this._luckyCoinGroup).clearLuckyNumbers();
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);
        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setToggler(this._lblRoomInfo);
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }
        // if (this._bottomGamePanel._betLimitDropDownBtn) {
        //   this.initBottomBetLimitSelector();
        // }
        this.createVerticalLayout();
        this.changeHandMode();
        this._dilGameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
        this._totalBetText.renderText = () => `${i18n.t('baccarat.totalbet')}`;
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

      protected createVerticalLayout() {
        const vLayout: eui.VerticalLayout = new eui.VerticalLayout();
        vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        vLayout.gap = 24;
        this._verticalGroup.layout = vLayout;
      }

      protected setChipPanelPos() {}

      protected showBetChipPanel() {
        this.setChipPanelPos();
        super.showBetChipPanel();
      }

      protected hideBetChipPanel() {
        this.setChipPanelPos();
        super.hideBetChipPanel();
      }

      protected initRoadMap() {
        this._roadmapControl = new DilRoadmapControl(this._tableId);
        this._roadmapControl.setRoads(this._bottomGamePanel.beadRoad, null, null);
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const stat = <data.TableInfo> evt.data;
          if (stat.tableid === this._tableId) {
            this._roadmapControl.updateRoadData();
          }
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
        }
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();

        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }
        // if (this._bottomGamePanel._statisticChartPanel) {
        //   this._bottomGamePanel._statisticChartPanel.setValue(this._tableInfo);
        // }
      }

      public checkResultMessage(resultData = null) {
        (<any> this._gameData).hasBet = this.hasBet();
        super.checkResultMessage(resultData);
      }

      protected checkBetChipPanel() {
        if (this._betChipSetPanel.visible === true) {
          this.setChipPanelPos();
        }
      }
    }
  }
}
