namespace we {
  export namespace live {
    export class SegmentedControl extends eui.Component implements eui.UIComponent {
      public tabBar: ui.SortableList;
      public collection: eui.ArrayCollection;
      private activeLine: eui.Rect;

      public constructor() {
        super();
        this.height = 50;
        this.tabBar = new ui.SortableList();
        this.tabBar.percentWidth = 100;
        this.tabBar.percentHeight = 100;
        // https://developer.egret.com/en/apidoc/index/name/eui.TabBar
        //   this.tabBar.touchChildren = false;

        const items = ['live.gametype.bacarrat', 'live.gametype.dragontiger', 'live.gametype.luckywheel', 'live.gametype.wheel', 'live.gametype.dice', 'live.gametype.goodroad'];

        const tlayout = new eui.HorizontalLayout();
        tlayout.gap = 30;
        // tlayout.requestedColumnCount = items.length;
        this.collection = new eui.ArrayCollection(items);
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
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        // For Fixed Width Round Corner
        // Disabled to prevent overflow hidden
        // const shape = new egret.Shape();
        // shape.graphics.beginFill(0xffffff, 1);
        // shape.graphics.drawRoundRect(0, 0, this.width, this.height, 16, 16);
        // shape.graphics.endFill();
        // this.addChild(shape);
        // this.mask = shape;

        window.requestAnimationFrame(() => {
          this.tabBar.selectedIndex = 0;
          const { x, width } = this.tabBar.$children[this.tabBar.selectedIndex];
          this.activeLine.x = x;
          this.activeLine.width = width;
          console.log(this.tabBar.$children);
        });
      }

      private async onSelectedIndexChanged(fromItemRenderer = false) {
        console.log(fromItemRenderer);
        const { width } = this.tabBar.$children[this.tabBar.selectedIndex];
        const x = (this.tabBar.$children[this.tabBar.selectedIndex] as SegmentedControlTabItem).destinationX;
        egret.Tween.removeTweens(this.activeLine);
        await new Promise((resolve, reject) => {
          egret.Tween.get(this.activeLine)
            .to({ x, width }, fromItemRenderer ? 400 : 200)
            .call(resolve);
        });
      }
    }
  }
}
