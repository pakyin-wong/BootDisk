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
        this.init();
      }

      protected init() {
        const inputConfigs = this._config.input;
        let isCheckBox = false;
        if (inputConfigs && inputConfigs.length > 0) {
          for (let i = 0; i < inputConfigs.length; i++) {
            const inputComponent = InputComponentFactory.generateInputComponent(i, inputConfigs[i]);
            if (inputConfigs[i].type === InputComponentType.CHECKBOXES) {
              isCheckBox = true;
            }
            inputComponent.addEventListener(egret.Event.CHANGE, this.onInputChange, this);
            this._inputs.push(inputComponent);
            // init empty inputData
            this.inputData.push('');
          }
          if (isCheckBox) {
            this.dispatchEvent(new egret.Event('INIT_CHECKBOXES'));
          }
        }
      }

      protected onInputChange(evt: egret.Event) {
        const { index, data } = evt.data;
        // update inputData
        this.inputData[index] = data;

        this.generateCombination();
        if (!this.validateInput()) {
          this.onInputInvalidate();
          return;
        }
        this.dataMapping();
        this.generateBetFields();
        this.computeNoteCount();

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

      protected onInputInvalidate() {
        this.clearData();
        if (this.bettingPanel) {
          this.bettingPanel.clearNote();
        }
      }

      public clearData() {
        this.totalNoteCount = 0;
      }

      protected dataMapping() {
        if (this._config.mapping) {
          this._config.mapping(this.inputData, this.combinations);
        }
      }

      protected generateBetFields() {}

      public computeNoteCount() {
        this.totalNoteCount = this._config.noteCountFunc(this.inputData, this.combinations);
        // this.totalNoteCount = this.betFields.length;
      }

      public dispose() {}
    }
  }
}
