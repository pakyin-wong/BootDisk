// TypeScript file
namespace we {
  export namespace rc {
    export class RCTraditionalBettingTable extends lo.SSCTraditionalBettingTable {
      public init() {
        const inputConfigs = this._config.input;
        // let isCheckBox = false;
        if (inputConfigs && inputConfigs.length > 0) {
          for (let i = 0; i < inputConfigs.length; i++) {
            const inputComponent = rc.InputComponentFactory.generateInputComponent(i, inputConfigs[i]);
            // if (inputConfigs[i].type === InputComponentType.CHECKBOXES) {
            //   isCheckBox = true;
            // }
            if (inputConfigs[i].type === lo.InputComponentType.TEXTAREA) {
              inputComponent.addEventListener('lo_trad_textareaupdate', this.onInputChange, this);
            } else {
              inputComponent.addEventListener(egret.Event.CHANGE, this.onInputChange, this);
            }
            this._inputs.push(inputComponent);
            // init empty inputData
            this.inputData.push('');
          }

          this.bettingPanel.isBetCodeValidate = false;
          this.bettingPanel.isBetLimitValidate = false;
        }

        this.width = 1509;
        this.height = 478;
        this.createComponents();
      }

      protected onInputChange(evt: egret.Event) {
        if (evt.data === null || evt.data === undefined) {
          this.onInputInvalidate();
          return;
        }

        const { index, data } = evt.data;

        this.bettingPanel.isBetCodeValidate = false;
        this.bettingPanel.isBetLimitValidate = false;
        // update inputData
        this.inputData[index] = data;

        for (let i = 0; i < this.inputData.length; i++) {
          if (this._config.input[i].type !== lo.InputComponentType.CHECKBOXES) {
            let minSelectChecking = 0;
            if (this._config.input[i].type === lo.InputComponentType.BALLS) {
              minSelectChecking = this._config.input[i].minSelect;
            } else {
              minSelectChecking = this._config.input[i].numberPerGroup;
            }

            if (this.inputData[i].split('|') < minSelectChecking) {
              this.onInputInvalidate();
              return;
            }
          }
        }

        this.generateCombination();
        if (!this.validateInput()) {
          this.onInputInvalidate();
          return;
        }
        this.generateBetFields();
        this.dataMapping();
        this.computeNoteCount();
        this.validateBetLimit();

        this.bettingPanel.onInputChanged();
      }

      protected generateBetFields() {
        this.betFields = [];

        const patterns = [];
        const pattern = this._config.pattern;

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
              if (this._config.constantIndex) {
                replace = (parseInt(cIndex[j], 10) + parseInt(this._config.constantIndex, 10)).toString();
              } else {
                replace = parseInt(cIndex[j], 10).toString();
              }
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
        const checkPattern = true;
        for (let i = 0; i < patterns.length; i++) {
          if (patterns[i].search(/[\$\%\^\&]|\b(\w*undefined\w*)\b/gi) === -1) {
            this.betFields.push(patterns[i]);
          }
        }
      }
    }
  }
}
