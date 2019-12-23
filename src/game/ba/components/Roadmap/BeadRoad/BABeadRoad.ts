namespace we {
  export namespace ba {
    export class BABeadRoad extends BARoadBase {
      private mode: number; // the BPT mode (0) or Win value Mode (1)

      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1) {
        super(_numCol, _gridSize, _scale);
        this.gridUnit = 1;
        this.mode = 0;

        // this.touchEnabled = true;
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onOver, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onOut, this);
        /*if (!this.roadMapIconList) {
          this.initRoadData();
        }*/
      }

      protected createIcon(size: number): BABeadRoadIcon {
        const icon = new BABeadRoadIcon(size);
        icon.Mode = this.mode;
        return icon;
      }

      public set Mode(mode: number) {
        this.mode = mode;
        for (const elem of this.roadMapIconList) {
          const icon: BABeadRoadIcon = elem as BABeadRoadIcon;
          icon.Mode = mode;
        }
      }

      public get Mode(): number {
        return this.mode;
      }

      private onClick(event: egret.TouchEvent) {
        // this.Mode = ++this.Mode % 2;
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
        }
      }

      private onOut(event: mouse.MouseEvent) {
        if (this.stage.hasEventListener(mouse.MouseEvent.MOUSE_MOVE)) {
          mouse.setMouseMoveEnabled(false);
          this.stage.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
        }
      }

      public dispose() {}
    }
  }
}
