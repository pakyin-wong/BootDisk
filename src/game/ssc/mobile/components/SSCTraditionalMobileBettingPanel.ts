// TypeScript file
// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalMobileBettingPanel extends ABettingPanel {
      // control by scene
      protected _buttonGroup: eui.Group;

      protected _bigTagsGroup: eui.Group;
      protected _smallTagsGroup: eui.Group;

      protected bigTagsArray: any[] = [];
      protected smallTagsArray: any[] = [];

      protected bigTagNames: ui.RunTimeLabel[];
      protected smallTagNames: ui.RunTimeLabel[];
      // private currentBetTable;

      protected _buttons;

      private _multipleGroup: eui.Group;
      private _imgMultiple: ui.RoundRectShape;
      private _multipleValue: number;
      private _lblMultipleValue: ui.RunTimeLabel;
      private _lblMultipleTitle: ui.RunTimeLabel;
      private _buttonAdd;
      private _buttonMinus;

      private _dollarGroup: eui.Group;
      private _dollarValue: number;
      private _lblDollar: ui.RunTimeLabel;

      private _winInstructGroup: eui.Group;
      private _lblwinInstruct: ui.RunTimeLabel;

      protected _lblCurrentRound: ui.RunTimeLabel;
      protected _lblCurrentRoundState: ui.RunTimeLabel;

      protected _lblPrevRound: ui.RunTimeLabel;
      protected _lblLastRound: ui.RunTimeLabel;

      protected _lblResultBall0: ui.RunTimeLabel;
      protected _lblResultBall1: ui.RunTimeLabel;
      protected _lblResultBall2: ui.RunTimeLabel;
      protected _lblResultBall3: ui.RunTimeLabel;
      protected _lblResultBall4: ui.RunTimeLabel;

      protected _lblLastBall0: ui.RunTimeLabel;
      protected _lblLastBall1: ui.RunTimeLabel;
      protected _lblLastBall2: ui.RunTimeLabel;
      protected _lblLastBall3: ui.RunTimeLabel;
      protected _lblLastBall4: ui.RunTimeLabel;

      protected _lblPrevBall0: ui.RunTimeLabel;
      protected _lblPrevBall1: ui.RunTimeLabel;
      protected _lblPrevBall2: ui.RunTimeLabel;
      protected _lblPrevBall3: ui.RunTimeLabel;
      protected _lblPrevBall4: ui.RunTimeLabel;

      // MobileRelated
      protected _footer: eui.Group;
      protected _bettingTableGroup: eui.Group;
      protected _currentDropDownState = 'off';
      public bettingTableStates = ['off', 'on', 'extend'];
      protected _currentBettingStateIndex = -1;

      protected _dropDown: eui.Group;
      protected _bettingTypeDropDown: SSCTraditionalMobileDropdown;
      protected _betControlPanelGroup: eui.Group;
      protected _betControlPanel: SSCTraditionalMobileBetControlPanel;

      constructor(skin: string = null) {
        super(skin);
        this._currentKey = 'lo';
        this._currentMap = we[this._currentKey].SelectionMapping;
        this.initSkin();
      }

      protected addEventListeners() {
        super.addEventListeners();
        this.addEventListener('GAMETYPEDROPDOWN_ITEM_CHANGE', this.updateCurrentIndex, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this.removeEventListener('GAMETYPEDROPDOWN_ITEM_CHANGE', this.updateCurrentIndex, this);
      }

      protected initSkin() {
        this.skinName = 'skin_mobile.lo.SSCTraditionalBettingPanel';
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.initComponents();
      }

      protected mount() {}

      protected initComponents() {
        this._bettingTypeDropDown = new SSCTraditionalMobileDropdown(this._currentMap, this);
        this._dropDown.addChild(this._bettingTypeDropDown);
        this._bettingTypeDropDown.bottom = 0;
        this._bettingTypeDropDown.horizontalCenter = 0;

        this._betControlPanel = new SSCTraditionalMobileBetControlPanel(this);
        this._betControlPanelGroup.addChild(this._betControlPanel);

        this._currentBigTagIndex = 0;
        this._currentSmallTagIndex = 0;
        super.initComponents();

        this.createBetTable();
        // this.createBigTags();
        // this.createSmallTags();
        // this.initCurrentButtonPanel();
      }

      public onInputChanged() {
        super.onInputChanged();
      }

      protected updateCurrentIndex(e) {
        this._currentBigTagIndex = e.data.betType;
        this._currentSmallTagIndex = e.data.betMode;
        this.refreshCurrentBettingTable();
      }

      public updateBetInfo(data) {
        super.updateBetInfo(data);
        this._lblCurrentRound.renderText = () => `${data.gameroundid}`;
        switch (data.state) {
          case core.GameState.DEAL:
          case core.GameState.FINISH:
            this._lblCurrentRoundState.renderText = () => `${data.gameroundid + i18n.t('lo_fun_drawingRound')}`;
            this._lblResultBall0.renderText = () => (data.ball1 >= 0 ? `${data.ball1}` : '-');
            this._lblResultBall1.renderText = () => (data.ball2 >= 0 ? `${data.ball2}` : '-');
            this._lblResultBall2.renderText = () => (data.ball3 >= 0 ? `${data.ball3}` : '-');
            this._lblResultBall3.renderText = () => (data.ball4 >= 0 ? `${data.ball4}` : '-');
            this._lblResultBall4.renderText = () => (data.ball5 >= 0 ? `${data.ball5}` : '-');
            break;
          default:
            this._lblCurrentRoundState.renderText = () => `${i18n.t('lo_fun_lastRound')}`;
        }
      }

      public updateBetTableInfo(info) {
        super.updateBetTableInfo(info);
        if (!info.gamestatistic) {
          return;
        }
        if (info.gamestatistic) {
          if (info.gamestatistic.loresults) {
            const data = info.gamestatistic.loresults;
            let index = data.length - 1;

            this._lblCurrentRoundState.renderText = () => `${data[index].Roundnumber + i18n.t('lo_fun_drawingRound')}`;
            this._lblResultBall0.renderText = () => (data[index].Data.ball1 >= 0 ? `${data[index].Data.ball1}` : '-');
            this._lblResultBall1.renderText = () => (data[index].Data.ball2 >= 0 ? `${data[index].Data.ball2}` : '-');
            this._lblResultBall2.renderText = () => (data[index].Data.ball3 >= 0 ? `${data[index].Data.ball3}` : '-');
            this._lblResultBall3.renderText = () => (data[index].Data.ball4 >= 0 ? `${data[index].Data.ball4}` : '-');
            this._lblResultBall4.renderText = () => (data[index].Data.ball5 >= 0 ? `${data[index].Data.ball5}` : '-');

            if (data.length >= 2) {
              index = data.length - 2;

              this._lblLastRound.renderText = () => `${data[index].Roundnumber}`;
              this._lblLastBall0.renderText = () => (data[index].Data.ball1 >= 0 ? `${data[index].Data.ball1}` : '-');
              this._lblLastBall1.renderText = () => (data[index].Data.ball2 >= 0 ? `${data[index].Data.ball2}` : '-');
              this._lblLastBall2.renderText = () => (data[index].Data.ball3 >= 0 ? `${data[index].Data.ball3}` : '-');
              this._lblLastBall3.renderText = () => (data[index].Data.ball4 >= 0 ? `${data[index].Data.ball4}` : '-');
              this._lblLastBall4.renderText = () => (data[index].Data.ball5 >= 0 ? `${data[index].Data.ball5}` : '-');
            }
            if (data.length >= 3) {
              index = data.length - 3;

              this._lblPrevRound.renderText = () => `${data[index].Roundnumber}`;
              this._lblPrevBall0.renderText = () => (data[index].Data.ball1 >= 0 ? `${data[index].Data.ball1}` : '-');
              this._lblPrevBall1.renderText = () => (data[index].Data.ball2 >= 0 ? `${data[index].Data.ball2}` : '-');
              this._lblPrevBall2.renderText = () => (data[index].Data.ball3 >= 0 ? `${data[index].Data.ball3}` : '-');
              this._lblPrevBall3.renderText = () => (data[index].Data.ball4 >= 0 ? `${data[index].Data.ball4}` : '-');
              this._lblPrevBall4.renderText = () => (data[index].Data.ball5 >= 0 ? `${data[index].Data.ball5}` : '-');
            }
          }
        }
      }

      protected createBetTable() {
        this.clearCurrentBettingTable();

        const currentBigTag = this._currentMap[Object.keys(this._currentMap)[this._currentBigTagIndex]];
        const config = currentBigTag['type'][Object.keys(currentBigTag['type'])[this._currentSmallTagIndex]];

        const bettingTable = new SSCTraditionalBettingTable(config);
        if (this._bettingControl) {
          this._bettingControl.updateHighestWin(config);
        }
        this._currentBettingTable = bettingTable;
        this.initCurrentBettingTable();
        this._currentBettingTable.init();
      }

      protected clearCurrentBettingTable() {
        super.clearCurrentBettingTable();
        if (this._currentBettingTable) {
          this._currentBettingTable.parent.removeChild(this._currentBettingTable);
        }
      }

      public openBettingTableState(e) {
        super.openBettingTableState(e);
        if (this._currentBettingStateIndex === 1 || this._currentBettingStateIndex === 2) {
          return;
        }

        this.changeBettingTableState(0);
      }

      public closeBettingTableState(e) {
        super.closeBettingTableState(e);

        if (this._currentBettingStateIndex === 0) {
          return;
        }

        this.changeBettingTableState(0);
      }

      public updateBettingTableState(e) {
        super.updateBettingTableState(e);
        if (this._currentBettingStateIndex === 0) {
          return;
        }

        if (this._currentBettingStateIndex === 1) {
          this.changeBettingTableState(2);
        } else {
          this.changeBettingTableState(1);
        }
      }

      protected changeBettingTableState(idx: number) {
        if (!this._currentBettingTable || this._currentBettingStateIndex === idx) {
          return;
        }

        this._currentBettingTable.currentState = this.bettingTableStates[idx];
        this._currentBettingTable.invalidateState();

        if (this._bettingControl) {
          switch (idx) {
            case 1:
            case 2:
              //   this._bettingControl.visible = false;
              this._footer.visible = true;
              this._footer.touchEnabled = true;
              this._footer.touchThrough = true;
              break;
            case 0:
              this._footer.visible = false;
              this._footer.touchEnabled = false;
              this._footer.touchThrough = false;
              break;
          }
        }
      }

      public refreshCurrentBettingTable() {
        this.createBetTable();
      }

      protected initCurrentBettingTable() {
        super.initCurrentBettingTable();
        this._bettingTableGroup.addChild(this._currentBettingTable);
        this._currentBettingTable.x = this._currentBettingTable.y = 0;
        if (this._currentBettingStateIndex < 0) {
          this.changeBettingTableState(0);
        } else {
          this.changeBettingTableState(this._currentBettingStateIndex);
        }
        this._bettingTableGroup.touchChildren = true;
      }

      public toggleGameTypeDropdown(e) {
        this._bettingTypeDropDown.dispatchEvent(new egret.Event('LO_TRAD_TOGGLE_MOBILE_GAMETYPE_DROPDOWN'));
      }

      protected init() {
        if (this._bettingControl) {
          this._bettingControl.bettingPanel = this;
          this._bettingControl.init();
        }

        this._noteControl = this._betControlPanel._noteControl;

        if (this._noteControl) {
          this._noteControl.bettingPanel = this;
          this._noteControl.init();
        }

        this._isBetCodeValidate = false;
        this._isBetLimitValidate = true;
      }

      public confirmBet() {
        const notes = this._noteControl.notes;
        let totalBetAmount = 0;
        const betmodearray = this.getBetModeArray(notes);

        notes.map((e, i) => {
          totalBetAmount += e.count * e.multiplier * betmodearray[i];
        });

        if (totalBetAmount > env.balance) {
          dir.evtHandler.dispatchEvent(new egret.Event('ON_LOTTERY_TRAD_INSUFFICIENTBALANCE'));
          return;
        }

        dir.evtHandler.once('onLotteryConfirmBet', this.placeBet, this);
        // this.placeBet(notes);
        dir.evtHandler.createOverlay({
          class: 'SSCBetConfirmPanel',
          args: [notes, this._currentGameRound],
        });
      }

      public instantBet() {
        const notes = this.generateNoteData();

        let totalBetAmount = 0;
        const betmodearray = this.getBetModeArray(notes);

        notes.map((e, i) => {
          totalBetAmount += e.count * e.multiplier * betmodearray[i];
        });

        if (totalBetAmount > env.balance) {
          dir.evtHandler.dispatchEvent(new egret.Event('ON_LOTTERY_TRAD_INSUFFICIENTBALANCE'));
          return;
        }

        dir.evtHandler.once('onLotteryConfirmBet', this.placeBet, this);
        // this.placeBet(notes);
        dir.evtHandler.createOverlay({
          class: 'SSCBetConfirmPanel',
          args: [notes, this._currentGameRound],
        });
      }

      public addNotes() {
        // add notes to _noteControl
        super.addNotes();
        this._betControlPanel.visible = true;
        this._betControlPanel.touchEnabled = true;
      }
    }
  }
}
