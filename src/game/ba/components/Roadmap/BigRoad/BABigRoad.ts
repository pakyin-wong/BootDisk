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

      // state 0 = update, 1 = predict, 2 = restore from predict
      public parseRoadData(roadData: any, state: number = 0) {
        if (roadData) {
          if (this.roadData) {
            // check if the road data has changed, ignore if they are identical
            if (state === 0 && roadData.length === this.roadData.length) {
              let isDifferent: boolean = false;
              for (let i = 0; i < this.roadData.length; i++) {
                if (roadData[i]) {
                  if (this.roadData[i].v !== roadData[i].v || this.roadData[i].t !== roadData[i].t) {
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
            if (!roadDataCopy[i].v) {
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
            if (icon.isAtAnimateLayer) {
              icon.addToLayer(this._shapeLayer, this._textLayer);
            }
            icon.setByObject(roadDataCopy[i]);

            if (roadDataCopy[i].isPredict && roadDataCopy[i].v) {
              icon.addToAnimateLayer(this._dynamicLayer);
              icon.animate();
            }
          }
          // this.updateTexture();
        }
      }
    }
  }
}
