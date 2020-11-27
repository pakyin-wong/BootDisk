namespace we {
  export namespace lw {
    export class LwBeadRoad extends ba.BARoadBase {
      protected numRow: number;
      public numRowCollapse: number = -1;
      private cellWidth: number;
      private cellHeight: number;
      private imageWidth: number;
      private imageHeight: number;
      private gridColor: number;
      private gridAlpha: number;
      private gridBorderColor: number;
      private theStage: egret.Stage;
      private isExpanded: boolean;

      public constructor(
        _numRow: number = 3,
        _numCol: number = 10,
        _cellWidth: number = 10,
        _cellHeight: number = 30,
        _imageWidth: number = 30,
        _imageHeight: number = 30,
        _scale: number = 1,
        _gridColor: number = 0xff0000,
        _gridAlpha: number = 0.2,
        _gridBorderColor: number = 0x00ff00,
        _showResult: boolean = false
      ) {
        super(_numCol, _cellWidth, _scale);
        this.cellWidth = _cellWidth;
        this.cellHeight = _cellHeight;
        this.imageWidth = _imageWidth;
        this.imageHeight = _imageHeight;
        this.gridColor = _gridColor;
        this.gridAlpha = _gridAlpha;
        this.gridBorderColor = _gridBorderColor;
        this.numRow = _numRow;
        this.gridUnit = 1;
        if (_showResult) {
          this.touchEnabled = true;
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
          this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onOver, this);
          this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onOut, this);
        }
      }

      public expandRoad(expand: boolean) {
        if (this.roadMapIconList && this.roadData) {
          const numPage = Math.ceil(this.numCol * this.numRowCollapse); // number of icon in each page when not expand
          if (expand) {
            for (let i = numPage; i < this.roadMapIconList.length; i++) {
              (this.roadMapIconList[i] as LwBeadRoadIcon).visible = true;
            }
          } else {
            for (let i = numPage; i < this.roadMapIconList.length; i++) {
              (this.roadMapIconList[i] as LwBeadRoadIcon).visible = false;
            }
          }
        }
        this.isExpanded = expand;
        this.renderGrid();
      }

      private onClick(event: egret.TouchEvent) {
        let pt: egret.Point = new egret.Point(0, 0);
        this.globalToLocal(event.stageX, event.stageY, pt);
        pt = pt;
        const posX: number = pt.x;
        const posY: number = pt.y;
        const sizeW = (this.cellWidth / this.gridUnit) * this.scale;
        const sizeH = (this.cellHeight / this.gridUnit) * this.scale;

        if (posX > 0 && posX < sizeW * this.numCol && posY > 0 && posY < sizeH * this.numRow) {
          const col = Math.floor(posX / sizeW);
          const row = Math.floor(posY / sizeH);
          const index = row * this.numCol + col;
          const iconValue = this.roadMapIconList[index].value;

          if (iconValue.v !== undefined) {
            // dispatch the result click by the user
            this.dispatchEvent(new egret.Event('ClickResult', false, false, { index, mouseX: event.stageX, mouseY: event.stageY, gameRoundID: iconValue['gameRoundID'] }));
          }
        }
      }

      private onOver(event: mouse.MouseEvent) {
        mouse.setMouseMoveEnabled(true);
        this.theStage = this.stage;
        this.stage.addEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
      }

      private onMove(event: egret.TouchEvent) {
        let pt: egret.Point = new egret.Point(0, 0);
        this.globalToLocal(event.stageX, event.stageY, pt);
        pt = pt;
        const posX: number = pt.x;
        const posY: number = pt.y;
        const sizeW = (this.cellWidth / this.gridUnit) * this.scale;
        const sizeH = (this.cellHeight / this.gridUnit) * this.scale;

        if (posX > 0 && posX < sizeW * this.numCol && posY > 0 && posY < sizeH * this.numRow) {
          const col = Math.floor(posX / sizeW);
          const row = Math.floor(posY / sizeH);
          const index = row * this.numCol + col;
          const iconValue = this.roadMapIconList[index].value;

          if (iconValue.v !== undefined) {
            // dispatch the result rolled over by the user
            this.dispatchEvent(new egret.Event('RollOverResult', false, false, { index, mouseX: event.stageX, mouseY: event.stageY, gameRoundID: iconValue['gameRoundID'] }));
          } else {
            // dispatch rolled out result
            this.dispatchEvent(new egret.Event('RollOutResult'));
          }
        } else {
          // dispatch rolled out result
          this.dispatchEvent(new egret.Event('RollOutResult'));
        }
      }

      private onOut(event: mouse.MouseEvent) {
        if (this.stage.hasEventListener(mouse.MouseEvent.MOUSE_MOVE)) {
          mouse.setMouseMoveEnabled(false);
          this.stage.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
        }
        // dispatch rolled out result
        this.dispatchEvent(new egret.Event('RollOutResult'));
      }

      protected createIcon(size: number): LwBeadRoadIcon {
        const icon = new LwBeadRoadIcon(this.imageWidth, this.imageHeight);
        return icon;
      }

      // override for base class
      protected renderGrid() {
        const numRow = this.isExpanded ? this.numRow : this.numRowCollapse;
        const bgColors = [0xfafafa, 0x17181a];
        const gridColors = [0xafafaf, 0x1f2022];

        const sizeW = (this.cellWidth / this.gridUnit) * this.scale;
        const sizeH = (this.cellHeight / this.gridUnit) * this.scale;
        this.grid.graphics.clear();

        // draw bg rectangle
        this.grid.graphics.beginFill(bgColors[0], 1);
        this.grid.graphics.lineStyle(this.gridLine * this.scale, gridColors[0], 1, true);
        RoundRect.drawRoundRect(this.grid.graphics, 0, 0, this.numCol * sizeW, numRow * sizeH, this.gridCorners);
        this.grid.graphics.endFill();

        // draw grid lines
        // this.grid.graphics.lineStyle(this.gridLine * this.scale, this.gridBorderColor, 1, true);
        let lineY: number = sizeH * this.gridUnit;
        for (let r = 1; r < numRow; r += this.gridUnit) {
          this.grid.graphics.moveTo(0, lineY);
          this.grid.graphics.lineTo(this.numCol * sizeW, lineY);
          lineY += sizeH * this.gridUnit;
        }
        let lineX: number = sizeW * this.gridUnit;
        for (let c = 1; c < this.numCol; c += this.gridUnit) {
          this.grid.graphics.moveTo(lineX, 0);
          this.grid.graphics.lineTo(lineX, numRow * sizeH);
          lineX += sizeW * this.gridUnit;
        }

        // this.updateTexture();
      }

      // override for base class
      public initRoadData() {
        const n = this.numCol * this.numRow;
        let iconIndex = 0;
        this.roadMapIconList = new Array<LwBeadRoadIcon>();
        for (let i = 0; i < n; i++) {
          const icon = this.createIcon(this.gridSize);
          icon.setByObject({});
          icon.x = (this.cellWidth - this.imageWidth) / 2 + this.cellWidth * (iconIndex % this.numCol);
          icon.y = (this.cellHeight - this.imageHeight) / 2 + this.cellHeight * Math.floor(iconIndex / this.numCol);
          icon.addToLayer(this._staticLayer);
          this.roadMapIconList.push(icon);
          iconIndex++;
        }
        (this.roadMapIconList[0] as LwBeadRoadIcon).showHighLight();

        // if not set numRowCollapse, set it to numRow
        if (this.numRowCollapse === -1) {
          this.numRowCollapse = this.numRow;
        }
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
          (this.roadMapIconList[0] as LwBeadRoadIcon).showHighLight();
          this.expandRoad(this.isExpanded);
        }
      }

      public dispose() {
        super.dispose();
        if (this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
          this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        if (this.hasEventListener(mouse.MouseEvent.ROLL_OVER)) {
          this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onOver, this);
        }

        if (this.hasEventListener(mouse.MouseEvent.ROLL_OUT)) {
          this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onOut, this);
        }

        if (this.theStage) {
          if (this.theStage.hasEventListener(mouse.MouseEvent.MOUSE_MOVE)) {
            this.theStage.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
          }
        }
      }
    }
  }
}
