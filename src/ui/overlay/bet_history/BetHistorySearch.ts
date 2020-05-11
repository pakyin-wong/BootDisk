namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistorySearch extends ui.Panel {
        protected _btn_clean: eui.Image;

        constructor() {
          super();
          this.isPoppable = true;
          this.hideOnStart = true;
        }

        protected mount() {
          super.mount();
          this.initBetHistorySearch();
        }

        protected initBetHistorySearch() {}
      }
    }
  }
}
