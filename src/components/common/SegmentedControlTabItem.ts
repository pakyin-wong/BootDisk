namespace components {
  export class SegmentedControlTabItem extends eui.Component implements eui.IItemRenderer {
    public selected: boolean;
    public itemIndex: number;
    private _data: any;

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

    public get data() {
      return this._data;
    }

    public set data(data: any) {
      this.isDirty = false;
      this._data = data;
      this.label.text = data;
      egret.Tween.removeTweens(this);
      if (this.destinationX !== Infinity) {
        this.x = this.destinationX;
      }
      // if (data === null) {
      //   this.visible = false;
      // } else {
      //   this.rect.fillColor = data;
      //   this.visible = true;
      // }
    }

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
