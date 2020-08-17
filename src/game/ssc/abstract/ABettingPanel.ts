// TypeScript file
namespace we {
  export namespace lo {
    export abstract class ABettingPanel extends core.BaseEUI implements IBettingPanel {
      public _currentBettingTable: ABettingTable;
      protected _bettingControl: ABettingControlBar;
      public _noteControl: ANoteControlPanel;

      public _currentGameRound: string;

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
          this.clearNote();
          this._currentBettingTable.bettingPanel = null;
          this._currentBettingTable.dispose();
        }
      }

      public clearNote() {
        this._currentBettingTable.clearData();
        if (this._bettingControl) {
          this._bettingControl.noteCount = 0;
        }
      }

      protected initCurrentBettingTable() {
        this._currentBettingTable.bettingPanel = this;
      }

      public refreshCurrentBettingTable() {}

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
        const tradNoteDataArray = [];
        for (let i = 0; i < finalbetFields.length; i++) {
          const tradNoteData = new TradNoteData();
          tradNoteData.field = finalbetFields[i];
          tradNoteData.count = this._currentBettingTable.noteCount[i];
          tradNoteData.multiplier = this._bettingControl.multiplier;
          tradNoteDataArray.push(tradNoteData);
        }

        return tradNoteDataArray;
      }

      protected placeBet(notes: TradNoteData[]) {
        const betdetails = this.generateBetDetail(notes);
        let s = '';
        for (let i = 0; i < betdetails.length; i++) {
          s += betdetails[i].field + ' , amount = ' + betdetails[i].amount;
        }
        this._noteControl.clearAllNotes();
        console.log(s);
        // dir.socket.bet(this._tableId, bets);
        // TODO: send out betdetails
      }

      // protected generateRoundBetDetail(notes: TradNoteData[]): data.RoundBetDetail{
      //   //
      // }

      protected generateBetDetail(notes: TradNoteData[]): data.BetCommand[] {
        // TODO: generate betDetails using TradNoteDatas
        //
        const betDetailArray: data.BetCommand[] = [];
        for (let i = 0; i < notes.length; i++) {
          const field = notes[i].field;
          const amount = parseInt(notes[i].field.split('@')[1], 10) * notes[i].count;
          betDetailArray.push({ amount, field });
        }

        return betDetailArray;
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
        const notes = this.generateNoteData();
        if (!this._noteControl) {
          return;
        }

        this._noteControl.addNotes(notes);
        // const tempbetdails = [
        //   {
        //     field: '34OptionalFree_564_708@200',
        //     count: 9,
        //     multiplier: 1,
        //   },
        // ];
      }

      public validateBetLimit() {
        // temp list of betlimits, need to receive from server
        // const tempMap = we.lo.tempBetLimitsMap;
        if (this._currentBettingTable.betFields.length === 0) {
          return;
        }

        const noteDataArray = this.generateNoteData();
        const betDetails = this.generateBetDetail(noteDataArray);
        const roundBetDetailArray = this.generateCurrentBetRoundBetDetail();
        //send validation
      }

      public generateChaseBetRoundBetDetail(): data.LotteryBetCommand[] {
        //chaseBet
        return [];
      }

      public generateCurrentBetRoundBetDetail(): data.LotteryBetCommand[] {
        // let lotteryBetCommandArray : data.LotteryBetCommand[] = [];
        let lotteryBetCommand: data.LotteryBetCommand = { roundid: this._currentGameRound, multiplier: 1, stopChaseIfWon: false };

        return [lotteryBetCommand];
      }

      public onBettingControlBarUnitBetUpdate(betFields: string[]) {
        // this.betFieldMapping(betFields);
      }

      public chaseBet() {
        // TODO
      }
    }
  }
}
