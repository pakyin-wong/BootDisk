namespace we {
  export namespace overlay {
    export class MobileQuickBet extends ui.Panel {
      private _controlGroup: eui.Group;
      private _tableId: string;
      private displayItem: any;
      private _tableInfo: any;

      constructor(tableId: string) {
        super('MobileQuickBet');
        this._tableId = tableId;
      }

      private changeLang() {}

      protected mount() {
        this._tableInfo = env.tableInfos[this._tableId];
        this.initMobileQuickBet(this._tableInfo);
        //   let generalGameType: string;
        //   const tableInfo = env.tableInfos[this._tableId];
        //   switch (tableInfo.gametype) {
        //     //  switch (0) {
        //     case we.core.GameType.BAC:
        //     case we.core.GameType.BAI:
        //     case we.core.GameType.BAS:
        //       generalGameType = 'ba';
        //       break;

        //     case we.core.GameType.RO:
        //       generalGameType = 'ro';
        //       break;

        //     case we.core.GameType.DI:
        //       generalGameType = 'di';
        //       break;

        //     case we.core.GameType.DT:
        //     default:
        //       generalGameType = 'dt';
        //       break;

        //     case we.core.GameType.LW:
        //       generalGameType = 'lw';
        //       break;
        //   }

        //   // const displayItem = new we.ui.MobileLiveListItem(generalGameType + '.LiveListItemSkin');
        //   // const displayItem = new we.ui.ControlItem(generalGameType + '.LiveOverlayItemSkin');
        //   const displayItem = new we.ui.MobileOverlayItem('LiveOverlayItemSkin');
        //   if (we[generalGameType].LargeListItemInitHelper) {
        //     displayItem.itemInitHelper = new we[generalGameType].LargeListItemInitHelper();
        //  } //overlay d orientation 係度做
        //   this.close = displayItem.closeButton;

        //   this._controlGroup.addChild(displayItem);
        //   displayItem.setData(tableInfo);

        //   // this._txt_title.renderText = () => `${i18n.t('overlaypanel_memberreport_title')}`;
        //   this.addListeners();
      }

      protected initMobileQuickBet(tableInfo) {
        let generalGameType: string;
        // const tableInfo = env.tableInfos[this._tableId];
        switch (tableInfo.gametype) {
          //  switch (0) {
          case we.core.GameType.BAC:
          case we.core.GameType.BAI:
          case we.core.GameType.BAM:
          case we.core.GameType.BAS:
            generalGameType = 'ba';
            break;

          case we.core.GameType.RO:
          case we.core.GameType.ROL:
            generalGameType = 'ro';
            break;

          case we.core.GameType.DI:
            generalGameType = 'di';
            break;

          case we.core.GameType.DT:
          default:
            generalGameType = 'dt';
            break;

          case we.core.GameType.LW:
            generalGameType = 'lw';
            break;
        }

        // const displayItem = new we.ui.MobileLiveListItem(generalGameType + '.LiveListItemSkin');
        // const displayItem = new we.ui.ControlItem(generalGameType + '.LiveOverlayItemSkin');
        this.displayItem = new we.ui.MobileOverlayItem('LiveOverlayItemSkin');
        if (we[generalGameType].LargeListItemInitHelper) {
          this.displayItem.itemInitHelper = new we[generalGameType].LargeListItemInitHelper();
        } // overlay d orientation 係度做
        this.close = this.displayItem.closeButton;

        this._controlGroup.addChild(this.displayItem);
        this.displayItem.setData(tableInfo);

        // this._txt_title.renderText = () => `${i18n.t('overlaypanel_memberreport_title')}`;
        this.addListeners();
      }

      protected onOrientationChange() {
        this.clearOrientationDependentComponent();
        this.initOrientationDependentComponent();
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
        this._controlGroup.removeChild(this.displayItem);
        this.displayItem = null;
        this.close = null;
      }

      protected initOrientationDependentComponent() {
        this.initMobileQuickBet(this._tableInfo);
      }

      protected addListeners() {
        // this._btn_week.$addListener('CLICKED', this.search.bind(this, 'week'), this);
      }
    }
  }
}
