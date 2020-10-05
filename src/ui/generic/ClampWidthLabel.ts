namespace we {
  export namespace ui {
    export class ClampWidthLabel extends eui.Label {
      protected _targetWidth: number = -1;
      protected _explicitScaleX: number = 1;
      protected _explicitScaleY: number = 1;
      protected _explicitSize: number = null;
      protected _targetScaleX: number = 1;

      protected _retina: boolean = false;

      constructor() {
        super();
      }

      public childrenCreated() {
        super.childrenCreated();
        this.scaleX = this.$getScaleX();
        this.scaleY = this.$getScaleY();
        if (!this._explicitSize) {
          this.size = null;
        }
      }

      public $setText(val) {
        const result = super.$setText(val);
        // this.$invalidateTextField();
        this.updateTargetScaleX();
        return result;
      }

      public $setTargetWidth(val) {
        this._targetWidth = val;
        // this.width = val;
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

      public get retina(): boolean {
        return this._retina;
      }

      public set retina(val: boolean) {
        if (val && !this._retina) {
          // switch to retina, scale half and size double
        }
        this._retina = val;
      }

      protected updateTargetScaleX() {
        const values = {
          italic: this.italic,
          bold: this.bold,
          size: this.size,
          fontFamily: this.fontFamily,
        };

        const width = utils.measureTextWidth(this.text, values, this.style);
        console.log('widthwidthwidth',width)
        // console.log(width, this.measuredWidth, egret.sys.DisplayList.$canvasScaleFactor);
        if (this.targetWidth > 0) {
          if (this.targetWidth < width) {
            this.width = width;
            this._targetScaleX = this.targetWidth / this.width;
            this.$setScaleX(this._explicitScaleX);
          } else if (this._targetScaleX !== 1) {
            this.width = NaN;
            this._targetScaleX = 1;
            this.$setScaleX(this._explicitScaleX);
          }
          // else if (this.width !== this.targetWidth) {
          //   this.width = this.targetWidth;
          //   this._targetScaleX = 1;
          //   this.$setScaleX(this._explicitScaleX);
          // }
        }
      }

      // public get size(): number {
      //   return this.$getSize();
      // }

      // public set size(val: number) {
      //   this.$setSize(val);
      // }

      // public $getSize(): number {
      //   return this._explicitSize | RunTimeLabel.default_size;
      // }

      public $setSize(val: number): boolean {
        this._explicitSize = val || RunTimeLabel.default_size;
        const size = this._explicitSize * (this._retina ? 1.25 : 1);
        return super.$setSize(size);
      }

      public $getScaleX() {
        // const val = super.$getScaleX;
        return this._explicitScaleX;
      }

      public $setScaleX(val) {
        this._explicitScaleX = val || 1;
        const scaleX = this._targetScaleX * this._explicitScaleX * (this._retina ? 0.8 : 1);
        super.$setScaleX(scaleX);
      }

      public $getScaleY() {
        // const val = super.$getScaleX;
        return this._explicitScaleY;
      }

      public $setScaleY(val) {
        this._explicitScaleY = val || 1;
        const scaleY = this._explicitScaleY * (this._retina ? 0.8 : 1);
        super.$setScaleY(scaleY);
      }
    }
  }
}
