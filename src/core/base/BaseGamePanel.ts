namespace we {
  export namespace core {
    export class BaseGamePanel extends ui.Panel {
      protected tableInfo: data.TableInfo;

      public constructor(skin?: string) {
        super(skin);
      }

      protected mount() {
        this.init();
      }

      protected init() {}

      // called by BaseGameScene once to init from table Info
      public setTableInfo(tableInfo: data.TableInfo) {
        this.tableInfo = tableInfo;
        this.update();
      }

      // called whenever an update is needed, render components from this.tableInfo
      // to be implemented by each Sub class
      public update() {
        this.updateTableBetInfo();
      }

      public updateTableBetInfo() {}

      public updateStat() {}
    }
  }
}
