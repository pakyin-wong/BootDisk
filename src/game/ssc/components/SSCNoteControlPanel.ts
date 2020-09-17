// TypeScript file
namespace we {
  export namespace lo {
    export class SSCNoteControlPanel extends ANoteControlPanel {
      //   private _btnConfirm;
      //   private _btnAddMultiplier;
      //   private _btnMinusMultiplier;
      //   private _lblMultiplier;
      //   private _lblTitleMultiplier;
      //   private _lblMultiplierMinus;
      //   private _lblMultiplierAdd;

      //   private _btnNoteDropDown;
      //   private _lblNoteDropDown;
      //   private _noteDropDown;

      //   private _btnBetDescription; // need tooltips????
      //   private _lblBetDescription;

      //   private _lblHighestWin;
      //   private _lblTitleNoteChosen;
      //   private _lblNoteChosen;
      //   private _lblTitleTotalBet;
      //   private _lblTotalBet;

      //   private _btnAddBetFields;
      //   private _lblAdd;
      //   private _btnInstantBet;
      //   private _lblInstantBet;
      protected _lblGameMode: ui.RunTimeLabel;
      protected _lblBetItem: ui.RunTimeLabel;
      protected _lblBetMode: ui.RunTimeLabel;
      protected _lblNoteCount: ui.RunTimeLabel;
      protected _lblMultiplier: ui.RunTimeLabel;
      protected _lblTotalBet: ui.RunTimeLabel;
      protected _lblControl: ui.RunTimeLabel;
      protected _lblBalance: ui.RunTimeLabel;

      protected _lbltotalBetAmount: ui.RunTimeLabel;
      protected _lbltotalBetCount: ui.RunTimeLabel;

      protected _scroller: eui.Scroller;
      protected _datagroup: eui.DataGroup;
      protected _dataColl: eui.ArrayCollection;

      protected _btnDelectAll: eui.Image;

      // protected _btnAddDataTEMP: eui.Image;

      protected _btnChaseBet: ui.RoundRectButton;

      private _outputData: any = [];
      private _totalBetAmount: any = 0;
      private _totalBetCount: any = 0;

      // constructor(skin, orientationDependent) {
      //   super(skin, orientationDependent);
      constructor() {
        super();
        this.skinName = 'skin_desktop.lo.SSCNoteControlPanel';
        // TradNoteData {
        //   public field: string; // field consist of several information: Bet type, bet per note and bet detail
        //   public count: number; // number of note corresponding to the field
        //   public multiplier: number;
        // }
      }

      protected childrenCreated() {
        super.childrenCreated();
        // this.init();
      }

      public init() {
        super.init();
        // runtimelabel rendertext
        this.updateText();
        this.addListeners();
      }

      protected addListeners() {
        super.addListeners();

        dir.evtHandler.addEventListener(we.core.Event.SSC_DELETE_ONE_NOTE, this.deleteOneNote, this);
        this._btnDelectAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearAllNotes, this);
        this._btnConfirmBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.confirmBet, this.bettingPanel);
        this._btnChaseBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.chaseBet, this.bettingPanel);

