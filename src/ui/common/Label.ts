namespace we {
  export namespace ui {
    export class Label extends eui.Label {
      protected _factor: number = 1;
      public constructor() {
        super();
      }

      public set factor(value: number) {
        this._factor = value;
      }

      public get factor() {
        return this._factor;
      }

      public $setWidth(value: number) {
        return super.$setWidth(value * this._factor);
      }

      public $setHeight(value: number) {
        return super.$setHeight(value * this._factor);
      }

      public $setSize(value: number) {
        this.scaleX = this.scaleY = 1 / this._factor;
        return super.$setSize(value * this._factor);
      }

      public $setAnchorOffsetX(value: number) {
        return super.$setAnchorOffsetX(value * this._factor);
      }

      public $setAnchorOffsetY(value: number) {
        return super.$setAnchorOffsetY(value * this._factor);
      }
    }
  }
}
