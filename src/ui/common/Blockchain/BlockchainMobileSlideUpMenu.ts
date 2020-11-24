// TypeScript file
namespace we {
  export namespace ui {
    export class BlockchainMobileSlideUpMenu extends MobileSlideUpMenu {
      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        if (this._currentPage) {
          this._currentPage.addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
          this._currentPage.addEventListener('OPEN_DECK_PANEL', this.showDeckPanel, this);
          this._currentPage.addEventListener('OPEN_HELP_PANEL', this.showHelpPanel, this);
        }
      }

      public setPage(opt: any) {
        super.setPage(opt);
        this._currentPage.addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        this._currentPage.addEventListener('OPEN_DECK_PANEL', this.showDeckPanel, this);
        this._currentPage.addEventListener('OPEN_HELP_PANEL', this.showHelpPanel, this);
      }

      public showCardInfoPanel(idx: number) {
        this.setPage({
          class: blockchain.CardInfoPanel,
          title: 'cardinfo',
          skinName: "skin_mobile_portrait.bc.CardInfoPanelSkin",
          backClass: blockchain.DeckPanel,
          backTitle: 'deckpanel',
        });
        (this._currentPage as blockchain.CardInfoPanel);
        this.show();
      }
      public showDeckPanel(data:bab.GameData) {
        this.setPage({
          class: blockchain.DeckPanel,
          skinName: "skin_mobile_portrait.bc.DeckPanelSkin",
          title: 'deckpanel',
        });
        (this._currentPage as blockchain.DeckPanel).setValue(data);
        this.show();
      }
      public showHelpPanel() {
        this.setPage({
          class: blockchain.HelpPanel,
          skinName: "skin_mobile_portrait.bc.HelpPanelSkin",
          title: 'helppanel',
        });
        this.show();
      }
    }
  }
}
