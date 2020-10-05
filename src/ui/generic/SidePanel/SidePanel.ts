namespace we {
  export namespace ui {
    export class SidePanel extends core.BaseEUI {
      protected _bg: eui.Rect;
      protected _tabbar: eui.List;
      protected _tabBarGroup: eui.Group;
      protected _tweenGroup: eui.Group;
      protected _viewStack: eui.ViewStack;

      protected _isCollapsed = true;
      protected _maxPanelHeight = 1153;
      protected _targetHeight = 1153;

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

        this.initTabs();
        this.dispatchChange();
      }

      protected initTabs() {}

      protected destroy() {
        super.destroy();
        this.dispatchChange();
      }

      protected onClearSelection() {
        this._tabbar.selectedIndex = -1;

        egret.Tween.removeTweens(this._tweenGroup);
        egret.Tween.removeTweens(this._tabBarGroup);
        egret.Tween.removeTweens(this._viewStack);
        egret.Tween.removeTweens(this._bg);

        egret.Tween.get(this._viewStack).to({ height: 0 }, 200);
        egret.Tween.get(this._tweenGroup)
          .to({ scaleY: 0 }, 200)
          .set({ visible: false })
          .to({ scaleX: 0, alpha: 0 }, 200);
        egret.Tween.get(this._tabBarGroup)
          .wait(200)
          .to({ y: 0 }, 200);
        egret.Tween.get(this._bg)
          .wait(200)
          .to({ ellipseHeight: 56, ellipseWidth: 56 }, 200);

        this._isCollapsed = true;
        this.dispatchChange();
      }

      public get isCollapsed() {
        return this._isCollapsed;
      }

      protected onSelected() {
        if (this.isCollapsed) {
          this._viewStack.selectedIndex = this._tabbar.selectedIndex;

          this.updateTargetHeight();
          this.tweenExpand(200);

          this._isCollapsed = false;

          this.dispatchChange();
        } else {
          this._viewStack.selectedIndex = this._tabbar.selectedIndex;
          this.updateTargetHeight();
          this.tweenExpand(200);
        }
      }

      protected updateTargetHeight() {}

      protected tweenExpand(interval: number) {
        egret.Tween.removeTweens(this._tweenGroup);
        egret.Tween.removeTweens(this._tabBarGroup);
        egret.Tween.removeTweens(this._viewStack);
        egret.Tween.removeTweens(this._bg);

        egret.Tween.get(this._viewStack)
          .wait(interval)
          .to({ height: this._targetHeight }, interval);
        egret.Tween.get(this._tweenGroup)
          .to({ scaleX: 1 }, interval)
          .set({ visible: true })
          .to({ scaleY: 1, alpha: 1 }, interval);
        egret.Tween.get(this._tabBarGroup)
          .wait(interval)
          .to({ y: 8 }, interval);
        egret.Tween.get(this._bg)
          .wait(interval)
          .to({ ellipseHeight: 28, ellipseWidth: 28 }, interval);
      }
    }
  }
}
