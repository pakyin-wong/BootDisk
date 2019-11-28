/* tslint:disable max-classes-per-file */
namespace we {
  export namespace lobby {
    export class Scene extends core.BaseScene {
      protected _header: eui.Group;
      private _page: eui.Component;
      private _list: eui.TabBar;
      private _items: string[] = ['lobby', 'live', 'lottery', 'egame', 'favorite'];

      constructor(data: any = null) {
        super(data);
        this.sceneHeaderPlacement = core.BaseScene.HEADER_PLACEMENT_LEFT;
        this.skinName = utils.getSkin('LobbyScene');
        this._list = new eui.TabBar();
        this._list.useVirtualLayout = false;
        const layout = new eui.HorizontalLayout();
        layout.gap = 30;
        this._list.layout = layout;
        this._list.itemRenderer = LobbyTabListItemRenderer;
        this._list.dataProvider = new eui.ArrayCollection(this._items);
        this._list.x = this._header.$children[0].width + layout.gap;
        this._list.verticalCenter = 0;
        this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.handleTap, this);
        this._header.addChild(this._list);
      }

      public onEnter() {
        // After pressing the Filter
        dir.socket.getTableList();
        // dir.socket.getTableList(enums.TableFilter.BACCARAT);
        dir.socket.getTableHistory();

        this.loadPage(this._items[0]);
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
        // roomList.itemRenderer = LobbyListItem;
        // roomList.right = 0;
        // roomList.y = 1;
        // roomList.width = 640;
        // roomList.useVirtualLayout = false;
        // roomList.maxDisplayCount = 4;
        // setInterval(() => {
        //   roomList.addItem(Math.floor(Math.random() * 1000));
        // }, 500);
        // // scroller.viewport = roomList;
        // this.addChild(roomList);

        // setTimeout(function () {
        // utils.linkTo('weweb://scene/ba?tableid=1');
        // utils.linkTo('https://www.google.com', 'Google');
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

      private loadPage(name) {
        this._page.removeChildren();
        const page = new we[name].Page();
        this._page.addChild(page);
      }
    }

    class LobbyTabListItemRenderer extends ui.SortableItemRenderer {
      private label: eui.Label;
      private boldWidth = null;

      public constructor() {
        super();
        this.skinName = `
<e:Skin height="50" xmlns:e="http://ns.egret.com/eui" states="up,down">
  <e:Group x="0" y="0" width="100%" height="100%">
    <e:Label id="label" text="{data}" verticalCenter="0" textColor="0xffffff" horizontalCenter="0"  alpha.up="0.7" bold.down="true"/>
  </e:Group>
</e:Skin>
        `;
      }

      public dataChanged() {
        super.dataChanged();
        this.label.text = i18n.t(`lobby.header.${this.data}`);
        // set tab item min width to bold text width
        const bold = this.label.bold;
        this.label.bold = true;
        this.boldWidth = this.width;
        this.label.bold = bold;
        this.minWidth = this.boldWidth;
      }
    }
  }
}
