namespace we {
  export namespace ba {
    export class BABigRoad extends BARoadBase {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1, _gridLine: number = 1) {
        super(_numCol, _gridSize, _scale, _gridLine);
        this.gridUnit = 1;

        const colorFilter = new egret.ColorMatrixFilter([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]);
        this._textLayer.filters = [colorFilter]; // colors[2];
      }

      protected createIcon(size: number): BABigRoadIcon {
        return new BABigRoadIcon(size);
      }

      protected renderGrid() {
        super.renderGrid();
        if (!this.darkModeNumber) {
          // is dark mode
          const colorFilter = new egret.ColorMatrixFilter([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]);
          this._textLayer.filters = [colorFilter]; // colors[2];
        } else {
          this._textLayer.filters = []; // colors[2];
        }
      }
    }
  }
}
