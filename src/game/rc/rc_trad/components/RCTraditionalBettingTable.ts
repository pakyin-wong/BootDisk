// TypeScript file
namespace we {
  export namespace rc {
    export class RCTraditionalBettingTable extends lo.SSCTraditionalBettingTable {
      public init() {
        const inputConfigs = this._config.input;
        if (inputConfigs && inputConfigs.length > 0) {
          for (let i = 0; i < inputConfigs.length; i++) {
            const inputComponent = we.rc.InputComponentFactory.generateInputComponent(i, inputConfigs[i]);

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
      }
    }
  }
}
