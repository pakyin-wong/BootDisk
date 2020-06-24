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
      }

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
