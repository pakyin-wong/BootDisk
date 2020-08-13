/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace dt {
    export class MobileScene extends core.MobileBaseGameScene {
      protected _roadmapControl: DTRoadmapControl;
      protected _bottomGamePanel: MobileBottomGamePanel;

      protected _beadRoadResultPanel: DTBeadRoadResultPanel;

      protected _dtGameIDText: ui.RunTimeLabel;
      protected _dtGameID: ui.RunTimeLabel;

      protected _totalBet: ui.RunTimeLabel;
      protected _totalBetText: ui.RunTimeLabel;

      protected _verticalGroup: eui.Group;

      private _common_listpanel: ui.BaseImageButton;

      constructor(data: any) {
        super(data);
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

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DragonTigerScene');
        this._skinKey = 'DragonTigerScene';
      }

      protected setStateIdle(isInit: boolean) {
        super.setStateIdle(isInit);
        if (env.orientation === 'landscape') {
          egret.Tween.get(this._tableLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
        }
      }

      protected setStateBet() {
        super.setStateBet();
        if (env.orientation === 'landscape') {
          egret.Tween.get(this._tableLayer).to({ scaleX: 1, scaleY: 1 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 1, scaleY: 1 }, 250);
        }
        this._dtGameID.renderText = () => `${this._tableInfo.tableid}`;
        this._totalBet.renderText = () => `$ ${this._tableInfo.totalBet}`;
        if (this._previousState !== we.core.GameState.BET) {
          if (this._tableLayer) {
            (<we.dt.TableLayer>this._tableLayer).totalAmount = { PLAYER: 0, BANKER: 0 };
            (<we.dt.TableLayer>this._tableLayer).totalPerson = { PLAYER: 0, BANKER: 0 };
          }
        }
      }

      protected setStateDeal() {
        super.setStateDeal();
        if (env.orientation === 'landscape') {
          egret.Tween.get(this._tableLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 0.72, scaleY: 0.75 }, 250);
        }
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();

        this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;

        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setToggler(this._lblRoomInfo);
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }

        if (this._bottomGamePanel._statisticChartPanel) {
          this._bottomGamePanel._statisticChartPanel.setValue(this._tableInfo);
        }

        this.changeHandMode();

        if (this._bottomGamePanel._betLimitDropDownBtn) {
          this.initBottomBetLimitSelector();
        }

        this._dtGameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
        this._totalBetText.renderText = () => `${i18n.t('baccarat.totalbet')}`;

        dir.monitor._sideGameList.setToggler(this._common_listpanel);

        this.setChipPanelPos();
      }

      protected initBottomBetLimitSelector() {
        const betLimitList = env.betLimits;
        const betLimitItems = betLimitList.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });
        const dropdownSource = betLimitList.map((data, index) => {
          return ui.NewDropdownItem(index, () => `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`);
        });
        const selectedIndex = env.currentSelectedBetLimitIndex;
        utils.DropdownCreator.new({
          toggler: this._bottomGamePanel._betLimitDropDownBtn,
          review: this._bottomGamePanel._betLimitDropDownBtn,
          arrCol: new eui.ArrayCollection(dropdownSource),
          title: () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`,
          selected: 0,
        });
        this.updateBetLimit(selectedIndex);
        this._bottomGamePanel._betLimitDropDownBtn.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
      }

      protected updateBetLimit(selectedIndex) {
        super.updateBetLimit(selectedIndex);
        const bottomBetLimitList = env.betLimits;
        const bottomBetLimitItems = bottomBetLimitList.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });
        if (this._bottomGamePanel._betLimitDropDownBtn) {
          this._bottomGamePanel._betLimitDropDownBtn.renderText = () => ` ${bottomBetLimitItems.length > 0 ? bottomBetLimitItems[selectedIndex] : ''}`;
        }
      }

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
        this._roadmapControl = new DTRoadmapControl(this._tableId);
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
        this._roadmapControl.updateRoadData();
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo>evt.data;
          if (betInfo.tableid === this._tableId) {
            // update the scene
            (<we.dt.TableLayer>this._tableLayer).totalAmount = evt.data.amount;
            (<we.dt.TableLayer>this._tableLayer).totalPerson = evt.data.count;
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

      // protected onOrientationChange() {
      //   this.onExit();
      //   super.onOrientationChange();
      //   this.onEnter();
      //   // this.setSkinName();
      //   // this.initChildren();
      //   this.changeHandMode();
      // }
      protected checkBetChipPanel() {
        if (this._betChipSetPanel.visible === true) {
          this.setChipPanelPos();
        }
      }
    }
  }
}
