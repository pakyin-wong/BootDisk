namespace we {
  export namespace ro {
    export class TableLayer extends we.ui.TableLayer {
      protected _playerPairGroup: eui.Group;
      protected _bankerPairGroup: eui.Group;
      protected _playerGroup: eui.Group;
      protected _tieGroup: eui.Group;
      protected _superSixGroup: eui.Group;
      protected _superSixBankerGroup: eui.Group;
      protected _bankerGroup: eui.Group;

      protected _playerPairLabel: we.ui.RunTimeLabel;
      protected _bankerPairLabel: we.ui.RunTimeLabel;
      protected _playerLabel: we.ui.RunTimeLabel;
      protected _tieLabel: we.ui.RunTimeLabel;
      protected _superSixLabel: we.ui.RunTimeLabel;
      protected _superSixBankerLabel: we.ui.RunTimeLabel;
      protected _bankerLabel: we.ui.RunTimeLabel;

      public constructor() {
        super('ro/TableLayer');
      }

      public createMapping() {}

      public onRollover(gridName: string) {}

      public onRollout(gridName: string) {}

      public onWinning(result: string) {}

      public reset() {}

      public setGameMode(isNoCommission: boolean) {
        this.currentState = isNoCommission ? 'SuperSix' : 'Normal';
      }
    }
  }
}
