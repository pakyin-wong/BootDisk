namespace we {
  export namespace dil {
    export class DilBeadRoad extends ba.BARoadBase {
      protected numRow: number;
      private emptyColor: number; // color for the empty cell
      private emptyAlpha: number; // alpha for the empty cell
      private xOffset: number;
      private yOffset: number;

      private isExpanded: boolean;

      public constructor(
        _numRow: number = 3,
        _numCol: number = 10,
        _gridSize: number = 30,
        _scale: number = 1,
        _xOffset: number,
        _yOffset: number,
        _emptyColor: number = 0xc1c1c1,
        _emptyAlpha: number = 0.2
      ) {
        super(_numCol, _gridSize, _scale);
        this.xOffset = _xOffset;
        this.yOffset = _yOffset;
        this.emptyColor = _emptyColor;
        this.emptyAlpha = _emptyAlpha;
        this.numRow = _numRow;
        this.gridUnit = 1;

        this.isExpanded = true;
      }

      protected createIcon(size: number): DilBeadRoadIcon {
        const icon = new DilBeadRoadIcon(size, this.emptyColor, this.emptyAlpha);
        return icon;
      }

      // override for base class
      protected renderGrid() {}

      // override for base class
      public initRoadData() {
        const n = this.numCol * this.numRow;
        let iconIndex = 0;
        this.roadMapIconList = new Array<DilBeadRoadIcon>();
        for (let i = 0; i < n; i++) {
          const icon = this.createIcon(this.gridSize / this.gridUnit);
          icon.setByObject({});
          icon.x = (this.gridSize / this.gridUnit + this.xOffset) * (iconIndex % this.numCol);
          icon.y = (this.gridSize / this.gridUnit + this.yOffset) * Math.floor(iconIndex / this.numCol);
          // this.addChild(icon);
          icon.addToLayer(this._shapeLayer, this._textLayer);
          this.roadMapIconList.push(icon);
          iconIndex++;
        }
        (this.roadMapIconList[0] as DilBeadRoadIcon).showHighLight();
        this.expandRoad(this.isExpanded);
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
            roadDataCopy.splice(maxNum, exceed);
          }
          for (let i = 0; i < roadDataCopy.length; i++) {
            const icon = this.roadMapIconList[i];
            icon.setByObject(roadDataCopy[i]);
          }
          (this.roadMapIconList[0] as DilBeadRoadIcon).showHighLight();
          this.expandRoad(this.isExpanded);
        }
      }

      public expandRoad(expand: boolean) {
        if (this.roadMapIconList && this.roadData) {
          // const min = Math.min(this.roadData.length, this.roadMapIconList.length);
          const numPage = Math.ceil(this.numCol * this.numRow * 0.5); // number of icon in each page when not expand
          if (expand) {
            for (let i = numPage; i < this.roadMapIconList.length; i++) {
              (this.roadMapIconList[i] as DilBeadRoadIcon).layerVisible = true;
            }
          } else {
            for (let i = numPage; i < this.roadMapIconList.length; i++) {
              (this.roadMapIconList[i] as DilBeadRoadIcon).layerVisible = false;
            }
          }
        }
        this.isExpanded = expand;
      }
    }
  }
}