// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTextAreaInput extends AInputComponent {
      protected _textAreaGroup: eui.Group;

      protected _textArea: egret.TextField;
      protected _instruction: ui.RunTimeLabel;

      protected _btnUpload;
      constructor(index: number, config: any) {
        super(index, config);
        this.skinName = 'skin_desktop.lo.SSCTextAreaInput';
      }

      protected initComponents() {
        this._btnUpload.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpload, this);
        // this._textArea = new egret.TextField();
        // this._textArea.width = 1408;
        // this._textArea.height = 180;
        // this._textArea.background = true;
        // this._textArea.backgroundColor = 0x1b232c;
        // this._textArea.multiline = true;
        // this._textArea.setFocus();
        // this._textAreaGroup.addChild(this._textArea);
      }

      protected onTouchUpload(e: egret.TouchEvent) {
        const uploadText: any = document.getElementById('uploadText');
        uploadText.onchange = this.onChange.bind(this);
        uploadText.click();
      }

      private onChange() {
        // 获取选择图片
        const uploadText: any = document.getElementById('uploadText');
        const file = uploadText.files[0];
        // 判断图片类型
        // var imageType = /^image\//;
        // if(!imageType.test(file.type)) {
        //     alert("请选择图片类型上传");
        //     return;
        // }
        // 加载图片
        const reader = new FileReader();

        // reader.onload = this.loadFileComplete(event).bind(this);

        reader.onload = function (event) {
          this.loadFileComplete(event.target.result);
        }.bind(this);

        reader.readAsDataURL(file);
      }

      public loadFileComplete(result): any {
        // 将加载图片的数据赋值给myImg
        // this._textArea.addEventListener(egret.Event.COMPLETE, this.onMyImgComplete, this);
        this._textArea.text = atob(result.split(',')[1]);
        console.log('hi');
      }
      public atou(str) {
        return decodeURIComponent(atob(str));
      }

      protected onTextInputUpdate(e: egret.Event) {
        this._data = this.validateTextArea(this._textArea.text);
      }

      protected validateTextArea(text) {
        // validate via rule
        return text;
      }
    }
  }
}
