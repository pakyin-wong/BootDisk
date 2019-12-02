namespace we {
  export namespace ui {
    export class BetSummary extends we.core.BaseEUI {
      private toggleBar: we.ui.BetSummaryToggle;
      public betinfoScroller: we.ui.BetInfoScroller;
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
        this.open = false;
        this.vlayout = new eui.VerticalLayout();
        this.vlayout.gap = 1;
        this.toggleBar = new we.ui.BetSummaryToggle(this.toggle(), this.getState());
        this.betinfoScroller = new we.ui.BetInfoScroller();
        // this.betInfoList.height = 1000;
        // this.betInfoList.height = 1000;
        this.betinfoScroller.setToggler(this.toggleBar, value => {
          this.toggleBar.onToggle(value);
        });
        this.betinfoScroller.isCollapsible = true;
        this.betinfoScroller.maxHeight = 1000;
        this.group = new eui.Group();
        this.group.addChild(this.toggleBar);
        this.group.addChild(this.betinfoScroller);
        this.group.layout = this.vlayout;
        this.group.x = 2000;
        this.group.bottom = 0;
        this.group.width = 500;
        this.addChild(this.group);
      }

      public toggle() {
        const self = this;
        return (): void => {
          if (self.open) {
            self.group.removeChild(self.betinfoScroller);
            self.open = false;
          } else {
            self.group.addChild(self.betinfoScroller);
            self.open = true;
          }
        };
      }

      public getState() {
        const self = this;
        return (): boolean => {
          return self.open;
        };
      }

      public updateTables() {
        if (this.betinfoScroller.visible) {
          this.betinfoScroller.updateTables();
          this.toggleBar.setPos(this.betinfoScroller.x, this.betinfoScroller.y);
        } else {
          // update the lower part.
        }
      }
    }
  }
}
