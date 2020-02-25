namespace we {
  export namespace ro {
    export class SideListBetItemCardHolder extends eui.Component implements ui.IResultDisplay {
      protected _dragonPanel: eui.Image;
      protected _tigerPanel: eui.Image;

      protected lblDragonName: ui.RunTimeLabel;
      protected lblTigerName: ui.RunTimeLabel;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('ro.BetItemCardHolderSkin');
      }

      constructor() {
        super();
      }

      public updateResult(gameData: GameData) {}

      public reset() {}
    }
  }
}
