namespace we {
  export namespace di {
    export class DiBeadRoad extends ba.BARoadBase {
      protected numRow: number;
      private paddingX: number;
      private paddingY: number;
      private gapX: number;
      private gapY: number;

      private iconHeight: number;
      private iconItemYOffset: number;
      private iconItemColors: any; // [r_color,g_color,b_color, hightlight_color, hightlight_alpha]
      private highlightRadius: number;
      private firstItemPadding: number;
      private textPadding: number;
      private textSize: number;
      private diceSize: number;
      private showGrid: boolean = false;
      private showOuterGrid: boolean = false;
      private isExpanded: boolean;

      protected layout: number; // layout 0 = inGame.Size, layout 1 = inGame.Odd, layout 3 = side bar

      public constructor(width: number, _numRow: number = 1, _numCol: number = 10, gridSize: number = 30, scale: number = 1, options: any) {
        super(_numCol, gridSize, scale);
        const { paddingX, paddingY, gapX, gapY, textSize, diceSize, firstItemPadding, textPadding, highlightRadius, iconHeight, iconItemYOffset, iconItemColors, showGrid, showOuterGrid } = options;
        this.width = width;
        this.paddingX = paddingX ? paddingX : 8;
        this.paddingY = paddingY ? paddingY : 8;
        this.gapX = gapX ? gapX : 8;
        this.gapY = gapY ? gapY : 8;
        this.numRow = _numRow;
        this.iconItemYOffset = iconItemYOffset ? iconItemYOffset : 5;
        this.textSize = textSize ? textSize : 18;
        this.diceSize = diceSize ? diceSize : 22;
        this.iconHeight = iconHeight ? iconHeight : 130;
        this.firstItemPadding = firstItemPadding ? firstItemPadding : 0;
        this.textPadding = textPadding ? textPadding : 1;
        this.highlightRadius = highlightRadius ? highlightRadius : 18;
        this.iconItemColors = iconItemColors ? iconItemColors : [0xe4493a, 0x6dd400, 0x2da1fe, 0x184077, 1];
        this.showGrid = showGrid;
        this.showOuterGrid = showOuterGrid;
        this.isExpanded = true;
      }

      public setLayout(layout: number) {
        this.layout = layout;
        this.roadMapIconList.forEach(element => {
          (element as DiBeadRoadIcon).setLayout(this.layout);
        });
        this.parseRoadData(this.roadData);
      }

      protected createIcon(size: number, width: number = 0, height: number = 0): DiBeadRoadIcon {
        const icon = new DiBeadRoadIcon(width, height, this.iconItemColors, this.textSize, this.diceSize, this.iconItemYOffset, this.textPadding, this.highlightRadius);
        return icon;
      }

      // override for base class
      protected renderGrid() {
        const bgColors = [0xfafafa, 0x17181a];
        const gridColors = [0xafafaf, 0x1f2022];
        const size = (this.gridSize / this.gridUnit) * this.scale;
        this.grid.graphics.clear();

        if (this.showOuterGrid) {
          // draw bg rectangle
          this.grid.graphics.beginFill(bgColors[0], 1);
          // this.grid.graphics.drawRect(0, 0, this.numCol * size, 6 * size);
          this.grid.graphics.lineStyle(this.gridLine * this.scale, gridColors[0], 1, true);
          RoundRect.drawRoundRect(this.grid.graphics, 0, 0, this.width, this.height, this.gridCorners);
          this.grid.graphics.endFill();
        }

        if (this.showGrid) {
          // draw line if row is 1
          this.grid.graphics.lineStyle(this.gridLine * this.scale, gridColors[0], 1, true);
          if (this.numRow === 1) {
            const iconWidth = (this.width - this.firstItemPadding*2 - this.paddingX * 2 - this.gapX * (this.numCol - 1)) / this.numCol;
            let lineX: number = this.paddingX + iconWidth + this.firstItemPadding*2 + this.gapX * 0.5;
            for (let i = 0; i < this.numCol - 1; i++) {
              this.grid.graphics.moveTo(lineX, 0);
              this.grid.graphics.lineTo(lineX, this.iconHeight + this.paddingY * 2);
              lineX += iconWidth + this.gapX;
            }
          }
        }
      }

      public expandRoad(expand: boolean) {
        if (this.roadMapIconList && this.roadData) {
          const min = Math.min(this.roadData.length, this.roadMapIconList.length);
          if (expand) {
            for (let i = this.numCol; i < min; i++) {
              this.roadMapIconList[i].visible = true;
            }
          } else {
            for (let i = this.numCol; i < min; i++) {
              this.roadMapIconList[i].visible = false;
            }
          }
        }
        this.isExpanded = expand;
      }

      // override for base class
      public initRoadData() {
        const n = this.numCol * this.numRow;
        let iconIndex = 0;

        // const displaySize = this.gridSize * 0.64;
        // const spacing: number = displaySize + this.iconItemYOffset;

        const iconWidth = (this.width - this.firstItemPadding*2 - this.paddingX * 2 - this.gapX * (this.numCol - 1)) / this.numCol;
        const iconHeight = this.iconHeight;

        this.roadMapIconList = new Array<DiBeadRoadIcon>();
        let iconX: number = this.paddingX + this.firstItemPadding;
        for (let i = 0; i < n; i++) {
          const icon = this.createIcon(this.gridSize, iconWidth, iconHeight);
          icon.setByObject({});
          if (i% this.numCol === 0) {
            icon.x = this.paddingX + this.firstItemPadding + (iconWidth + this.gapX) * (iconIndex % this.numCol);
          } else {
            icon.x = this.paddingX + this.firstItemPadding*2 + (iconWidth + this.gapX) * (iconIndex % this.numCol);
          }
          icon.y = this.paddingY + (iconHeight + this.gapY) * Math.floor(iconIndex / this.numCol);
          icon.addToLayer(this._staticLayer);
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
          this.expandRoad(this.isExpanded);
        }
      }
    }
  }
}
