namespace we {
  export namespace rol {
    export class RolLeftPanel extends ro.RoLeftPanel {
      protected pageRadioBtn4: eui.RadioButton;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'RolLeftPanel');
      }

      protected setRadioButtons() {
        this._radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2, this.pageRadioBtn3, this.pageRadioBtn4];
      }

      public changeLang() {
        super.changeLang();
        this.pageRadioBtn4['labelDisplayDown']['text'] = this.pageRadioBtn4['labelDisplayUp']['text'] = i18n.t('roulette.luckyNumber');
      }

      protected init() {
        super.init();
        this.pageRadioBtn4.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
      }

      public updateLuckyNumbers() {
        const page4Group = this.pageStack.getChildAt(3) as eui.Group;
        page4Group.removeChildren();

      }

      public clearLuckyNumbers() {

      }

    }
  }
}
