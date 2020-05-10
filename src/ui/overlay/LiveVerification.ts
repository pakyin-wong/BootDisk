namespace we {
  export namespace overlay {
    export class LiveVerification extends ui.Panel {
      protected liveVer_title: ui.RunTimeLabel;
      protected liveVer_text: ui.RunTimeLabel;

      protected firstCol: eui.Rect;
      protected secCol: eui.Rect;
      protected thirdCol: eui.Rect;
      protected fortCol: eui.Rect;

      protected firstImg: eui.Image;
      protected secImg: eui.Image;
      protected thirdImg: eui.Image;
      protected fortImg: eui.Image;

      protected e1: eui.Image;
      protected e2: eui.Image;
      protected e3: eui.Image;
      protected e4: eui.Image;
      protected e5: eui.Image;
      protected e6: eui.Image;
      protected e7: eui.Image;
      protected e8: eui.Image;
      protected e9: eui.Image;
      protected e10: eui.Image;
      protected e11: eui.Image;
      protected e12: eui.Image;

      protected sendLabel: ui.RunTimeLabel;

      protected alert_group: eui.Group;
      protected success_text: ui.RunTimeLabel;

      protected inputIndex: number = 0;
      protected pattern: string[] = [];
      protected colArray: eui.Rect[] = [];
      protected inputArray: eui.Image[] = [];
      protected imageArray: eui.Image[] = [];

      constructor() {
        super('LiveVerification');
      }

      protected mount() {
        super.mount();
        this.addListeners();
        this.updateText();
        this.createArray();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      public updateText() {
        this.liveVer_title.text = i18n.t('live_verification_title');
        this.liveVer_text.text = i18n.t('live_verification_text');

        this.sendLabel.text = i18n.t('live_verification_send');
        this.success_text.text = i18n.t('live_verification_success_text');
      }

      protected boxHighlight(){
        for(var i = 0; i < this.colArray.length; i++){
          if(i == this.inputIndex)
            this.colArray[i].strokeColor = 0xFFFFFF;
          else
            this.colArray[i].strokeColor = 0x444444;
        }
      }

      protected createArray(){
        this.colArray = [this.firstCol, this.secCol, this.thirdCol, this.fortCol];
        this.inputArray = [this.firstImg, this.secImg, this.thirdImg, this.fortImg];
        this.imageArray = [this.e1, this.e2, this.e3, this.e4, this.e5, this.e6, this.e7, this.e8, this.e9, this.e10, this.e11, this.e12];
        for(var i = 0; i < this.imageArray.length; i++){
          this.imageArray[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImageClick, this);
        }
      }

      protected onImageClick(e: eui.UIEvent) {
        var arr: string[] = [];
        const click: eui.Image = e.target;
        this.pattern.push(click.name);
        this.inputIndex += 1;
      }

      protected addListeners() {
        // utils.addButtonListener(this._btn_showHint, this.onSwitchShowHint, this);
        // this._btn_sendLiveVer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendLiveVerCall, this);
      }

      protected removeListeners() {
        // this._btn_showHint.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSwitchShowHint, this);
        // this._btn_sendLiveVer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendLiveVerCall, this);
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
      }
    }
  }
}
