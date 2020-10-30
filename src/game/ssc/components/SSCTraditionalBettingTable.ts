// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalBettingTable extends ABettingTable {
      // mobile
      private _bettingTableViewPort: eui.Group;
      private _bettingTableToggleButton: eui.Group;
      private _topClose: eui.Group;
      private _playmodeDropDownButton: eui.Group;
      private _lblPlayMode : ui.RunTimeLabel;
      private playMode : string;
      
      constructor(config ,playMode = null) {
        super(config);
        if(playMode){
          this.playMode = playMode;
        }
      }

      protected addEventListeners() {
        if (env.isMobile) {
          this._bettingTableToggleButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.updateBettingTableState, this.bettingPanel);
          this._topClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.closeBettingTableState, this.bettingPanel);
          this._playmodeDropDownButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.toggleGameTypeDropdown, this.bettingPanel);
        }
      }

      protected removeEventListeners() {
        if (env.isMobile) {
          this._bettingTableToggleButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.updateBettingTableState, this.bettingPanel);
          this._topClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.updateBettingTableState, this.bettingPanel);
          this._playmodeDropDownButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.toggleGameTypeDropdown, this.bettingPanel);
        }
      }

      public init() {
        super.init();
        this.initSkin();
        this.createComponents();
        this.addEventListeners();
        if(this.playMode){
          this._lblPlayMode.renderText = () => this.playMode;
        }
      }

      public setLabelPlayMode(str){
        if(this._lblPlayMode){
          this._lblPlayMode.renderText = () => str;
        }
      }

      public dispose() {
        super.dispose();
        this.removeChildren();
      }

      protected initSkin() {
        if (env.isMobile) {
          this.skinName = 'skin_mobile.lo.SSCTraditionalBettingTable';
        } else {
          this.skinName = '';
          this.width = 1509;
          this.height = 478;
        }
      }

      protected createComponents() {
        let offsetY = 0;

        let container;
        if (env.isMobile) {
          container = this._bettingTableViewPort;
        } else {
          container = this;
        }

        for (let i = 0; i < this._inputs.length; i++) {
          container.addChild(this._inputs[i]);
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
        const checkPattern = true;
        for (let i = 0; i < patterns.length; i++) {
          if (patterns[i].search(/[\$\%\^\&]|\b(\w*undefined\w*)\b/gi) === -1) {
            this.betFields.push(patterns[i]);
          }
        }

        // for (let i = 0; i < this.betFields.length; i++) {
        //   console.log('pattern :' + this.betFields[i]);
        // }
      }
    }
  }
}
