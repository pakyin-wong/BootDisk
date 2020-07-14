namespace we {
  export namespace ui {
    export class RadialProgressIndicator extends eui.Component implements eui.UIComponent {
      private progressShape: egret.Shape;

      private _progress: number = 0;

      private sectionRatios: number[] = [];

      private _thickness: number = 10;

      public startColor: number = 0x00ff00;
      public endColor: number = 0xff0000;

      public constructor() {
        super();
        this.progressShape = new egret.Shape();
        this.progressShape.width = this.width;
        this.progressShape.height = this.height;
        this.addChild(this.progressShape);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.progress = this._progress;
      }

      get progress(): number {
        return this._progress;
      }

      set progress(value: number) {
        this._progress = value;
        if (this.width !== this.progressShape.width || this.height !== this.progressShape.height) {
          this.progressShape.width = this.width;
          this.progressShape.height = this.height;
          this.computeMinSectionRatio();
        }
        this.updateProgressShape();
      }

      public $setWidth(value: number) {
        super.$setWidth(value);
        this.progressShape.width = value;
        if (this.width !== this.height) {
          this.computeMinSectionRatio();
        }
        this.updateProgressShape();
      }

      public $setHeight(value: number) {
        super.$setHeight(value);
        this.progressShape.height = value;
        if (this.width !== this.height) {
          this.computeMinSectionRatio();
        }
        this.updateProgressShape();
      }

      get thickness(): number {
        return this._thickness;
      }
      set thickness(value: number) {
        this._thickness = value;
        if (this.width !== this.height) {
          this.computeMinSectionRatio();
        }
        this.updateProgressShape();
      }

      private computeMinSectionRatio() {
        this.sectionRatios = [];
        const t = this._thickness;
        const w = this.width;
        const h = this.height;
        const pi = Math.PI;
        const tLength = 2 * w + (pi - 2) * h - pi * t; // total length
        let tempLength = tLength;

        let sLength = 0.25 * pi * (h - t); // section 1 length
        tempLength = tempLength - sLength;
        this.sectionRatios.push(tempLength / tLength);

        sLength = w - h; // section 2 length
        tempLength = tempLength - sLength;
        this.sectionRatios.push(tempLength / tLength);

        sLength = 0.5 * pi * (h - t); // section 3 length
        tempLength = tempLength - sLength;
        this.sectionRatios.push(tempLength / tLength);

        sLength = w - h; // section 4 length
        tempLength = tempLength - sLength;
        this.sectionRatios.push(tempLength / tLength);
      }

      private updateProgressShape() {
        const graphics = this.progressShape.graphics;
        graphics.clear();
        const color = utils.lerpColor(this.endColor, this.startColor, this._progress);
        graphics.lineStyle(this._thickness, color, 1);
        const isPerfectCircle = this.width === this.height;

        if (this.width < this.height) {
          egret.error(`RadialProgressIndicator's height must not greater than its width`);
        }

        if (isPerfectCircle) {
          const r = (this.height - this._thickness) / 2;
          const d = this.height / 2;
          const deg = 270 - 360 * utils.getProportion(this._progress, 0, 1);
          graphics.drawArc(d, d, r, utils.deg2rad(270), utils.deg2rad(deg), true);
        } else {
          // compute necessary params
          const r = (this.height - this._thickness) / 2;
          const d = this.height / 2;
          const d2 = r + this.width - this.height;
          const t = this._thickness / 2;
          const b = this.height - this._thickness / 2;
          // s1
          if (this._progress > this.sectionRatios[0]) {
            const deg = 270 - 90 * utils.getProportion(this._progress, this.sectionRatios[0], 1);
            graphics.drawArc(d, d, r, utils.deg2rad(270), utils.deg2rad(deg), true);
          }

          // s2
          if (this._progress > this.sectionRatios[1]) {
            const pos = d2 - (d2 - d) * utils.getProportion(this._progress, this.sectionRatios[1], this.sectionRatios[0]);
            graphics.moveTo(d2, t);
            graphics.lineTo(pos, t);
          }

          // s3
          if (this._progress > this.sectionRatios[2]) {
            const deg = 90 - 180 * utils.getProportion(this._progress, this.sectionRatios[2], this.sectionRatios[1]);
            graphics.drawArc(d2, d, r, utils.deg2rad(90), utils.deg2rad(deg), true);
          }

          // s4
          if (this._progress > this.sectionRatios[3]) {
            const pos = d - (d - d2) * utils.getProportion(this._progress, this.sectionRatios[3], this.sectionRatios[2]);
            graphics.moveTo(d, b);
            graphics.lineTo(pos, b);
          }

          // s5
          if (this._progress > 0) {
            const deg = 180 - 90 * utils.getProportion(this._progress, 0, this.sectionRatios[3]);
            graphics.drawArc(d, d, r, utils.deg2rad(180), utils.deg2rad(deg), true);
          }
          // console.log(' this._progress ', this._progress);
        }
      }
    }
  }
}
