/* tslint:disable max-classes-per-file */
namespace we {
  export namespace lobby {
    export class Scene extends core.BaseScene {
      protected _header: eui.Group;
      private _page: eui.Component;
      private _list: eui.TabBar;
      private _items: string[] = ['lobby', 'live', 'lottery', 'egame', 'favorite'];

      private _selectedIdx: number = -1;

      private _data: any;

      constructor(data: any = null) {
        super(data);
        this._data = data;
        this.sceneHeaderPlacement = core.BaseScene.HEADER_PLACEMENT_LOBBY;
        this._skinKey = 'LobbyScene';
        // this.skinName = utils.getSkinByClassname('LobbyScene');
        this.skinName = utils.getSkinByClassname(this._skinKey);
      }

      // protected mount() {
      //   super.mount();
      // }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this._list.useVirtualLayout = false;
        this._list.itemRenderer = LobbyTabListItemRenderer;
        this._list.dataProvider = new eui.ArrayCollection(this._items);
        if (this._selectedIdx >= 0) {
          this._list.selectedIndex = this._selectedIdx;
          this.loadPage(this._items[this._selectedIdx], this._data);
        }

        this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();

        this._list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
      }

      public onEnter() {
        // After pressing the Filter
        dir.socket.getTableList();
        // dir.socket.getTableList(enums.TableFilter.BACCARAT);
        // dir.socket.getTableHistory();
        let itemIdx = 0;
        if (this._data) {
          const initPage = this._data ? this._data.page : null;
          if (initPage) {
            itemIdx = this._items.indexOf(initPage);
            itemIdx = itemIdx >= 0 ? itemIdx : 0;
            this._list.selectedIndex = itemIdx;
          }
        }
        this._selectedIdx = itemIdx;
        this.loadPage(this._items[itemIdx], this._data);
      }

      public async onFadeEnter() {}

      public onExit() {
        super.onExit();
        this.removeChildren();
      }

      public async onFadeExit() {}

      private handleTap(event: eui.ItemTapEvent) {
        this._selectedIdx = this._list.selectedIndex;
        this.loadPage(this._list.selectedItem);
      }

      private loadPage(name: string, data: any = null) {
        this._page.removeChildren();
        const page: core.BasePage = new we[name].Page(data);
        this._page.addChild(page);
        page.onEnter();
      }
    }

    class LobbyTabListItemRenderer extends ui.SortableItemRenderer {
      private label: ui.RunTimeLabel;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('LobbyTabListItemRenderer');
        mouse.setButtonMode(this, true);
      }

      public dataChanged() {
        super.dataChanged();

        this.label.renderText = () => `${i18n.t(`lobby.header.${this.data}`)}`;
        if (!this.label.bold) {
          this.label.bold = true;
          this.label.minWidth = this.label.textWidth;
          this.label.bold = false;
        } else {
          this.label.minWidth = this.label.textWidth;
        }
      }
    }
  }
}
