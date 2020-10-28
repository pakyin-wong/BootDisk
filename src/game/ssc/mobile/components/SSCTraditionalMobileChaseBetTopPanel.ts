// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalMobileChaseBetTopPanel extends SSCChaseBetTopPanel {

    //   protected _btnFiveRound: ui.RoundRectButton;
    //   protected _btnTenRound: ui.RoundRectButton;
    //   protected _btnFifthteenRound: ui.RoundRectButton;
    //   protected _btnTwentyRound: ui.RoundRectButton;
    //   protected _btnAddMultiplier;
    //   protected _btnMinusMultiplier;

    //   protected _lblMultiplier;
    //   protected _lbTitleMultiplier;
    //   protected _lblMultiplierMinus;
    //   protected _lblMultiplierAdd;
    protected _lblIsStopChaseIfWon;
    protected _btnIsStopChaseIfWon : eui.Image;
    protected isStopChaseIfWon = false;

    //SAMEMULTIPLE & DOUBLE
    protected _lblRound;
    protected _btnMinusRound;
    protected _btnAddRound;
    
//   protected _multiplier = 1;
//   protected _round = 1;
    //DOUBLE
    protected _lblRoundSeperate;
    protected _btnAddRoundSeperate;
    protected _btnMinusRoundSeperate;

    protected _lblSeparateMultiplier;
    protected _btnAddSeparateMultiplier;
    protected _btnMinusSeparateMultiplier;

    //   protected _separateRound = 2;
    //   protected _minMultiplier = 1;
    //   protected _chaseRound = 20;
    //   protected _separateMultiplier = 2;

      constructor(panel, chaseType: number) {
        super(panel, chaseType);
      }  

      protected initSkin() {
        switch (this._currentChaseType) {
          case SSCChaseType.SAMEMULTIPLE:
            this.skinName = 'skin_mobile.SSCTradtiionalSameMultipleChaseBetPanel';
            break;
          case SSCChaseType.DOUBLE:
            this.skinName = 'skin_mobile.SSCTradtiionalDoubleMultipleChaseBetPanel';
            break;
        }
      }

      protected init() {
        this.isStopChaseIfWon = false;
        switch (this._currentChaseType) {
          case SSCChaseType.SAMEMULTIPLE:
            this._lblMultiplier.text = this._multiplier;
            this._lblRound = this._round;
            break;
          case SSCChaseType.DOUBLE:
            this._lblRoundSeperate = this._separateRound;
            this._lblMultiplier.text = this._minMultiplier;
            this._lblRound = this._round;
            this._lblSeparateMultiplier.text = this._separateMultiplier;
            break;
        }
      }

      protected addListeners() {
        utils.addButtonListener(this._btnFiveRound, this.onButtonClicked, this);
        utils.addButtonListener(this._btnTenRound, this.onButtonClicked, this);
        utils.addButtonListener(this._btnFifthteenRound, this.onButtonClicked, this);
        utils.addButtonListener(this._btnTwentyRound, this.onButtonClicked, this);
        utils.addButtonListener(this._btnAddRound, this.onRoundUpdate, this);
        utils.addButtonListener(this._btnMinusRound, this.onRoundUpdate, this);
        utils.addButtonListener(this._btnIsStopChaseIfWon,this.updateIsStopChaseIfWon,this);
        switch (this._currentChaseType) {
          case SSCChaseType.SAMEMULTIPLE:
            utils.addButtonListener(this._btnAddMultiplier, this.onMultiplierUpdate, this);
            utils.addButtonListener(this._btnMinusMultiplier, this.onMultiplierUpdate, this);
            break;
          case SSCChaseType.DOUBLE:
            utils.addButtonListener(this._btnAddMultiplier, this.minMultiplierUpdate, this);
            utils.addButtonListener(this._btnMinusMultiplier, this.minMultiplierUpdate, this);
            utils.addButtonListener(this._btnAddRoundSeperate, this.roundSeperateUpdate, this);
            utils.addButtonListener(this._btnMinusRoundSeperate, this.roundSeperateUpdate, this);
            utils.addButtonListener(this._btnAddSeparateMultiplier, this.multiplierSeperateUpdate, this);
            utils.addButtonListener(this._btnMinusSeparateMultiplier, this.multiplierSeperateUpdate, this);
            break;
        }
      }

      protected onButtonClicked(e) {
        this._btnFiveRound.active = false;
        this._btnTenRound.active = false;
        this._btnFifthteenRound.active = false;
        this._btnTwentyRound.active = false;

        switch (e.target) {
            case this._btnFiveRound:
            this._btnFiveRound.active = true;
            this._round = 5;
            break;
            case this._btnTenRound:
            this._btnTenRound.active = true;
            this._round = 10;
            break;
            case this._btnFifthteenRound:
            this._btnFifthteenRound.active = true;
            this._round = 15;
            break;
            case this._btnTwentyRound:
            this._btnTwentyRound.active = true;
            this._round = 20;
            break;
        }
        this._lblRound.text = this._round;
        this._chaseBetPanel.updateRound(this._round);
      }

      protected onRoundUpdate(e){
        if ((this._round === 1 && e.target === this._btnMinusRound) || (this._round === 20 && e.target === this._btnAddRound)) {
            return;
        }
        if (e.target === this._btnAddRound) {
            this._round++;
        }

        if (e.target === this._btnMinusRound) {
            this._round--;
        }

        this._lblRound.text = this._round;
        this._chaseBetPanel.updateRound(this._round);
      }

      protected updateIsStopChaseIfWon(e){
        this.isStopChaseIfWon = !this.isStopChaseIfWon;
        this._btnIsStopChaseIfWon.source = this.isStopChaseIfWon ? "m_common_panel_setting_btn_switch_disabled_png" :"m_common_panel_setting_btn_switch_active_png";
        
        this._chaseBetPanel.updateIsStopChaseIfWon(this.isStopChaseIfWon);
      }

      //DOUBLE related
      protected minMultiplierUpdate(e){
        if ((this._minMultiplier === 1 && e.target === this._btnMinusMultiplier) || (this._minMultiplier === 99 && e.target === this._btnAddMultiplier)) {
            return;
        }
        if (e.target === this._btnAddMultiplier) {
            this._minMultiplier++;
        }

        if (e.target === this._btnMinusMultiplier) {
            this._minMultiplier--;
        }

        this._lblMultiplier.text = this._minMultiplier;
        this._chaseBetPanel._minMultiplier = this._minMultiplier;
      }

      protected roundSeperateUpdate(e){
        if ((this._separateRound === 1 && e.target === this._btnMinusRoundSeperate) || (this._separateRound === 99 && e.target === this._btnAddRoundSeperate)) {
            return;
        }
        if (e.target === this._btnAddRoundSeperate) {
            this._separateRound++;
        }

        if (e.target === this._btnMinusMultiplier) {
            this._separateRound--;
        }

        this._lblRoundSeperate.text = this._separateRound;
        this._chaseBetPanel._separteRound = this._separateRound;
        this.updateDouble();
      }

      protected multiplierSeperateUpdate(e){
        if ((this._separateMultiplier === 1 && e.target === this._btnMinusSeparateMultiplier) || (this._separateMultiplier === 99 && e.target === this._btnAddSeparateMultiplier)) {
            return;
        }
        if (e.target === this._btnAddSeparateMultiplier) {
            this._separateMultiplier++;
        }

        if (e.target === this._btnMinusSeparateMultiplier) {
            this._separateMultiplier--;
        }

        this._lblRoundSeperate.text = this._separateMultiplier;
        this._chaseBetPanel._separateMultiplier = this._separateMultiplier;

      }

      protected updateDouble() {
        this._chaseBetPanel.updateDouble(this._separateMultiplier);
      }
    }
  }
}