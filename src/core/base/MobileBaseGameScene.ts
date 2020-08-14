/* tslint:disable triple-equals */
namespace we {
  export namespace core {
    // base control class that hold and manage the basic item in Ba Item
    export class MobileBaseGameScene extends BaseGameScene {
      protected _bottomGamePanel: ui.MobileBottomCommonPanel;
      protected _lblBetLimit: ui.RunTimeLabel;

      protected _totalBet: ui.RunTimeLabel;
      protected _totalBetText: ui.RunTimeLabel;

      protected _betChipSetGridSelected: ui.BetChipSetGridSelected;
      protected _betChipSetPanel: eui.Group;
      protected _betPanelGroup: eui.Group;
      protected _betChipSetGridEnabled: boolean = false;

      protected _repeatLabel: ui.RunTimeLabel;
      protected _cancelLabel: ui.RunTimeLabel;
      protected _doubleLabel: ui.RunTimeLabel;
      protected _undoLabel: ui.RunTimeLabel;

      protected _veritcalTop: eui.Group;

      private _videoBtn: egret.DisplayObject;

      public played: boolean;
      public playFunc: () => void;
      public stopFunc: () => void;

      constructor(data: any) {
        super(data);
        this._betChipSetPanel.alpha = 0;
        this._betChipSetPanel.visible = false;
        this._betChipSet.alpha = 1;

        this.played = false;
      }

      public get betChipSetPanelVisible(): boolean {
        return this._betChipSetPanel.visible;
      }

