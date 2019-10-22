namespace components {
  export class SegmentedControl extends eui.Component implements eui.UIComponent {
    private tabBar: eui.TabBar;
    private collection: eui.ArrayCollection;

    public constructor() {
      super();
      this.tabBar = new eui.TabBar();
      this.tabBar.percentWidth = 100;
      this.tabBar.percentHeight = 100;
      // https://developer.egret.com/en/apidoc/index/name/eui.TabBar
      this.tabBar.touchChildren = false;
      this.addChild(this.tabBar);
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
      super.childrenCreated();
      const items = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab5'];
      const tlayout = new eui.TileLayout();
      tlayout.horizontalGap = 0;
      tlayout.verticalGap = 0;
      tlayout.requestedColumnCount = items.length;
      this.tabBar.itemRenderer = components.SegmentedControlTabItem;
      this.tabBar.layout = tlayout;
      this.collection = new eui.ArrayCollection(items);
      this.tabBar.dataProvider = this.collection;
      this.tabBar.useVirtualLayout = true;

      this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDragStart, this);
      //   this.tabBar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBarItemClick, this);
      const shape = new egret.Shape();
      shape.graphics.beginFill(0xffffff, 1);
      shape.graphics.drawRoundRect(0, 0, this.width, this.height, 16, 16);
      shape.graphics.endFill();
      this.addChild(shape);
      this.mask = shape;
      // event listener
    }

    private onDragStart(event: egret.TouchEvent) {
      const [touchedChild] = this.tabBar.$children.filter((tab: egret.DisplayObject) => {
        return tab.$hitTest(event.stageX, event.stageY);
      });
      let firstX = null;
      let savedChildIndex = 0;
      const moveListener = (moveEvt: MouseEvent) => {
        if (!firstX) {
          firstX = moveEvt.pageX;
          return;
        }
        const diffX = moveEvt.pageX - firstX;
        savedChildIndex = this.tabBar.getChildIndex(touchedChild);
        this.tabBar.setChildIndex(touchedChild, this.tabBar.$children.length);
        touchedChild.$children[0].x = diffX * -1;
        console.log(diffX);
      };
      const upListener = () => {
        const index = this.tabBar.$children.indexOf(touchedChild);
        const temp = this.collection.getItemAt(index);
        // this.collection.replaceItemAt(this.collection.getItemAt(index + 1), index);
        // this.collection.replaceItemAt(temp, index + 1);
        this.collection.removeItemAt(index);
        // window.requestAnimationFrame(() => {
        this.collection.addItemAt(temp, index + 1);
        // });

        // touchedChild.$children[0].x = 0;
        // this.tabBar.setChildIndex(touchedChild, savedChildIndex);
        window.removeEventListener('mousemove', moveListener);
        window.removeEventListener('mouseup', upListener);
      };
      window.addEventListener('mousemove', moveListener);
      window.addEventListener('mouseup', upListener);
      // set
      //   this.tabBar.selectedIndex = this.tabBar.$children.indexOf(touchedChild);
    }
  }
}
