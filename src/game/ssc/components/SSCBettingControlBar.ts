// TypeScript file
namespace we {
  export namespace lo {
    export class SSCBettingControlBar extends ABettingControlBar {
      protected _btnConfirm;
      protected _btnAddMultiplier;
      protected _btnMinusMultiplier;
      protected _lblMultiplier;
      protected _lblTitleMultiplier;
      protected _lblMultiplierMinus;
      protected _lblMultiplierAdd;

      protected _btnNoteDropDown;
      protected _lblNoteDropDown;
      protected _noteDropDown;

      protected _btnBetDescription; // need tooltips????
      protected _lblBetDescription;

      protected _lblTitleNoteChosen;
      protected _lblNoteChosen;
      protected _lblTitleTotalBet;
      protected _lblTotalBet;

      protected _lblAdd;
      protected _lblInstantBet;
      protected _lblBetDes;
      protected _betDesGrp;

      protected _lblNote;
      protected _lblTitleTotalBetChosen;
      protected _lblTotalBetDollar;
      // constructor(skin, orientationDependent) {
      //   super(skin, orientationDependent);
      constructor() {
        super();
        this.initSkin();
      }

      protected initSkin() {
        if (env.isMobile) {
          this.skinName = 'skin_mobile.lo.SSCBettingControlBar';
        } else {
          this.skinName = 'skin_desktop.lo.SSCBettingControlBar';
        }
      }

      protected childrenCreated() {
        super.childrenCreated();
        // this.init();
      }

      public init() {
        super.init();
        // runtimelabel rendertext
        this.addListeners();
        if (this._noteDropDown) {
          this.initNoteDropDown();
        }
        this.validateBet();
        this.updateText();
        // console.log('this.bettingPanel.addNotes0', this.bettingPanel.addNotes);
      }

      protected addListeners() {
        super.addListeners();
        // if (this._btnAddBetFields) {
        //   // this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bettingPanel.showConfirm,this);
        //   this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.confirmBet, this);
        // }
        if (this._btnInstantBet) {
          utils.addButtonListener(this._btnInstantBet, this.placeBet, this);
        }

        if (this._btnAddBetFields) {
          utils.addButtonListener(this._btnAddBetFields, this.bettingPanel.addNotes, this.bettingPanel);
          // this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addBetfield, this);
        }
        if (this._btnAddMultiplier) {
          utils.addButtonListener(this._btnAddMultiplier, this.addMultiplier, this);
        }
        if (this._btnMinusMultiplier) {
          utils.addButtonListener(this._btnMinusMultiplier, this.minusMultiplier, this);
        }
        if (this._noteDropDown) {
          this._noteDropDown.addEventListener('DROPDOWN_ITEM_CHANGE', this.onUnitSelect, this);
        }

        if (this._btnBetDescription) {
          if(env.isMobile){

          }else
          {
            this._btnBetDescription.addEventListener(mouse.MouseEvent.ROLL_OVER, this.showBetDescription, this);
          }
        }
      }

      public updateHighestWin(config: any) {
        // using local config, need to receive server award & winratio later
        const maxWin = config.maxWin;
        this._lblHighestWin.renderText = () => `${i18n.t('lo_trad.highest_win')}${utils.formatNumber(maxWin * 100)}`;
      }

      protected removeListeners() {
        super.removeListeners();
        // if (this._btnAddBetFields) {
        //   // this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bettingPanel.showConfirm,this);
        //   this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.confirmBet, this);
        // }
        if (this._btnInstantBet) {
          utils.removeButtonListener(this._btnInstantBet, this.placeBet, this);

          // this._btnInstantBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.placeBet, this);
        }

        if (this._btnAddBetFields) {
          utils.removeButtonListener(this._btnAddBetFields, this.bettingPanel.addNotes, this.bettingPanel);
          // this._btnAddBetFields.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.addNotes, this.bettingPanel);
          // this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addBetfield, this);
        }
        if (this._btnAddMultiplier) {
          utils.removeButtonListener(this._btnAddMultiplier, this.addMultiplier, this);
        }
        if (this._btnMinusMultiplier) {
          utils.removeButtonListener(this._btnMinusMultiplier, this.minusMultiplier, this);
          // this._btnMinusMultiplier.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.minusMultiplier, this);
        }
        if (this._noteDropDown) {
          this._noteDropDown.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onUnitSelect, this);
        }
        if (this._btnBetDescription) {
          if(env.isMobile){

          }else{
            this._btnBetDescription.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.showBetDescription, this);
          }
        }
      }

