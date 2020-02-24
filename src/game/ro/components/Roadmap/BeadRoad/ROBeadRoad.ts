namespace we {
  export namespace ro {
    export class ROBeadRoad extends ba.BARoadBase {
      protected numRow: number;

      public constructor(_numRow: number = 3, _numCol: number = 10, _gridSize: number = 30, _scale: number = 1) {
        super(_numCol, _gridSize, _scale);

        this.numRow = _numRow;
        this.gridUnit = 1;
      }

      protected createIcon(size: number): ROBeadRoadIcon {
        const icon = new ROBeadRoadIcon(size);
        return icon;
      }

      // override for base class
      protected renderGrid() {}

      // override for base class
      protected initRoadData() {
        const n = this.numCol * this.numRow;
        let iconIndex = 0;
        this.roadMapIconList = new Array<ROBeadRoadIcon>();
        for (let i = 0; i < n; i++) {
          const icon = this.createIcon(this.gridSize / this.gridUnit);
          icon.setByObject({});
          icon.x = (this.gridSize / this.gridUnit) * (iconIndex % this.numCol);
          icon.y = (this.gridSize / this.gridUnit) * Math.floor(iconIndex / this.numCol);
          this.addChild(icon);
          this.roadMapIconList.push(icon);
          iconIndex++;
        }
        (this.roadMapIconList[0] as ROBeadRoadIcon).showHighLight();
      }

      // override for base class
      public parseRoadData(roadData: any, state: number = 0) {
        if (roadData) {
          if (!this.roadMapIconList) {
            this.initRoadData();
          } else {
            this.clearRoadData();
          }
          if (state === 0) {
            this.roadData = roadData;
          }

          // reverse the data order
          const roadDataCopy = roadData.slice().reverse();

          // trim the ending extra cells
          const maxNum = this.numCol * this.numRow;

          const exceed = roadDataCopy.length - maxNum;
          if (exceed > 0) {
            roadDataCopy.splice(0, exceed);
          }
          for (let i = 0; i < roadDataCopy.length; i++) {
            const icon = this.roadMapIconList[i];
            icon.setByObject(roadDataCopy[i]);
          }
          (this.roadMapIconList[0] as ROBeadRoadIcon).showHighLight();
        }
      }
    }
  }
}
