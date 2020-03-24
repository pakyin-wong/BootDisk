namespace we {
  export namespace di {
    export class DiBeadRoad extends ba.BARoadBase {
      protected numRow: number;
      private xOffset: number;
      private yOffset: number;
      private iconItemYOffset: number;
      private iconItemColors: any;
      private isExpanded: boolean;

      protected layout: number; // layout 0 = inGame.Size, layout 1 = inGame.Odd, layout 3 = side bar

      public constructor(_numRow: number = 3, _numCol: number = 10, _gridSize: number = 30, _scale: number = 1, _xOffset: number, _yOffset: number, _iconItemYOffset: number, _iconItemColors: any) {
        super(_numCol, _gridSize, _scale);
        this.xOffset = _xOffset;
        this.yOffset = _yOffset;
        this.numRow = _numRow;
        this.iconItemYOffset = _iconItemYOffset;
        this.iconItemColors = _iconItemColors;
        this.isExpanded = true;
      }

      public setLayout(layout: number) {
        this.layout = layout;
        this.roadMapIconList.forEach(element => {
          (element as DiBeadRoadIcon).setLayout(this.layout);
        });
      }
      protected createIcon(size: number): DiBeadRoadIcon {
        const icon = new DiBeadRoadIcon(size, this.iconItemYOffset, this.iconItemColors);
        return icon;
      }

      // override for base class
      protected renderGrid() {}

      public expandRoad(expand: boolean) {
        if (this.roadMapIconList) {
          if (expand) {
            for (let i = this.numCol; i < this.roadMapIconList.length; i++) {
              this.roadMapIconList[i].visible = true;
            }
          } else {
            for (let i = this.numCol; i < this.roadMapIconList.length; i++) {
              this.roadMapIconList[i].visible = false;
            }
          }
        }
        this.isExpanded = expand;
      }

      // override for base class
      protected initRoadData() {
        const n = this.numCol * this.numRow;
        let iconIndex = 0;

        const displaySize = this.gridSize * 0.64;
        const spacing: number = displaySize + this.iconItemYOffset;

        this.roadMapIconList = new Array<DiBeadRoadIcon>();
        for (let i = 0; i < n; i++) {
          const icon = this.createIcon(this.gridSize);
          icon.setByObject({});
          icon.x = (this.gridSize + this.xOffset) * (iconIndex % this.numCol);
          icon.y = (spacing * 4 + displaySize + this.yOffset) * Math.floor(iconIndex / this.numCol);
          this.addChild(icon);
          this.roadMapIconList.push(icon);
          iconIndex++;
        }
        (this.roadMapIconList[0] as DiBeadRoadIcon).showHighLight();

        this.setLayout(0);

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
          (this.roadMapIconList[0] as DiBeadRoadIcon).showHighLight();
        }
      }
    }
  }
}
