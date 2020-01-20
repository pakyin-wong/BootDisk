namespace we {
  export namespace ui {
    export class TableInfoPanel extends Panel {
      protected _visible;
      protected _initY;
      public close: eui.Label;
      public content: eui.Group;
      public moveArea: eui.Component;

      protected lblTableInfo: eui.Label;

      protected tableNoLabel: eui.Label;
      protected roundNoLabel: eui.Label;
      protected dealerLabel: eui.Label;
      protected timeLabel: eui.Label;

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
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onExit, this);
        mouse.setButtonMode(this.close, true);
        this.changeLang();
      }

      public onExit() {
        this.destroy();
      }

      public changeLang() {
        this.tableNoLabel.text = i18n.t('baccarat.tableNo');
        this.roundNoLabel.text = i18n.t('baccarat.roundNo');
        this.dealerLabel.text = i18n.t('baccarat.dealer');
        this.timeLabel.text = i18n.t('baccarat.time');
        this.lblTableInfo.text = i18n.t('baccarat.tableInfo');
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
