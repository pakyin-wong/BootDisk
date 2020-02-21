namespace we {
  export namespace ui {
    export class TableLayer extends ui.Panel {
      protected _tableId: string;
      protected _type: we.core.BettingTableType;
      protected _imageMapping: { [s: string]: eui.Image };
      protected _totalMapping: { [s: string]: eui.Label };
      protected _betField: any;
      protected _totalPersonMapping: any; // Total Person for each grid
      protected _totalAmountMapping: any; // Total amount for each grid

      constructor(skinName?: string) {
        super(skinName);
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
      }

      protected destroy() {
        // dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, function () {}, this);
      }

      public onTableListUpdate() {}

      set tableId(value: string) {
        this._tableId = value;
      }

      get tableId() {
        return this._tableId;
      }

      set type(value: we.core.BettingTableType) {
        this._type = value;
      }

      get type() {
        return this._type;
      }

      protected createMapping() {}

      // Must be called if you change skin
      public init() {
        this.createMapping();
      }

      set totalPerson(persons: any) {
        this._totalPersonMapping = persons;
        if (this._totalPersonMapping) {
          Object.keys(persons).map(value => {
            if (this._totalPersonMapping[value]) {
              this._totalPersonMapping[value].text = persons[value];
            }
          });
        }
      }

      get totalPerson() {
        return this._totalPersonMapping;
      }

      set totalAmount(amounts: any) {
        this._totalAmountMapping = amounts;
        if (this._totalAmountMapping) {
          Object.keys(amounts).map(value => {
            if (this._totalAmountMapping[value]) {
              this._totalAmountMapping[value].text = amounts[value];
            }
          });
        }
      }

      get totalAmount() {
        return this._totalAmountMapping;
      }

      public onRollover(fieldName: string) {}

      public onRollout(fieldName: string) {}
    }
  }
}
