// TypeScript file
namespace we {
  export namespace overlay {
    export class SSCBetConfirmPanel extends ui.Panel {
      private tutorial;
      private _noteData: we.lo.TradNoteData[];

      private _datagroup: eui.Group;

      private _lblBetConfirm;
      private _lblLotteryName;
      private _lblLotteryNameText;
      private _lblBetModeTitle;
      private _lblWinRatioTitle;
      private _lblSingleBetAmountTitle;

      private _lblTotalNoteAmountTitle;
      private _lblTotalNoteAmount;
      private _lblNoteText;

      private _lblTotalBetAmountTitle;
      private _lblTotalBetAmount;

      private _lblBtnCancel;
      private _lblConfirmBet;

      private _btnConfirmBet;

      constructor(data: we.lo.TradNoteData[]) {
        super('SSCBetConfirmPanel');
        this._noteData = data;
      }

      public mount() {
        super.mount();
        this.init();
      }

      public init() {
        this.updateText();
        this.dataMapping();
        this.addEventListeners();
        // this.tutorial = new we.bam.SqueezeTutorial('SqueezeTutorial');
        // this.tutorial.x = 0;
        // this.tutorial.y = 0;
        // this.close = this.tutorial._close;
        // // this.tutorial.isDraggable = true;
        // this.addChild(this.tutorial);
        // env.isFirstTimeBam = true;
      }

      protected addEventListeners() {
        this._btnConfirmBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this);
      }

      protected removeEventListeners() {
        this._btnConfirmBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this);
      }

      private onConfirmPressed(e) {
        this.dispatchEventWith('onLotteryConfirmBet', false, this._noteData);
      }

      protected dataMapping() {
        this._datagroup.removeChildren();

        for (let i = 0; i < this._noteData.length; i++) {
          const data = new eui.Group();
          this._datagroup.addChild(data);
          data.width = 725;
          data.height = 42;
          data.x = 48;
          data.y = 42 * i;

          const field = this.generateStringFromField(this._noteData[i].field);

          const lblBetMode = new ui.RunTimeLabel();
          lblBetMode.renderText = () => `${i18n.t('lo_trad.bigTag.' + this._noteData[i].betmode)}|${i18n.t('lo_trad.smallTag.' + this._noteData[i].betmethod)} - ${field[0]}`;
          lblBetMode.size = 24;
          data.addChild(lblBetMode);
          lblBetMode.left = 0;

          const lblWinRatio = new ui.RunTimeLabel();

          const lblBetAmount = new ui.RunTimeLabel();
          lblBetAmount.renderText = () => `$ ${utils.formatNumber(field[1], true)}`;
          lblBetMode.size = 24;
          data.addChild(lblBetAmount);
          lblBetAmount.right = 0;
        }

        this.computeTotalCount();
        this.computeTotalNoteAmount();
      }

      protected generateStringFromField(field: string): string[] {
        let result: any = field.split(/@/g);

        result[0] = result[0].split('_');

        if (result[0].length > 2) {
          for (let i = 2; i < result[0].length; i++) {
            result[0][1] = [...result[0][1], '_' + result[0][i]];
          }
        }

        const resultCodeAndNumbers = [result[0][0], result[0][1]];
        result[0] = resultCodeAndNumbers;

        result = [...result[0], result[1]];
        return [this.generateBetitemFromField(result[1]), field.split('@')[1]]; // 1|2
      }

      protected generateBetitemFromField(DataString: string) {
        const DataStringArray = DataString.split('_');
        let OutputDataString: string = '';
        OutputDataString += `${DataStringArray[0]}`;
        for (let i = 1; i < DataStringArray.length; i++) {
          OutputDataString = OutputDataString + ` | ${DataStringArray[i]}`;
        }

        OutputDataString = this.regenerateBetitemFromField(OutputDataString);

        return OutputDataString;
      }

      protected regenerateBetitemFromField(DataString: string) {
        let newdatastring = '';
        const spliteddatastring = DataString.split('');
        if (spliteddatastring.length < 16) {
          newdatastring = DataString;
        } else {
          for (let i = 0; i < 16; i++) {
            newdatastring += spliteddatastring[i];
          }
          newdatastring += '...';
        }
        return newdatastring;
      }

      protected getBetModeArray(notes: we.lo.TradNoteData[]) {
        const betmodearray = [];
        notes.forEach(data => {
          const result: any = data.field.split(/@/g);
          const betmode = parseInt(result[1], 10);
          betmodearray.push(betmode);
        });
        return betmodearray;
      }

      protected computeTotalNoteAmount() {
        let totalamount = 0;
        if (this._noteData.length === 0) {
        } else {
          const betmodearray = this.getBetModeArray(this._noteData);
          // console.log('betmodearray', betmodearray);
          this._noteData.map((e, i) => {
            totalamount += e.count * e.multiplier * betmodearray[i];
            // console.log('betmodearray[i];', betmodearray[i]);
          });
          this._lblTotalBetAmount.renderText = () => `$ ${utils.formatNumber(totalamount)}`;
        }
      }

      protected computeTotalCount() {
        let totalcount = 0;
        if (this._noteData.length === 0) {
        } else {
          this._noteData.map(obj => (totalcount += obj.count));
        }
        this._lblTotalNoteAmount.renderText = () => `${totalcount}`;
      }

      public updateText() {
        // need to update i18n later
        this._lblBetConfirm.renderText = () => `${'投注確認'}`;
        this._lblLotteryName.renderText = () => `${'彩種名稱'}`;
        this._lblLotteryNameText.renderText = () => `${'WG 時時彩'}`;
        this._lblBetModeTitle.renderText = () => `${'玩法投注'}`;
        this._lblWinRatioTitle.renderText = () => `${'賠率'}`;
        this._lblSingleBetAmountTitle.renderText = () => `${'單注金額'}`;

        this._lblTotalNoteAmountTitle.renderText = () => `${'總注數'}`;
        // this._lblTotalNoteAmount;
        this._lblNoteText.renderText = () => `${'注'}`;

        this._lblTotalBetAmountTitle.renderText = () => `${'總投注額'}`;
        // this._lblTotalBetAmount;

        this._lblBtnCancel.renderText = () => `${'取消'}`;
        this._lblConfirmBet.renderText = () => `${'確認購買'}`;
      }

      protected destroy() {
        this.removeEventListeners();

        super.destroy();
      }
    }
  }
}
