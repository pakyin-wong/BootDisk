namespace we {
  export namespace test {
    export class RoadmapControlTestPage extends core.BasePage {
      protected _roadmapControl: ba.BARoadmapControl;
      protected _leftGamePanel: ba.BARoadmapLeftPanel;
      protected _rightGamePanel: ba.BARoadmapRightPanel;
      protected _beadRoadResultPanel: ba.BaBeadRoadResultPanel;
      protected _roadmapControl2: ba.BARoadmapControl;
      protected _leftGamePanel2: ba.BARoadmapLeftPanel;
      protected _rightGamePanel2: ba.BARoadmapRightPanel;
      protected _beadRoadResultPanel2: ba.BaBeadRoadResultPanel;
      protected _roadmapControl3: ba.BARoadmapControl;
      protected _leftGamePanel3: ba.BARoadmapLeftPanel;
      protected _rightGamePanel3: ba.BARoadmapRightPanel;
      protected _beadRoadResultPanel3: ba.BaBeadRoadResultPanel;

      public roomIds: string[] = [];
      protected _targetTableId;
      protected _targetTableInfo;

      public constructor(data: any = null) {
        super('test/RoadmapControlTestPageSkin', data);
      }

      public onEnter() {
        // this.once(eui.UIEvent.COMPLETE, this.mount, this);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}

      protected mount() {
        this.handleTableList();
        dir.socket.getTableList();
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
      }

      protected initRoadMap() {
        this._roadmapControl = new ba.BARoadmapControl(this._targetTableId);
        this._roadmapControl.setRoads(
          this._leftGamePanel.beadRoad,
          this._rightGamePanel.bigRoad,
          this._rightGamePanel.bigEyeRoad,
          this._rightGamePanel.smallRoad,
          this._rightGamePanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._rightGamePanel,
          this._beadRoadResultPanel
        );

        this._roadmapControl2 = new ba.BARoadmapControl(this._targetTableId);
        this._roadmapControl2.setRoads(
          this._leftGamePanel2.beadRoad,
          this._rightGamePanel2.bigRoad,
          this._rightGamePanel2.bigEyeRoad,
          this._rightGamePanel2.smallRoad,
          this._rightGamePanel2.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._rightGamePanel2,
          this._beadRoadResultPanel2
        );

        this._roadmapControl3 = new ba.BARoadmapControl(this._targetTableId);
        this._roadmapControl3.setRoads(
          this._leftGamePanel3.beadRoad,
          this._rightGamePanel3.bigRoad,
          this._rightGamePanel3.bigEyeRoad,
          this._rightGamePanel3.smallRoad,
          this._rightGamePanel3.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._rightGamePanel3,
          this._beadRoadResultPanel3
        );
      }

      private handleTableList(event: egret.Event = null) {
        // if (!env.livepageLocked) {
        const roomIds = event ? (event.data as string[]) : env.allTableList;
        this.roomIds = roomIds.filter(tableId => {
          const tableInfo = env.tableInfos[tableId];
          return tableInfo.gametype === core.GameType.BAC || tableInfo.gametype === core.GameType.BAS;
        });

        if (this.roomIds.length > 0) {
          this._targetTableId = this.roomIds[0];
          this._targetTableInfo = env.tableInfos[this._targetTableId];
          this.initRoadMap();
          this._roadmapControl.setTableInfo(this._targetTableInfo);
          this._roadmapControl2.setTableInfo(this._targetTableInfo);
          this._roadmapControl3.setTableInfo(this._targetTableInfo);
          dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        } else {
          dir.evtHandler.once(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo>evt.data;
          if (tableInfo.tableid === this._targetTableId) {
            this._roadmapControl.updateRoadData();
            this._roadmapControl2.updateRoadData();
            this._roadmapControl3.updateRoadData();
          }
        }
      }
    }
  }
}
