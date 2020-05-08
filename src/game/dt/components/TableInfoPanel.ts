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
          this._mask = new egret.Shape();

          this._infoArea.addEventListener(eui.UIEvent.CHANGE_START, this.toShowMask, this);
          this._infoArea.addEventListener(eui.UIEvent.CHANGE_END, this.toHideMask, this);

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

      protected toShowMask() {
        this._mask.alpha = 1;
      }

      protected toHideMask() {
        this._mask.alpha = 0;
      }
    }
  }
}
