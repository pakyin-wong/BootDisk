/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace ro {
    export class MobileScene extends core.MobileBaseGameScene {
      // constructor(data) {
      //   super(data);
      // }

      // public onEnter() {}

      // public onExit() {}

      // protected mount() {
      //   this.skinName = utils.getSkinByClassname('RouletteScene');
      //   mouse.setButtonMode(this._btnBack, true);
      //   this._btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);
      // }

      // protected initComponents() {}
      // protected destroy() {}
      // public backToLobby() {
      //   dir.sceneCtr.goto('lobby', { page: 'live', tab: 'ro' });
      // }

      protected _roadmapControl: we.ro.RORoadmapControl;
      protected _bottomGamePanel: MobileBottomGamePanel;
      protected _settingPanel: MobileSettingPanel;
      protected _settingTransition: eui.Group;
      protected _settingTween: ui.TweenConfig;
      protected _hotcoldPanel: MobileHotColdPanel;
      protected _betCombination: MobileBetCombination;

      protected _betArea: eui.Scroller;
      protected _betAreaTween: ui.TweenConfig;
      protected _bATransition: eui.Group;
      protected _bANormal: eui.Group;
      protected _bARace: eui.Group;
      protected _betAreaLock: boolean = false;

      protected _betSet: egret.DisplayObject;
      protected _betSetTween: ui.TweenConfig;

      protected _raceTrackChipLayer: RaceTrackChipLayer;
      protected _raceTrackTableLayer: RaceTrackTableLayer;
      protected _raceTrackControl: RaceTrackControl;

      protected _baGameIDText: ui.RunTimeLabel;
      protected _baGameID: ui.RunTimeLabel;

      protected _totalBetText: ui.RunTimeLabel;
      protected _totalBet: ui.RunTimeLabel;

      protected _mode: string = 'normal';

      protected _mask: egret.Shape;

      constructor(data: any) {
        super(data);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();

        this._baGameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
        this._totalBetText.renderText = () => `${i18n.t('baccarat.totalbet')}`;

        this.initBottomBetLimitSelector();
        this.changeHandMode();

        this._raceTrackChipLayer.raceTrackTableLayer = this._raceTrackTableLayer;
        this._raceTrackChipLayer.raceTrackControl = this._raceTrackControl;
        this._raceTrackChipLayer.chipLayer = this._chipLayer;
        this.refreshBetMode();

        this._betCombination.chipLayer = this._chipLayer;
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        if (this._bottomGamePanel._tableInfoPanel) {
          this._bottomGamePanel._tableInfoPanel.setToggler(this._lblRoomInfo);
          this._bottomGamePanel._tableInfoPanel.setValue(this._tableInfo);
        }
        this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;

        this._mask = new egret.Shape();
        const gr = this._mask.graphics;
        const matrix = new egret.Matrix();
        matrix.createGradientBox(this._betArea.width, 1404, Math.PI / 2, 0, 0);
        gr.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000, 0x000000, 0x000000], [0, 1, 1, 0], [0, 20, 235, 255], matrix);
        gr.drawRect(0, 0, this._betArea.width, 1404); //
        gr.endFill();
        this.addChild(this._mask);
        this._mask.x = this._betArea.x;
        this._mask.y = this._betArea.y;
        this._mask.visible = false;
      }

      protected addEventListeners() {
        super.addEventListeners();

        utils.addButtonListener(this._settingPanel.btnCombination, this.onToggleBtnCombination, this);
        this._betCombination.addEventListener('close', this.hideBetCombination, this);
        this._bottomGamePanel.addEventListener('TOGGLE', this.onBottomToggle, this);
        this._settingPanel.addEventListener('RACE_BTN_CLICKED', this.toggleBetMode, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();

        utils.removeButtonListener(this._settingPanel.btnCombination, this.onToggleBtnCombination, this);
        this._betCombination.removeEventListener('close', this.hideBetCombination, this);
        this._bottomGamePanel.removeEventListener('TOGGLE', this.onBottomToggle, this);
        this._settingPanel.removeEventListener('RACE_BTN_CLICKED', this.toggleBetMode, this);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
      }

      protected changeHandMode() {
        if (env.leftHandMode) {
          this.currentState = 'left';
        } else {
          this.currentState = 'right';
        }
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RouletteScene');
        this._skinKey = 'RouletteScene';
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'ro' });
      }

      public getTableLayer() {
        return this._tableLayer;
      }

      protected initRoadMap() {
        this._roadmapControl = new we.ro.RORoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          this._bottomGamePanel.beadRoad,
          this._bottomGamePanel._roadmapPanel.colorBigRoad,
          this._bottomGamePanel._roadmapPanel.sizeBigRoad,
          this._bottomGamePanel._roadmapPanel.oddBigRoad,
          this._hotcoldPanel,
          null,
          null
        );
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

      protected onBottomToggle() {
        this.roState = this._bottomGamePanel.isPanelOpen ? 'zip' : 'normal';
      }

      protected set roState(s) {
        this.betAreaState = this.betSetState = this.raceState = this.settingState = s;
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
          case 'zip':
            this._betArea.scrollPolicyV = eui.ScrollPolicy.AUTO;
            egret.Tween.get(this._betArea.viewport).to(
              {
                scrollV: (this._betArea.viewport.contentHeight - this._betAreaTween.getTweenPackage().height) * 0.5,
              },
              250
            );
            if (env.orientation === 'portrait') {
              this._betArea.mask = this._mask;
              this._mask.visible = true;
            }
            break;
          case 'small':
          case 'normal':
            this._betArea.scrollPolicyV = eui.ScrollPolicy.OFF;
            egret.Tween.get(this._betArea.viewport).to(
              {
                scrollV: 0,
              },
              250
            );
            if (env.orientation === 'portrait') {
              this._betArea.mask = null;
              this._mask.visible = false;
            }
            break;
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

      protected refreshBetMode() {
        switch (this._mode) {
          case 'normal':
            this._bATransition.$x = 0 - this._bANormal.x;
            this._bATransition.$y = 0 - this._bANormal.y;
            this._chipLayer.$x = this._bANormal.x;
            this._chipLayer.$y = this._bANormal.y;
            this._raceTrackChipLayer.visible = false;
            break;

          case 'race':
            this._bATransition.$x = 0 - this._bARace.x;
            this._bATransition.$y = 0 - this._bARace.y;
            this._chipLayer.$x = this._bARace.x;
            this._chipLayer.$y = this._bARace.y;
            this._raceTrackChipLayer.visible = true;
            break;
        }

        this._settingPanel.currentState = this._mode;
        (this._chipLayer as MobileChipLayer).changeState(this._mode, this._betDetails);
      }

      protected toggleBetMode() {
        if (this._betAreaLock) {
          return;
        }

        egret.Tween.removeTweens(this._bATransition);
        switch (this._mode) {
          case 'normal':
            egret.Tween.get(this._bATransition).to(
              {
                x: 0 - this._bARace.x,
                y: 0 - this._bARace.y,
              },
              250
            );
            this._chipLayer.$x = this._bARace.x;
            this._chipLayer.$y = this._bARace.y;
            this._raceTrackChipLayer.visible = true;
            this._mode = 'race';
            break;

          case 'race':
            egret.Tween.get(this._bATransition).to(
              {
                x: 0 - this._bANormal.x,
                y: 0 - this._bANormal.y,
              },
              250
            );
            this._chipLayer.$x = this._bANormal.x;
            this._chipLayer.$y = this._bANormal.y;
            this._raceTrackChipLayer.visible = false;
            this._mode = 'normal';
            break;
        }

        this.roState = this._bottomGamePanel.isPanelOpen ? 'zip' : 'normal';
        this._settingPanel.currentState = this._mode;
        (this._chipLayer as MobileChipLayer).changeState(this._mode, this._betDetails);
      }

      protected set betSetState(s) {
        const state = s === 'normal' && this._mode === 'race' && env.orientation === egret.OrientationMode.PORTRAIT ? 'zip' : s;

        if (this._betSetTween.currentState === state) {
          return;
        }
        this._betSetTween.currentState = state;
        this._betSetTween.validateNow();

        egret.Tween.removeTweens(this._betSet);
        egret.Tween.get(this._betSet).to(this._betSetTween.getTweenPackage(), 250);
      }

      protected set settingState(s) {
        const state = s;

        if (this._settingTween.currentState === state) {
          return;
        }
        this._settingTween.currentState = state;
        this._settingTween.validateNow();

        egret.Tween.removeTweens(this._settingTransition);
        egret.Tween.get(this._settingTransition).to(this._settingTween.getTweenPackage(), 250);
      }

      protected onToggleBtnCombination() {
        if (this._betCombination.isActivated) {
          this.hideBetCombination();
        } else if (!this._betAreaLock) {
          this._betCombination.show();
          this._settingPanel.combonationActived = true;
        }
      }

      protected hideBetCombination() {
        this._betCombination.hide();
        this._settingPanel.combonationActived = false;
      }

      protected set raceState(s) {
        this._raceTrackControl.visible = s !== 'small' && this._mode === 'race';
        this._raceTrackControl.currentState = s;
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        this._raceTrackChipLayer.touchEnabled = enable;
        this._raceTrackChipLayer.touchChildren = enable;
      }

      public checkResultMessage(resultData = null) {
        this._betArea.mask = null;
        this._mask.visible = false;

        const resultNo = (<ro.GameData>this._gameData).value;
        (this._tableLayer as ro.TableLayer).flashFields(`DIRECT_${resultNo}`);

        super.checkResultMessage(resultData);
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
        this.hideBetCombination();
        this.roState = 'small';
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        this._betAreaLock = false;
        this._bottomGamePanel.touchEnabled = this._bottomGamePanel.touchChildren = true;
        this.roState = 'normal';
      }

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
        this._baGameID.renderText = () => `${this._tableInfo.tableid}`;
        this._totalBet.renderText = () => `${this._tableInfo.totalBet}`;
      }
    }
  }
}