      public set betChipSetPanelVisible(value: boolean) {
        if (value) {
          if (!this._betChipSetPanel.visible) {
            this.showBetChipPanel();
          }
        } else {
          if (this._betChipSetPanel.visible) {
            this.hideBetChipPanel();
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        // mouse.setButtonMode(this._videoBtn, false);
        this._bottomGamePanel.setTableInfo(this._tableInfo);
        this._bottomGamePanel.gameScene = this;
        if (this._lblBetLimit) {
          this.initBetLimitSelector();
          dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
          this.changeLang();
        }

        if (this._totalBetText) {
          this._totalBetText.renderText = () => `${i18n.t('baccarat.totalbet')}`;
        }

        this.setPlayFunc(this.playVideoFunc(this));
        this.setStopFunc(this.stopVideoFunc(this));

        this.played = true;
      }

      protected initDenom() {
        this._betChipSet.setUpdateChipSetSelectedChipFunc(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        this._betChipSet.init(null, denominationList);
      }

      protected initBetLimitSelector() {
        const betLimitList = env.betLimits;
        const betLimitItems = betLimitList.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });
        const dropdownSource = betLimitList.map((data, index) => {
          return ui.NewDropdownItem(index, () => `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`);
        });

        const selectedIndex = env.currentSelectedBetLimitIndex;

        utils.DropdownCreator.new({
          toggler: this._lblBetLimit,
          review: this._lblBetLimit,
          arrCol: new eui.ArrayCollection(dropdownSource),
          title: () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`,
          selected: 0,
        });

        this.updateBetLimit(selectedIndex);

        this._lblBetLimit.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
      }

      protected onBetLimitSelected(evt: egret.Event) {
        const selected = evt.data;
        env.currentSelectedBetLimitIndex = selected;
        dir.evtHandler.dispatch(core.Event.BET_LIMIT_CHANGE);
        this.updateBetLimit(selected);
      }
      protected onBetLimitChanged(evt: egret.Event) {
        const selectedIndex = env.currentSelectedBetLimitIndex;
        this.updateBetLimit(selectedIndex);
      }

      protected updateBetLimit(selectedIndex) {
        const betLimitList = env.betLimits;
        const betLimitItems = betLimitList.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });
        if (this._lblBetLimit) {
          this._lblBetLimit.renderText = () => `${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`;
        }
      }

      protected onClickBetChipSelected() {
        const testpoint: egret.Point = this._betChipSetGridSelected.localToGlobal(0, 0); // _betChipSetGridSelected(0,0)=> global x and y
        console.log(' this._veritcalTop.localToGlobal(49,61)', testpoint);
        this._betChipSetGridEnabled ? this.hideBetChipPanel() : this.showBetChipPanel();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        this._betRelatedGroup.visible = enable;
        this._betChipSetGridSelected.visible = enable;

        const isEnable = enable;
        if (!isEnable) {
          this.hideBetChipPanel();
        }
      }

      protected showBetChipPanel() {
        const betChipSetGridPosition = this._betChipSetGridSelected.localToGlobal(0, 0);
        if (env.orientation === 'portrait') {
          // portrait position
          if (betChipSetGridPosition.y < 900) {
            // bottomGamePanel is on
            this._betPanelGroup.scaleY = 1;

            this._betPanelGroup.y = betChipSetGridPosition.y;
            this._betChipSetPanel.y = betChipSetGridPosition.y + 185;
          } else if (betChipSetGridPosition.y >= 900) {
            // bottomGamePanel is off
            this._betPanelGroup.y = betChipSetGridPosition.y;
            this._betChipSetPanel.y = betChipSetGridPosition.y - 780;
            this._betPanelGroup.scaleY = -1;
          }
        } else {
          // landscape position
          if (betChipSetGridPosition.y < 450) {
            this._betPanelGroup.scaleY = -1;
            // this._betChipSetPanel.x = betChipSetGridPosition.x - 200;
            this._betChipSetPanel.y = betChipSetGridPosition.y + 230;
            this._betPanelGroup.y = 430;
          } else if (betChipSetGridPosition.y >= 450) {
            this._betPanelGroup.scaleY = 1;
            // this._betChipSetPanel.x = betChipSetGridPosition.x - 200;
            this._betChipSetPanel.y = betChipSetGridPosition.y - 500;
            this._betPanelGroup.y = 0;
          }
        }

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

      protected updateTableInfoRelatedComponents() {
        super.updateTableInfoRelatedComponents();
        this._bottomGamePanel.update();
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo> evt.data;
          if (betInfo.tableid === this._tableId) {
            if (this._totalBet) {
              const totalBet = betInfo.gameroundid === this._gameData.gameroundid ? betInfo.total : 0;
              this._totalBet.renderText = () => utils.numberToFaceValue(totalBet);
            }
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        super.onRoadDataUpdate(evt);
        this._bottomGamePanel.updateStat();
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._betChipSetGridSelected.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        // if (this._videoBtn) {
        //   this._videoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickVideo, this);
        // }
        if (this._videoBtn) {
          this._videoBtn.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            () => {
              if (this.played) {
                this.stopFunc();
              } else {
                this.playFunc();
              }
              this.played = !this.played;
            },
            this
          );
        }
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._betChipSetGridSelected.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        // if (this._videoBtn) {
        //   this._videoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickVideo, this);
        // }
        if (this._videoBtn) {
          this._videoBtn.removeEventListener(
            egret.TouchEvent.TOUCH_TAP,
            () => {
              if (this.played) {
                this.stopFunc();
              } else {
                this.playFunc();
              }
              this.played = !this.played;
            },
            this
          );
        }
      }

      public setPlayFunc(func: () => void) {
        this.playFunc = func;
      }

      public setStopFunc(func: () => void) {
        this.stopFunc = func;
      }

      protected onClickVideo() {
        dir.evtHandler.createOverlay({
          class: 'VideoSetting',
        });
        logger.l(utils.LogTarget.DEBUG, `onClickVideo`);
      }

      protected onOrientationChange(gameModeExist?: boolean) {
        this.onExit();
        super.onOrientationChange();
        if (gameModeExist != null) {
          this.checkGameMode(gameModeExist);
        }
        this.onEnter();
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this._betChipSetPanel.alpha = 0;
        this._betChipSetPanel.visible = false;
        this._betChipSet.alpha = 1;
      }

      // check if game mode btn (e.g. BA) is selected when orientation
      protected checkGameMode(value: boolean) {}

      protected setStateIdle(isInit: boolean) {
        super.setStateIdle(isInit);
        if (this._totalBet && this.tableInfo.betInfo) {
          const totalBet = this.tableInfo.betInfo.gameroundid === this._gameData.gameroundid ? this.tableInfo.betInfo.total : 0;
          this._totalBet.renderText = () => `${totalBet}`;
        }
      }

      protected setStateBet(isInit: boolean) {
        super.setStateBet(isInit);
        if (this._totalBet && this.tableInfo.betInfo) {
          const totalBet = this.tableInfo.betInfo.gameroundid === this._gameData.gameroundid ? this.tableInfo.betInfo.total : 0;
          this._totalBet.renderText = () => `${totalBet}`;
        }
      }

      protected changeLang() {
        this._repeatLabel.text = i18n.t('mobile_ba_repeat');
        this._cancelLabel.text = i18n.t('mobile_ba_clear');
        this._doubleLabel.text = i18n.t('mobile_ba_double');
        this._undoLabel.text = i18n.t('mobile_ba_undo');
      }
    }
  }
}
