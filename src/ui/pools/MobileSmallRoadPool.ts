namespace we {
  export namespace ui {
    export class MobileSmallRoadPool extends GameComponentPool {
      // we.ui.IAdvancedRoad
      constructor(opt: any) {
        super(opt);
      }

      public generateComponent(gameType: string) {
        switch (gameType) {
          case 'ba':
          case 'dt':
            return ba.BAMobileLobbyBigRoad;
          case 'ro':
            return ro.ROSmallListRoadmap;
          case 'di':
            return di.DiSmallListRoadmap;
          case 'dil':
            return dil.DilSmallListRoadmap;
          case 'lw':
            return lw.LwSmallListRoadmap;
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
