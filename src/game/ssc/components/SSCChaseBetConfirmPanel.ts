// TypeScript file
namespace we {
  export namespace overlay {
    export class SSCChaseBetConfirmPanel extends SSCBetConfirmPanel {
      //   protected _noteData: we.lo.TradNoteData[];
      //   protected _currentRoundNumber: number;
      protected _roundData: any[];
      protected _roundCount: number;

      protected _lblChaseRoundTitle: ui.RunTimeLabel;
      protected _lblChaseRoundCount: ui.RunTimeLabel;

      protected _betPanel;
      //   protected _datagroup: eui.Group;

      //   protected _lblBetConfirm;
      //   protected _lblLotteryName;
      //   protected _lblLotteryNameText;
      //   protected _lblBetModeTitle;
      //   protected _lblWinRatioTitle;
      //   protected _lblSingleBetAmountTitle;

      //   protected _lblTotalNoteAmountTitle;
      //   protected _lblTotalNoteAmount;
      //   protected _lblNoteText;

      //   protected _lblTotalBetAmountTitle;
      //   protected _lblTotalBetAmount;

      //   protected _lblBtnCancel;
      //   protected _lblConfirmBet;

      //   protected _btnConfirmBet;

      constructor(data: we.lo.TradNoteData[], currentRoundNumber, roundData, betPanel) {
        super(data, currentRoundNumber);
        // super(data,currentRoundNumber);
        this.skinName = 'skin_desktop.SSCChaseBetConfirmPanel';
        this._roundCount = roundData.length;
        this._roundData = roundData;
        this._betPanel = betPanel;
      }

      public mount() {
        super.mount();
        this.init();
      }

      public init() {
        this.updateText();
        this.dataMapping();
        this.addEventListeners();
      }

      protected addEventListeners() {
        super.addEventListeners();
      }

      protected removeEventListeners() {
        super.removeEventListeners();
      }

      protected onConfirmPressed(e) {
        dir.evtHandler.dispatchEventWith('onLotteryConfirmBet', false, { noteData: this._noteData, roundData: this._roundData });
        this._betPanel.destroy();
        this.destroy();
      }

      protected dataMapping() {
        super.dataMapping();
        this._lblChaseRoundCount.renderText = () => `${this._roundCount}`;
      }

      protected computeTotalAmount() {
        let totalamount = 0;
        let totalChaseAmount = 0;
        if (this._noteData.length === 0) {
        } else {
          const betmodearray = this.getBetModeArray(this._noteData);
          // console.log('betmodearray', betmodearray);
          this._noteData.map((e, i) => {
            totalamount += e.count * e.multiplier * betmodearray[i];
            // console.log('betmodearray[i];', betmodearray[i]);
          });

          this._roundData.map((e, i) => {
            totalChaseAmount += totalamount * e.multiplier;
          });

          this._lblTotalBetAmount.renderText = () => `$ ${utils.formatNumber(totalChaseAmount)}`;
        }
      }

      protected computeTotalNoteAmount() {
        let totalcount = 0;
        if (this._noteData.length === 0) {
        } else {
          this._noteData.map(obj => (totalcount += obj.count));
        }
        this._lblTotalNoteAmount.renderText = () => `${totalcount * this._roundCount}`;
      }

      public updateText() {
        super.updateText();
        this._lblChaseRoundTitle.renderText = () => `${'追號期數'}`;
      }

      protected destroy() {
        super.destroy();
      }
    }
  }
}
