/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileLiveListItem extends MobileLiveListSimpleItem {
      protected _roadMap: ILobbyRoad;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initCustomPos() {
        this._buttonGroupShowY = 194;
        this._buttonGroupHideY = 230;
      }
    }
  }
}
