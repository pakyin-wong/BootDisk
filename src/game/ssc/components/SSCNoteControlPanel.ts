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

      protected _scroller: eui.Scroller;
      protected _datagroup: eui.DataGroup;
      protected _dataColl: eui.ArrayCollection;

      private _balance: number = 1;

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
        this.init();
      }

      protected init() {
        // runtimelabel rendertext
        this._lblGameMode.renderText = () => `玩法`;
        this._lblBetItem.renderText = () => `投注項目`;
        this._lblBetMode.renderText = () => `模式`;
        this._lblNoteCount.renderText = () => `注數`;
        this._lblMultiplier.renderText = () => `倍數`;
        this._lblTotalBet.renderText = () => `金額`;
        this._lblControl.renderText = () => `操作`;
        this._lblBalance.renderText = () => `餘額 $${this._balance}`;

        this.addListeners();
        const tempNotes = [
          {
            field: '^1^2OptionalFree_&1_&2@200',
            count: 1,
            multiplier: 1,
          },
          {
            field: '^1^3OptionalFree_&1_&12@200',
            count: 2,
            multiplier: 1,
          },
          {
            field: '^2^3OptionalFree_&2_&12@200',
            count: 2,
            multiplier: 1,
          },
        ];

        this.notes = tempNotes;

        this._dataColl = new eui.ArrayCollection();
        this._datagroup.dataProvider = this._dataColl;
        this._datagroup.itemRenderer = lo.SSCBetNoteItem;
      }

      protected addListeners() {}

      protected removeListeners() {}

      protected update() {}
    }
  }
}
