namespace we {
  export namespace lw {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected bankerLabel: ui.RunTimeLabel;
      protected playerLabel: ui.RunTimeLabel;
      protected tieLabel: ui.RunTimeLabel;
      protected bankerPairLabel: ui.RunTimeLabel;
      protected playerPairLabel: ui.RunTimeLabel;

      protected pBanker: eui.Label;
      protected pPlayer: eui.Label;
      protected pTie: eui.Label;
      protected pBankerPair: eui.Label;
      protected pPlayerPair: eui.Label;

      protected eastLabel: ui.RunTimeLabel;
      protected southLabel: ui.RunTimeLabel;
      protected westLabel: ui.RunTimeLabel;
      protected northLabel: ui.RunTimeLabel;
      protected redLabel: ui.RunTimeLabel;
      protected greenLabel: ui.RunTimeLabel;
      protected whiteLabel: ui.RunTimeLabel;

      protected gameIdLabel: ui.RunTimeLabel;
      protected betLimitLabel: ui.RunTimeLabel;

      protected pGameID: eui.Label;

      protected _infoArea: eui.Scroller;

      protected _mask: egret.Shape;

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

        if (env.orientation === 'landscape') {
          this._infoArea.addEventListener(eui.UIEvent.CHANGE_START, this.toShowMask, this);
          this._infoArea.addEventListener(eui.UIEvent.CHANGE_END, this.toHideMask, this);

          this._mask = new egret.Shape();
          this.addChild(this._mask);
          const filterMask = this._mask.graphics;
          const matrix = new egret.Matrix();

          matrix.createGradientBox(150, 318, 0, 0, 0);
          filterMask.beginGradientFill(egret.GradientType.LINEAR, [0x212425, 0x212425], [1, 0], [100, 255], matrix);
          filterMask.drawRect(0, 0, 150, 318);
          filterMask.endFill();

          matrix.createGradientBox(150, 318, 0, 1990, 0);
          filterMask.beginGradientFill(egret.GradientType.LINEAR, [0x212425, 0x212425], [0, 1], [0, 185], matrix);
          filterMask.drawRect(1990, 0, 150, 318);
          filterMask.endFill();

          this._mask.alpha = 0;
          // this.mask = this.mask_gp;
        }
      }

      public onExit() {
        this.destroy();
        dir.evtHandler.removeEventListener(eui.UIEvent.CHANGE_START, this.toShowMask, this);
        dir.evtHandler.removeEventListener(eui.UIEvent.CHANGE_END, this.toHideMask, this);
      }

      public setValue(tableInfo: data.TableInfo) {
        // super.setValue(tableInfo);
        // if (tableInfo.gamestatistic.bankerCount) {
        //   this.pBanker.text = tableInfo.gamestatistic.bankerCount.toString();
        // }
        // if (tableInfo.gamestatistic.playerCount) {
        //   this.pPlayer.text = tableInfo.gamestatistic.playerCount.toString();
        // }
        // if (tableInfo.gamestatistic.tieCount) {
        //   this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
        // }
        // if (tableInfo.gamestatistic.bankerPairCount) {
        //   this.pBankerPair.text = tableInfo.gamestatistic.bankerPairCount.toString();
        // }
        // if (tableInfo.gamestatistic.playerPairCount) {
        //   this.pPlayerPair.text = tableInfo.gamestatistic.playerPairCount.toString();
        // }
        // if (this.pGameID) {
        //   this.pGameID.text = tableInfo.betInfo.gameroundid;
        // }
      }
      protected toShowMask() {
        this._mask.alpha = 1;
      }

      protected toHideMask() {
        this._mask.alpha = 0;
      }
    }
  }
}
