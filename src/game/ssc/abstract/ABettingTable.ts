// TypeScript file
namespace we {
  export namespace lo {
    export abstract class ABettingTable extends core.BaseEUI implements IBettingTable {
      protected _config: any;
      protected _inputs: AInputComponent[] = [];

      public inputData: any[];
      public combinations: string[];
      public noteCount: number[];
      public totalNoteCount: number;
      public betFields: string[];

      public bettingPanel: ABettingPanel;

      constructor(config) {
        super();
        this._config = config;
        this.inputData = [];
        // this.init();
      }

      public init() {
        const inputConfigs = this._config.input;
        // let isCheckBox = false;
        if (inputConfigs && inputConfigs.length > 0) {
          for (let i = 0; i < inputConfigs.length; i++) {
            const inputComponent = InputComponentFactory.generateInputComponent(i, inputConfigs[i]);
            // if (inputConfigs[i].type === InputComponentType.CHECKBOXES) {
            //   isCheckBox = true;
            // }
            if (inputConfigs[i].type === InputComponentType.TEXTAREA) {
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

          // if (isCheckBox) {
          //   this.dispatchEvent(new egret.Event('INIT_CHECKBOXES'));
          // }
        }
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
          if (this.inputData[i].length < this._config.input[i].minSelect) {
            this.onInputInvalidate();
            return;
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

      protected generateCombination() {}

      protected validateInput(): boolean {
        for (const input of this._inputs) {
          if (!input.validate()) {
            return false;
          }
        }
        if (this._config.validateData) {
          if (!this._config.validateData(this.inputData)) {
            return false;
          }
        }
        return true;
      }

      protected validateBetLimit() {
        // temp
        this.bettingPanel.isBetLimitValidate = true;
        this.bettingPanel.validateBetLimit();
      }

      protected onInputInvalidate() {
        this.clearData();
        if (this.bettingPanel) {
          this.bettingPanel.clearNote();
          this.bettingPanel.validateBetButtons();
        }
      }

      public clearData() {
        this.totalNoteCount = 0;
        this.bettingPanel.isBetCodeValidate = false;
        this.bettingPanel.isBetLimitValidate = false;
      }

      protected dataMapping() {
        // for (let i = 0; i < this._config.inputs.length; i++) {
        //   if (this._config.inputConfig[i].mapping) {
        //     for (let k = 0; k < this._config.mappingIndex.length; k++) {
        //       this._config.mapping(this.inputData, this._config.pattern);
        //     }
        //   }
        // }
        if (this._config.mapping) {
          this.betFields = this._config.mapping(this.inputData, this._config.pattern);
        }
      }

      protected generateBetFields() {}

      public computeNoteCount() {
        this.totalNoteCount = 0;
        this.noteCount = [];
        this.noteCount = this._config.noteCountFunc(this.inputData, this.combinations);

        for (let i = 0; i < this.noteCount.length; i++) {
          this.totalNoteCount += this.noteCount[i];
        }
      }

      public dispose() {}
    }
  }
}
