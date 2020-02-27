namespace we {
  export namespace ro {
    export class ROBigRoad extends ba.BARoadBase {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1, _showResult: boolean = false) {
        super(_numCol, _gridSize, _scale);
        this.gridUnit = 1;

        if (_showResult) {
          this.touchEnabled = true;
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
          this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onOver, this);
          this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onOut, this);
        }
      }

      protected createIcon(size: number): ba.BARoadIconBase {
        return null;
      }

      private onClick(event: egret.TouchEvent) {
        let pt: egret.Point = new egret.Point(0, 0);
        this.globalToLocal(event.stageX, event.stageY, pt);
        pt = pt;
        const posX: number = pt.x;
        const posY: number = pt.y;
        if (posX > 0 && posX < this.gridSize * this.numCol && posY > 0 && posY < this.gridSize * 6) {
          const col = Math.floor(posX / this.gridSize);
          const row = Math.floor(posY / this.gridSize);
          const index = col * 6 + row;

          // dispatch the result click by the user
          this.dispatchEvent(new egret.Event('ClickResult', false, false, { index, mouseX: event.stageX, mouseY: event.stageY }));
        }
      }

      private onOver(event: mouse.MouseEvent) {
        mouse.setMouseMoveEnabled(true);
        this.stage.addEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
      }

      private onMove(event: egret.TouchEvent) {
        let pt: egret.Point = new egret.Point(0, 0);
        this.globalToLocal(event.stageX, event.stageY, pt);
        pt = pt;
        const posX: number = pt.x;
        const posY: number = pt.y;
        if (posX > 0 && posX < this.gridSize * this.numCol && posY > 0 && posY < this.gridSize * 6) {
          const col = Math.floor(posX / this.gridSize);
          const row = Math.floor(posY / this.gridSize);
          const index = col * 6 + row;
          const iconValue = this.roadMapIconList[index].value;

          if (iconValue.v !== undefined) {
            // dispatch the result rolled over by the user
            this.dispatchEvent(new egret.Event('RollOverResult', false, false, { index, mouseX: event.stageX, mouseY: event.stageY, gameInfoIndex: iconValue['index'] }));
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
    }
  }
}
