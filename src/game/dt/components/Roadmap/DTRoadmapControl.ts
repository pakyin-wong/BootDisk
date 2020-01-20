namespace we {
  export namespace dt {
    export class DTRoadmapControl extends ba.BARoadmapControl {
      protected beadResultPanel: DTBeadRoadResultPanel;
      protected beadRoad: DTBeadRoad;
      protected rightPanel: DTRoadmapRightPanel;

      public constructor(tableid: string = null) {
        super(tableid);
      }
    }
  }
}
