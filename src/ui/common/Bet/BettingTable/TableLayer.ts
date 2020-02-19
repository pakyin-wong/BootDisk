namespace we {
  export namespace ui {
    export class TableLayer extends core.BaseEUI {
      protected _tableId: string;
      protected _type: we.core.BettingTableType;
      protected _gridMapping: { [s: string]: eui.Image };
      protected _fieldNameMapping: { [s: string]: eui.Label };
      protected _betField: any;

      protected _totalPerson: any; // Total Person for each grid
      protected _totalAmount: any; // Total amount for each grid

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

      protected setFieldNames() {
        Object.keys(this._fieldNameMapping).map(value => {
          this._fieldNameMapping[value].text = value;
        });
      }

      // Must be called if you change skin
      public init() {
        this.createMapping();
        this.setFieldNames();
        this.changeLang();
      }

      public setGameMode(isNoCommission: boolean) {
        this.currentState = isNoCommission ? 'SuperSix' : 'Normal';
        /*
        Object.keys(this._mapping).map(value => {
          this._mapping[value].draw();
        });
        */
      }

      protected changeLang() {}

      public showWinFields(betDetails: data.BetDetail[]) {
        // TODO: show the win effect of each win field
      }

      public showWinEffect(betDetails: data.BetDetail[]) {
        // TODO: show the win effect of each winning bet
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimit) {
        return false;
      }

      public onChangeLang() {
        this.changeLang();
      }
    }
  }
}
