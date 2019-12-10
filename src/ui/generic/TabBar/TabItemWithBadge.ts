namespace we {
  export namespace ui {
    export class TabItemWithBadge extends eui.ItemRenderer {
      constructor() {
        super();
        this.skinName = 'TabItemWithBadgeSkin';
      }

      protected getCurrentState() {
        const state = super.getCurrentState();
        if (state === 'upAndSelected') {
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        } else if (state !== 'downAndSelected') {
          this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        }
        return state;
      }

      protected dataChanged(): void {}

      protected onTap(evt: egret.TouchEvent) {
        const list = <eui.TabBar> this.parent;
        // list.selectedIndex = -1;
        list.dispatchEvent(new eui.UIEvent('CLEAR_SELECTION'));
      }
    }
  }
}
