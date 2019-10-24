namespace components {
  export class LobbyBacarratListItem extends eui.Component implements eui.IItemRenderer {
    public selected: boolean;
    public itemIndex: number;
    private _data: any;

    private rect: eui.Rect;
    private label: eui.Label;

    protected destinationX: number = Infinity;
    protected destinationY: number = Infinity;
    protected isDirty = true;

    public constructor() {
      super();
      this.skinName = utils.getSkin('LobbyBacarratListItem');
      this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    public get data() {
      return this._data;
    }

    public set data(data: any) {
      this.isDirty = true;
      this._data = data;
      const table = env.tableInfos[data];
      console.log(table);
      if (table.gameData.gameState === 1) {
        this.label.text = `TID${table.tableID} / ${EnumHelpers.getKeyByValue(enums.baccarat.GameState, table.gameData.gameState)}STATE --- ${table.gameData.currTime}`;
      } else {
        this.label.text = `TID${table.tableID} / ${EnumHelpers.getKeyByValue(enums.baccarat.GameState, table.gameData.gameState)}S / ${table.gameData.currTime}`;
      }
      egret.Tween.removeTweens(this);
      // if (data === null) {
      //   this.visible = false;
      // } else {
      //   this.rect.fillColor = data;
      //   this.visible = true;
      // }
    }

    private onClick() {
      console.log('cick', this.rect.fillColor);
    }
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
