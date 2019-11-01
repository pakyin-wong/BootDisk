namespace components {
  export class SegmentedControl extends eui.Component implements eui.UIComponent {
    private tabBar: eui.SortableList;
    private collection: eui.ArrayCollection;
    private activeItemIndex = 0;

    public constructor() {
      super();
      this.tabBar = new eui.SortableList();
      this.tabBar.percentWidth = 100;
      this.tabBar.percentHeight = 100;
      // https://developer.egret.com/en/apidoc/index/name/eui.TabBar
      //   this.tabBar.touchChildren = false;
      this.addChild(this.tabBar);
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
      super.childrenCreated();
      const items = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab7'];
      // const tlayout = new eui.HorizontalLayout();
      // tlayout.gap = 0;
      // tlayout.horizontalGap = 0;
      // tlayout.verticalGap = 0;
      // tlayout.requestedColumnCount = items.length;
      this.collection = new eui.ArrayCollection(items);
      this.tabBar.itemRenderer = components.SegmentedControlTabItem;
      // this.tabBar.layout = tlayout;
      this.tabBar.dataProvider = this.collection;

      const shape = new egret.Shape();
      shape.graphics.beginFill(0xffffff, 1);
      shape.graphics.drawRoundRect(0, 0, this.width, this.height, 16, 16);
      shape.graphics.endFill();
      this.addChild(shape);
      this.mask = shape;

      this.tabBar.selectedIndex = 0;
    }

    private setActiveItemIndex(newIndex: number) {
      const old = this.tabBar.$children[this.activeItemIndex] as eui.Group;
      old.currentState = 'up';
      this.activeItemIndex = newIndex;
      const newItem = this.tabBar.$children[this.activeItemIndex] as eui.Group;
      newItem.currentState = 'down';
      //   this.tabBar.$children.forEach((group: eui.Group, index: number) => {
      //     group.currentState = index === newIndex ? 'down' : 'up';
      //   });
      this.onSelectedIndexChange();
    }

    private onSelectedIndexChange() {
      console.log('in', this.activeItemIndex);
    }
  }
}
