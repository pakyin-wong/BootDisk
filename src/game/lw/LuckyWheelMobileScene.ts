namespace we {
  export namespace lw {
    export class MobileScene extends core.MobileBaseGameScene {
      protected _roadmapControl: LwRoadmapControl;
      protected _bottomGamePanel: MobileBottomGamePanel;
      protected _lwGameIDText: ui.RunTimeLabel;
      protected _lwGameID: ui.RunTimeLabel;
      protected _totalBet: ui.RunTimeLabel;
      protected _totalBetText: ui.RunTimeLabel;
      protected _switchBaMode: eui.ToggleSwitch;
      protected _lblBaMode: ui.RunTimeLabel;
      protected _verticalGroup: eui.Group;
      private _common_listpanel: ui.BaseImageButton;

      constructor(data: any) {
        super(data);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('LuckyWheelScene');
        this._skinKey = 'LuckyWheelScene';
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

      protected setStateBet(isInit: boolean) {
        super.setStateBet(isInit);
        this._lwGameID.renderText = () => `${this._tableInfo.tableid}`;
        this._totalBet.renderText = () => `${this._tableInfo.totalBet}`;
      }

      protected setStateDeal(isInit: boolean) {
        super.setStateDeal(isInit);
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setToggler(this._lblRoomInfo);
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }
        if (this._bottomGamePanel._statisticChartPanel) {
          this._bottomGamePanel._statisticChartPanel.setValue(this._tableInfo);
        }
        if (this._bottomGamePanel._betLimitDropDownBtn) {
          this.initBottomBetLimitSelector();
        }
        this.createVerticalLayout();
        this.changeHandMode();
        this._lwGameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
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
        this._roadmapControl = new LwRoadmapControl(this._tableId);
        this._roadmapControl.setRoads(this._bottomGamePanel._roadmapPanel.beadRoad, null, null, null, false);
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
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
        if (this._bottomGamePanel._statisticChartPanel) {
          this._bottomGamePanel._statisticChartPanel.setValue(this._tableInfo);
        }
      }

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (this._tableInfo.totalWin) {
          totalWin = this._tableInfo.totalWin;
        }

        if (!this._gameData) {
          return;
        }

        console.log('checkResultMessage', this._gameData);

        const result = (<ro.GameData>this._gameData).value;
        const resultNo: number = +result.toString().substr(1) - 1;

        // (this._tableLayer as lw.TableLayer).flashFields(`LW_${resultNo.toString()}`);
        const lwGameResultMessage = new lw.GameResultMessage();
        lwGameResultMessage.type = null;
        this._resultMessage.showResult(this._tableInfo.gametype, resultNo);
      }

      protected checkBetChipPanel() {
        if (this._betChipSetPanel.visible === true) {
          this.setChipPanelPos();
        }
      }
    }
  }
}
