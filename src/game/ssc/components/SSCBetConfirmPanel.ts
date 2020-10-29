// TypeScript file
namespace we {
  export namespace overlay {
    export class SSCBetConfirmPanel extends ui.Panel {
      protected tutorial;
      protected _noteData: we.lo.TradNoteData[];
      protected _currentRoundNumber: number;

      protected _datagroup: eui.Group;

      protected _lblBetConfirm;
      protected _lblLotteryName;
      protected _lblLotteryNameText;
      protected _lblBetModeTitle;
      protected _lblWinRatioTitle;
      protected _lblSingleBetAmountTitle;

      protected _lblTotalNoteAmountTitle;
      protected _lblTotalNoteAmount;
      protected _lblNoteText;

      protected _lblTotalBetAmountTitle;
      protected _lblTotalBetAmount;

      protected _lblRoundNumber;
      protected _lblTitleRoundNumber;

      protected _lblBtnCancel;
      protected _lblConfirmBet;

      protected _btnConfirmBet;
      protected _errorMsgGrp;
      protected _btnErrorCancel;

      constructor(data: we.lo.TradNoteData[], currentRoundNumber) {
        super();
        this.initSkin();
        this._noteData = data;
        this._currentRoundNumber = currentRoundNumber;
      }

      protected initSkin() {
        this.skinName = 'skin_desktop.SSCBetConfirmPanel';
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
        utils.addButtonListener(this._btnConfirmBet, this.onConfirmPressed, this);
        dir.evtHandler.addEventListener('LO_TRAD_CHECK_CURRENT_ROUND_NUMBER', this.checkRound, this);
        this.addEventListener('close',this.onCancel,this);
      }

      protected removeEventListeners() {
        utils.removeButtonListener(this._btnConfirmBet, this.onConfirmPressed, this);
        dir.evtHandler.removeEventListener('LO_TRAD_CHECK_CURRENT_ROUND_NUMBER', this.checkRound, this);
        this.removeEventListener('close',this.onCancel,this);
      }

      protected checkRound(e) {
        const round = e.data;
        if (this._currentRoundNumber !== round) {
          this.showErrorMsg();
        }
      }

      protected showErrorMsg() {
        this._errorMsgGrp.visible = true;
        this._errorMsgGrp.touchEnabled = true;
        this._errorMsgGrp.touchThrough = false;
        this._errorMsgGrp.touchChildren = true;
        utils.addButtonListener(this._btnErrorCancel, this.onCancelPressed, this);
      }

      protected onCancelPressed(e) {
        utils.removeButtonListener(this._btnErrorCancel, this.onCancelPressed, this);
        dir.evtHandler.dispatchEventWith('onLotteryConfirmBet', false, { noteData: [], roundData: [] });
        this.destroy();
      }

      protected onCancel(e){
        dir.evtHandler.dispatchEventWith('onLotteryConfirmBet', false, { noteData: [], roundData: [] });
      }

      protected onConfirmPressed(e) {
        dir.evtHandler.dispatchEventWith('onLotteryConfirmBet', false, { noteData: this._noteData, roundData: [] });
        this.destroy();
      }

