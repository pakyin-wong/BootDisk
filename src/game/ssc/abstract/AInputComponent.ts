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

      protected isNumeric(num){
        return !isNaN(num);
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
        this.dispatchEventWith(egret.Event.CHANGE, false, {index: this._index, data:this._data});
      }
    }

    export class InputComponentFactory {
      //TODO
      static generateInputComponent(index,config): AInputComponent {
        const {type} = config;
        switch (type) {
          case InputComponentType.BALLS:
          // return new SSCInputComponent(index, config);
          throw new Error('No Ball Component');
          case InputComponentType.TEXTAREA:
          throw new Error('No TextArea Component');
          case InputComponentType.CHECKBOXES:
          throw new Error('No Checkboxes Component');
          // default: 
          // throw new Error('Input type not defined.')
        }
        return null;
      }
    }
  }
}