namespace we {
  export namespace ba {
    export class BABeadRoad extends BARoadBase {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1) {
        super(_numCol, _gridSize, _scale);
        this.gridUnit = 1;

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        /*if (!this.roadMapIconList) {
          this.initRoadData();
        }*/
      }

      protected createIcon(size: number): BABeadRoadIcon {
        return new BABeadRoadIcon(size);
      }

      public set Mode(mode: number) {
        for (const elem of this.roadMapIconList) {
          const icon: BABeadRoadIcon = elem as BABeadRoadIcon;
          icon.Mode = mode;
        }
      }

      public get Mode(): number {
        const icon: BABeadRoadIcon = this.roadMapIconList[0] as BABeadRoadIcon;
        return icon.Mode;
      }

      private onClick(e: egret.TouchEvent) {
        this.Mode = ++this.Mode % 2;
      }
    }
  }
}