      protected dataMapping() {
        this._datagroup.removeChildren();

        for (let i = 0; i < this._noteData.length; i++) {
          const data = new eui.Group();
          this._datagroup.addChild(data);
          data.width = 725;
          data.height = 48;
          data.x = 48;
          data.y = 42 * i;

          const field = this.generateStringFromField(this._noteData[i].field);

          const lblBetMode = new ui.RunTimeLabel();
          lblBetMode.renderText = () => `${i18n.t('lo_trad.bigTag.' + this._noteData[i].betmode)}| ${i18n.t('lo_trad.smallTag.' + this._noteData[i].betmethod)} - ${field[0]}`;
          lblBetMode.size = 24;
          data.addChild(lblBetMode);
          lblBetMode.left = 0;

          const lblWinRatio = new ui.RunTimeLabel();
          lblWinRatio.renderText = () => `${utils.formatNumber(this._noteData[i].ratio)}`;
          lblWinRatio.size = 24;
          data.addChild(lblWinRatio);
          lblWinRatio.x = 400;

          const lblBetAmount = new ui.RunTimeLabel();
          lblBetAmount.renderText = () => `$ ${utils.formatNumber(field[1], true)}`;
          lblBetMode.size = 24;
          data.addChild(lblBetAmount);
          lblBetAmount.right = 0;
        }

        this.computeTotalAmount();
        this.computeTotalNoteAmount();
        this._lblRoundNumber.renderText = () => `${this._currentRoundNumber + '期'}`;
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

        // DataStringArray = ['','1','2']
        let OutputDataString: string = '';
        if (this.isNumeric(parseInt(DataStringArray[0], 10))) {
          OutputDataString += `${DataStringArray[0]}`;
        } else {
          const tempString = DataStringArray[0].split('|');
          if (tempString.length > 1) {
            OutputDataString += `${i18n.t('lo_trad.inputs.' + tempString[0].trim().toUpperCase())}`;
            for (let i = 1; i < tempString.length; i++) {
              OutputDataString += ',' + `${i18n.t('lo_trad.inputs.' + tempString[i].trim().toUpperCase())}`;
            }
          } else {
            OutputDataString += `${i18n.t('lo_trad.inputs.' + DataStringArray[0].trim().toUpperCase())}`;
          }
        }

        for (let i = 1; i < DataStringArray.length; i++) {
          if (this.isNumeric(parseInt(DataStringArray[i], 10))) {
            OutputDataString += ` | ${DataStringArray[i]}`;
          } else {
            {
              const tempString = DataStringArray[i].split('|');
              if (tempString.length > 1) {
                OutputDataString += ` | ${i18n.t('lo_trad.inputs.' + tempString[0].trim().toUpperCase())}`;
                for (let k = 1; k < tempString.length; k++) {
                  OutputDataString += ',' + `${i18n.t('lo_trad.inputs.' + tempString[k].trim().toUpperCase())}`;
                }
              } else {
                OutputDataString += ` | ${i18n.t('lo_trad.inputs.' + DataStringArray[i].trim().toUpperCase())}`;
              }
            }
          }
        }
        // TODO:check string length
        // if (OutputDataString.length <= 20) {
        OutputDataString = this.regenerateBetitemFromField(OutputDataString);
        // }
        return OutputDataString;
      }

      protected isNumeric(num) {
        return !isNaN(num);
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

      protected computeTotalAmount() {
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

      protected computeTotalNoteAmount() {
        let totalcount = 0;
        if (this._noteData.length === 0) {
        } else {
          this._noteData.map(obj => (totalcount += obj.count));
        }
        this._lblTotalNoteAmount.renderText = () => `${totalcount}`;
      }

      public updateText() {
        // need to update i18n later
        //lo_trad.chase.confirm_panel.
        this._lblBetConfirm.renderText = () => `${i18n.t('lo_trad.confirm_panel.betconfirm')}`;
        this._lblLotteryName.renderText = () => `${i18n.t('lo_trad.confirm_panel.lotterynametitle')}`;
        this._lblLotteryNameText.renderText = () => `${i18n.t('lo_trad.confirm_panel.lotterynametitle_lo')}`;
        this._lblBetModeTitle.renderText = () => `${i18n.t('lo_trad.confirm_panel.betmodetitle')}`;
        this._lblWinRatioTitle.renderText = () => `${i18n.t('lo_trad.confirm_panel.winratiotitle')}`;
        this._lblSingleBetAmountTitle.renderText = () => `${i18n.t('lo_trad.confirm_panel.singlebetAmountTitle')}`;

        this._lblTotalNoteAmountTitle.renderText = () => `${i18n.t('lo_trad.confirm_panel.totalnotetitle')}`;
        // this._lblTotalNoteAmount;
        this._lblNoteText.renderText = () => `${i18n.t('lo_trad.confirm_panel.notetext')}`;

        this._lblTotalBetAmountTitle.renderText = () => `${i18n.t('lo_trad.confirm_panel.totalbetamountitle')}`;
        // this._lblTotalBetAmount;
        this._lblTitleRoundNumber.renderText = () =>`${i18n.t('lo_trad.confirm_panel.roundnumbertitle')}`;
        this._lblBtnCancel.renderText = () => `${i18n.t('nav.menu.cancel')}`;
        this._lblConfirmBet.renderText = () => `${i18n.t('lo_trad.ui.confirmbet')}`;
      }

      protected destroy() {
        this.removeEventListeners();

        super.destroy();
        this.foreclosed();
      }
    }
  }
}
