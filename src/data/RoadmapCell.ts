namespace we {
  export namespace data {
    export class RoadmapCell {
      public v?: string;
      public b?: number;
      public p?: number;
      public w?: number;

      // added by parser
      public t?: number; // number of tie for big road
      public isPredict?: number; // for indicating if the cell is predict
    }
  }
}