      // protected addBetfield() {
      //   this.bettingPanel._noteControl.addTempNotes(this.bettingPanel._currentBettingTable.betFields);
      // }

      protected initNoteDropDown() {
        const _arrCol_note = new eui.ArrayCollection([
          ui.NewDropdownItem(200, () => `2元`),
          ui.NewDropdownItem(20, () => `2角`),
          ui.NewDropdownItem(2, () => `2分`),
          ui.NewDropdownItem(100, () => `1元`),
          ui.NewDropdownItem(10, () => `1角`),
          ui.NewDropdownItem(1, () => `1分`),
        ]);
        this._noteDropDown.isDropdown = true;
        this._noteDropDown.isPoppable = true;
        this._noteDropDown.dismissOnClickOutside = true;
        this._noteDropDown.setToggler(this._btnNoteDropDown);
        this._noteDropDown.dropdown.review = this._lblNoteDropDown;
        this._noteDropDown.dropdown.data.replaceAll(_arrCol_note.source);
        this._noteDropDown.dropdown.select(this._unitBet);
      }

      protected showBetDescription(e) {
        const config = this.bettingPanel.currentMap[Object.keys(this.bettingPanel.currentMap)[this.bettingPanel.currentBigTagIndex]];

        const bigTag = config.name;
        const smallTag = config['type'][Object.keys(config['type'])[this.bettingPanel.currentSmallTagIndex]].name;

        this._lblBetDes.renderText = () => `${i18n.t('lo_trad.bigTag.' + bigTag)} | ${i18n.t('lo_trad.smallTag.' + smallTag)}\n${i18n.t('lo_trad.betDescription.' + bigTag + '.' + smallTag)}`;
        this._betDesGrp.visible = true;
        this._btnBetDescription.once(mouse.MouseEvent.ROLL_OUT, this.hideBetDescription, this);
      }

      protected hideBetDescription(e) {
        this._betDesGrp.visible = false;
      }

      protected onUnitSelect(e) {
        this.onUnitBetUpdate(e.data);
        this.updateTotalBetAmount();
      }

      protected updateTotalBetAmount() {
        super.updateTotalBetAmount();
        if (this._lblHighestWin) {
        }

        if (this._lblNoteChosen) {
          this._lblNoteChosen.text = this._noteCount;
        }

        if (this._lblTotalBet) {
          this._lblTotalBet.text = `${utils.formatNumber(this._totalBetAmount)}`;
        }
      }

      protected addMultiplier() {
        this.onMultiplierUpdate(this._multiplier + 1);
        this._lblMultiplier.text = this._multiplier;
        this.updateTotalBetAmount();
      }

      protected minusMultiplier() {
        if (this._multiplier <= 1) {
          return;
        }
        this.onMultiplierUpdate(this._multiplier - 1);
        this._lblMultiplier.text = this._multiplier;
        this.updateTotalBetAmount();
      }

      protected validateBet() {
        // TODO: disable button if noteCount == 0
        if (this._noteCount <= 0) {
          this.bettingPanel.isBetCodeValidate = false;
        } else {
          this.bettingPanel.isBetCodeValidate = true;
        }
        this.bettingPanel.validateBetButtons();
      }

      public onExit() {
        super.onExit();
        this.removeListeners();
      }

      protected updateText(){
        this._lblTitleMultiplier.renderText = () =>`${i18n.t('lo_trad.ui.multiplier')}`;
        this._lblBetDescription.renderText = () => env.isMobile ? '?': `${i18n.t('lo_trad.bettingcontrol.betdescription')}`;
        this._lblNote.renderText = () =>`${i18n.t('lo_trad.confirm_panel.notetext')}`;
        this._lblTitleTotalBetChosen.renderText = () =>`${i18n.t('lo_trad.bettingcontrol.totalbetchosen')}`;
        this._lblTitleNoteChosen.renderText = () =>`${i18n.t('lo_trad.bettingcontrol.totalnotechosen')}`;
        this._lblTotalBetDollar.renderText = () =>`${i18n.t('lo_trad.ui.coin')}`;
        this._lblAdd.renderText = () =>`${i18n.t('lo_trad.bettingcontrol.addbetfields')}`;
        this._lblInstantBet.renderText = () =>`${i18n.t('lo_trad.bettingcontrol.instantbet')}`;
      }
    }
  }
}
