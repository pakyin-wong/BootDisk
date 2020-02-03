namespace we {
  export namespace live {
    export class SegmentedControl extends core.BaseEUI implements eui.UIComponent {
      public tabBar: ui.SortableList;
      public collection: eui.ArrayCollection;
      private activeLine: eui.Rect;

      private items: string[];

      public constructor(items: string[] = []) {
        super();
        this.height = 50;
        this.tabBar = new ui.SortableList();
        this.tabBar.percentWidth = 100;
        this.tabBar.percentHeight = 100;
        // https://developer.egret.com/en/apidoc/index/name/eui.TabBar
        //   this.tabBar.touchChildren = false;

        this.items = items.map(value => {
          return `live.gametype.${value}`;
        });
        // ['live.gametype.bacarrat', 'live.gametype.dragontiger', 'live.gametype.luckywheel', 'live.gametype.wheel', 'live.gametype.dice', 'live.gametype.goodroad'];

        const tlayout = new eui.HorizontalLayout();
        tlayout.gap = 30;
        // tlayout.requestedColumnCount = items.length;
        this.collection = new eui.ArrayCollection(this.items);
        this.tabBar.itemRenderer = SegmentedControlTabItem;
        this.tabBar.layout = tlayout;
        this.tabBar.dataProvider = this.collection;
        this.tabBar.addEventListener(eui.UIEvent.CHANGE, this.onSelectedIndexChanged.bind(this, false), this);
        this.tabBar.addEventListener(eui.UIEvent.MOVE, this.onSelectedIndexChanged.bind(this, true), this);
        this.addChild(this.tabBar);

        this.activeLine = new eui.Rect();
        this.activeLine.bottom = -2;
        this.activeLine.fillColor = 0xffffff;
        this.activeLine.height = 3;
        this.addChild(this.activeLine);

        dir.evtHandler.addEventListener(core.Event.LIVE_PAGE_LOCK, this.onLockChanged, this);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
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

      public setSelectedIndex(idx: number) {
        this.tabBar.selectedIndex = idx;
      }
    }
  }
}
