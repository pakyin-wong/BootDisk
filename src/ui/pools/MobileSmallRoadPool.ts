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
            return ro.ROLobbyBeadRoad;
          case 'di':
            return di.DiLobbyBeadRoad;
          case 'dil':
            return dil.DilLobbyBeadRoad;
          case 'lw':
            return lw.LwLobbyBeadRoad;
          case 'lo':
            return lo.LoSidePanel;
          case 'rc':
            return rc.RcSidePanel;
          default:
            throw new Error('invalid game type');
        }
      }
    }
  }
}
