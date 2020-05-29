namespace we {
  export namespace ba {
    export abstract class BARoadBase extends egret.DisplayObjectContainer {
      protected scale: number;
      protected grid: egret.Shape;
      protected numCol: number = 12;
      protected gridSize: number = 30;
      protected gridLine: number = 1;
      protected gridUnit: number = 1; // how many unit for each grid. 1 or 2 unit for each grid
      // private bitmap: ScaleableBitmap;
      protected darkModeNumber: number = 0;

      protected roadMapIconList: BARoadIconBase[];

      protected roadData: any;
      protected abstract createIcon(size: number): BARoadIconBase;

      // protected _iconGroup: eui.Group;
      // protected _renderTexture: egret.RenderTexture;
      // protected _image: eui.Image;

      protected _staticLayer: egret.DisplayObjectContainer;
      protected _shapeLayer: egret.DisplayObjectContainer;
      protected _textLayer: egret.DisplayObjectContainer;
      protected _dynamicLayer: egret.DisplayObjectContainer;

      protected gridCorners: any = { tl: 0, tr: 0, bl: 0, br: 0 }; // the corner radius for the grid background

      public constructor(_numCol: number, _gridSize: number, _scale: number, _gridLine: number = 1) {
        super();
        this.scale = _scale;
        this.gridSize = _gridSize;
        this.gridLine = _gridLine;
        this.numCol = _numCol;

        // this._iconGroup = new eui.Group();

        this.grid = new egret.Shape();
        // this.addChild(this._iconGroup);

        // this.cacheAsBitmap = true;

        // this._renderTexture = new egret.RenderTexture();
        // this._image = new eui.Image();
        // this._image.texture = this._renderTexture;
        // this.addChild(this._image);

        this._staticLayer = new egret.DisplayObjectContainer();
        this._shapeLayer = new egret.DisplayObjectContainer();
        this._textLayer = new egret.DisplayObjectContainer();
        this._dynamicLayer = new egret.DisplayObjectContainer();

        this._staticLayer.cacheAsBitmap = true;

        this.addChild(this._staticLayer);
        this._staticLayer.addChild(this.grid);
        this._staticLayer.addChild(this._shapeLayer);
        this._staticLayer.addChild(this._textLayer);
        this.addChild(this._dynamicLayer);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        dir.evtHandler.addEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
        this.onModeUpdate(null);
      }

      public initRoadData() {
        const n = this.numCol * 6;
        let iconIndex = 0;
        this.roadMapIconList = new Array<BARoadIconBase>();
        for (let i = 0; i < n; i++) {
          const icon = this.createIcon(this.gridSize / this.gridUnit);
          icon.setByObject({});
          icon.x = (this.gridSize / this.gridUnit) * Math.floor(iconIndex / 6);
          icon.y = (this.gridSize / this.gridUnit) * (iconIndex % 6);
          // this._iconGroup.addChild(icon);
          icon.addToLayer(this._shapeLayer, this._textLayer);
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
                  if (this.roadData[i].v !== roadData[i].v) {
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

      public setGridCorners(gridCorners: any) {
        this.gridCorners = gridCorners;
        this.renderGrid();
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
        // this.grid.graphics.drawRect(0, 0, this.numCol * size, 6 * size);
        this.grid.graphics.lineStyle(this.gridLine * this.scale, gridColors[this.darkModeNumber], 1, true);
        RoundRect.drawRoundRect(this.grid.graphics, 0, 0, this.numCol * size, 6 * size, this.gridCorners);
        this.grid.graphics.endFill();

        // draw grid lines
        this.grid.graphics.lineStyle(this.gridLine * this.scale, gridColors[this.darkModeNumber], 1, true);
        let lineY: number = size * this.gridUnit;
        for (let r = 0; r < 5; r += this.gridUnit) {
          this.grid.graphics.moveTo(0, lineY);
          this.grid.graphics.lineTo(this.numCol * size, lineY);
          lineY += size * this.gridUnit;
        }
        let lineX: number = size * this.gridUnit;
        for (let c = 0; c < this.numCol - 1; c += this.gridUnit) {
          this.grid.graphics.moveTo(lineX, 0);
          this.grid.graphics.lineTo(lineX, 6 * size);
          lineX += size * this.gridUnit;
        }

        // this.updateTexture();
      }

      // protected updateTexture() {
      //   this._iconGroup.validateNow();
      //   const rect = this._iconGroup.getBounds();
      //   this._renderTexture.drawToTexture(this._iconGroup, rect, 1);
      //   this._image.width = rect.width;
      //   this._image.height = rect.height;
      // }

      public set DarkMode(n: number) {
        this.darkModeNumber = n;

        this.renderGrid();
        if (this.roadMapIconList) {
          for (const elem of this.roadMapIconList) {
            const icon = elem;
            icon.DarkMode = n;
          }
        }
      }

      public get DarkMode(): number {
        return this.darkModeNumber;
      }

      protected onModeUpdate(e: egret.Event) {
        this.DarkMode = env.mode === 1 ? 1 : 0;
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

        if (dir.evtHandler.hasEventListener(we.core.Event.MODE_UPDATE)) {
          dir.evtHandler.removeEventListener(we.core.Event.MODE_UPDATE, this.onModeUpdate, this);
        }

        if (this.roadMapIconList) {
          for (const elem of this.roadMapIconList) {
            elem.dispose();
          }
        }
      }
    }
  }
}
