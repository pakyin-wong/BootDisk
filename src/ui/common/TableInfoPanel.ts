namespace we {
  export namespace ui {
    export class TableInfoPanel extends Panel {
      protected _visible;
      protected _initY;
      public close: eui.Label;
      public content: eui.Group;
      public moveArea: eui.Component;

      protected lblTableInfo: ui.RunTimeLabel;

      protected tableNoLabel: ui.RunTimeLabel;
      protected roundNoLabel: ui.RunTimeLabel;
      protected dealerLabel: ui.RunTimeLabel;
      protected timeLabel: ui.RunTimeLabel;

      protected pTableID: eui.Label;
      protected pRoundID: eui.Label;
      protected pDealer: eui.Label;
      protected pTime: eui.Label;

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
        this.pTableID.text = tableInfo.tableid;
        this.pRoundID.text = tableInfo.data.gameroundid;
        this.pDealer.text = tableInfo.dealername ? tableInfo.dealername : '-';
        this.pTime.text = moment(env.currTime).format('YYYY/MM/DD');
      }
    }
  }
}
