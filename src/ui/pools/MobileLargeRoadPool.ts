namespace we {
  export namespace ui {
    export class MobileLargeRoadPool extends GameComponentPool {
      // we.ui.IAdvancedRoad
      constructor(opt: any) {
        super(opt);
      }

      public generateComponent(gameType: string) {
        switch (gameType) {
          case 'ba':
          case 'dt':
            return ba.MobileLiveListRoadmap;
          case 'ro':
            return ro.ROLargeListRoadmap;
          case 'di':
            return di.DiLargeListRoadmap;
          case 'dil':
            return dil.DilLargeListRoadmap;
          case 'lw':
            return lw.LwLargeListRoadmap;
          // case 'lo':
          //   return lo.MobileSideRoadPanel;
          // case 'rc':
          //   return rc.RcSidePanel;
          default:
            throw new Error('invalid game type');
        }
      }
    }
  }
}
