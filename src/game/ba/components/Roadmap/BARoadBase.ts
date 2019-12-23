namespace we {
  export namespace ba {
    export abstract class BARoadBase extends egret.DisplayObjectContainer {
      protected scale: number;
      protected grid: egret.Shape;
      protected numCol: number = 12;
      protected gridSize: number = 30;
      protected gridUnit: number = 1; // how many unit for each grid. 1 or 2 unit for each grid
      // private bitmap: ScaleableBitmap;
      protected darkModeNumber: number = 0;

      protected roadMapIconList: BARoadIconBase[];

      protected roadData: any;
      protected abstract createIcon(size: number): BARoadIconBase;

      public constructor(_numCol: number, _gridSize: number, _scale: number) {
        super();
        this.scale = _scale;
        this.gridSize = _gridSize;
        this.numCol = _numCol;

        this.grid = new egret.Shape();
        this.addChild(this.grid);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
      }

      protected initRoadData() {
        const n = this.numCol * 6;
        let iconIndex = 0;
        this.roadMapIconList = new Array<BARoadIconBase>();
        for (let i = 0; i < n; i++) {
          const icon = this.createIcon(this.gridSize / this.gridUnit);
          icon.setByObject({});
          icon.x = (this.gridSize / this.gridUnit) * Math.floor(iconIndex / 6);
          icon.y = (this.gridSize / this.gridUnit) * (iconIndex % 6);
          this.addChild(icon);
          this.roadMapIconList.push(icon);
          iconIndex++;
        }
      }

      public clearRoadData() {
        for (const elem of this.roadMapIconList) {
          elem.setByObject({});
          elem.stopAnimate();
        }
      }

      // state 0 = update, 1 = predict, 2 = restore from predict
      public parseRoadData(roadData: any, state: number = 0) {
        if (roadData) {
          if (this.roadData) {
            // check if the road data has changed, ignore if they are identical
            if (state === 0 && roadData.length === this.roadData.length) {
              let isDifferent: boolean = false;
              for (let i = 0; i < this.roadData.length; i++) {
                if (roadData[i]) {
                  if (this.roadData[i].V !== roadData[i].V) {
                    isDifferent = true;
                    break;
                  }
                } else {
                  isDifferent = true;
                  break;
                }
              }
              if (!isDifferent) {
                return;
              }
            }
          }

          if (!this.roadMapIconList) {
            this.initRoadData();
          } else {
            this.clearRoadData();
          }
          if (state === 0) {
            this.roadData = roadData;
          }

          // trim the leading empty cells
          const roadDataCopy = roadData.slice();
          let i: number = roadDataCopy.length - 1;
          let c: number = 0;
          while (i >= 0) {
            if (!roadDataCopy[i].V) {
              c++;
              if (c >= 6) {
                roadDataCopy.splice(i, 6);
                c = 0;
              }
            } else {
              break;
            }
            i--;
          }

          // trim the ending extra cells
          const maxNum = this.numCol * 6;

          const exceed = roadDataCopy.length - maxNum;
          if (exceed > 0) {
            roadDataCopy.splice(0, exceed);
          }
          for (let i = 0; i < roadDataCopy.length; i++) {
            const icon = this.roadMapIconList[i];
            icon.setByObject(roadDataCopy[i]);

            if (roadDataCopy[i].isPredict && roadDataCopy[i].V) {
              icon.animate();
            }
          }
        }
      }

      public render(e) {
        this.renderGrid();
      }

      protected renderGrid() {
        const bgColors = [0xffffff, 0x333333];
        const gridColors = [0xafafaf, 0x555555];

        const size = (this.gridSize / this.gridUnit) * this.scale;
        this.grid.graphics.clear();

        // draw bg rectangle
        this.grid.graphics.beginFill(bgColors[this.darkModeNumber], 1);
        this.grid.graphics.drawRect(0, 0, this.numCol * size, 6 * size);
        this.grid.graphics.endFill();

        // draw grid lines
        this.grid.graphics.lineStyle(1 * this.scale, gridColors[this.darkModeNumber], 1, true);
        let lineY: number = 0;
        for (let r = 0; r <= 6; r += this.gridUnit) {
          this.grid.graphics.moveTo(0, lineY);
          this.grid.graphics.lineTo(this.numCol * size, lineY);
          lineY += size * this.gridUnit;
        }
        let lineX: number = 0;
        for (let c = 0; c <= this.numCol; c += this.gridUnit) {
          this.grid.graphics.moveTo(lineX, 0);
          this.grid.graphics.lineTo(lineX, 6 * size);
          lineX += size * this.gridUnit;
        }

        // this.bitmap = new ScaleableBitmap(this.grid, this.grid.width, this.grid.height, null);
        // this.addChild(this.bitmap);
      }

      public set DarkMode(n: number) {
        this.darkModeNumber = n;

        this.renderGrid();

        for (const elem of this.roadMapIconList) {
          const icon = elem;
          icon.DarkMode = n;
        }
      }

      public get DarkMode(): number {
        return this.darkModeNumber;
      }

      protected onRemoved(e) {
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
          this.removeEventListener(egret.Event.ENTER_FRAME, this.render, this);
        }
      }
      protected onAdded(e) {
        this.render(null);
        // this.addEventListener(egret.Event.ENTER_FRAME, this.render, this);
      }

      public dispose() {
        if (this.hasEventListener(egret.Event.ENTER_FRAME)) {
          this.removeEventListener(egret.Event.ENTER_FRAME, this.render, this);
        }

        if (this.hasEventListener(egret.Event.ADDED_TO_STAGE)) {
          this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        }

        if (this.hasEventListener(egret.Event.REMOVED_FROM_STAGE)) {
          this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        }

        for (const elem of this.roadMapIconList) {
          elem.dispose();
        }
      }
    }
  }
}
