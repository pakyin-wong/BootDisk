namespace we {
  export namespace overlay {
    export class MobileQuickBet extends ui.Panel {
      private _controlGroup: eui.Group;
      private _tableId: string;

      constructor(tableId: string) {
        super('MobileQuickBet');
        this._tableId = tableId;
      }

      private changeLang() {}

      protected mount() {
        let generalGameType: string;
        const tableInfo = env.tableInfos[this._tableId];

        switch (tableInfo.gametype) {
          //  switch (0) {
          case we.core.GameType.BAC:
          case we.core.GameType.BAI:
          case we.core.GameType.BAS:
            generalGameType = 'ba';
            break;

          case we.core.GameType.RO:
            generalGameType = 'ro';
            break;

          case we.core.GameType.DT:
          default:
            generalGameType = 'dt';
        }

        // const displayItem = new we.ui.MobileLiveListItem(generalGameType + '.LiveListItemSkin');
        // const displayItem = new we.ui.ControlItem(generalGameType + '.LiveOverlayItemSkin');
        const displayItem = new we.ui.MobileOverlayItem(generalGameType + '.LiveOverlayItemSkin');
        this._controlGroup.addChild(displayItem);
        displayItem.setData(tableInfo);

        // this._txt_title.renderText = () => `${i18n.t('overlaypanel_memberreport_title')}`;
        this.addListeners();
      }

      protected addListeners() {
        // this._btn_week.$addListener('CLICKED', this.search.bind(this, 'week'), this);
      }
    }
  }
}
