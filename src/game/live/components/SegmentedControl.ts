namespace we {
  export namespace live {
    export class SegmentedControl extends LiveGameTabbar implements eui.UIComponent {
      public tabBar: ui.SortableList;
      public collection: eui.ArrayCollection;
      private activeLine: eui.Rect;

      protected items;

      public constructor(items: string[] = [], type = 'live') {
        super();
        this.height = 50;

        this.items = items.map(value => {
          return {
            key: value,
            text: `${type}.gametype.${value}`,
          };
        });
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
      }

      protected initContent() {
        this.tabBar = new ui.SortableList();
        this.addChild(this.tabBar);
        this.tabBar.percentWidth = 100;
        this.tabBar.percentHeight = 100;
        // https://developer.egret.com/en/apidoc/index/name/eui.TabBar
        //   this.tabBar.touchChildren = false;

        const tlayout = new eui.HorizontalLayout();
        tlayout.gap = 30;
        // tlayout.requestedColumnCount = items.length;
        this.collection = new eui.ArrayCollection(this.items);
        this.tabBar.itemRenderer = SegmentedControlTabItem;
        this.tabBar.layout = tlayout;
        this.tabBar.dataProvider = this.collection;
        this.tabBar.addEventListener(eui.UIEvent.CHANGE, this.onSelectedIndexChanged.bind(this, false), this);
        this.tabBar.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        this.tabBar.addEventListener(eui.UIEvent.MOVE, this.onSelectedIndexChanged.bind(this, true), this);

        this.activeLine = new eui.Rect();
        this.addChild(this.activeLine);
        this.activeLine.bottom = -2;
        this.activeLine.fillColor = 0xffffff;
        this.activeLine.height = 3;

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

      private async onSelectedIndexChanged(fromItemRenderer = false) {
        const { width } = this.tabBar.$children[this.tabBar.selectedIndex];
        const x = (this.tabBar.$children[this.tabBar.selectedIndex] as SegmentedControlTabItem).destinationX;
        egret.Tween.removeTweens(this.activeLine);
        await new Promise((resolve, reject) => {
          egret.Tween.get(this.activeLine)
            .to({ x, width }, fromItemRenderer ? 400 : 200)
            .call(resolve);
        });
      }

      private onChange(evt) {
        this.dispatchEvent(new egret.Event('CHANGE'));
      }

      public setSelectedIndex(idx: number) {
        this.tabBar.selectedIndex = idx;
      }
    }
  }
}
