namespace we {
  export namespace core {
    export class BaseGamePanel extends ui.Panel {
      public constructor(skin?: string) {
        super(skin);
      }

      protected mount() {
        this.init();
      }

      protected init() {}

      // called once to init from table Info
      public setTableInfo(tableInfo: data.TableInfo) {}

      // called whenever an update is needed
      public update() {}
    }
  }
}
