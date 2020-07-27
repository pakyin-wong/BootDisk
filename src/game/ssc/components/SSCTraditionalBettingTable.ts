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
        // this.init();
        // this.initComponents();
      }

      protected init() {
        super.init();

        this.width = 1509;
        this.height = 478;
        this.createComponents();
      }

      public dispose() {
        super.dispose();
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
          this.combinations = [];
          return;
        }

        this.combinations = [];

        let sample = 1;
        // if (this._config.dataSelect) {
        if (this._config.dataSelect) {
          sample = this._config.dataSelect;

          for (let i = 0; i < this.inputData.length; i++) {
            if (this.inputData[i] !== '') {
              InputComponentFactory.findNextCombination(this.inputData, this.combinations, sample, i, 1, (i + 1).toString());
            }
          }
        }

        if (this._config.combinationDataId) {
          const combinationdDataArray = this.inputData.slice(this._config.combinationDataId - 1, this._config.combinationDataId);
          if (combinationdDataArray.length > 0) {
            for (let i = 0; i < combinationdDataArray[0].length; i++) {
              this.combinations.push(combinationdDataArray[0][i]);
            }
          }
        }
      }

      protected generateBetFields() {
        this.betFields = [];

        const patterns = [];
        const pattern = this._config.pattern;
        // let pattern = '^1^2OPTIONAL$1';
        // let pattern = ^1^2OptionalFree_&1_&2';

        let value = pattern;
        let inputData = [];

        if (this._config.combinationDataId) {
          switch (this._config.combinationDataId) {
            case 1:
              inputData.push(this.inputData[1]);
              break;
            case 2:
              inputData.push(this.inputData[0]);
              break;
          }
        } else {
          inputData = this.inputData;
        }

        const combination = this.combinations;
        // const combination = ['1_2','1_3','1_4','1_5'];
        const datas = [];
        let replace = '';

        for (let i = 0; i < combination.length; i++) {
          datas.push(pattern);
        }

        let re = /\^/gi;
        // for()
        if (pattern.search(re) > -1 && datas.length > 0) {
          for (let i = 0; i < combination.length; i++) {
            const cIndex = combination[i].split('_');
            for (let j = 0; j < cIndex.length; j++) {
              replace = parseInt(cIndex[j], 10).toString();
              datas[i] = datas[i].replace('^' + (j + 1).toString(), replace);
            }
          }
        }

        re = /\&/gi;

        if (pattern.search(re) > -1 && datas.length > 0) {
          for (let i = 0; i < combination.length; i++) {
            const cIndex = combination[i].split('_');
            for (let j = 0; j < cIndex.length; j++) {
              replace = inputData[parseInt(cIndex[j], 10) - 1];
              datas[i] = datas[i].replace('&' + (j + 1).toString(), replace);
            }
          }
        }

        re = /\%/gi;

        if (pattern.search(re) > -1) {
          if (datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
              for (let k = 0; k < inputData.length; k++) {
                replace = k.toString();
                datas[i] = datas[i].replace('%' + (k + 1).toString(), replace);
              }
            }
          } else {
            for (let k = 0; k < inputData.length; k++) {
              replace = k.toString();
              value = value.replace('%' + (k + 1).toString(), replace);
            }
          }
        }

        re = /\$/gi;

        if (pattern.search(re) > -1) {
          if (datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
              for (let k = 0; k < inputData.length; k++) {
                replace = inputData[k];
                datas[i] = datas[i].replace('$' + (k + 1).toString(), replace);
              }
            }
          } else {
            for (let k = 0; k < inputData.length; k++) {
              replace = inputData[k];
              value = value.replace('$' + (k + 1).toString(), replace);
            }
          }
        }

        if (datas.length > 0) {
          for (let i = 0; i < datas.length; i++) {
            patterns.push(datas[i]);
          }
        } else {
          patterns.push(value);
        }

        const output = [];

        for (let i = 0; i < patterns.length; i++) {
          if (patterns[i].search(/\$\%\^\&\b(\w*undefined\w*)\b/gi) === -1) {
            this.betFields.push(patterns[i]);
          }
        }

        for (let i = 0; i < this.betFields.length; i++) {
          console.log('pattern :' + this.betFields[i]);
        }

        this.dispatchEventWith('LOBETFIELDUPDATE', false, { data: this.betFields });
      }
    }
  }
}
