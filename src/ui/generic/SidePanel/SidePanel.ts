namespace we {
  export namespace ui {
    export class SidePanel extends core.BaseEUI {
      protected _tabbar: eui.List;
      protected _viewStack: eui.ViewStack;
      protected _scroller: Scroller;
      protected activeLine: eui.Rect;

      protected lineMoveDuration: number = 100;

      constructor() {
        super();
        this.skinName = 'SidePanelSkin';
      }

      protected dispatchChange() {
        dir.evtHandler.dispatch(core.Event.SIDE_PANEL_CHANGE, this);
      }

      protected mount() {
        super.mount();
        this._tabbar.itemRenderer = ImageTabItemWithBadge;
        this._tabbar.addEventListener(eui.UIEvent.CHANGE, this.onSelected, this);
        this._tabbar.addEventListener('CLEAR_SELECTION', this.onClearSelection, this);

        this.activeLine = new eui.Rect();
        this.activeLine.y = this._tabbar.y + this._tabbar.height + 2;
        this.activeLine.fillColor = 0xffffff;
        this.activeLine.height = 3;
        this.addChild(this.activeLine);
        this.dispatchChange();
      }

      protected destroy() {
        super.destroy();
        this.dispatchChange();
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

          egret.Tween.removeTweens(this.activeLine);
          egret.Tween.get(this.activeLine).to({ width: 0 }, this.lineMoveDuration);
          this.dispatchChange();
        }
      }

      public get isCollapsed() {
        return this._scroller.isCollapsed();
      }

      protected onSelected() {
        if (this._scroller.isCollapsed()) {
          if (!this._scroller.isAnimating()) {
            this._scroller.toggle();
            this._viewStack.selectedIndex = this._tabbar.selectedIndex;

            const { width } = this._tabbar.$children[this._tabbar.selectedIndex];
            this.activeLine.x = this._tabbar.x + (this._tabbar.$children[this._tabbar.selectedIndex] as ItemRenderer).x;
            egret.Tween.removeTweens(this.activeLine);
            egret.Tween.get(this.activeLine).to({ width }, this.lineMoveDuration);
            this.dispatchChange();
          } else {
            this._tabbar.selectedIndex = -1;
          }
        } else {
          this._viewStack.selectedIndex = this._tabbar.selectedIndex;

          const { width } = this._tabbar.$children[this._tabbar.selectedIndex];
          const x = this._tabbar.x + (this._tabbar.$children[this._tabbar.selectedIndex] as ItemRenderer).x;
          egret.Tween.removeTweens(this.activeLine);
          egret.Tween.get(this.activeLine).to({ x, width }, this.lineMoveDuration);
        }
      }
    }
  }
}
