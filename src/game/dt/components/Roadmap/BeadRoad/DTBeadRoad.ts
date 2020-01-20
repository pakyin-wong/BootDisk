namespace we {
  export namespace dt {
    export class DTBeadRoad extends ba.BABeadRoad {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1, _showResult: boolean = false) {
        super(_numCol, _gridSize, _scale, _showResult);
      }

      protected createIcon(size: number): ba.BABeadRoadIcon {
        const icon = new DTBeadRoadIcon(size);
        icon.Mode = this.mode;
        return icon;
      }

      public set Mode(mode: number) {
        this.mode = mode;
        for (const elem of this.roadMapIconList) {
          const icon: DTBeadRoadIcon = elem as DTBeadRoadIcon;
          icon.Mode = mode;
        }
      }

      public get Mode(): number {
        return this.mode;
      }
    }
  }
}