        // this._btnAddDataTEMP.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addTempData, this);
      }

      protected removeListeners() {
        super.removeListeners();

        this._btnDelectAll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clearAllNotes, this);
        dir.evtHandler.removeEventListener(we.core.Event.SSC_DELETE_ONE_NOTE, this.deleteOneNote, this);
        this._btnConfirmBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.confirmBet, this.bettingPanel);
        this._btnChaseBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.chaseBet, this.bettingPanel);
      }

      public updateText() {
        this._lblGameMode.renderText = () => `${i18n.t('lo_trad.ui.gamemode')}`;
        this._lblBetItem.renderText = () => `${i18n.t('lo_trad.ui.betitem')}`;
        this._lblBetMode.renderText = () => `${i18n.t('lo_trad.ui.betmode')}`;
        this._lblNoteCount.renderText = () => `${i18n.t('lo_trad.ui.notecount')}`;
        this._lblMultiplier.renderText = () => `${i18n.t('lo_trad.ui.multiplier')}`;
        this._lblTotalBet.renderText = () => `${i18n.t('lo_trad.ui.betamount')}`;
        this._lblControl.renderText = () => `${i18n.t('lo_trad.ui.action')}`;
        this._lblBalance.renderText = () => `${i18n.t('nav.bet_balance')} $${env.balance ? utils.formatNumber(env.balance, true) : ' - '}`;

        this._lbltotalBetCount.renderText = () => `${this._totalBetCount}`;
        this._lbltotalBetAmount.renderText = () => `${this._totalBetAmount}`;
      }

      protected deleteOneNote(evt: egret.Event) {
        const deletednote = evt.data;
        this.clearNotes(deletednote);
        this.updateNoteControlPanel();
        // this.computeTotalNoteAmount();
        // this.computeTotalCount();
      }

      // protected addTempData() {
      // this.addTempNotes();
      //   this.updateNoteControlPanel();
      //   // this.computeTotalNoteAmount();
      //   // this.computeTotalCount();
      // }

      public updateNoteControlPanel() {
        super.updateNoteControlPanel();
        // const itemArray = this.generateStringFromNote(this.notes);
        this._dataColl = new eui.ArrayCollection();
        this._dataColl.source = this.notes;
        this._datagroup.dataProvider = this._dataColl;
        this._datagroup.itemRenderer = lo.SSCBetNoteItem;
        this.computeTotalNoteAmount();
        this.computeTotalCount();

        this.bettingPanel.refreshCurrentBettingTable();
        this.bettingPanel.validateBetButtons();
      }

      public clearAllNotes() {
        super.clearAllNotes();
        // this.resetTotalBetCount();
        // this.resetTotalBetAmount();
        // this.computeTotalNoteAmount();
        // this.computeTotalCount();
        this.updateNoteControlPanel();

        this.bettingPanel.validateBetButtons();
      }

      // protected generateStringFromNote(notes) {
      //   if (notes.length === 0) {
      //     return;
      //   } else {
      //     const StringArray: any = [];
      //     let StringObject: any = {};
      //     notes.forEach(data => {
      //       /* {
      //       field: '^1^2OptionalFree_&1_&2@200',
      //       count: 1,
      //       multiplier: 1,
      //     }
      //       // return FieldStringObject = ["萬千", "OptionalFree", "1|2","2元"]
      //     */
      //       StringObject.count = data.count;
      //       this.addTotalBetCount(StringObject.count);
      //       StringObject.multiplier = data.multiplier;
      //       const FieldStringObject: any = this.generateStringFromField(data.field);
      //       StringObject.betmode = FieldStringObject[3];
      //       StringObject.betitem = FieldStringObject[2];
      //       StringObject.gamemode = `${FieldStringObject[0]} ${FieldStringObject[1]}`;
      //       console.log('StringObject', StringObject);
      //       this.addTotalBetAmount(StringObject.betmode, StringObject.multiplier, StringObject.count);
      //       StringArray.push(StringObject);
      //       StringObject = {};
      //     });
      //     console.log('StringArray', StringArray);
      //     return StringArray;
      //   }
      // }

      protected computeTotalNoteAmount() {
        let totalamount = 0;
        if (this.notes.length === 0) {
          this._totalBetAmount = totalamount;
          this._lbltotalBetAmount.renderText = () => `$ ${this._totalBetAmount}`;
        } else {
          const betmodearray = this.getBetModeArray(this.notes);
          this.notes.map((e, i) => {
            totalamount += e.count * e.multiplier * betmodearray[i];
          });
          this._totalBetAmount = totalamount;
          this._lbltotalBetAmount.renderText = () => `$ ${this._totalBetAmount}`;
        }
      }

      protected getBetModeArray(notes: TradNoteData[]) {
        const betmodearray = [];
        notes.forEach(data => {
          const result: any = data.field.split(/@/g);
          const betmode = parseInt(result[1], 10) / 100;
          betmodearray.push(betmode);
        });
        return betmodearray;
      }

      protected computeTotalCount() {
        let totalcount = 0;
        if (this.notes.length === 0) {
          this._totalBetCount = totalcount;
          this._lbltotalBetCount.renderText = () => `${this._totalBetCount}`;
        } else {
          this.notes.map(obj => (totalcount += obj.count));
          this._totalBetCount = totalcount;
          this._lbltotalBetCount.renderText = () => `${this._totalBetCount}`;
        }
      }

      public onExit() {
        super.onExit();
        this.removeListeners();
      }

      public setConfirmBetButton(enable: boolean) {
        super.setConfirmBetButton(enable);
        if (!this._notes) {
          return;
        }
        if (this._notes.length > 0) {
          this._btnConfirmBet.buttonEnabled = enable;
          this._btnConfirmBet.enabled = enable;
          this._btnChaseBet.buttonEnabled = enable;
          this._btnChaseBet.enabled = enable;
        } else {
          this._btnConfirmBet.buttonEnabled = false;
          this._btnConfirmBet.enabled = false;
          this._btnChaseBet.buttonEnabled = false;
          this._btnChaseBet.enabled = false;
        }
      }
      // protected addTotalBetCount(count: number) {
      //   this._totalBetCount += count;
      //   this._lbltotalBetCount.renderText = () => `total count ${this._totalBetCount}`;
      // }

      // protected addTotalBetAmount(betmode: string, multiplier: number, count: number) {
      //   this._totalBetAmount += Math.round(multiplier * parseInt(betmode, 10) * count * 100) / 100;
      //   this._lbltotalBetAmount.renderText = () => `total amount${this._totalBetAmount}`;
      // }

      // protected resetTotalBetCount() {
      //   this._totalBetCount = 0;
      //   this._lbltotalBetCount.renderText = () => `total count ${this._totalBetCount}`;
      // }

      // protected resetTotalBetAmount() {
      //   this._totalBetAmount = 0;
      //   this._lbltotalBetAmount.renderText = () => `total amount${this._totalBetAmount}`;
      // }

      // protected generateStringFromField(field: string) {
      //   // example:^1^2OptionalFree_&1_&2@200
      //   const RESULT: any = field.split(/(?=@)/g);
      //   // RESULT = ["^1^2OptionalFree_&1_&2", "@200"]
      //   RESULT[0] = RESULT[0].split(/([a-zA-Z]+)/);
      //   // RESULT = [["^1^2", "OptionalFree", "_&1_&2"],"@200"]
      //   console.log('RESULT', RESULT);
      //   // ???? egret cannot use .flat() RESULT.flat();
      //   const result = [...RESULT[0], RESULT[1]];
      //   // result = ["^1^2", "OptionalFree", "_&1_&2","@200"]
      //   const re1 = /\^/g;
      //   const re2 = /\&/g;
      //   const re3 = /\@/g;
      //   const re4 = /[a-zA-Z]/g;
      //   // want convert into result = ["萬千", "OptionalFree", "1|2","2元"]
      //   result.forEach(e => {
      //     if (e.search(re1) > -1 && e.length > 0) {
      //       const index = this.generateIndexFromField(e);
      //       // return "萬千"
      //       result[0] = index;
      //     } else if (e.search(re2) > -1 && e.length > 0) {
      //       const Data = this.generateDataFromField(e);
      //       // return "1|2"
      //       result[2] = Data;
      //     } else if (e.search(re3) > -1 && e.length > 0) {
      //       const amount = this.generateAmountFromField(e);
      //       // return "2元"
      //       result[3] = amount;
      //     } else if (e.search(re4) > -1 && e.length > 0) {
      //       const type = this.generateGameTypeFromField(e);
      //       // return "OptionalFree"
      //       result[1] = type;
      //     } else {
      //       console.log('not yet finish');
      //     }
      //   });
      //   return result;
      // }

      // protected generateIndexFromField(IndexString: string) {
      //   const IndexStringArray = IndexString.split(/(?=\^)/g);
      //   // IndexStringArray = ['^1','^2']
      //   let OutputIndexString = '';
      //   IndexStringArray.forEach(indexelement => {
      //     switch (indexelement) {
      //       case '^1':
      //         // replace i18n later
      //         OutputIndexString = OutputIndexString + '萬';
      //         break;
      //       case '^2':
      //         OutputIndexString = OutputIndexString + '千';
      //         break;
      //       case '^3':
      //         OutputIndexString = OutputIndexString + '百';
      //         break;
      //       case '^4':
      //         OutputIndexString = OutputIndexString + '十';
      //         break;
      //       case '^5':
      //         OutputIndexString = OutputIndexString + '個';
      //         break;
      //       default:
      //         console.log('We dont have this pattern');
      //         break;
      //     }
      //   });
      //   return OutputIndexString;
      // }

      // protected generateDataFromField(DataString: string) {
      //   const DataStringArray = DataString.split('_&');
      //   // DataStringArray = ['','1','2']
      //   let OutputDataSting = '';
      //   for (let i = 1; i < DataStringArray.length; i++) {
      //     OutputDataSting = OutputDataSting + ` | ${DataStringArray[i]}`;
      //   }
      //   // TODO:check string length
      //   return OutputDataSting;
      // }

      // protected generateAmountFromField(AmountString: string) {
      //   const AmountStringArray = AmountString.split('@');
      //   // AmountStringArray = ['','200']
      //   const OutputAmountSting = `${parseInt(AmountStringArray[1], 10) / 100} 元`;
      //   return OutputAmountSting;
      // }

      // protected generateGameTypeFromField(TypeString: string) {
      //   return TypeString;
      // }
    }
  }
}
