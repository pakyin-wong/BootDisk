namespace we {
  export namespace ui {
    export class BetInfo extends eui.Component implements eui.IItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private _data;
      private isDirty;
      private label;

      public constructor() {
        super();
        this.skinName = we.utils.getSkin('BetInfo');

        this.mount();
      }

      protected createChilden() {
        super.createChildren();
      }

      protected mount() {}

      public get data() {
        return this._data;
      }

      public set data(data: any) {
        this.isDirty = true;
        this._data = data;
        /*
      const table = env.tableInfos[data];
      // console.log(table);
      if (table.data.state === 1) {
        this.label.text = `TID${table.tableid} / ${EnumHelpers.getKeyByValue(enums.baccarat.GameState, table.data.state)}`;
      } else {
        this.label.text = `TID${table.tableid} / ${EnumHelpers.getKeyByValue(enums.baccarat.GameState, table.data.state)}`;
      }
      */
        // egret.Tween.removeTweens(this);
        // if (data === null) {
        //   this.visible = false;
        // } else {
        //   this.rect.fillColor = data;
        //   this.visible = true;
        // }
      }

      public setLayoutBoundsPosition(x: number, y: number) {
        /*
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
      */
      }
    }
  }
}
