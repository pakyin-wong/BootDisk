// TypeScript file
namespace we {
  export namespace rc {
    export class RCTextAreaInput extends we.lo.SSCTextAreaInput {
      protected updateText() {
        super.updateText();
        this._lblInstruction.renderText = () =>
          `說明\n1. 每一注號碼之間的間隔符支持回車 空格[] 逗號[,] 分號[;]\n2. 文件格式必須是.txt格式，大小不超過200KB。\n3. 將文件拖入文本框即可快速實現文件上傳，大文件拖拽上傳效果更佳。\n4. 導入文本內容後將覆蓋文本框中現有的內容。\n5. 注意：不足2位数的号码要在前面补0，如号码为1，则输入时应为01`;
      }

      protected updateData() {
        this._data = '';
        const inputText = this._textArea.text;
        this.validateTextArea(inputText);

        if (this._data !== [] && this._data !== null && this.isValidate) {
          this.dispatchEventWith('lo_trad_textareaupdate', false, { index: this._index, data: this._data });
        }
      }

      protected validateTextArea(text: string, isUpdateTextField = false) {
        // remove except numbers
        this.duplicatedDatas = [];

        const numberPerGroup = this._config.numberPerGroup;
        const punctuationRegex = /[^0-9]/gi;
        let validateText = text.trim();

        const minNum = this._config.min;
        const maxNum = this._config.max;

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

        // split into double digit array - 01, 02, 03, 04, 05......
        // check min/max,

        let tempDigitData = '';
        const validateDoubleDigit = [];

        for (let i = 0; i < validateText.length; i++) {
          if ((i + 1) % 2 === 0) {
            tempDigitData += validateText[i];
            if (parseInt(tempDigitData, 10) >= minNum && parseInt(tempDigitData, 10) <= maxNum) {
              validateDoubleDigit.push(tempDigitData); // ['01','02','01','03','01','02','01','03','02','04','10']
            }
            tempDigitData = '';
          } else {
            tempDigitData += validateText[i];
          }
        }

        // split to datas
        const combinedData = [];
        let tempCombinedData = '';

        for (let i = 0; i < validateDoubleDigit.length; i++) {
          tempCombinedData += validateDoubleDigit[i];
          if ((i + 1) % numberPerGroup === 0) {
            combinedData.push(tempCombinedData);
            tempCombinedData = ''; // ['0102','0103',......]
          }
        }
        // duplication checking for data ARRAY

        const finalDatas = [];
        let wholeCheck = [];
        const singleDataCheckArray = [];
        const isUnique = this._config.isUnique;
        // duplication checking
        if (isUnique) {
          // duplication checking in singleData
          for (let i = 0; i < combinedData.length; i++) {
            const singleCheck = combinedData[i].match(/.{1,2}/g);
            if (!this.hasDuplicates(singleCheck)) {
              singleDataCheckArray.push(combinedData[i]);
            }
          }
          // duplication checking in whole valid data

          wholeCheck = singleDataCheckArray.filter((v, i, a) => a.indexOf(v) === i);
        } else {
          wholeCheck = combinedData;
        }

        // translate '01','02','03','10' to '1','2','3','10'

        for (let i = 0; i < wholeCheck.length; i++) {
          const final = wholeCheck[i].match(/.{1,2}/g);
          let tempData = '';
          for (let k = 0; k < final.length; k++) {
            if (final[k][0] === '0') {
              if (k === 0) {
                tempData += final[k][1];
              } else {
                tempData += '|' + final[k][1];
              }
            } else {
              if (k === 0) {
                tempData += final[k];
              } else {
                tempData += '|' + final[k];
              }
            }
          }
          finalDatas.push(tempData);
        }

        // set textArea & set _data
        if (finalDatas.length >= 1) {
          if (isUpdateTextField) {
            this._textArea.text = '';
          }
          for (let i = 0; i < finalDatas.length; i++) {
            if (i === finalDatas.length - 1) {
              if (isUpdateTextField) {
                this._textArea.text += wholeCheck[i];
              }
              this._data += finalDatas[i];
            } else {
              if (isUpdateTextField) {
                this._textArea.text += wholeCheck[i] + ', ';
              }
              this._data += finalDatas[i] + ';';
            }
          }
          this.isValidate = true;
        } else {
          this._data = '';
          if (isUpdateTextField) {
            this._textArea.text = '';
          }
          this.isValidate = false;
        }

        // this.updateData();
      }
    }
  }
}
