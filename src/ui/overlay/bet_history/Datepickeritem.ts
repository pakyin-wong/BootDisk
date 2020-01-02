namespace we {
  export namespace overlay {
    export class Datepickeritem extends core.BaseEUI {
      private _text: ui.RunTimeLabel;

      constructor() {
        super('overlay/DatePickerItem');
      }

      public get label(): ui.RunTimeLabel {
        return this._text;
      }
    }
  }
}
