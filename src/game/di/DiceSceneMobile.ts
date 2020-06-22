// TypeScript file

namespace we {
  export namespace di {
    export class MobileScene extends core.MobileBaseGameScene {
      protected _betArea: eui.Scroller;
      protected _betAreaTween: ui.TweenConfig;
      protected _bATransition: eui.Group;
      protected _bANormal: eui.Group;
      protected _bARace: eui.Group;
      protected _betAreaLock: boolean = false;

      protected _betSet: egret.DisplayObject;
      protected _betSetTween: ui.TweenConfig;

      protected _roadmapControl: DiRoadmapControl;
      protected _bottomGamePanel: MobileBottomGamePanel;

      protected _panelGroup: eui.Group;
      protected _panelTween: ui.TweenConfig;

      protected _baGameIDText: ui.RunTimeLabel;
      protected _baGameID: ui.RunTimeLabel;
      protected _totalBet: ui.RunTimeLabel;
      protected _totalBetText: ui.RunTimeLabel;

      private _common_listpanel: ui.BaseImageButton;

      protected parser: ba.BARoadParser;

      protected _mode: string = 'normal';

      protected _mask: egret.Shape;

      constructor(data: any) {
        super(data);
      }

      protected set panelState(s) {
        if (env.orientation === 'portrait') {
          return;
        }
        const state = s;

        if (this._panelTween.currentState === state) {
          return;
        }
        this._panelTween.currentState = state;
        this._panelTween.validateNow();

        egret.Tween.removeTweens(this._panelGroup);
        egret.Tween.get(this._panelGroup).to(this._panelTween.getTweenPackage(), 250);
      }

      protected set betSetState(s) {
        const state = s;

        if (this._betSetTween.currentState === state) {
          return;
        }
        this._betSetTween.currentState = state;
        this._betSetTween.validateNow();

        egret.Tween.removeTweens(this._betSet);
        egret.Tween.get(this._betSet).to(this._betSetTween.getTweenPackage(), 250);
      }

      protected mount() {
        super.mount();

        this.initBottomBetLimitSelector();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DiceScene');
        this._skinKey = 'DiceScene';
      }

      protected set betAreaState(s) {
        if (this._betAreaTween.currentState === s) {
          return;
        }

        this._betAreaTween.currentState = s;
        this._betAreaTween.validateNow();

        egret.Tween.removeTweens(this._betArea.viewport);
        egret.Tween.removeTweens(this._betArea);

        switch (s) {
          case 'zip': // when mobilebottompanel is on
            this._betArea.scrollPolicyV = eui.ScrollPolicy.ON;
            egret.Tween.get(this._betArea.viewport).to(
              {
                scrollV: (this._betArea.viewport.contentHeight - this._betAreaTween.getTweenPackage().height) * 0.5,
              },
              250
            );
            if (env.orientation === 'portrait') {
              this._tableLayer.top = this._tableLayer.bottom = 100;
              this._chipLayer.top = this._chipLayer.bottom = 100;
            }
            if (env.orientation === 'landscape') {
              egret.Tween.get(this._betArea).to({ y: 0 }, 250);
              // this._betArea.bottom = this._betArea.top = 0;

              this._tableLayer.top = this._chipLayer.top = 50;
              this._tableLayer.bottom = this._chipLayer.bottom = 0;
            }
            this._betArea.mask = this._mask;
            this._mask.visible = true;

            break;
          case 'small':
          case 'normal': // when mobilebottompanel is off
            if (env.orientation === 'portrait') {
              this._tableLayer.top = this._tableLayer.bottom = 0;
              this._chipLayer.top = this._chipLayer.bottom = 0;
            }
            if (env.orientation === 'landscape') {
              egret.Tween.get(this._betArea).to({ y: 300 }, 250);
              this._tableLayer.top = this._tableLayer.bottom = 0; // tbc
              this._chipLayer.top = this._chipLayer.bottom = 0; // tbc
            }

            this._betArea.mask = null;
            if (this._mask) {
              this._mask.visible = false;
            }
          default:
            this._betArea.scrollPolicyV = eui.ScrollPolicy.OFF;
            egret.Tween.get(this._betArea.viewport).to(
              {
                scrollV: 0,
              },
              250
            );
            break;
        }

        egret.Tween.get(this._betArea).to(this._betAreaTween.getTweenPackage(), 250);
      }

      protected set diState(s) {
        if (env.orientation === 'landscape') {
          this.panelState = s;
        }

        this.betAreaState = this.betSetState = s;
      }

