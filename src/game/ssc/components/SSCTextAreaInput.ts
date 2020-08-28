// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTextAreaInput extends AInputComponent {
      protected _textAreaGroup: eui.Group;

      protected _textArea: egret.TextField;
      protected _instruction: ui.RunTimeLabel;

      protected _btnUpload;
      protected _btnFix;
      protected _btnClear;

      protected duplicatedDatas; // for display

      protected _lblBtnUpload;
      protected _lblBtnFix;
      protected _lblBtnClear;

      private isValidate = false;

      constructor(index: number, config: any) {
        super(index, config);
        this.skinName = 'skin_desktop.lo.SSCTextAreaInput';
      }

      protected initComponents() {
        this.addListeners();
        this.updateText();
      }

      public addListeners() {
        this._btnUpload.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpload, this);
        this._btnFix.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchFix, this);
        this._btnClear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClear, this);
        this._textArea.addEventListener(egret.Event.CHANGE, this.onTextAreaChange, this);
      }

      public removeListeners() {
        this._btnUpload.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpload, this);
        this._btnFix.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchFix, this);
        this._btnClear.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClear, this);
      }

      protected onTouchClear(e) {
        this._textArea.text = '';
        this._data = '';
        this.isValidate = false;
      }

      protected onTextAreaChange() {
        this.isValidate = false;

        this.updateData();
      }

      // update the data when user interact with the component
      protected updateData() {
        this._data = '';
        const inputText = this._textArea.text;
        this.validateTextArea(inputText);

        if (this._data !== [] && this._data !== '' && this._data !== null && this.isValidate) {
          this.dispatchEventWith('lo_trad_textareaupdate', false, { index: this._index, data: this._data });
        }
      }

      protected onTouchUpload(e: egret.TouchEvent) {
        const uploadText = document.getElementById('uploadText');
        uploadText.onchange = this.onUploadChange.bind(this);

        uploadText.click();
      }

      protected onTouchFix(e: egret.TouchEvent) {
        const inputText = this._textArea.text;
        this.validateTextArea(inputText, true);
        this.updateData();
      }

      private loadFileAbort() {
        console.log('abort');
      }

      private loadFileError() {
        console.log('error');
      }

      private onUploadChange() {
        // 获取选择图片
        const uploadText: any = document.getElementById('uploadText');
        const file = uploadText.files[0];

        if (!file) {
          alert('Same file uploaded / Unknown error, please try to upload again!');
          return;
        }
        // 判断图片类型
        const type: RegExp = /[^text/plain]/;
        if (type.test(file.type)) {
          alert('请选择TXT类型上传');
          return;
        }
        // 加载图片
        const reader = new FileReader();

        // reader.onload = this.loadFileComplete(event).bind(this);

        reader.onload = function (event) {
          this.loadFileComplete(event.target.result);
        }.bind(this);

        reader.onabort = function () {
          this.loadFileAbort();
        }.bind(this);

        reader.onerror = function (event) {
          this.loadFileError();
        }.bind(this);

        reader.readAsDataURL(file);
      }

      public loadFileComplete(result): any {
        // 将加载图片的数据赋值给myImg
        // this._textArea.addEventListener(egret.Event.COMPLETE, this.onMyImgComplete, this);
        this.isValidate = false;
        this._textArea.text = '';
        this._textArea.text = atob(result.split(',')[1]);
        this.updateData();
      }

      protected updateText() {
        super.updateText();
        this._lblBtnUpload.renderText = () => `${i18n.t('lo_trad.upload_document')}`;
        this._lblBtnFix.renderText = () => `${i18n.t('lo_trad.erase_non_number')}`;
        this._lblBtnClear.renderText = () => `${i18n.t('lo_trad.all_clear')}`;
      }

      protected validateTextArea(text: string, isUpdateTextField = false) {
        // remove except numbers
        this.duplicatedDatas = [];

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
        if (isUpdateTextField) { this._textArea.text = ''; }
        let count = 0;

        for (let i = 0; i < datas.length; i++) {
          temp += datas[i];
          count++;
          if (count % numberPerGroup === 0) {
            tempDatas.push(temp);
            temp = '';
          }
        }

        // duplication checking for data ARRAY

        const uniqueTempDatas = tempDatas.filter((v, i, a) => {
          const check = a.indexOf(v) === i;
          if (check) {
            // TODO
            this.duplicatedDatas.push(a[i]);
          }
          return check;
        });

        let finalDatas = [];

        // duplication checking inside single data
        if (this._config.isUnique) {
          for (let i = 0; i < uniqueTempDatas.length; i++) {
            let k = 1;
            let isDuplicate = 0;

            while (k < uniqueTempDatas[i].length) {
              if (uniqueTempDatas[i][k] === uniqueTempDatas[i][k - 1]) {
                isDuplicate++;
              } else {
                break;
              }
              k++;
            }

            if (isDuplicate !== numberPerGroup - 1) {
              finalDatas.push(uniqueTempDatas[i]);
            }
          }
        } else {
          finalDatas = uniqueTempDatas;
        }

        // set textArea & set _data
        for (let i = 0; i < finalDatas.length; i++) {
          if (i === finalDatas.length - 1) {
            if (isUpdateTextField) { this._textArea.text += finalDatas[i]; }
            this._data += finalDatas[i];
          } else {
            if (isUpdateTextField) { this._textArea.text += finalDatas[i] + ', '; }
            this._data += finalDatas[i] + '|';
          }
        }

        this.isValidate = true;
        // this.updateData();
      }

      protected hasDuplicates(arr) {
        return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
      }
    }
  }
}
