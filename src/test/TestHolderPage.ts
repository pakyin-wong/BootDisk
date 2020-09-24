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
        let string = '12345optional';
        string = '1234optionalfree';

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
