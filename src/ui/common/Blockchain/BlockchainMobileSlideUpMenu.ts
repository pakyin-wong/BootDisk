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

      public showCardInfoPanel() {
        this.setPage({
          class: blockchain.CardInfoPanel,
          title: 'cardinfo',
          backClass: blockchain.DeckPanel,
          backTitle: 'deckpanel',
        });
        this.show();
      }
      public showDeckPanel() {
        this.setPage({
          class: blockchain.DeckPanel,
          title: 'deckpanel',
        });
        this.show();
      }
      public showHelpPanel() {
        this.setPage({
          class: blockchain.HelpPanel,
          title: 'helppanel',
        });
        this.show();
      }
    }
  }
}
