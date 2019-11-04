namespace components {
  export class SwitchLang extends eui.Component {
    private btnEn: eui.Button;
    private btnTc: eui.Button;
    private btnSc: eui.Button;
    constructor() {
      super();
    }
    protected createChildren() {
      super.createChildren();
      this.skinName = utils.getSkin('SwitchLang');
    }
    protected childrenCreated() {
      super.childrenCreated();
      this.btnEn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEnClick, this);
      this.btnTc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTcClick, this);
      this.btnSc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnScClick, this);
    }
    protected onBtnEnClick() {
      i18n.setLang('en');
    }
    protected onBtnTcClick() {
      i18n.setLang('tc');
    }
    protected onBtnScClick() {
      i18n.setLang('sc');
    }
  }
}
