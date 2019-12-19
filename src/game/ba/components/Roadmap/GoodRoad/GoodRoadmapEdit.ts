namespace we {
  export namespace ba {
    export class GoodRoadmapEdit extends ui.Panel {
      private bigRoad: BABigRoad;
      private parser: GoodRoadParser;

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      private init() {
        this.parser = new GoodRoadParser([10, 10, 24, 12, 12]);
        this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

        this.bigRoad = new BABigRoad(10, 29);
        this.bigRoad.x = 1;
        this.bigRoad.y = 0;
        this.addChild(this.bigRoad);

        this.onParserUpdate(null);
      }

      public addBanker() {
        if (this.parser.checkCanAddBanker()) {
          this.parser.addWin(0);
        }
      }

      public addPlayer() {
        if (this.parser.checkCanAddPlayer()) {
          this.parser.addWin(1);
        }
      }

      public removeOne() {
        if (this.parser.beadRoadResult.length > 0) {
          this.parser.undoWin();
        }
      }

      public removeAll() {
        if (this.parser.beadRoadResult.length > 0) {
          this.parser.undoAll();
        }
      }

      private onParserUpdate(e: egret.Event) {
        if (this.parser.bigRoadResult) {
          this.bigRoad.parseRoadData(this.parser.bigRoadResult);
          this.dispatchEvent(
            new egret.Event('update', false, false, {
              canSubmit: this.parser.checkCanSubmit(),
              canAddBanker: this.parser.checkCanAddBanker(),
              canAddPlayer: this.parser.checkCanAddPlayer(),
              canRemove: this.parser.beadRoadResult.length > 0,
              roadPattern: this.getRoadData(),
            })
          );
        }
      }

      public updateRoadData(roadmapData: string) {
        const data = [];
        const arr = roadmapData
          .toLowerCase()
          .split('')
          .forEach(e => data.push({ V: e }));

        this.parser.parseData(data);
      }

      public getRoadData(): string {
        let rslt = '';
        this.parser.beadRoadResult.forEach(e => (rslt += e.V.toLowerCase()));
        return rslt;
      }

      protected destroy() {
        super.destroy();
        if (this.parser.hasEventListener('onUpdate')) {
          this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
        }
      }
    }
  }
}
