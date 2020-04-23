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
      // protected _sidePanel: MobileSidePanel;
      protected _sidePanel;

      protected parser: ba.BARoadParser;

      protected _mode: string = 'normal';

      constructor(data: any) {
        super(data);
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

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DiceScene');
      }

      protected set betAreaState(s) {
        if (this._betAreaTween.currentState === s) {
          return;
        }

        this._betAreaTween.currentState = s;
        this._betAreaTween.validateNow();

        egret.Tween.removeTweens(this._betArea.viewport);
        egret.Tween.removeTweens(this._betArea);

        this._betArea.scrollPolicyV = eui.ScrollPolicy.OFF;
        egret.Tween.get(this._betArea.viewport).to(
          {
            scrollV: 0,
          },
          250
        );

        egret.Tween.get(this._betArea).to(this._betAreaTween.getTweenPackage(), 250);
      }

      protected set diState(s) {
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
      }

      protected addEventListeners() {
        super.addEventListeners();

        this._bottomGamePanel.addEventListener('TOGGLE', this.onBottomToggle, this);
        // this._sidePanel.addEventListener('RACE_BTN_CLICKED', this.toggleBetMode, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();

        this._bottomGamePanel.removeEventListener('TOGGLE', this.onBottomToggle, this);
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
      }

      // Roadmap & Statistic update
      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
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

        if (!this._gameData) {
          return;
        }
        (this._tableLayer as di.TableLayer).flashFields(this._gameData);

        if (this.hasBet()) {
          if (this._gameData && !isNaN(totalWin)) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              gameData: this._gameData,
              winAmount: this._tableInfo.totalWin,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        } else {
          if (this._gameData) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              gameData: this._gameData,
              winAmount: NaN,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        }
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
      }
    }
  }
}
