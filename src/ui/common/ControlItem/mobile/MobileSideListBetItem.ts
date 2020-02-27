namespace we {
  export namespace ui {
    export class MobileSideListBetItem extends MobileListBaseItem {
      protected _bettingGroup: eui.Group;
      protected _resultGroup: eui.Group;

      public constructor(skinName: string = null) {
        super(skinName);
      }

      protected initChildren() {
        super.initChildren();
        this._tableLayer.currentState = 'Normal';
        this._chipLayer.removeAllMouseListeners();
        this._chipLayer.setTouchEnabled(false);
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        this._tableLayer.visible = enable;
        this._chipLayer.visible = enable;
      }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        super.setResultRelatedComponentsEnabled(enable);
        this._resultGroup.visible = enable;
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
