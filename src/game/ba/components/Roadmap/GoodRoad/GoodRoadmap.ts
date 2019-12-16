namespace we {
  export namespace ba {
    export class GoodRoadmap extends ui.Panel {
      private bigRoad: BABigRoad;
      private parser: BARoadParser;

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

        this.bigRoad = new BABigRoad(10, 29);
        this.addChild(this.bigRoad);

        this.onParserUpdate(null);
      }

      private onParserUpdate(e: egret.Event) {
        if (this.parser.bigRoadResult) {
          this.bigRoad.parseRoadData(this.parser.bigRoadResult);
        }
      }

      public updateRoadData(roadmapData: any) {
        const data = [];
        const arr = roadmapData
          .toLowerCase()
          .split('')
          .forEach(e => data.push({ V: e }));

        this.parser.parseData(data);
      }

      public dispose() {
        if (this.parser.hasEventListener('onUpdate')) {
          this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        }
      }
    }
  }
}
