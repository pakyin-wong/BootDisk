// TypeScript file
namespace we {
  export namespace ssc {
    export abstract class ABettingTable extends core.BaseEUI implements IBettingTable {
      protected _config: any;
      protected _inputs: AInputComponent[] = [];

      inputData: any[];
      combinations: string[];
      noteCount: number[];
      totalNoteCount: number;
      betFields: string[];

      constructor(config) {
        super();
        this._config = config;
        this.inputData = [];
        this.init();
      }

      protected init() {
        const inputConfigs = this._config.input;
        if (inputConfigs && inputConfigs.length>0) {
          for (var i=0;i<inputConfigs.length;i++) {
            const inputComponent = InputComponentFactory.generateInputComponent(i,inputConfigs[i]);
            inputComponent.addEventListener(egret.Event.CHANGE, this.onInputChange, this);
            this._inputs.push(inputComponent);
            // init empty inputData
            this.inputData.push('');
          } 
        }
      }

      protected onInputChange(evt: egret.Event) {
        const {index, data} = evt.data;
        // update inputData
        this.inputData[index] = data;

        this.generateCombination();
        this.validateInput();
        this.dataMapping();
        this.generateBetFields();
        this.computeNoteCount();
      }

      protected generateCombination() {

      }

      protected validateInput(): boolean {
        for (const input of this._inputs) {
          if (!input.validate()) return false;
        }
        if (this._config.validateData) {
          if (!this._config.validateData(data)) return false;
        }
        return true;
      }

      protected dataMapping() {
        if (this._config.mapping) {
          this._config.mapping(this.inputData, this.combinations);
        }
      }

      protected generateBetFields() {

      }

      public computeNoteCount() {

      }
    }
  }
}