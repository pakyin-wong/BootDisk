namespace we {
  export namespace live {
    export class LiveGameTabbar extends core.BaseEUI implements eui.UIComponent {
      public tabBar: eui.ListBase;
      public background: egret.DisplayObject;
      public collection: eui.ArrayCollection;

      protected items: string[];

      public constructor(items: string[] = []) {
        super('LiveGameTabbar');
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
        // https://developer.egret.com/en/apidoc/index/name/eui.TabBar
        //   this.tabBar.touchChildren = false;

        // ['live.gametype.bacarrat', 'live.gametype.dragontiger', 'live.gametype.luckywheel', 'live.gametype.wheel', 'live.gametype.dice', 'live.gametype.goodroad'];

        this.collection = new eui.ArrayCollection(this.items);
        this.tabBar.itemRenderer = LiveGameTabItem;
        this.tabBar.dataProvider = this.collection;

        dir.evtHandler.addEventListener(core.Event.LIVE_PAGE_LOCK, this.onLockChanged, this);
        dir.evtHandler.addEventListener(core.Event.UPDATE_NAVBAR_OPACITY, this.onBackgroundOpacityUpdate, this);
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.LIVE_PAGE_LOCK, this.onLockChanged, this);
        dir.evtHandler.removeEventListener(core.Event.UPDATE_NAVBAR_OPACITY, this.onBackgroundOpacityUpdate, this);
      }

      protected onBackgroundOpacityUpdate(evt: egret.Event) {
        const value = evt.data;
        this.background.alpha = value;
      }

      protected onLockChanged(evt: egret.Event) {
        const isLock = evt.data;
        this.tabBar.touchEnabled = !isLock;
        this.tabBar.touchChildren = !isLock;
      }

      public setSelectedIndex(idx: number) {
        this.tabBar.selectedIndex = idx;
      }

      public get selectedIndex(): number {
        return this.tabBar.selectedIndex;
      }
    }
  }
}
