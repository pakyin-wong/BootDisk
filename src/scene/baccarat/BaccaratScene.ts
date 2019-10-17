/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace scene {
  export class BaccaratScene extends BaseScene {
    private bettingArea: baccarat.BettingArea;

    public tableID: number;

    public setTableID(tableID: number) {
      this.tableID = tableID;
    }

    public onEnter() {
      this.mount();
      this.bettingArea = new baccarat.BettingArea();
      this.bettingArea.anchorOffsetX = 0;
      this.bettingArea.anchorOffsetY = 0;
      this.bettingArea.horizontalCenter = 0;
      this.bettingArea.bottom = 0;
      this.addChild(this.bettingArea);
      this.addEventListeners();
      dir.socket.enterTable(2);
    }

    private addEventListeners() {
      dir.evtHandler.addEventListener(enums.event.event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
    }

    private removeEventListeners() {
      dir.evtHandler.removeEventListener(enums.event.event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}

    protected mount() {
      // step 1: load Baccarat Screen Resource

      // step 2: init ui
      // this.skin = 'skin_desktop.BaccaratScene'
      this.skinName = 'resource/skin_desktop/BaccaratScene.exml';
      // this.btnTest.addEventListener(egret.TouchEvent.TOUCH_TAP );
      // this.setSkin(new eui.Skin())

      // step 3: connect socket
      // this.socketConnect();
    }

    protected socketConnect() {}

    protected socketConnectSuccess() {
      // dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_SUCCESS, this.socketConnectSuccess, this);
      // dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
      // step 4: auth and get user profiles
      // step 5: get and display tips, promote banner
      // step 6: load general resource (lobby, baccarat)
      // step 7: init complete, transfer to lobby scene
      // dir.sceneCtr.goto('LobbySCene');
    }

    protected socketConnectFail() {}

    protected onTableInfoUpdate(data: any) {
      console.log('Baccarat listener');
      const tableInfo = <TableInfo>data;
      if (tableInfo.tableID === this.tableID) {
        // update the scene
        this.updateEnv(tableInfo);
        this.bettingArea.onTableInfoUpdate(tableInfo);
      }
    }

    protected updateEnv(tableInfo: TableInfo) {
      env.tableInfo[tableInfo.tableID] = tableInfo;
    }
  }
}
