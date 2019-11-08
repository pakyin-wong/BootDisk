namespace we {
  export namespace ui {
    export class BetSummary extends we.core.BaseEUI {
      private toggleBar: we.ui.BetSummaryToggle;
      public betInfoList: we.ui.BetInfoList;
      private vlayout: eui.VerticalLayout;
      public group: eui.Group;
      public open: boolean;

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
        this.open = true;
        this.vlayout = new eui.VerticalLayout();
        this.vlayout.gap = 1;
        this.toggleBar = new we.ui.BetSummaryToggle();
        this.betInfoList = new we.ui.BetInfoList();
        this.group = new eui.Group();
        this.group.addChild(this.toggleBar);
        this.group.addChild(this.betInfoList);
        this.group.layout = this.vlayout;
        this.group.x = 2000;
        this.group.bottom = 0;
        this.group.width = 500;
        this.toggleBar.setToggle(this.toggle());
        this.addChild(this.group);
      }

      public toggle() {
        const self = this;
        const group = this.group;
        return (): void => {
          console.log('BetSummary: ' + self.betInfoList);
          if (self.open) {
            group.removeChild(self.betInfoList);
            self.open = false;
          } else {
            group.addChild(self.betInfoList);
            self.open = true;
          }
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
