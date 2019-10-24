namespace components {
  export class SegmentedControl extends eui.Component implements eui.UIComponent {
    private tabBar: eui.TabBar;
    private collection: eui.ArrayCollection;
    private activeItemIndex = 0;

    public constructor() {
      super();
      this.tabBar = new eui.TabBar();
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
      const tlayout = new eui.TileLayout();
      tlayout.horizontalGap = 0;
      tlayout.verticalGap = 0;
      tlayout.requestedColumnCount = items.length;
      this.collection = new eui.ArrayCollection(items);
      this.tabBar.itemRenderer = components.SegmentedControlTabItem;
      this.tabBar.layout = tlayout;
      this.tabBar.dataProvider = this.collection;
      this.tabBar.useVirtualLayout = true;
      this.tabBar.addEventListener(egret.Event.CHANGE, this.onSelectedIndexChange, this);
      this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDragStart, this);

      const shape = new egret.Shape();
      shape.graphics.beginFill(0xffffff, 1);
      shape.graphics.drawRoundRect(0, 0, this.width, this.height, 16, 16);
      shape.graphics.endFill();
      this.addChild(shape);
      this.mask = shape;

      //   window.requestAnimationFrame(() => {
      //     this.setActiveItemIndex(this.activeItemIndex);
      //   });
    }

    private onDragStart(event: egret.TouchEvent) {
      const [touchedChild] = this.tabBar.$children.filter((tab: egret.DisplayObject) => {
        return tab.$hitTest(event.stageX, event.stageY);
      });
      let firstX = null;
      const savedChildIndex = 0;
      let clone: egret.DisplayObject = null;
      const moveListener = (moveEvt: MouseEvent) => {
        if (!firstX) {
          firstX = moveEvt.pageX;
          touchedChild.visible = false;
          clone = new egret.DisplayObject();
          clone.$children = touchedChild.$children;
          clone.width = touchedChild.width;
          clone.height = touchedChild.height;
          clone.x = touchedChild.x;
          clone.y = touchedChild.y;
          this.addChild(clone);
          return;
        }
        const diffX = ((moveEvt.pageX - firstX) / egret.sys.DisplayList.$canvasScaleY) * egret.sys.DisplayList.$canvasScaleFactor;
        clone.anchorOffsetX = diffX * -1;
      };
      const upListener = () => {
        window.removeEventListener('mousemove', moveListener);
        window.removeEventListener('mouseup', upListener);

        if (!clone) {
          // tap only
          //   const newIndex = this.tabBar.$children.indexOf(touchedChild);
          //   this.setActiveItemIndex(newIndex);
          return;
        }

        touchedChild.visible = true;
        this.removeChild(clone);

        const max = this.tabBar.$children.reduce((prev, curr) => {
          if (curr.x > prev.x) {
            return curr;
          }
          return prev;
        });

        // find swap item
        const releaseX = Math.max(0, Math.min(max.x, clone.x + -clone.anchorOffsetX)) + max.width / 2;
        const globalCoord = this.tabBar.localToGlobal(releaseX, 0);
        const [swapChild] = this.tabBar.$children.filter((tab: egret.DisplayObject) => {
          return tab.$hitTest(globalCoord.x, globalCoord.y);
        });

        const remIndex = this.tabBar.$children.indexOf(touchedChild);
        const remData = this.collection.getItemAt(remIndex);
        const addIndex = this.tabBar.$children.indexOf(swapChild);
        const addData = this.collection.getItemAt(addIndex);

        if (remIndex === addIndex) {
          // move to same pos
          this.collection.removeItemAt(remIndex);
          this.collection.addItemAt(remData, remIndex);
          return;
        }

        this.collection.removeItemAt(remIndex);
        this.collection.addItemAt(remData, addIndex);

        // update state
        // must place after adding/removing after collection updating
        // if (remIndex === this.activeItemIndex) {
        //   this.setActiveItemIndex(addIndex);
        // } else if (addIndex === this.activeItemIndex) {
        //   this.setActiveItemIndex(remIndex);
        // }
        console.log('remIndex', remIndex);
        console.log('addIndex', addIndex);
        console.log('this.activeItemIndex', this.activeItemIndex);
      };
      window.addEventListener('mousemove', moveListener);
      window.addEventListener('mouseup', upListener);
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
