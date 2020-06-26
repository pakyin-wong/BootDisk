// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalBettingTable extends ABettingTable {
      // private _inputArray : string[];

      // private _inputType: number;
      // private _name: string;
      // private _rowCount: number;
      // private _rowName: string[];
      // private _isOption: number;
      // private _inputArray: string[];
      // private _showValueArray: string[];
      // private _betCode: string;

      // not done
      constructor(config) {
        super(config);
        // this.bigTagIndex = currentBigTagIndex;
        // this.smallTagIndex = currentSmallTagIndex;
        this.init();
        // this.initComponents();
      }

      protected init() {
        super.init();

        this.width = 1509;
        this.height = 478;
        this.createComponents();
      }

      protected clear() {
        this.removeChildren();
      }

      protected createComponents() {
        let offsetY = 0;

        for (let i = 0; i < this._inputs.length; i++) {
          this.addChild(this._inputs[i]);
          this._inputs[i].y = offsetY;
          offsetY += this._inputs[i].height + 1;
        }
      }

      protected generateCombination() {
        if (!this._config.dataSelect && !this._config.combinationDataId) {
          this.combinations = null;
          return;
        }

        this.combinations = [];

        let sample = 1;
        // if (this._config.dataSelect) {
        if (this._config.dataSelect) {
          sample = this._config.dataSelect;

          for (let i = 0; i < this.inputData.length; i++) {
            if (this.inputData[i] !== '') {
              this.findNextCombination(sample, i, 1, (i + 1).toString());
            }
          }
        }

        if (this._config.combinationDataId) {
          this.combinations = this.inputData[this._config.combinationDataId - 1];
        }
      }

      private findNextCombination(sample: number, i: number, depth: number, itemString: string) {
        if (depth === sample) {
          if (this.validateCombination(itemString, sample)) {
            this.combinations.push(itemString);
          }
          return;
        }

        for (let j = i + 1; j < this.inputData.length; j++) {
          if (this.inputData[j] !== '') {
            this.findNextCombination(sample, j, depth + 1, itemString + '_' + (j + 1).toString());
          } else {
            this.findNextCombination(sample, j, depth + 1, itemString);
          }
        }
      }

      private validateCombination(itemStr: string, sampleSize: number): boolean {
        const items = itemStr.split('_');
        if (items.length === sampleSize) {
          return true;
        }
        return false;
      }

      protected generateBetFields() {
        this.betFields = [];

        const patterns = [];
        const pattern = this._config.pattern;
        // let pattern = '^1^2OPTIONAL$1';
        // let pattern = ^1^2OptionalFree_&1_&2';

        let value = pattern;

        const inputData = this.inputData;
        const combination = this.combinations;
        // const combination = ['1_2','1_3','1_4','1_5'];
        const datas = [];

        for (let i = 0; i < combination.length; i++) {
          datas.push(pattern);
        }

        let re = /\^/gi;
        // for()
        if (pattern.search(re) > -1 && datas.length > 0) {
          for (let i = 0; i < combination.length; i++) {
            const cIndex = combination[i].split('_');
            for (let j = 0; j < cIndex.length; j++) {
              const n = parseInt(cIndex[j], 10);
              datas[i] = datas[i].replace('^' + (j + 1).toString(), n);
            }
          }
        }

        re = /\&/gi;

        if (pattern.search(re) > -1 && datas.length > 0) {
          for (let i = 0; i < combination.length; i++) {
            const cIndex = combination[i].split('_');
            for (let j = 0; j < cIndex.length; j++) {
              const n = inputData[parseInt(cIndex[j], 10) - 1];
              datas[i] = datas[i].replace('&' + (j + 1).toString(), n);
            }
          }
        }

        re = /\%/gi;

        if (pattern.search(re) > -1) {
          if (datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
              for (let k = 0; k < inputData.length; k++) {
                const n = k.toString();
                datas[i] = datas[i].replace('%' + (k + 1).toString(), n);
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
          if (datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
              for (let k = 0; k < inputData.length; k++) {
                const n = inputData[k];
                datas[i] = datas[i].replace('$' + (k + 1).toString(), n);
              }
            }
          } else {
            for (let k = 0; k < inputData.length; k++) {
              const n = inputData[k];
              value = value.replace('$' + (k + 1).toString(), n);
            }
          }
        }

        if (datas.length > 0) {
          for (let i = 0; i < datas.length; i++) {
            patterns.push(datas[i]);
          }
        } else patterns.push(value);

        const output = [];

        for (let i = 0; i < patterns.length; i++) {
          if (patterns[i].search(/\$\%\^\&\b(\w*undefined\w*)\b/gi) === -1) {
            console.log('pattern :' + patterns[i]);
            this.betFields.push(patterns[i]);
          }
        }

        // const pattern: string = this._config.pattern;
        // // $n = data of nth input eg: inputData[n]

        // for (let i = 0; i < this.inputData.length; i++) {
        //   pattern.replace(this.inputData[i], '$' + (i + 1).toString());
        // }
        // // if(pattern.i
        // // this.betFields.push(pattern);

        // // %n = index of nth input
        // for (let i = 0; i < this.inputData.length; i++) {
        //   pattern.replace(i.toString(), '%' + (i + 1).toString());
        // }

        // // ^n = nth index of combination [] eg: ['1_2','4_1'] result[0] = 1, result[1] = 2, result[2] = 4, result[3] = 1
        // if (this.combinations.length > 0) {
        // } else {
        //   return;
        // }
      }

      // protected generateCombination(results: string[], numberOfChosen: number) {

      //   let combinationArray = [];

      //   // let inputData = ['DRAGON','TIGER'];

      //   // ['12DT_DRAGON|12DT_TIGER|12DT_TIE'];
      //   // [{field:'OPTION2_123@200',amount:600}];
      //   // [{field:'12DT_DRAGON@100',amount:100},{field:'12DT_TIGER@100',amount:100}];

      //   // for (let i = 0; i < results.length - 1; i++) {
      //   //   // This is where you'll capture that last value
      //   //   for (let j = i + 1; j < results.length; j++) {
      //   //     combinationArray.push(`${results[i]}+'_'+ ${results[j]}`);
      //   //   }
      //   // }
      //   // for(let i = 0;i < numberOfInputField; i++){
      //   //   let temp = '';
      //   //   combinationArray.push(temp);
      //   //   for(let k = 0; k < numberOfChosen; k++){
      //   //     temp +=
      //   //   }
      //   // }

      //   // let ballsSelection = [];
      //   // for (let i = 0; i < this._ballsArray.length; i++) {
      //   //   const ballsRow: eui.Group = this._ballsArray[i];
      //   //   let temp = '';
      //   //   for (let k = 0; k < ballsRow.numChildren; k++) {
      //   //     temp +=  (ballsRow.getChildAt(k) as SSCBallButton).isActive ?(ballsRow.getChildAt(k)as SSCBallButton).betValue : '' ;
      //   //   }
      //   //   ballsSelection.push(temp);
      //   // }
      // }

      // protected createBallsRow(currentIndex : number){
      //   const rowHeight = 80;
      //   const rowWidth = this.width;

      //   let btnGrp;

      //   let currentRow = this._betTypeMapping.input[currentIndex];

      //   btnGrp = new eui.Group();
      //   btnGrp.width = rowWidth;
      //   btnGrp.height = rowHeight;
      //   btnGrp.x = 0;
      //   btnGrp.y = currentIndex * rowHeight;

      //   if(currentRow.title.length > 0){
      //     const lblTitle = new ui.RunTimeLabel();
      //     lblTitle.x = 33;
      //     lblTitle.width = 154;
      //     lblTitle.height = 25;
      //     lblTitle.verticalAlign = 'middle';
      //     lblTitle.textAlign = 'left';
      //     lblTitle.fontFamily = 'Barlow';
      //     lblTitle.size = 18;
      //     lblTitle.textColor = 0x00b8c3;
      //     // lblTitle.text = i18n.t(currentRow.title);
      //     lblTitle.text = currentRow.title;
      //     btnGrp.addChild(lblTitle);
      //   }

      //   const ballsGroup = new eui.Group();
      //   ballsGroup.width = 768;
      //   ballsGroup.height = rowHeight;
      //   ballsGroup.x = 187;
      //   ballsGroup.touchEnabled = true;
      //   ballsGroup.touchChildren = true;

      //   for (let k = 0; k < currentRow.data.length; k++) {
      //     const ball = new SSCBallButton(typeof(currentRow.data[k]) === 'number' ? currentRow.data[k] : i18n.t(currentRow.data[k]), currentRow.data[k], k);
      //     ball.width = 50;
      //     ball.height = 50;
      //     ballsGroup.addChild(ball);
      //     ball.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallClicked, this);
      //   }

      //   let layout = new eui.HorizontalLayout();
      //   layout.paddingLeft = layout.paddingRight = 44;
      //   layout.verticalAlign = 'middle';
      //   layout.gap = 20;
      //   ballsGroup.layout = layout;

      //   btnGrp.addChild(ballsGroup);
      //   this._ballsArray.push(ballsGroup);

      //   if (currentRow._isOption) {
      //     const option = new SSCTradtionalBettingOptionButtonRow(currentIndex);
      //     btnGrp.addChild(option);
      //   }

      //   layout = new eui.HorizontalLayout();
      //   layout.verticalAlign = 'middle';
      //   btnGrp.layout = layout;
      //   btnGrp.touchChildren = true;

      //   this.addChild(btnGrp);
      // }
      protected;
    }
  }
}
