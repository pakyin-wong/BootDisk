namespace we {
  export namespace di {
    export class RoadMapConfig extends eui.Component {
      public roadmap_row: number = 1;
      public roadmap_col: number = 10;
      public roadmap_gridSize: number = 30;
      public roadmap_offsetX: number = 8;
      public roadmap_offsetY: number = 2;

      public setPortrait() {
        this.roadmap_row = 1;
        this.roadmap_col = 10;
        this.roadmap_gridSize = 30;
        this.roadmap_offsetX = 8;
        this.roadmap_offsetY = 2;
      }
    }
  }
}
