/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace scene {
  export class BaccaratScene extends BaseScene {
    private bettingArea: baccarat.BettingArea;
    private switchLang: components.SwitchLang;

    private _tableID: number;

    private previousState: number;
    private tableInfo: TableInfo;
    private gameData: baccarat.GameData;

    constructor(data: any) {
      super(data);
      this._tableID = data.tableID;
      //
    }

    public set tableID(tableID: number) {
      this._tableID = tableID;
    }

    public get tableID() {
      return this._tableID;
    }

    public onEnter() {
      this.mount();
      this.bettingArea = new baccarat.BettingArea();
      this.bettingArea.anchorOffsetX = 0;
      this.bettingArea.anchorOffsetY = 0;
      this.bettingArea.horizontalCenter = 0;
      this.bettingArea.bottom = 0;
      this.addChild(this.bettingArea);
      this.setupTableInfo();
      this.bettingArea.onTableInfoUpdate(this.tableInfo); // call

      this.switchLang = new components.SwitchLang();
      this.switchLang.x = 0;
      this.switchLang.y = 200;
      this.addChild(this.switchLang);

      const roadmap = new baccarat.BARoadmap();
      roadmap.x = 10;
      roadmap.y = 10;
      this.addChild(roadmap);

      this.addEventListeners();
      dir.evtHandler.dispatch(enums.event.event.ROADMAP_UPDATE, [
        { v: 'b', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 0, p: 0, bv: 6, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 0, p: 1, bv: 10, pv: 3 },
        { v: 'p', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 0, p: 0, bv: 5, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 5, pv: 5 },
        { v: 'b', b: 1, p: 1, bv: 10, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 4, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 1, p: 1, bv: 10, pv: 15 },
        { v: 'p', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 1, p: 1, bv: 10, pv: 5 },
        { v: 'p', b: 1, p: 0, bv: 8, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 9, pv: 12 },
      ]);
    }

    private setupTableInfo() {
      console.log(env.tableInfoArray);
      env.tableInfoArray.forEach(value => {
        if (value.tableID === this._tableID) {
          this.tableInfo = value;
        }
      });
    }

    private addEventListeners() {
      dir.evtHandler.addEventListener(enums.event.event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
      dir.evtHandler.addEventListener(enums.i18n.event.SWITCH_LANGUAGE, this.onChangeLang, this);
    }

    private removeEventListeners() {
      dir.evtHandler.removeEventListener(enums.event.event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public onChangeLang() {
      this.bettingArea.onChangeLang();
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

    protected onTableInfoUpdate(evt: egret.Event) {
      console.log('Baccarat listener');
      const tableInfo = <TableInfo>evt.data;
      if (tableInfo) {
        console.log(`BaccaratScene::onTableInfoUpdate:tableInfo ${this.tableInfo}`);
        console.log(`BaccaratScene::onTableInfoUpdate:tableInfo.betDetails ${this.tableInfo.betDetails}`);
        console.log(`BaccaratScene::onTableInfoUpdate:this.tableInfo.tableID ${this.tableInfo.tableID}`);
        console.log(`BaccaratScene::onTableInfoUpdate:this.tableID ${this.tableID}`);

        if (tableInfo.tableID === this.tableID) {
          // update the scene
          this.tableInfo = tableInfo;
          this.gameData = <baccarat.GameData>this.tableInfo.gameData;
          this.bettingArea.onTableInfoUpdate(this.tableInfo);
        }
      }
    }
  }
}
