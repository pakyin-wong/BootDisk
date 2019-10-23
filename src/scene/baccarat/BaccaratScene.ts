/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace scene {
  export class BaccaratScene extends BaseScene {
    private bettingArea: baccarat.BettingArea;
    private switchLang: components.SwitchLang;

    private _tableID: string;

    private previousState: number;
    private tableInfo: TableInfo;
    private gameData: baccarat.GameData;

    private btnBack: eui.Button;

    constructor(data: any) {
      super(data);
      this._tableID = data.tableID;
      //
    }

    public set tableID(tableID: string) {
      this._tableID = tableID;
    }

    public get tableID() {
      return this._tableID;
    }

    public onEnter() {
      this.mount();

      this.setupTableInfo();
      this.bettingArea.onTableInfoUpdate(this.tableInfo); // call

      const roadmap = new baccarat.BARoadmap();
      roadmap.x = 2000;
      roadmap.y = 500;
      this.addChild(roadmap);

      this.addEventListeners();
    }

    private setupTableInfo() {
      console.log(env.tableInfoArray);
      env.tableInfoArray.forEach(value => {
        if (value.tableid === this._tableID) {
          this.tableInfo = value;
        }
      });
    }

    private addEventListeners() {
      dir.evtHandler.addEventListener(enums.event.event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
      dir.evtHandler.addEventListener(enums.event.event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
      dir.evtHandler.addEventListener(enums.i18n.event.SWITCH_LANGUAGE, this.onChangeLang, this);

      this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);
    }

    private removeEventListeners() {
      dir.evtHandler.removeEventListener(enums.event.event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
      dir.evtHandler.removeEventListener(enums.event.event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);

      this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeEventListeners();
      this.removeChildren();
    }

    public backToLobby() {
      dir.sceneCtr.goto('LobbyScene');
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
        console.log(`BaccaratScene::onTableInfoUpdate:tableInfo.betDetails ${this.tableInfo.bets}`);
        console.log(`BaccaratScene::onTableInfoUpdate:this.tableInfo.tableID ${this.tableInfo.tableid}`);
        console.log(`BaccaratScene::onTableInfoUpdate:this.tableID ${this.tableID}`);

        if (tableInfo.tableid === this.tableID) {
          // update the scene
          this.tableInfo = tableInfo;
          this.gameData = <baccarat.GameData>this.tableInfo.data;
          this.bettingArea.onTableInfoUpdate(this.tableInfo);
        }
      }
    }

    protected onBetDetailUpdate(evt: egret.Event) {
      this.bettingArea.onBetDetailUpdate();
    }
  }
}
