// TypeScript file
namespace we {
  export namespace lo {
    export abstract class AInputComponent extends core.BaseEUI implements IInputComponent {
      protected _config: any;
      protected _data: any;
      protected _index: number;

      constructor(index: number, config: any) {
        super();
        this._index = index;
        this._config = config;
        this.addEventListeners();
      }

      public addEventListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
      }

      public removeEventListners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
      }

      protected updateText() {}

      public validate() {
        if (this._config.validate) {
          return this._config.validate(this._data);
        }
        return false;
      }

      // update the data when user interact with the component
      protected updateData() {
        // const dataType: InputDataType = this._config.dataType;
        this._data = '';
        this.dispatchEventWith(egret.Event.CHANGE, false, { index: this._index, data: this._data });
      }
    }
  }
}