      protected initRoadMap() {
        this._roadmapControl = new we.di.DiRoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          this._bottomGamePanel._beadroadPanel.beadRoad,
          this._bottomGamePanel._roadmapPanel.sumRoad,
          this._bottomGamePanel._roadmapPanel.sizeRoad,
          this._bottomGamePanel._roadmapPanel.oddRoad,
          null,
          null,
          null
        );
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'di' });
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);

        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setToggler(this._lblRoomInfo);
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }

        if (this._bottomGamePanel._statisticChartPanel) {
          this._bottomGamePanel._statisticChartPanel.setValue(this._tableInfo);
        }

        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;

        if (this._gameData.state === core.GameState.DEAL || this._gameData.state === core.GameState.FINISH) {
          this._betAreaLock = true;
          this._bottomGamePanel.manualClose();
          this._bottomGamePanel.touchEnabled = this._bottomGamePanel.touchChildren = false;
          this.diState = 'small';
        }

        this._baGameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
        this._totalBetText.renderText = () => `${i18n.t('baccarat.totalbet')}`;

        if (env.isMobile) {
          dir.monitor._sideGameList.setToggler(this._common_listpanel);
        }

        this.changeHandMode();

        this._mask = new egret.Shape();
        const gr = this._mask.graphics;
        const matrix = new egret.Matrix();

        if (env.orientation === 'portrait') {
          matrix.createGradientBox(this._betArea.width, 1270, Math.PI / 2, 0, 0);
          gr.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000, 0x000000, 0x000000], [0, 1, 1, 0], [0, 20, 235, 255], matrix);
          gr.drawRect(0, 0, this._betArea.width, 1270); //
          this._mask.y = 180;
        }
        if (env.orientation === 'landscape') {
          matrix.createGradientBox(this._betArea.width, 550, Math.PI / 2, 0, 0);
          gr.beginGradientFill(egret.GradientType.LINEAR, [0xffffff, 0xffffff, 0xffffff, 0xffffff], [0, 1, 1, 0], [0, 20, 235, 255], matrix);
          gr.drawRect(0, 0, this._betArea.width, 550); //
          this._mask.y = 380;
        }

        gr.endFill();
        this.addChild(this._mask);
        this._mask.x = this._betArea.x;
        this._mask.visible = false;
      }

      protected addEventListeners() {
        super.addEventListeners();

        this._bottomGamePanel.addEventListener('ON_BOTTOM_PANEL_TOGGLE', this.onBottomToggle, this);
        // this._sidePanel.addEventListener('RACE_BTN_CLICKED', this.toggleBetMode, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();

        this._bottomGamePanel.removeEventListener('ON_BOTTOM_PANEL_TOGGLE', this.onBottomToggle, this);
        // this._sidePanel.removeEventListener('RACE_BTN_CLICKED', this.toggleBetMode, this);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
      }

      protected onBottomToggle() {
        this.diState = this._bottomGamePanel.isPanelOpen ? 'zip' : 'normal';
      }

      protected changeHandMode() {
        if (env.leftHandMode) {
          this.currentState = 'left_hand_mode';
        } else {
          this.currentState = 'right_hand_mode';
        }
        this.invalidateState();
      }

      // Roadmap & Statistic update
      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
        this._bottomGamePanel._statisticChartPanel.setValue(this._tableInfo);
        (this._tableLayer as di.MobileTableLayer).updateText(this._tableInfo);
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        // animate table

        // (this._tableLayer as di.TableLayer).animateToState(!enable);
        // (this._chipLayer as di.ChipLayer).animateToState(!enable);
      }

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (!isNaN(this._tableInfo.totalWin)) {
          totalWin = this._tableInfo.totalWin;
        }

        (this._tableLayer as di.TableLayer).flashFields(this._gameData);

        super.checkResultMessage();
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

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        this._betAreaLock = true;
        this._bottomGamePanel.manualClose();
        this._bottomGamePanel.touchEnabled = this._bottomGamePanel.touchChildren = false;
        this.diState = 'small';
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        this._betAreaLock = false;
        this._bottomGamePanel.touchEnabled = this._bottomGamePanel.touchChildren = true;
        this.diState = 'normal';
        this._baGameID.renderText = () => `${this._tableInfo.tableid}`;
        this._totalBet.renderText = () => `${this._tableInfo.totalBet}`;
      }

      protected showBetChipPanel() {
        this._betChipSetPanel.visible = true;
        this._betChipSetPanel.anchorOffsetY = 30;
        egret.Tween.get(this._betChipSetPanel).to({ alpha: 1, anchorOffsetY: 0 }, 250);
        this._betChipSetGridEnabled = true;
      }

      protected hideBetChipPanel() {
        egret.Tween.get(this._betChipSetPanel).to({ alpha: 0, anchorOffsetY: 30 }, 250);
        this._betChipSetGridEnabled = false;
        this._betChipSetPanel.visible = false;
      }
    }
  }
}
