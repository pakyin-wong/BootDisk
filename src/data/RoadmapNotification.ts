/* tslint:disable max-classes-per-file */
namespace we {
  export namespace data {
    export class RoadmapNotification {
      public match: GoodRoadData[];
    }
    export class GoodRoadData {
      public roadmapid: string; // roadmap id for the matched roadmap
      public name: string;
      public tableid: string; // table id of the matched table
    }
  }
}
