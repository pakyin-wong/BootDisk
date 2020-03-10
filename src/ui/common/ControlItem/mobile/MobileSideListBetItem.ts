namespace we {
  export namespace ui {
    export class MobileSideListBetItem extends MobileListBaseItem {
      protected _bettingGroup: eui.Group;
      protected _resultGroup: eui.Group;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initCustomPos() {
        this._buttonGroupShowY = 194;
        this._buttonGroupHideY = 230;
      }

      protected initChildren() {
        super.initChildren();
        this._tableLayer.currentState = 'Normal';
        this._chipLayer.removeAllMouseListeners();
        this._chipLayer.setTouchEnabled(false);
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        this._chipLayer.setTouchEnabled(false);
      }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        super.setResultRelatedComponentsEnabled(enable);
        if (this._resultGroup) {
          this._resultGroup.visible = enable;
        }
        if (this._tableInfo) {
          switch (this._tableInfo.gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAS:
            case we.core.GameType.BAI:
            case we.core.GameType.DT:
              this._tableLayer.visible = !enable;
              if (this._bettingGroup) {
                this._bettingGroup.visible = !enable;
              }
              break;
            case we.core.GameType.RO:
            default:
              if (enable) {
                this._tableLayer.alpha = 1;
              } else {
                this._tableLayer.alpha = 0.4;
              }
              break;
          }
        }
      }

      // protected setStateDeal(isInit: boolean = false) {
      //   super.setStateDeal(isInit);
      //   if (this._previousState !== we.core.GameState.DEAL) {
      //     env.tableInfos[this._tableId].prevbets = env.tableInfos[this._tableId].bets;
      //     env.tableInfos[this._tableId].prevbetsroundid = env.tableInfos[this._tableId].roundid;
      //   }
      // }
    }
  }
}
