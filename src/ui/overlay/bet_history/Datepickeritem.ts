namespace we {
  export namespace overlay {
    export class Datepickeritem extends core.BaseEUI {
      private _text: ui.RunTimeLabel;
      private _id;

      constructor(id) {
        super('DatePickerItem');
        this._id = id;
      }

      public get label(): ui.RunTimeLabel {
        return this._text;
      }

      public get id() {
        return this._id;
      }

      public lock;
      public date;
      public isToday;
    }
  }
}
