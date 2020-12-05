namespace we {
  export namespace ui {
    export class LobbyRoadPool extends GameComponentPool {
      // we.ui.IAdvancedRoad
      constructor(opt: any) {
        super(opt);
      }

      public generateComponent(gameType: string) {
        switch (gameType) {
          case 'ba':
          case 'dt':
            return ba.BALobbyBigRoad;
          case 'ro':
            return ro.ROLiveListRoadmap;
          case 'di':
            return di.DiLiveListRoadmap;
          case 'dil':
            return dil.DilLobbyBeadRoad;
          case 'lw':
            return lw.LwLiveListRoadmap;
          // case 'lo':
          //   return lo.LoLobbyRoadPanel;
          // case 'rc':
          //   return rc.RcLobbyRoadPanel;
          default:
            throw new Error('invalid game type');
        }
      }
    }
  }
}
