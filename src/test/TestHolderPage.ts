namespace we {
  export namespace test {
    export class TestHolderPage extends core.BasePage {
      private progressbar: eui.ProgressBar;

      public onEnter() {
        this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}

      protected mount() {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);
        const { output, data } = this.validateTextArea('010203-04050310010102');
        console.log('betCodeText :' + output + ' , ' + data);
        // let a = parseInt('01', 10);
        // console.log('asdasfasdfasdfasf: ' + a);
        // let string = '12345optional';
        // string = '1234optionalfree';

        // we.lo.BetFieldTranslationFunction.tradbetfieldtranslate(string);
        // const a = ['Dragon|Tiger|Tie'];

        // const b = we.lo.DataMapping.DragonTigerMapping(a, '12DT_$1');
        // for (let i = 0; i < b.length; i++) {
        //   console.log('b' + b[i]);
        // }
        // console.log(we.lo.DataMapping.DragonTigerMapping(a));

        // this.testNoteCount();

        // this.generateCombination();
        // this.generateBetFields();
        // const temp = new we.lo.SSCTraditionalBettingPanel();
        // temp.x = 0;
        // temp.y = 0;
        // this.addChild(temp);
        // draw the icon faces
        // for (let i = 0; i < 2; i++) {
        //   const face = new egret.DisplayObjectContainer();
        //   const circle = new egret.Shape();
        //   // circle.graphics.lineStyle(2, colors[i], 1, true);
        //   circle.graphics.beginFill(0xff0000, 1);
        //   circle.graphics.drawCircle(30, 30, 30);
        //   circle.graphics.endFill();
        //   face.addChild(circle);
        //   this.addChild(face);
        // }

        // const face = new egret.DisplayObjectContainer();
        // const temp = new we.bam.SqueezeTutorial('SqueezeTutorial');
        // // const slider = new
        // // temp.skinName = 'TestHorizontalHolderSkin';
        // face.addChild(temp);
        // this.addChild(face);
        // face.x = 200;
        // face.y = 200;
        // step 3: connect socket
        // this.socketConnect();
        // dir.sceneCtr.goto('LobbyScene');
      }

      protected validateTextArea(text: string, isUpdateTextField = true) {
        // remove except numbers
        const duplicatedDatas = [];

        const numberPerGroup = 5;
        const punctuationRegex = /[^0-9]/gi;
        let validateText = text.trim();

        const minNum = 1;
        const maxNum = 10;

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

        const combinedData = [];
        let tempCombinedData = '';

        for (let i = 0; i < validateDoubleDigit.length; i++) {
          tempCombinedData += validateDoubleDigit[i];
          if ((i + 1) % numberPerGroup === 0) {
            combinedData.push(tempCombinedData);
            tempCombinedData = ''; // ['0102','0103',......]
          }
        }
        // check if single data is duplicated

        // const uniqueTempDatas = combinedData.filter((v, i, a) => {
        //   const check = a.indexOf(v) === i;
        //   if (check) {
        //     // TODO
        //     duplicatedDatas.push(a[i]);
        //   }
        //   return check;
        // });

        const finalDatas = [];
        let wholeCheck = [];
        const singleDataCheckArray = [];
        const isUnique = true;
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

        let output = '';
        let data = '';

        // set textArea & set _data
        for (let i = 0; i < finalDatas.length; i++) {
          if (i === finalDatas.length - 1) {
            if (isUpdateTextField) {
              output += finalDatas[i];
            }
            data += finalDatas[i];
          } else {
            if (isUpdateTextField) {
              output += finalDatas[i] + ', ';
            }
            data += finalDatas[i] + ';';
          }
        }

        return { output, data };
        // this.isValidate = true;
        // this.updateData();
      }

      protected hasDuplicates(arr) {
        return arr.some(function(item) {
          return arr.indexOf(item) !== arr.lastIndexOf(item);
        });
      }

      private _inputs = ['0123', '23', '', '0234', '123'];
      private combinations;

      protected generateCombination() {
        // if(!this._config.dataSelect && !this._config.combinationDataId){
        //   this.combinations = null;
        //   return;
        // }
        this.combinations = [];

        const sample = 2;

        for (let i = 0; i < this._inputs.length; i++) {
          if (this._inputs[i] !== '') {
            this.findNextCombination(sample, i, 1, (i + 1).toString());
          }
        }

        let str = '';

        for (let k = 0; k < this.combinations.length; k++) {
          str += this.combinations[k] + ', ';
        }

        console.log(str);
      }
      // }

      private findNextCombination(sample: number, i: number, depth: number, itemString: string) {
        if (depth === sample) {
          if (this.validateCombination(itemString, sample)) {
            this.combinations.push(itemString);
          }
          return;
        }

        for (let j = i + 1; j < this._inputs.length; j++) {
          if (this._inputs[j] !== '') {
            this.findNextCombination(sample, j, depth + 1, itemString + '_' + (j + 1).toString());
          } else {
            this.findNextCombination(sample, j, depth + 1, itemString);
          }
        }
      }

      private validateCombination(itemStr: string, sampleSize: number): boolean {
        const items = itemStr.split('_');
        if (items.length !== sampleSize) {
          return false;
        }
        return true;
      }

      private generateBetFields() {
        // const re = [/\$/gi, /\%/gi, /\^/gi, /\&/gi];
        // const sign = ['$', '%', '^', '&'];

        const patterns = [];
        // let pattern = '12345OPTIONAL_$1_$2_$3_$4_$5';
        // let pattern = '^1^2OPTIONAL$1';
        const pattern = '^1^2OptionalFree_&1_&2';

        let value = pattern;

        const inputData = ['01', '0123', '0234', '056', '56'];
        // const combination = [];
        const combination = ['1_2', '1_3', '1_4', '1_5', '2_3', '2_4', '2_5', '3_4', '3_5', '4_5'];
        const data = [];

        for (let i = 0; i < combination.length; i++) {
          data.push(pattern);
        }

        let re = /\^/gi;
        // for()
        if (pattern.search(re) > -1 && data.length > 0) {
          for (let i = 0; i < combination.length; i++) {
            const cIndex = combination[i].split('_');
            for (let j = 0; j < cIndex.length; j++) {
              const n = parseInt(cIndex[j], 10);
              data[i] = data[i].replace('^' + (j + 1).toString(), n);
            }
          }
        }

        re = /\&/gi;

        if (pattern.search(re) > -1 && data.length > 0) {
          for (let i = 0; i < combination.length; i++) {
            const cIndex = combination[i].split('_');
            for (let j = 0; j < cIndex.length; j++) {
              const n = inputData[parseInt(cIndex[j], 10) - 1];
              data[i] = data[i].replace('&' + (j + 1).toString(), n);
            }
          }
        }

        re = /\%/gi;

        if (pattern.search(re) > -1) {
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              for (let k = 0; k < inputData.length; k++) {
                const n = k.toString();
                data[i] = data[i].replace('%' + (k + 1).toString(), n);
              }
            }
          } else {
            for (let k = 0; k < inputData.length; k++) {
              const n = k.toString();
              value = value.replace('%' + (k + 1).toString(), n);
            }
          }
        }

        re = /\$/gi;

        if (pattern.search(re) > -1) {
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              for (let k = 0; k < inputData.length; k++) {
                const n = inputData[k];
                data[i] = data[i].replace('$' + (k + 1).toString(), n);
              }
            }
          } else {
            for (let k = 0; k < inputData.length; k++) {
              const n = inputData[k];
              value = value.replace('$' + (k + 1).toString(), n);
            }
          }
        }

        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            patterns.push(data[i]);
          }
        } else {
          patterns.push(value);
        }
        const output = [];
        for (let i = 0; i < patterns.length; i++) {
          if (patterns[i].search(/\$\%\^\&\b(\w*undefined\w*)\b/gi) === -1) {
            console.log('pattern :' + patterns[i]);
            output.push(patterns[i]);
          } else {
            console.log('invalid pattern included: ' + patterns[i]);
          }
        }
      }

      private testNoteCount() {
        // let data0 = ['012', '345', '4567', '2345'];
        // console.log('Directional Selection note:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.DirectionalSelection(data0));
        // data0 = ['0123|1234|4566|7856'];
        // console.log('Directional Menu note:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.SeparatorNoteCount(data0));
        // data0 = ['012', '345', '4567', '2345'];
        // console.log('Directional Group:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.DirectionalCombination(data0));
        // data0 = ['123456'];
        // console.log('Group24:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.FourStar.Group24(data0));
        // data0 = ['0', '012'];
        // console.log('Group12:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.FourStar.Group12(data0));
        // data0 = ['01234', '01234567'];
        // console.log('Group12:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.FourStar.Group12(data0));
        // data0 = ['01'];
        // console.log('Group6:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.FourStar.Group6(data0));
        // data0 = ['01345'];
        // console.log('Group6:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.FourStar.Group6(data0));
        // data0 = ['0', '01'];
        // console.log('Group4:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.FourStar.Group4(data0));
        // data0 = ['012', '01234'];
        // console.log('Group4:' + data0 + ' noteCount: ' + we.lo.NoteCountFunc.FourStar.Group4(data0));
      }

      // for (let k = 0; k < re.length; k++) {
      //   if (pattern.search(re[k]) > -1) {
      //     let n = '';
      //     switch (sign[k]) {
      //       case '$':
      //         for (let i = 0; i < inputData.length; i++) {
      //           n = inputData[i];
      //           value = value.replace(sign[k] + (i + 1).toString(), n);
      //         }
      //         patterns.push(value);
      //         break;
      //       case '%':
      //         for (let i = 0; i < inputData.length; i++) {
      //           n = i.toString();
      //           value = value.replace(sign[k] + (i + 1).toString(), n);
      //         }
      //         patterns.push(value);
      //         break;
      //       case '^':
      //         value = pattern;
      //         for (let i = 0; i < combination.length; i++) {
      //           const cIndex = combination[i].split('_');
      //           for (let j = 0; j < cIndex.length; j++) {
      //             n = cIndex[j];
      //             value = value.replace(sign[k] + (j + 1).toString(), n);
      //           }
      //           patterns.push(value);
      //         }
      //         break;
      //       case '&':
      //         for (let i = 0; i < combination.length; i++) {
      //           const cIndex = combination[i].split('_');
      //           value = pattern;
      //           for (let j = 0; j < cIndex.length; j++) {
      //             n = inputData[parseInt(cIndex[j], 10)];
      //             value = value.replace(sign[k] + (j + 1).toString(), n);
      //           }
      //           patterns.push(value);
      //         }
      //         break;
      //     }
      //   }
      // }
      // }

      protected socketConnect() {
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);
        // dir.socket.connect();
      }

      protected socketConnectSuccess() {
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);

        // step 4: auth and get user profiles

        // step 5: get and display tips, promote banner

        // step 6: load general resource (lobby, baccarat)

        // step 7: init complete, transfer to lobby scene
        // dir.sceneCtr.goto('LobbyScene');
      }

      protected socketConnectFail() {}
    }
  }
}
