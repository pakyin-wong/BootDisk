namespace we {
  export namespace ui {
    export class BetSummary extends we.core.BaseEUI {
      private toggleBar: we.ui.BetSummaryToggle;
      private betInfoList: we.ui.BetInfoList;

      public constructor() {
        super();
        this.skinName = we.utils.getSkin('BetSummary');
      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      protected addEventListeners() {
        // add the listeners for
        dir.evtHandler.addEventListener(we.core.Event.BET_SUMMARY_UPDATE, this.updateTables, this);
      }

      protected mount() {
        super.mount();
        console.log('BetSummary::mount()');
        this.toggleBar.setToggle(this.toggle());

        this.betInfoList = new BetInfoList();
        this.betInfoList.x = 2000;

        this.addChild(this.betInfoList);
      }

      public toggle() {
        const self = this;
        return (): void => {
          console.log('BetSummary::toggle()');
          console.log('BetSummary::toggle()::self.betInfoList.visible' + self.betInfoList.visible);
          self.betInfoList.visible = !self.betInfoList.visible;
          self.updateTables();
        };
      }

      public updateTables() {
        if (this.betInfoList.visible) {
          this.betInfoList.updateTables();
          this.toggleBar.setPos(this.betInfoList.x, this.betInfoList.y);
        } else {
          // update the lower part.
        }
      }
    }
  }
}
