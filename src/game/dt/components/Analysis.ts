namespace we {
  export namespace dt {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _tableId;

      protected _playerButtonLabel;
      protected _bankerButtonLabel;

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      constructor() {
        super('dt.Analysis');
      }

      protected mount() {
        this._playerButtonLabel.text = i18n.t('baccarat.askPlayer');
        this._bankerButtonLabel.text = i18n.t('baccarat.askBanker');
      }

      public updateTableBetInfo() {}

      public updateRoad() {}
    }
  }
}
