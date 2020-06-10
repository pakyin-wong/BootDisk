namespace we {
  export namespace live {
    export class DropDownLiveGameTabbar extends LiveGameTabbar implements eui.UIComponent {
      protected review: ui.RunTimeLabel;
      protected trigger: egret.DisplayObject;
      protected items: string[];

      protected initContent() {
        this.collection = new eui.ArrayCollection();
        for (const i of this.items) {
          this.collection.addItem({
            key: i,
            renderText: () => i18n.t(`live.gametype.${i}`),
          });
        }

        utils.DropdownCreator.new({
          toggler: this.trigger,
          review: this.review,
          arrCol: this.collection,
          title: () => i18n.t(`lobby.header.live`),
          selected: this.items[0],
        });
        this.setSelectedIndex(0);

        dir.evtHandler.addEventListener(core.Event.LIVE_PAGE_LOCK, this.onLockChanged, this);
        this.trigger.addEventListener('DROPDOWN_ITEM_CHANGE', this.onChange, this);
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.LIVE_PAGE_LOCK, this.onLockChanged, this);
        // clear almost all memory when adding this
        dir.evtHandler.removeEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
        this.trigger.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onChange, this);
      }

      protected onLockChanged(evt: egret.Event) {
        const isLock = evt.data;
        if (isLock) {
          utils.DropdownCreator.lock(this.trigger);
        } else {
          utils.DropdownCreator.unlock(this.trigger);
        }
      }

      protected onChange() {
        this.dispatchEvent(new egret.Event('CHANGE'));
      }

      public setSelectedIndex(idx: number) {
        this.review.renderText = () => i18n.t(`live.gametype.${this.items[idx]}`);
        this.trigger['mDropdownItem'].selected = this.items[idx];
      }

      public get selectedIndex(): number {
        return this.trigger['mDropdownItem'] ? this.items.indexOf(this.trigger['mDropdownItem'].selected) : -1;
      }
    }
  }
}
