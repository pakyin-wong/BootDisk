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
      protected _verticalGroup: eui.Group;

      protected _GameID: ui.RunTimeLabel;
      protected _GameIDText: ui.RunTimeLabel;

      private _videoBtn: egret.DisplayObject;

      // protected _bottomResultDisplay: ui.IResultDisplay;
      // protected _bottomResultDisplayContainer: eui.Group;

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
      // public updateBottomResultDisplay() {
      //   if (!this._bottomResultDisplayContainer || this._previousState !== we.core.GameState.DEAL) { //only landscape contain _bottomResultDisplayContainer
      //     return
      //   }
      //   if ( this._bottomGamePanel.isPanelOpen ) {
      //     this._bottomResultDisplayContainer.visible = true;
      //     this._resultDisplay.visible = false;
      //   } else {
      //     this._bottomResultDisplayContainer.visible = false;
      //     this._resultDisplay.visible = true;
      //   }
      //   console.log('this._bottomGamePanel.isPanelOpen',this._bottomGamePanel.isPanelOpen);
      // }

      // public get bottomResultDisplayContainerVisible(): boolean {
      //   return this._bottomResultDisplayContainer.visible;
      // }

      // public set bottomResultDisplayContainerVisible(val: boolean) {
      //   if ( this._previousState !== we.core.GameState.BET ) {
      //     return
      //   }
      //   this._bottomResultDisplayContainer.visible = val;
      //   this._resultDisplay.visible = !val;
      // }

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
        this._GameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
        this._GameID.renderText = () => `${this._tableInfo.data.gameroundid}`;
        this._bottomGamePanel.gameScene = this;
        if (this._lblBetLimit) {
          this.initBetLimitSelector();
          dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
          this.changeLang();
        }
        if (this._bottomGamePanel._betLimitDropDownBtn) {
          this.initBottomBetLimitSelector();
        }

        if (this._totalBetText) {
          this._totalBetText.renderText = () => `${i18n.t('baccarat.totalbet')}`;
        }

        this.setPlayFunc(this.playVideoFunc(this));
        this.setStopFunc(this.stopVideoFunc(this));

        this.played = env.videoOpen;

        if (this._bottomGamePanel._tableInfoPanel && this._lblRoomInfo) {
          this._lblRoomInfo.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            () => {
              this._bottomGamePanel.openTableInfo();
            },
            this
          );
        }

        this.setBackground();
      }

      protected setBackground() {
        const prefix = `m_${env.orientation == egret.OrientationMode.PORTRAIT ? 'v' : 'h'}`;
        switch (this._tableInfo.gametype) {
          case core.GameType.BAC:
          case core.GameType.BAS:
          case core.GameType.BAI:
            this._bgImg.source = `${prefix}_placeholder_ba_jpg`;
            break;
          case core.GameType.BAM:
            this._bgImg.source = `${prefix}_placeholder_sq_ba_jpg`;
            break;
          case core.GameType.DT:
            this._bgImg.source = `${prefix}_placeholder_dt_jpg`;
            break;
          case core.GameType.DI:
            this._bgImg.source = `${prefix}_placeholder_sicbo_jpg`;
            break;
          case core.GameType.DIL:
            this._bgImg.source = `${prefix}_placeholder_gof_sicbo_jpg`;
            break;
          case core.GameType.RO:
            this._bgImg.source = `${prefix}_placeholder_ro_jpg`;
            break;
          case core.GameType.ROL:
            this._bgImg.source = `${prefix}_placeholder_gof_ro_jpg`;
            break;
          case core.GameType.LW:
            this._bgImg.source = `${prefix}_placeholder_lw_jpg`;
            break;
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        super.setStateDeal(isInit);
        if (this._previousState !== we.core.GameState.DEAL && env.orientation === 'landscape') {
          if (this._bottomGamePanel._bottomResultDisplay) {
            this._bottomGamePanel._bottomResultDisplay.reset();
          }
        }
        if (this._bottomGamePanel._bottomResultDisplay && env.orientation === 'landscape') {
          this._bottomGamePanel._bottomResultDisplay.updateResult(this._gameData);
        }
      }

      protected setStateFinish(isInit: boolean = false) {
        super.setStateFinish(isInit);
        if (this._previousState !== we.core.GameState.FINISH && env.orientation === 'landscape') {
          if (this._bottomGamePanel._bottomResultDisplay) {
            this._bottomGamePanel._bottomResultDisplay.updateResult(this._gameData);
          }
        }
      }

      // protected setStateFinish(isInit: boolean = false) {
      //   if (this._previousState !== we.core.GameState.FINISH || isInit) {
      //     this.setBetRelatedComponentsEnabled(false);
      //     this.setResultRelatedComponentsEnabled(true);
      //   }
      //   if (this._previousState !== we.core.GameState.FINISH) {
      //     if (this._resultDisplay) {
      //       this._resultDisplay.updateResult(this._gameData);
      //     }

      //     if (this._resultMessage) {
      //       this.checkResultMessage();
      //     }
      //   if (this._previousState !== we.core.GameState.FINISH) {
      //     if (this._bottomResultDisplay) {
      //       this._bottomResultDisplay.updateResult(this._gameData);
      //     }
      //   }
      //   }
      // }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        super.setResultRelatedComponentsEnabled(enable);
        if (this._bottomGamePanel._bottomResultDisplayContainer && env.orientation === 'landscape') {
          if (this._bottomGamePanel.isPanelOpen) {
            this._resultDisplay.visible = false;
            if (this._previousState === we.core.GameState.DEAL || this._previousState === we.core.GameState.FINISH) {
              this._bottomGamePanel._bottomResultDisplayContainer.visible = true;
            } else {
              this._bottomGamePanel._bottomResultDisplayContainer.visible = false;
            }
          } else {
            if (this._previousState === we.core.GameState.DEAL || this._previousState === we.core.GameState.FINISH) {
              this._bottomGamePanel._bottomResultDisplayContainer.visible = false;
              this._resultDisplay.visible = true;
            }
          }
        }
      }

      public updateResultDisplayVisible(bottomGamePanelisOpen: boolean) {
        if (!this._bottomGamePanel._bottomResultDisplayContainer) {
          return;
        }
        if (env.orientation === 'landscape') {
          if (this._previousState === we.core.GameState.DEAL || this._previousState === we.core.GameState.FINISH) {
            this._resultDisplay.visible = !bottomGamePanelisOpen;
            this._bottomGamePanel._bottomResultDisplayContainer.visible = bottomGamePanelisOpen;
          }
        }
      }

      public updateTableLayerPosition(bottomGamePanelisOpen: boolean) {
        if (env.orientation === 'landscape') {
          const vlayout = new eui.VerticalLayout();
          if (this._tableLayer) {
            switch (env.tableInfos[this._tableId].gametype) {
              case core.GameType.BAC:
              case core.GameType.BAS:
              case core.GameType.BAI:
                console.log('this._aaaaa', this._tableLayer);
                if (bottomGamePanelisOpen === true) {
                  vlayout.gap = -65;
                  // this._tableLayer.y -= 24;
                  // this._chipLayer.y -= 24;
                } else {
                  vlayout.gap = -40;
                  // this._tableLayer.y += 24;
                  // this._chipLayer.y += 24;
                }
                this._verticalGroup.layout = vlayout;
                break;
              case core.GameType.LW:
                if (bottomGamePanelisOpen === true) {
                  vlayout.gap = 0;
                  // this._tableLayer.y -= 24;
                  // this._chipLayer.y -= 24;
                } else {
                  vlayout.gap = 0;
                  // this._tableLayer.y += 24;
                  // this._chipLayer.y += 24;
                }
                this._verticalGroup.layout = vlayout;
                break;
              default:
                break;
            }
            // this._verticalGroup.layout = vlayout;
          }
        }
      }

      protected initDenom() {
        this._betChipSet.setUpdateChipSetSelectedChipFunc(this._betChipSetGridSelected.setSelectedChip.bind(this._betChipSetGridSelected));
        const denominationList = env.betLimits.Live[this.getSelectedBetLimitIndex()].chips;
        this._betChipSet.init(null, denominationList);
      }

      protected initBetLimitSelector() {
        const betLimitList = env.betLimits.Live;
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
          title: () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[env.currentSelectedBetLimitIndex] : ''}`,
          selected: 0,
        });

        this.updateBetLimit(selectedIndex);

        this._lblBetLimit.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
      }

      protected initBottomBetLimitSelector() {
        const betLimitList = env.betLimits.Live;
        const betLimitItems = betLimitList.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });
        const dropdownSource = betLimitList.map((data, index) => {
          return ui.NewDropdownItem(index, () => `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`);
        });

        const selectedIndex = env.currentSelectedBetLimitIndex;
        this._bottomGamePanel._betLimitDropDownBtn.touchEnabled = true;
        utils.DropdownCreator.new({
          toggler: this._bottomGamePanel._betLimitDropDownBtn,
          review: this._bottomGamePanel._betLimitDropDownBtn,
          arrCol: new eui.ArrayCollection(dropdownSource),
          title: () => `${i18n.t('baccarat.betLimitshort')} ${betLimitItems.length > 0 ? betLimitItems[env.currentSelectedBetLimitIndex] : ''}`,
          selected: 0,
        });

        this.updateBetLimit(selectedIndex);

        // this._bottomGamePanel._betLimitDropDownBtn.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
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
        const betLimitList = env.betLimits.Live;
        const betLimitItems = betLimitList.map(data => {
          return `${utils.numberToFaceValue(data.minlimit)} - ${utils.numberToFaceValue(data.maxlimit)}`;
        });
        if (this._lblBetLimit) {
          this._lblBetLimit.renderText = () => `${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`;
        }
        if (this._bottomGamePanel._betLimitDropDownBtn) {
          this._bottomGamePanel._betLimitDropDownBtn.renderText = () => `${betLimitItems.length > 0 ? betLimitItems[selectedIndex] : ''}`;
        }
      }

      protected onClickBetChipSelected() {
        const testpoint: egret.Point = this._betChipSetGridSelected.localToGlobal(0, 0); // _betChipSetGridSelected(0,0)=> global x and y
        // console.log(' this._veritcalTop.localToGlobal(49,61)', testpoint);
        this._betChipSetGridEnabled ? this.hideBetChipPanel() : this.showBetChipPanel();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        // this._betRelatedGroup.visible = enable;
        this._betChipSetGridSelected.visible = enable;
        this._betChipSetGridSelected.chipScale = 0.5;

        const isEnable = enable;
        if (!isEnable) {
          this.hideBetChipPanel();
        }
      }

      protected showBetChipPanel() {
        const betChipSetGridPosition = this._betChipSetGridSelected.localToGlobal(0, 0);
        console.log(`................${betChipSetGridPosition}`);
        if (env.orientation === 'portrait') {
          // portrait position
          if (betChipSetGridPosition.y < 1000) {
            // bottomGamePanel is on
            // this._betPanelGroup.scaleY = 1;
            // this._betPanelGroup.y = betChipSetGridPosition.y;
            // this._betChipSet.y = betChipSetGridPosition.y;
            this._betChipSetPanel.y = betChipSetGridPosition.y + 185;
            this._betPanelGroup.y = 0;
            this._betChipSet.y = 100;
            this._betPanelGroup.scaleY = 1;
          } else if (betChipSetGridPosition.y >= 1000) {
            // bottomGamePanel is off
            // this._betPanelGroup.y = betChipSetGridPosition.y;
            // this._betChipSet.y = betChipSetGridPosition.y - 780;
            this._betChipSetPanel.y = betChipSetGridPosition.y - 20;
            this._betPanelGroup.y = 0;
            this._betChipSet.y = -760;
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
        if (evt && evt.data) {
          const stat = <data.TableInfo> evt.data;
          if (stat.tableid === this._tableId) {
            this._bottomGamePanel.updateStat();
          }
        }
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._betChipSetGridSelected.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBetChipSelected, this);
        if (this._bottomGamePanel._betLimitDropDownBtn) {
          this._bottomGamePanel._betLimitDropDownBtn.addEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
        }
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
        if (this._bottomGamePanel._betLimitDropDownBtn) {
          this._bottomGamePanel._betLimitDropDownBtn.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onBetLimitSelected, this);
        }
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

      protected async onOrientationChange(gameModeExist?: boolean) {
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
          // this._totalBet.renderText = () => `${totalBet}`;
          this._totalBet.renderText = () => utils.numberToFaceValue(totalBet);
        }
      }

      protected setStateBet(isInit: boolean) {
        super.setStateBet(isInit);
        if (this._totalBet && this.tableInfo.betInfo) {
          const totalBet = this.tableInfo.betInfo.gameroundid === this._gameData.gameroundid ? this.tableInfo.betInfo.total : 0;
          // this._totalBet.renderText = () => `${totalBet}`;
          this._totalBet.renderText = () => utils.numberToFaceValue(totalBet);
        }
        this._GameID.renderText = () => `${this._tableInfo.data.gameroundid}`;
      }

      protected changeLang() {
        this._repeatLabel.text = i18n.t('mobile_ba_repeat');
        this._repeatLabel.targetWidth = 120;
        this._cancelLabel.text = i18n.t('mobile_ba_clear');
        this._cancelLabel.targetWidth = 120;
        this._doubleLabel.text = i18n.t('mobile_ba_double');
        this._doubleLabel.targetWidth = 120;
        this._undoLabel.text = i18n.t('mobile_ba_undo');
        this._undoLabel.targetWidth = 120;
      }
    }
  }
}
