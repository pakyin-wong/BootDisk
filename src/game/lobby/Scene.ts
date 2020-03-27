/* tslint:disable max-classes-per-file */
namespace we {
  export namespace lobby {
    export class Scene extends core.BaseScene {
      protected _header: eui.Group;
      private _page: eui.Component;
      private _list: eui.TabBar;
      private _items: string[] = ['lobby', 'live', 'lottery', 'egame', 'favorite'];

      private _data: any;

      constructor(data: any = null) {
        super(data);
        this._data = data;
        this.sceneHeaderPlacement = core.BaseScene.HEADER_PLACEMENT_LEFT;
        this.skinName = utils.getSkinByClassname('LobbyScene');
      }

      protected mount() {
        super.mount();
        this._list.useVirtualLayout = false;
        this._list.itemRenderer = LobbyTabListItemRenderer;
        this._list.dataProvider = new eui.ArrayCollection(this._items);
        this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
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

        this.loadPage(this._items[itemIdx], this._data);
        // const scroller = new ui.Scroller();
        // // scroller.percentWidth = 100;
        // scroller.width = 640;
        // scroller.percentHeight = 100;
        // scroller.right = 0;

        // this.addChild(scroller);

        // const collection = new eui.ArrayCollection([]);
        // const roomList = new ui.List();
        // const layout2 = new eui.VerticalLayout();
        // layout2.paddingBottom = 1;
        // roomList.layout = layout2;
        // roomList.enterFrom = 'right';
        // roomList.leaveTo = 'right';
        // roomList.isSwipeable = true;
        // roomList.swipeDirection = ui.SwipeDirection.right;
        // roomList.isAnimateItemTransition = true;
        // roomList.dataProvider = collection;
        // roomList.itemRenderer = ui.TestItem;
        // roomList.right = 0;
        // roomList.y = 240;
        // roomList.width = 410;
        // roomList.useVirtualLayout = false;
        // roomList.maxDisplayCount = 4;
        // setInterval(() => {
        //   roomList.addItem(Math.floor(Math.random() * 1000));
        // }, 500);
        // // scroller.viewport = roomList;
        // this.addChild(roomList);

        // setTimeout(function () {
        //   utils.linkTo('weweb://lobby/live/goodroad');
        //   // utils.linkTo('https://www.google.com', 'Google');
        // }, 8000);
      }

      public async onFadeEnter() {}

      public onExit() {
        super.onExit();
        this.removeChildren();
      }

      public async onFadeExit() {}

      // protected mount() {
      //   super.mount();
      //   // swap header parent
      //   this._header.parent && this._header.parent.removeChild(this._header);
      //   this.sceneHeader.addChild(this._header);
      // }

      private handleTap(event: eui.ItemTapEvent) {
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
