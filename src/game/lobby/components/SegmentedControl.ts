namespace we {
  export namespace lobby {
    export class SegmentedControl extends eui.Component implements eui.UIComponent {
      private tabBar: ui.SortableList;
      private collection: eui.ArrayCollection;
      private activeItemIndex = 0;

      public constructor() {
        super();
        this.tabBar = new ui.SortableList();
        this.tabBar.percentWidth = 100;
        this.tabBar.percentHeight = 100;
        // https://developer.egret.com/en/apidoc/index/name/eui.TabBar
        //   this.tabBar.touchChildren = false;

        const items = [
          'lobby.categoryPromotion',
          'lobby.categoryBacarrat',
          'lobby.categoryGoodRoad',
          'lobby.categoryLuckyWheel',
          'lobby.categoryInstant',
          'lobby.categoryOtherGame',
          'lobby.categoryFavorite',
        ];

        const tlayout = new eui.HorizontalLayout();
        tlayout.gap = 30;
        // tlayout.requestedColumnCount = items.length;
        this.collection = new eui.ArrayCollection(items);
        this.tabBar.itemRenderer = SegmentedControlTabItem;
        this.tabBar.layout = tlayout;
        this.tabBar.dataProvider = this.collection;

        this.addChild(this.tabBar);
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

        this.tabBar.selectedIndex = 0;
        console.log(this.tabBar.$children);
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
}
