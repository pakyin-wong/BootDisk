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

      protected confirmBtn: ui.RoundRectButton;

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
      }

      protected init_menu() {
        this.liveVer_title.renderText = () => `${i18n.t('live_verification_title')}`;
        this.liveVer_text.renderText = () => `${i18n.t('live_verification_text')}`;

        this.success_text.renderText = () => `${i18n.t('live_verification_success_text')}`;
        this.confirmBtn.label.renderText = () => `${i18n.t('live_verification_send')}`;

        this.createArray();
        this.addListeners();
        this.resetAll();
        this.checkBoxHighlight();
      }

      protected destroy() {
        super.destroy();
        this.resetAll();
        this.removeListeners();
      }

      protected checkBoxHighlight() {
        for (let i: number = 0; i < this.colArray.length; i++) {
          if (i === this.inputIndex) {
            this.colArray[i].strokeColor = 0xffffff;
          } else {
            this.colArray[i].strokeColor = 0x444444;
          }
        }
      }

      protected resetAll() {
        this.inputIndex = 0;
        for (let i: number = 0; i < this.inputArray.length; i++) {
          this.inputArray[i].source = '';
        }
        this.checkBoxHighlight();
        this.alert_group.visible = false;
      }

      protected createArray() {
        this.colArray = [this.firstCol, this.secCol, this.thirdCol, this.fortCol];
        this.inputArray = [this.firstImg, this.secImg, this.thirdImg, this.fortImg];
        this.imageArray = [this.e1, this.e2, this.e3, this.e4, this.e5, this.e6, this.e7, this.e8, this.e9, this.e10, this.e11, this.e12];
      }

      protected onImageHover(e: eui.UIEvent) {
        const obj = e.target as egret.DisplayObject;
        const rect = new ui.RoundRectShape();
        rect.width = rect.height = 80;
        rect.fillColor = '0x164a7f';
        rect.stroke = 0;
        rect.cornerTL_TR_BL_BR = '40,40,40,40';
        rect.name = 'hover';
        rect.x = obj.x - ((80 - obj.width) / 2);
        rect.y = obj.y - ((80 - obj.height) / 2);
        obj.parent.addChildAt(rect, obj.parent.getChildIndex(obj));
      }

      protected onImageOut(e: eui.UIEvent) {
        const obj = e.target as egret.DisplayObject;
        obj.parent.removeChild(obj.parent.getChildByName('hover'));
      }

      protected onImageClick(e: eui.UIEvent) {
        console.log('THE PATTERN = ' + this.pattern);
        if (this.inputIndex > 3) {
          return;
        }
        // const arr: string[] = [];
        const click: eui.Image = e.target;
        this.pattern.push(click.name);
        this.inputArray[this.inputIndex].source = click.source;
        this.inputIndex += 1;
        this.checkBoxHighlight();

        console.log('THE PATTERN = ' + this.pattern);
      }

      protected sendVerification() {
        if (this.inputIndex < 3) {
          return;
        }
        // TODO: use current tableinfo instead of new
        const gameScene = dir.sceneCtr.currScene as core.BaseGameScene;
        if (gameScene) {
          const id = gameScene.tableInfo.tableid;
          dir.socket.sendVerifyInfo(id, this.pattern, this.verificationCallback, this);
        }
      }

      protected verificationCallback(data) {
        if (data.error) {
          // TODO:  handle error on cancel
        } else {
          this.alert_group.visible = true;
          setTimeout(() => {
            if (this.alert_group) {
              this.alert_group.visible = false;
            }
          }, 2500);
        }
      }

      protected addListeners() {
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendVerification, this);

        for (let i: number = 0; i < this.imageArray.length; i++) {
          this.imageArray[i].addEventListener(mouse.MouseEvent.ROLL_OVER, this.onImageHover, this);
          this.imageArray[i].addEventListener(mouse.MouseEvent.ROLL_OUT, this.onImageOut, this);
          this.imageArray[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImageClick, this);
        }
      }

      protected removeListeners() {
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendVerification, this);

        for (let i: number = 0; i < this.imageArray.length; i++) {
          this.imageArray[i].removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onImageHover, this);
          this.imageArray[i].removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onImageOut, this);
          this.imageArray[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onImageClick, this);
        }
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.init_menu();
      }
    }
  }
}
