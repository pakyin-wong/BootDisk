namespace we {
  export namespace ba {
    export class GoodRoadmap extends ui.Panel {
      private bigRoad: BABigRoad;
      private parser: BARoadParser;

      public gridSize: number = 29;
      public gridLine: number = 1;

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      private init() {
        this.parser = new BARoadParser([10, 10, 24, 12, 12]);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.bigRoad = new BABigRoad(10, this.gridSize, 1, this.gridLine);
        this.addChild(this.bigRoad);

        this.onParserUpdate(null);
      }

      private onParserUpdate(e: egret.Event) {
        if (this.parser.bigRoadResult) {
          this.bigRoad.parseRoadData(this.parser.bigRoadResult);
        }
      }

      public updateRoadData(roadmapData: string) {
        const data = [];
        const arr = roadmapData
          .toLowerCase()
          .split('')
          .forEach(e => data.push({ v: e }));

        this.parser.parseData(data);
      }

      public destroy() {
        super.destroy();
        if (this.parser.hasEventListener('onUpdate')) {
          this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        }
        this.bigRoad.dispose();
      }
    }
  }
}
