// TypeScript file
namespace we {
  export namespace overlay {
    export class SSCTraditionalMobileBetConfirmPanel extends SSCBetConfirmPanel {

      protected initSkin(){
        this.skinName = 'skin_mobile.SSCBetConfirmPanel';
      }

      protected dataMapping() {
        this._datagroup.removeChildren();

        for (let i = 0; i < this._noteData.length; i++) {
          const data = new eui.Group();
          this._datagroup.addChild(data);
          data.width = 1074;
          data.height = 140;
          data.x = 84;
          data.y = 145 * i;

          const field = this.generateStringFromField(this._noteData[i].field);

          const lblBetMode = new ui.RunTimeLabel();
          lblBetMode.renderText = () => `${i18n.t('lo_trad.bigTag.' + this._noteData[i].betmode)}| ${i18n.t('lo_trad.smallTag.' + this._noteData[i].betmethod)} - \n ${field[0]}`;
          lblBetMode.size = 48;
          data.addChild(lblBetMode);
          lblBetMode.left = 0;

          const lblWinRatio = new ui.RunTimeLabel();
          lblWinRatio.renderText = () => `${utils.formatNumber(this._noteData[i].ratio)}`;
          lblWinRatio.size = 48;
          data.addChild(lblWinRatio);
          lblWinRatio.x = 588;

          const lblBetAmount = new ui.RunTimeLabel();
          lblBetAmount.renderText = () => `$ ${utils.formatNumber(field[1], true)}`;
          lblBetAmount.size = 48;
          data.addChild(lblBetAmount);
          lblBetAmount.right = 0;
        }

        this.computeTotalAmount();
        this.computeTotalNoteAmount();
        this._lblRoundNumber.renderText = () => `${this._currentRoundNumber + '期'}`;
      }
    }
  }
}