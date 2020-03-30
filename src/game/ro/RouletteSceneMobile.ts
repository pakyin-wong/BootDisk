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
      protected _roadmapControl: we.ro.RORoadmapControl;
      protected _bottomGamePanel: MobileBottomGamePanel;
      protected _sidePanel: MobileSidePanel;

      protected _betArea: eui.Scroller;
      protected _betAreaTween: ui.TweenConfig;
      protected _betAreaLock: boolean = false;

      protected _betSet: egret.DisplayObject;
      protected _betSetTween: ui.TweenConfig;

      // protected _leftGamePanel: we.ro.RoLeftPanel;
      // protected _rightGamePanel: we.ro.RoRightPanel;
      // protected _bigRoadResultPanel: we.ro.ROBigRoadResultPanel;

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();
        // this._rightGamePanel.initRaceTrack(this._chipLayer, this._tableLayer);
        this.initBottomBetLimitSelector();
        this.changeHandMode();
      }

      protected addEventListeners() {
        super.addEventListeners();

        this._bottomGamePanel.addEventListener('TOGGLE', this.onBottomToggle, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LEFT_HAND_MODE, this.changeHandMode, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();

        this._bottomGamePanel.removeEventListener('TOGGLE', this.onBottomToggle, this);
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
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'ro' });
      }

      public getTableLayer() {
        return this._tableLayer;
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
        this._roadmapControl = new we.ro.RORoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          this._bottomGamePanel.beadRoad,
          this._bottomGamePanel.colorBigRoad,
          this._bottomGamePanel.sizeBigRoad,
          this._bottomGamePanel.oddBigRoad,
          this._sidePanel,
          null,
          null
        );
      }

      protected onBottomToggle() {
        this.betAreaState = this.betSetState = this._bottomGamePanel.isPanelOpen ? 'zip' : 'normal';
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
            this._betArea.scrollPolicyV = eui.ScrollPolicy.ON;
            egret.Tween.get(this._betArea.viewport).to(
              {
                scrollV: (this._betArea.viewport.contentHeight - this._betAreaTween.getTweenPackage().height) * 0.5,
              },
              250
            );
            break;
          case 'small':
          case 'normal':
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

      protected set betSetState(s) {
        if (this._betSetTween.currentState === s) {
          return;
        }
        this._betSetTween.currentState = s;
        this._betSetTween.validateNow();

        egret.Tween.removeTweens(this._betSet);
        egret.Tween.get(this._betSet).to(this._betSetTween.getTweenPackage(), 250);
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        // if (this._rightGamePanel.raceTrackChipLayer) {
        //   this._rightGamePanel.raceTrackChipLayer.touchEnabled = enable;
        //   this._rightGamePanel.raceTrackChipLayer.touchChildren = enable;
        // }
      }

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (this._tableInfo.totalWin) {
          totalWin = this._tableInfo.totalWin;
        }

        if (!this._gameData) {
          return;
        }

        const resultNo = (<ro.GameData>this._gameData).value;
        (this._tableLayer as ro.TableLayer).flashFields(`DIRECT_${resultNo}`);

        if (this.hasBet() && !isNaN(totalWin)) {
          this._resultMessage.showResult(this._tableInfo.gametype, {
            resultNo,
            winAmount: this._tableInfo.totalWin,
          });
          dir.audioCtr.playSequence(['player', 'win']);
        } else {
          this._resultMessage.showResult(this._tableInfo.gametype, {
            resultNo,
            winAmount: NaN,
          });
          dir.audioCtr.playSequence(['player', 'win']);
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
        this.betAreaState = this.betSetState = 'small';
      }

      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);
        this._betAreaLock = false;
        this._bottomGamePanel.touchEnabled = this._bottomGamePanel.touchChildren = true;
        this.betAreaState = this.betSetState = 'normal';
      }
    }
  }
}