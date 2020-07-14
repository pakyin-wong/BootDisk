// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTextAreaInput extends AInputComponent {
      protected _textAreaGroup: eui.Group;

      protected _textArea: egret.TextField;
      protected _instruction: ui.RunTimeLabel;

      protected _btnUpload;
      protected _btnFix;
      constructor(index: number, config: any) {
        super(index, config);
        this.skinName = 'skin_desktop.lo.SSCTextAreaInput';
      }

      protected initComponents() {
        this._btnUpload.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpload, this);
        this._btnFix.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchFix, this);

      }

      protected onTextAreaChange(){
        
      }
      // update the data when user interact with the component
      protected updateData() {

        //this._data = '';

        // this.dispatchEventWith(egret.Event.CHANGE, false, { index: this._index, data: this._data });
      }
      
      protected onTouchUpload(e: egret.TouchEvent) {
        const uploadText: any = document.getElementById('uploadText');
        uploadText.onchange = this.onUploadChange.bind(this);
        uploadText.click();
      }

      protected onTouchFix(e: egret.TouchEvent) {
        const inputText = this._textArea.text;
        this.validateTextArea(inputText);
      }

      private onUploadChange() {
        // 获取选择图片
        const uploadText: any = document.getElementById('uploadText');
        const file = uploadText.files[0];
        // 判断图片类型
         const type = /[^text/plain]/;
         if(type.test(file.type)) {
             alert("请选择TXT类型上传");
             return;
         }
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
        this._textArea.text = '';
        this._textArea.text = atob(result.split(',')[1]);
      }

      // protected onTextInputUpdate(e: egret.Event) {
      //   this._data = this.validateTextArea(this._textArea.text);

      // }

      protected validateTextArea(text: string) {
        // remove except numbers
        const numberPerGroup = this._config.numberPerGroup;
        const punctuationRegex = /[^0-9]/gi;
        let validateText = text.trim();

        const checkArray = validateText.split('');

        for (let i = 0; i < validateText.length; i++) {
          if (validateText[i].search(punctuationRegex) > -1) {
            checkArray[i] = '';
          }
        }

        let check = '';
        for (let i = 0; i < checkArray.length; i++) {
          check += checkArray[i];
        }

        validateText = check.replace(/\s/, '');
        // split to datas

        const datas = validateText.split('');
        const tempDatas = [];
        let temp = '';

        this._data = '';
        this._textArea.text = '';
        let count = 0;
        
        for (let i = 0; i < datas.length; i++) {
          temp += datas[i];
          count ++;
          if (count % numberPerGroup === 0) {
            tempDatas.push(temp);
            temp = '';
          }
        }

        for (let i = 0; i < tempDatas.length; i++) {
          if (i === tempDatas.length - 1) {
            this._textArea.text += tempDatas[i];
            this._data += tempDatas[i];
          } else {
            this._textArea.text += tempDatas[i]  + '|';
            this._data += tempDatas[i]  + ', ';
          }
        }
      }
    }
  }
}
