namespace we {
  export namespace dt {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected tigerLabel: eui.Label;
      protected dragonLabel: eui.Label;
      protected tieLabel: eui.Label;

      protected pTiger: eui.Label;
      protected pDragon: eui.Label;
      protected pTie: eui.Label;

      protected gameIdLabel: eui.Label;
      protected betLimitLabel: eui.Label;

      protected pGameID: eui.Label;

      public pBetLimit: ui.RunTimeLabel;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this._initY = this.y;
        // this.alpha = 0;
        // this.visible = true;
        // this.close.addEventListener(
        //   egret.TouchEvent.TOUCH_TAP,
        //   () => {
        //     this.visible = !this.visible;
        //   },
        //   this
        // );
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        mouse.setButtonMode(this.close, true);
      }

      public onExit() {
        this.destroy();
      }

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);
        if (tableInfo.gamestatistic) {
          this.pTiger.text = tableInfo.gamestatistic.bankerCount.toString();
          this.pDragon.text = tableInfo.gamestatistic.playerCount.toString();
          this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
        }
        if (this.pGameID) {
          this.pGameID.text = tableInfo.betInfo.gameroundid;
        }
      }
    }
  }
}
