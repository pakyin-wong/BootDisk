/* tslint:disable max-classes-per-file */
namespace we {
  export namespace lobby {
    export class ThreeColumnSlider extends we.core.BaseEUI {
      private _items;
      private _startIndex = 0;
      public firstItem: ThreeColumnSliderItem;
      public secondItem: ThreeColumnSliderItem;
      public thirdItem: ThreeColumnSliderItem;
      public leftNav: eui.Label;
      public rightNav: eui.Label;

      constructor() {
        super();
        this.leftNav = new eui.Label();
        this.leftNav.text = '<';
        this.leftNav.left = -40;
        this.leftNav.verticalCenter = 0;
        this.leftNav.addEventListener(egret.TouchEvent.TOUCH_TAP, this.navigate.bind(this, -1), this);
        this.rightNav = new eui.Label();
        this.rightNav.text = '>';
        this.rightNav.right = -40;
        this.rightNav.verticalCenter = 0;
        this.rightNav.addEventListener(egret.TouchEvent.TOUCH_TAP, this.navigate.bind(this, 1), this);

        this.firstItem = new ThreeColumnSliderItem(0);
        this.secondItem = new ThreeColumnSliderItem(1);
        this.thirdItem = new ThreeColumnSliderItem(2);
        this.addChild(this.leftNav);
        this.addChild(this.rightNav);
        this.addChild(this.firstItem);
        this.addChild(this.secondItem);
        this.addChild(this.thirdItem);
      }

      public mount() {
        const left = new eui.Label();
        this.addChild(left);
        const right = new eui.Label();
        this.addChild(right);
      }

      public get items() {
        return this._items;
      }

      public set items(items) {
        // reset startIndex to 0
        this.startIndex = 0;
        this._items = items;
        this._renderItems();
      }

      public get startIndex() {
        return this._startIndex;
      }

      public set startIndex(index) {
        console.log('prev', this._startIndex, 'now', index);
        this._startIndex = index;
        this._renderItems();
      }

      public navigate(dir) {
        const page = Math.ceil(this.startIndex / 3);
        const totalPage = Math.ceil(this._items.length / 3);
        if (dir > 0) {
          // go right
          let newIndex = this.startIndex;
          newIndex += 3; // next page
          newIndex += 2; // last item
          if (this.items[newIndex]) {
            // swap all three items
            this.startIndex = newIndex - 2;
            console.log('swap 3 item');
          } else {
            newIndex -= 1;
            if (this.items[newIndex]) {
              // swap one item only
              this.startIndex = newIndex - 3;
              console.log('swap one item only 2nd');
            } else {
              newIndex -= 1;
              if (this.items[newIndex]) {
                // same page next item
                this.startIndex = newIndex - 2;
                console.log('same one item only 1st');
              }
            }
          }
        } else {
          // go left
        }
      }

      private _updateNavigationDisplay() {
        let showLeftNav = false;
        let showRightNav = false;
        const page = Math.ceil(this.startIndex / 3);
        const totalPage = Math.ceil(this._items.length / 3);
        if (page > 1 && totalPage > 1) {
          showLeftNav = true;
        }
        if (page < totalPage && totalPage > 1) {
          showRightNav = true;
        }
        this.leftNav.visible = showLeftNav;
        this.rightNav.visible = showRightNav;
      }

      private _renderItems() {
        if (!this._items) {
          return;
        }
        this.firstItem.image.source = RES.getRes(this._items[this._startIndex]);
        if (this._items[this._startIndex + 1]) {
          this.secondItem.image.source = RES.getRes(this._items[this._startIndex + 1]);
        }
        if (this._items[this._startIndex + 2]) {
          this.thirdItem.image.source = RES.getRes(this._items[this._startIndex + 2]);
        }
        this._updateNavigationDisplay();
      }
    }

    class ThreeColumnSliderItem extends we.core.BaseEUI {
      public image: eui.Image;
      private index;

      constructor(index) {
        super();
        this.index = index;
        this.image = new eui.Image();
        const padding = 20;
        this.image.top = padding;
        this.image.bottom = padding;
        if (index === 0) {
          this.image.left = 0;
          this.image.right = padding * 2;
        } else if (index === 1) {
          this.image.left = padding;
          this.image.right = padding;
        } else if (index === 2) {
          this.image.left = padding * 2;
          this.image.right = 0;
        }
        this.image.source = RES.getRes('Lobby_ThreeColumnBg_png');
        this.addChild(this.image);
      }

      public mount() {
        this.width = this.$parent.width / 3;
        this.height = this.$parent.height;
        this.x = this.width * this.index;
      }
    }
  }
}
