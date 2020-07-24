// TypeScript file
namespace we {
  export namespace lo {
    export abstract class ABettingPanel extends core.BaseEUI implements IBettingPanel {
      public _currentBettingTable: ABettingTable;
      protected _bettingControl: ABettingControlBar;
      public _noteControl: ANoteControlPanel;

      protected init() {
        if (this._bettingControl) {
          this._bettingControl.bettingPanel = this;
          this._bettingControl.init();
        }
        if (this._noteControl) {
          this._noteControl.bettingPanel = this;
          this._noteControl.init();
        }
      }

      protected initComponents() {
        this.init();
        super.initComponents();
        this.addEventListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeEventListeners();
      }

      protected addEventListeners() {}

      protected removeEventListeners() {}

      protected clearCurrentBettingTable() {
        if (this._currentBettingTable) {
          this._currentBettingTable.bettingPanel = null;
          this._currentBettingTable.dispose();
        }
      }

      protected initCurrentBettingTable() {
        this._currentBettingTable.bettingPanel = this;
      }

      public onInputChanged() {
        console.log('Lottery input changed');
        // update current input note count and current bet amount in _bettingControl
        if (!this._bettingControl) {
          return;
        }
        this._bettingControl.noteCount = this._currentBettingTable.totalNoteCount;
      }

      protected betFieldMapping(betFields: string[]) {
        const unitBet = this._bettingControl ? this._bettingControl.unitBet : 10; // temp workaround when bettingControl not exist
        return betFields.map(betField => `${betField}@${unitBet}`);
      }

      protected generateNoteData(): TradNoteData[] {
        const rawBetFields = this._currentBettingTable.betFields;
        const finalbetFields = this.betFieldMapping(rawBetFields);
        // TODO: generateNoteData using unitBet, multiplier of ABettingControlBar and the betField and noteCount of ABettingTable and store at _notes

        return [];
      }

      protected placeBet(notes: TradNoteData[]) {
        const betdetails = this.generateBetDetail(notes);

        // TODO: send out betdetails
      }

      protected generateBetDetail(notes: TradNoteData[]): data.BetCommand[] {
        // TODO: generate betDetails using TradNoteDatas
        return [];
      }

      public confirmBet() {
        const notes = this._noteControl.notes;
        this.placeBet(notes);
      }

      public instantBet() {
        const notes = this.generateNoteData();
        this.placeBet(notes);
      }

      public addNotes() {
        // add notes to _noteControl
        // const notes = this.generateNoteData();
        const tempbetdails = [
          {
            field: '34OptionalFree_564_708@200',
            count: 9,
            multiplier: 1,
          },
        ];
      }

      public onBettingControlBarUnitBetUpdate(betFields: string[]) {
        this.betFieldMapping(betFields);
      }

      public chaseBet() {
        // TODO
      }
    }
  }
}
