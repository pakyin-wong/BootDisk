namespace components {
  export class SegmentedControlTabItem extends eui.SortableItemRenderer {
    public mySelected: boolean;
    public itemIndex: number;
    public myData: any;

    private label: eui.Label;

    protected destinationX: number = Infinity;
    protected destinationY: number = Infinity;
    protected isDirty = true;

    public constructor() {
      super();
      this.skinName = utils.getSkin('SegmentedControlTabItem');
      //   this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
      this.isDirty = true;
    }

    // public get selected() {
    //   return this.mySelected;
    // }

    // public set selected(mySelected) {
    //   console.log('getcurr > this.mySelected = mySelected', this.mySelected, mySelected);
    //   this.mySelected = mySelected;
    //   this.invalidateState();
    // }

    // public get data() {
    //   return this.myData;
    // }

    // public set data(data: any) {
    //   eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
    //   this.dataChanged();

    // }

    public clone() {
      const clone: SegmentedControlTabItem = <SegmentedControlTabItem>super.clone();
      clone.data = this.data;
      return clone;
    }

    public dataChanged() {
      this.isDirty = false;
      this.myData = this.data;
      this.label.text = this.data;
      egret.Tween.removeTweens(this);
      if (this.destinationX !== Infinity) {
        this.x = this.destinationX;
      }
    }

    // protected getCurrentState(): string {
    //   console.log('getCurrentState', this.myData, this.mySelected);
    //   return this.mySelected ? 'down' : 'up';
    // }

    // private onClick() {
    //   console.log('cick', this);
    // }
    private isDeltaIdentity(m) {
      return m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1;
    }

    public setLayoutBoundsPosition(x: number, y: number) {
      const matrix = this.$getMatrix();
      if (!this.isDeltaIdentity(matrix) || this.anchorOffsetX !== 0 || this.anchorOffsetY !== 0) {
        const bounds = egret.$TempRectangle;
        this.getLayoutBounds(bounds);
        x += this.$getX() - bounds.x;
        y += this.$getY() - bounds.y;
      }
      if (this.isDirty) {
        this.isDirty = false;
        this.destinationX = x;
        this.destinationY = y;
        const changed = super.$setX.call(this, x);
        if (super.$setY.call(this, y) || changed) {
          eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
        }
      } else {
        if (this.destinationX !== x || this.destinationY !== y) {
          this.destinationX = x;
          this.destinationY = y;
          // cancel current tween
          egret.Tween.removeTweens(this);
          // tween move to new position
          egret.Tween.get(this).to({ x, y }, 500);
          // dispatch move event
          eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
        }
      }

      // const changed = super.$setX.call(this, x);
      // if (super.$setY.call(this, y) || changed) {
      //   eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
      // }
    }
  }
}
