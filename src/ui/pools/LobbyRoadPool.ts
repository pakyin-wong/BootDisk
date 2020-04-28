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
            return ro.ROLobbyBeadRoad;
          case 'di':
            return di.DiLobbyBeadRoad;
          case 'lw':
            return lw.LwLobbyBeadRoad;
          default:
            throw new Error('invalid game type');
        }
      }
    }
  }
}
