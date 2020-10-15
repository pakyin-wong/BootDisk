namespace we {
  export namespace lw {
    export class MobileScene extends core.MobileBaseGameScene {
      protected _roadmapControl: LwRoadmapControl;
      protected _bottomGamePanel: MobileBottomGamePanel;
      // protected _lwGameIDText: ui.RunTimeLabel;
      // protected _lwGameID: ui.RunTimeLabel;
      protected _switchBaMode: eui.ToggleSwitch;
      protected _lblBaMode: ui.RunTimeLabel;
      protected _verticalGroup: eui.Group;
      private _common_listpanel: ui.BaseImageButton;
      protected _originBetRelatedGroupY: number;

      protected _gradientmask: eui.Group;
      protected _shape: egret.Shape = new egret.Shape();

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

      protected setStateIdle(isInit: boolean) {
        super.setStateIdle(isInit);
        if (env.orientation === 'landscape') {
          egret.Tween.get(this._tableLayer).to({ scaleX: 0.8, scaleY: 0.8 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 0.8, scaleY: 0.8 }, 250);
          this._tableLayer.alpha = this._chipLayer.alpha = 1; // 0.7
        }
      }

      protected setStateBet(isInit: boolean) {
        super.setStateBet(isInit);
        if (env.orientation === 'landscape') {
          egret.Tween.get(this._tableLayer).to({ scaleX: 1, scaleY: 1 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 1, scaleY: 1 }, 250);
          this._tableLayer.alpha = this._chipLayer.alpha = 1;
        }
        // this._lwGameID.renderText = () => `${this._tableInfo.data.gameroundid}`;
        // this._totalBet.renderText = () => `$ ${this._tableInfo.totalBet}`;
      }

      protected setStateDeal(isInit: boolean) {
        super.setStateDeal(isInit);
        if (env.orientation === 'landscape') {
          egret.Tween.get(this._tableLayer).to({ scaleX: 0.8, scaleY: 0.8 }, 250);
          egret.Tween.get(this._chipLayer).to({ scaleX: 0.8, scaleY: 0.8 }, 250);
          this._tableLayer.alpha = this._chipLayer.alpha = 1; // 0.7;
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
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
        this._originBetRelatedGroupY = this._betRelatedGroup.y;
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

        if (env.orientation === 'landscape') {
          const gr = this._shape.graphics;
          const matrix = new egret.Matrix();
          matrix.createGradientBox(2424, 600, Math.PI / 2);
          gr.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000], [0, 0.7], [0, 255], matrix);
          gr.drawRect(0, 0, 2424, 600);
          gr.endFill();
          this._gradientmask.addChild(this._shape);
        } else {
          const gr = this._shape.graphics;
          const matrix = new egret.Matrix();
          matrix.createGradientBox(1242, 350, Math.PI / 2);
          gr.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000], [0, 0.7], [0, 255], matrix);
          gr.drawRect(0, 0, 1242, 418);
          gr.endFill();
          this._gradientmask.addChild(this._shape);
        }

        this.createVerticalLayout();
        this.changeHandMode();
        // this._lwGameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
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
        this._roadmapControl = new LwRoadmapControl(this._tableId);
        this._roadmapControl.setRoads(this._bottomGamePanel._roadmapPanel.beadRoad, null, null, null, false);
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
        /*
        let totalWin: number = NaN;
        if (this._tableInfo.totalWin) {
          totalWin = this._tableInfo.totalWin;
        }

        if (!this._gameData) {
          return;
        }
        */

        // console.log('checkResultMessage', this._gameData);

        const resultNo = (<lw.GameData>this._gameData).value; // a string type
        (this._tableLayer as lw.TableLayer).flashFields(`LW_${parseInt(resultNo, 10) - 1}`);
        // const lwGameResultMessage = new lw.GameResultMessage();
        // lwGameResultMessage.type = null;
        super.checkResultMessage();
        // this._resultMessage.showResult(this._tableInfo.gametype, resultNo);
      }

      protected checkBetChipPanel() {
        if (this._betChipSetPanel.visible === true) {
          this.setChipPanelPos();
        }
      }
    }
  }
}
