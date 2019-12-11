namespace we {
  export namespace ui {
    export class LiveSidePanel extends core.BaseEUI {
      private _tabbar: eui.List;
      private _viewStack: eui.ViewStack;
      private _scroller: Scroller;

      constructor() {
        super();
        this.skinName = 'LiveSidePanelSkin';
      }

      protected mount() {
        super.mount();
        this._tabbar.itemRenderer = ImageTabItemWithBadge;
        this._tabbar.addEventListener(eui.UIEvent.CHANGE, this.onSelected, this);
        this._tabbar.addEventListener('CLEAR_SELECTION', this.onClearSelection, this);
      }

      protected onClearSelection() {
        if (!this._scroller.isCollapsed() && !this._scroller.isAnimating()) {
          this._scroller.toggle();
          this._tabbar.selectedIndex = -1;
          this._tabbar.touchEnabled = false;
          this._tabbar.touchChildren = false;
          setTimeout(() => {
            this._tabbar.touchEnabled = true;
            this._tabbar.touchChildren = true;
          }, 400);
        }
      }

      protected onSelected() {
        if (this._scroller.isCollapsed()) {
          if (!this._scroller.isAnimating()) {
            this._scroller.toggle();
            this._viewStack.selectedIndex = this._tabbar.selectedIndex;
          } else {
            this._tabbar.selectedIndex = -1;
          }
        } else {
          this._viewStack.selectedIndex = this._tabbar.selectedIndex;
        }
      }
    }
  }
}
