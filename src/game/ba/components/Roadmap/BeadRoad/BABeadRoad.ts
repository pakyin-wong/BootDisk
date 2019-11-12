namespace we {
  export namespace ba {
    export class BABeadRoad extends BARoadBase {
      public constructor() {
        super();

        this.scale = 1;
        this.gridUnit = 1;
        this.gridSize = 30;
        this.numCol = 12;

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        if (!this.roadMapIconList) {
          this.initRoadData();
        }
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
