namespace we {
  export namespace lw {
    export class AdvancedRoad extends core.BaseEUI implements we.ui.IAdvancedRoad {
      protected _tableInfo: data.TableInfo;
      public beadRoad: we.lw.LwBeadRoad;
      protected _roadmapControl: we.lw.LwRoadmapControl;

      protected roadsContainer: egret.DisplayObjectContainer;

      protected totalCount: number;

      public analysis: we.ui.IAnalysis;

      public constructor(skin?: string) {
        super(skin);
      }

      public set tableInfo(value: data.TableInfo) {
        this._tableInfo = value;
      }

      public get tableInfo() {
        return this._tableInfo;
      }

      protected mount() {
        this.init();
      }

      protected init() {
        const gridSize = 21;
        this.totalCount = 0;

        this.roadsContainer = new egret.DisplayObjectContainer();
        this.roadsContainer.x = 0;
        this.roadsContainer.y = 0;
        this.roadsContainer.scaleX = 584 / 602;
        this.roadsContainer.scaleY = 450 / 430;
        this.addChild(this.roadsContainer);

        this.beadRoad = new we.lw.LwBeadRoad(10, 14, 43, 43);
        this.beadRoad.x = 0;
        this.beadRoad.y = 0;
        this.beadRoad.initRoadData();
        this.roadsContainer.addChild(this.beadRoad);

        // dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);

        // this.changeLang();
      }

      // render text by tableInfo
      public update() {
        if (this.tableInfo) {
          if (!this._roadmapControl) {
            this._roadmapControl = new LwRoadmapControl(this._tableInfo.tableid);
            this._roadmapControl.setRoads(this.beadRoad, null, null, null);
          }
          if (this._roadmapControl) {
            this._roadmapControl.setTableInfo(this._tableInfo);
            this._roadmapControl.updateRoadData();
          }
        }
      }

      public destroy() {
        super.destroy();
      }
    }
  }
}
