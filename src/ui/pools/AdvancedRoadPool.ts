namespace we {
  export namespace ui {
    export class AdvancedRoadPool extends GameComponentPool {
      // we.ui.IAdvancedRoad
      constructor(opt: any) {
        super(opt);
      }

      public generateComponent(gameType: string) {
        return we[gameType].AdvancedRoad;
      }
    }
  }
}
