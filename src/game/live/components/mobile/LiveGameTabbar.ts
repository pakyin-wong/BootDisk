namespace we {
  export namespace live {
    export class LiveGameTabbar extends core.BaseEUI implements eui.UIComponent {
      public tabBar: ui.SortableList;
      public collection: eui.ArrayCollection;

      protected items: string[];

      public constructor(items: string[] = []) {
        super();
        this.height = 160;

        this.items = items;
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.initContent();
      }

      protected initContent() {
        this.tabBar = new ui.SortableList();
        this.addChild(this.tabBar);
        this.tabBar.percentWidth = 100;
        // https://developer.egret.com/en/apidoc/index/name/eui.TabBar
        //   this.tabBar.touchChildren = false;

        // ['live.gametype.bacarrat', 'live.gametype.dragontiger', 'live.gametype.luckywheel', 'live.gametype.wheel', 'live.gametype.dice', 'live.gametype.goodroad'];

        const tlayout = new eui.HorizontalLayout();
        tlayout.horizontalAlign = egret.HorizontalAlign.JUSTIFY;
        // tlayout.requestedColumnCount = items.length;
        this.collection = new eui.ArrayCollection(this.items);
        this.tabBar.itemRenderer = LiveGameTabItem;
        this.tabBar.layout = tlayout;
        this.tabBar.dataProvider = this.collection;

        dir.evtHandler.addEventListener(core.Event.LIVE_PAGE_LOCK, this.onLockChanged, this);
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.LIVE_PAGE_LOCK, this.onLockChanged, this);
      }

      protected onLockChanged(evt: egret.Event) {
        const isLock = evt.data;
        this.tabBar.touchEnabled = !isLock;
        this.tabBar.touchChildren = !isLock;
      }

      public setSelectedIndex(idx: number) {
        this.tabBar.selectedIndex = idx;
      }
    }
  }
}
