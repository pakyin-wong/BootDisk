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
        for (let i = 0; i < this.inputData.length; i++) {
          if (this.inputData[i] === '') {
            this.onInputInvalidate();
            return;
          }
        }
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

      protected validateBetLimit() {
        //  [
        //   {
        //     gameroundid: '20200101210',
        //     map:
        //     [
        //       {
        //         betCode:'FIVE120',
        //         betlimits:[
        //           '12345:200','11345:0','13456:200'
        //         ]
        //       },
        //       {
        //         betCode:'12345OPTIONALINPUT',
        //         betlimits:[
        //           '12345:200','11345:0','13456:200'
        //         ]
        //       },
        //     ]
        //   },
        //   {
        //     gameroundid: '20200101211',
        //     map:
        //     [
        //       {
        //         betCode:'INTEREST1',
        //         betlimits:[
        //           '0:200','11345:0','13456:200'
        //         ]
        //       },
        //     ]
        //   }
        //  ]
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
          for (let i = 0; i < this._config.mappingIndex.length; i++) {
            this._config.mapping(this.inputData, this._config.pattern);
          }
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
        // this.totalNoteCount = this.betFields.length;
      }

      public dispose() {}
    }
  }
}
