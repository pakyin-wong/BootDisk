namespace we {
  export namespace ui {
    export class BrightnessFilter extends egret.ColorMatrixFilter {
      protected _alpha: number = 100;

      public constructor(matrix?: number[]) {
        super(matrix);
      }

      public set alpha(value) {
        this._alpha = value;
        const matrix = this.matrix;
        if (matrix && matrix.length === 20) {
          matrix[4] = this._alpha;
          matrix[9] = this._alpha;
          matrix[14] = this._alpha;
          this.matrix = matrix;
        }
      }
    }
  }
}
