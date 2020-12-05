namespace we {
  export namespace ui {
    export class SideRoadPool extends GameComponentPool {
      // we.ui.IAdvancedRoad
      constructor(opt: any) {
        super(opt);
      }

      public generateComponent(gameType: string) {
        switch (gameType) {
          case 'ba':
          case 'dt':
            return ba.BetInfoBigRoad;
          case 'ro':
            return ro.ROSideListRoadmap;
          case 'di':
            return di.DiSideListRoadmap;
          case 'dil':
            return dil.DilSideListRoadmap;
          case 'lw':
            return lw.LwSideListRoadmap;
          // case 'lo':
          //   return lo.LoSidePanel;
          // case 'rc':
          //   return rc.RcSidePanel;
          default:
            throw new Error('invalid game type');
        }
      }
    }
  }
}
