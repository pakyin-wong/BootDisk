/* tslint:disable max-classes-per-file */
namespace we {
  export namespace lobby {
    export class Scene extends core.BaseScene {
      protected _header: eui.Group;
      private _page: eui.Component;
      private _list: eui.TabBar;
      private _items: string[];
      private _logo: eui.Image;

      private _common_listpanel: ui.BaseImageButton;

      private _selectedIdx: number = -1;

      private _data: any;

      constructor(data: any = null) {
        super(data);
        this._data = data;
        this.sceneHeaderPlacement = core.BaseScene.HEADER_PLACEMENT_LOBBY;
        this._skinKey = 'LobbyScene';
        this.skinName = utils.getSkinByClassname(this._skinKey);
        if (env.isMobile) {
          this._items = ['lobby', 'live', 'lottery', 'egame', 'favourite'];
        } else {
          this._items = ['live', 'lottery', 'egame', 'favourite'];
        }
      }

      public get data() {
        return this._data;
      }

      public set data(val) {
        this._data = val;
      }
      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this._list.useVirtualLayout = false;
        if (!env.isMobile) {
          this._list.requireSelection = false;
        }
        this._list.itemRenderer = LobbyTabListItemRenderer;
        this._list.dataProvider = new eui.ArrayCollection(this._items);
        if (this._selectedIdx >= 0) {
          this._list.selectedIndex = this._selectedIdx;
          this.loadPage(this._items[this._selectedIdx], this._data);
        }

        this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
        if (env.isMobile) {
          dir.monitor._sideGameList.setToggler(this._common_listpanel);
        } else {
          this._logo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.home, this);
          mouse.setButtonMode(this._logo, true);
        }
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();

        this._list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
        if (!env.isMobile) {
          this._logo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.home, this);
        }
      }

      public onEnter() {
        dir.socket.getTableList();
        let itemIdx = env.isMobile ? 0 : -1;
        if (this._data) {
          const initPage = this._data ? this._data.page : null;
          if (initPage) {
            itemIdx = this._items.indexOf(initPage);
            itemIdx = itemIdx >= 0 ? itemIdx : 0;
            this._list.selectedIndex = itemIdx;
          }
        }
        this._selectedIdx = itemIdx;
        const pageStr = itemIdx > -1 ? this._items[itemIdx] : 'lobby';
        this.loadPage(pageStr, this._data);
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

      private home(e: egret.TouchEvent) {
        this._selectedIdx = -1;
        this._list.selectedIndex = -1;
        this.loadPage('lobby');
      }

      private async loadPage(name: string, data: any = null) {
        const groups = we[name].Page.resGroups;
        if (groups) {
          const tasks = groups.filter(group => !RES.isGroupLoaded(group)).map((group, idx) => () => RES.loadGroup(group, 0, new ui.ResProgressReporter(idx)));
          if (tasks.length > 0) {
            await loadingMgr.load(tasks);
          }
        }
        this._page.removeChildren();
        const page: core.BasePage = new we[name].Page(data);
        page.Scene = this;
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
          if (env.isMobile) {
            this.label.parent.width = this.label.textWidth;
          }
          this.label.bold = false;
        } else {
          this.label.minWidth = this.label.textWidth;
          if (env.isMobile) {
            this.label.parent.width = this.label.textWidth;
          }
        }
      }
    }
  }
}
