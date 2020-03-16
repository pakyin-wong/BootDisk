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

      protected _verticalGroup: eui.Group;

      constructor(data: any) {
        super(data);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DragonTigerScene');
      }

      protected setStateBet() {
        super.setStateBet();

        if (this._previousState !== we.core.GameState.BET) {
          if (this._tableLayer) {
            (<we.dt.TableLayer> this._tableLayer).totalAmount = { DRAGON: 0, TIGER: 0 };
            (<we.dt.TableLayer> this._tableLayer).totalPerson = { DRAGON: 0, TIGER: 0 };
          }
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

        this.createVerticalLayout();

        this.changeHandMode();

        if (this._bottomGamePanel._betLimitDropDownBtn) {
          this.initBottomBetLimitSelector();
        }

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

      protected setChipPanelPos() {
        if (this._bottomGamePanel.isPanelOpen) {
          this._betPanelGroup.scaleY = 1;
          this._betPanelGroup.y = 0;
          this._betChipSetPanel.y = 1080;
        } else {
          this._betPanelGroup.scaleY = -1;
          this._betPanelGroup.y = 762;
          this._betChipSetPanel.y = 600;
        }
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
          this._bottomGamePanel.beadRoad,
          this._bottomGamePanel.bigRoad,
          this._bottomGamePanel.bigEyeRoad,
          this._bottomGamePanel.smallRoad,
          this._bottomGamePanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._bottomGamePanel,
          this._beadRoadResultPanel
        );
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo> evt.data;
          if (betInfo.tableid === this._tableId) {
            // update the scene
            (<we.dt.TableLayer> this._tableLayer).totalAmount = evt.data.amount;
            (<we.dt.TableLayer> this._tableLayer).totalPerson = evt.data.count;
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

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (this._tableInfo.totalWin) {
          totalWin = this._tableInfo.totalWin;
        }
        if (this.hasBet()) {
          if (this._gameData && this._gameData.wintype != 0 && !isNaN(totalWin)) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              winType: this._gameData.wintype,
              winAmount: totalWin,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        } else {
          if (this._gameData && this._gameData.wintype != 0) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              winType: this._gameData.wintype,
              winAmount: NaN,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        }
      }
    }
  }
}