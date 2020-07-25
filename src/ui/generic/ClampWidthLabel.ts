namespace we {
  export namespace ui {
    export class ClampWidthLabel extends eui.Label {
      protected _targetWidth: number = -1;
      protected _explicitScaleX: number = 1;
      protected _targetScaleX: number = 1;

      constructor() {
        super();
      }

      public $setText(val) {
        const result = super.$setText(val);
        // this.$invalidateTextField();
        this.updateTargetScaleX();
        return result;
      }

      public $setTargetWidth(val) {
        this._targetWidth = val;
        this.width = val;
        this.updateTargetScaleX();
      }
      public $getTargetWidth() {
        return this._targetWidth;
      }

      public set targetWidth(val) {
        this.$setTargetWidth(val);
      }

      public get targetWidth() {
        return this.$getTargetWidth();
      }

      protected updateTargetScaleX() {
        const values = {
          italic: this.italic,
          bold: this.bold,
          size: this.size,
          fontFamily: this.fontFamily,
        };

        const width = utils.measureTextWidth(this.text, values, this.style);
        // console.log(width, this.measuredWidth, egret.sys.DisplayList.$canvasScaleFactor);
        if (this.targetWidth > 0) {
          if (this.targetWidth < width) {
            this.width = width;
            this._targetScaleX = this.targetWidth / this.width;
            this.$setScaleX(this._explicitScaleX);
          } else if (this.width !== this.targetWidth) {
            this.width = this.targetWidth;
            this._targetScaleX = 1;
            this.$setScaleX(this._explicitScaleX);
          }
        }
      }

      public $getScaleX() {
        // const val = super.$getScaleX;
        return this._explicitScaleX;
      }

      public $setScaleX(val) {
        this._explicitScaleX = val || 1;
        const scaleX = this._targetScaleX * this._explicitScaleX;
        super.$setScaleX(scaleX);
      }
    }
  }
}
