/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace ba {
    export class Scene extends core.BaseScene {
      private bettingArea: BettingArea;
      private switchLang: ui.SwitchLang;

      private _tableID: string;

      private previousState: number;
      private tableInfo: data.TableInfo;
      private gameData: GameData;

      private btnBack: eui.Button;
      private lblRoomInfo: eui.Label;
      private lblRoomNo: eui.Label;

      private tableInfoWindow: ui.TableInfoPanel;
      private gameBar: GameBar;

      private bgImg: eui.Rect;
      private _video: egret.FlvVideo;

      private roadmap: BARoadmap;

      constructor(data: any) {
        super(data);
        this._tableID = data.tableid;

        this._video = dir.videoPool.get();

        this._video.x = 0;
        this._video.y = 0;

        this._video.width = 2560;
        this._video.height = 1320;
        // this._video.poster = 'resource/assets/bg.jpg';

        this._video.load('http://203.66.65.93:8000/live/mi-1080p.flv');
        // this._video.load('http://192.168.1.85:8090/live/360.flv');

        // this.roadmap = new baccarat.BARoadmap(data.tableID);
      }

      public set tableID(tableID: string) {
        this._tableID = tableID;
        this.lblRoomNo.text = i18n.t('baccarat.baccarat') + ' ' + this._tableID;
      }

      public get tableID() {
        return this._tableID;
      }

      public changeLang() {
        this.lblRoomNo.text = i18n.t('baccarat.baccarat') + ' ' + this._tableID;
      }

      public onEnter() {
        this.mount();

        this.setupTableInfo();
        this.bettingArea.onTableInfoUpdate(this.tableInfo); // call

        // this.tableInfoWindow.visible = false;
        this.tableInfoWindow.setToggler(this.lblRoomInfo);
        this.addEventListeners();

        this.addChild(this._video);
        this.setChildIndex(this._video, 0);
        // this.playVideo();

        this.gameBar.setPlayFunc(this.playVideo(this));
        this.gameBar.setStopFunc(this.stopVideo(this));

        // setInterval(() => ui.EdgeDismissableAddon.toggle(), 2000);
      }

      public playVideo(scene: any) {
        return () => {
          scene._video.play();
          scene.bgImg.visible = false;
          scene.bgImg.enabled = false;
        };
      }

      public stopVideo(scene: any) {
        return () => {
          scene._video.stop();
          scene.bgImg.visible = true;
          scene.bgImg.enabled = true;
        };
      }

      private setupTableInfo() {
        // console.log(env.tableInfoArray);
        env.tableInfoArray.forEach(value => {
          if (value.tableid === this._tableID) {
            this.tableInfo = value;
          }
        });
      }

      private addEventListeners() {
        dir.evtHandler.addEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.onChangeLang, this);
        dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);

        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);
        // this.lblRoomInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleRoomInfo, this);
      }

      private toggleRoomInfo() {
        this.tableInfoWindow.visible = !this.tableInfoWindow.visible;
      }

      private removeEventListeners() {
        dir.evtHandler.removeEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
        dir.evtHandler.removeEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);
      }

      public async onFadeEnter() { }

      public onExit() {
        dir.videoPool.release(this._video);
        this.removeEventListeners();
        this.removeChildren();
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby');
      }

      public onChangeLang() {
        this.changeLang();
        this.bettingArea.onChangeLang();
      }

      public async onFadeExit() { }

      protected mount() {
        // step 1: load Baccarat Screen Resource

        // step 2: init ui
        // this.skin = 'skin_desktop.BaccaratScene'
        this.skinName = 'resource/skin_desktop/BaccaratScene.exml';
        // this.btnTest.addEventListener(egret.TouchEvent.TOUCH_TAP );
        // this.setSkin(new eui.Skin())
        this.roadmap = new BARoadmap(this._tableID);
        this.roadmap.x = 2000;
        this.roadmap.y = 500;
        this.addChild(this.roadmap);

        // step 3: connect socket
        // this.socketConnect();
      }

      protected socketConnect() { }

      protected socketConnectSuccess() {
        // dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        // dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
        // step 4: auth and get user profiles
        // step 5: get and display tips, promote banner
        // step 6: load general resource (lobby, baccarat)
        // step 7: init complete, transfer to lobby scene
        // dir.sceneCtr.goto('LobbySCene');
      }

      protected socketConnectFail() { }

      protected onTableInfoUpdate(evt: egret.Event) {
        console.log('Baccarat listener');
        const tableInfo = <data.TableInfo>evt.data;
        if (tableInfo) {
          // console.log(`BaccaratScene::onTableInfoUpdate:tableInfo ${this.tableInfo}`);
          // console.log(`BaccaratScene::onTableInfoUpdate:tableInfo.betDetails ${this.tableInfo.bets}`);
          // console.log(`BaccaratScene::onTableInfoUpdate:this.tableInfo.tableID ${this.tableInfo.tableid}`);
          // console.log(`BaccaratScene::onTableInfoUpdate:this.tableID ${this.tableID}`);

          if (tableInfo.tableid === this.tableID) {
            // update the scene
            this.tableInfo = tableInfo;
            this.gameData = <GameData>this.tableInfo.data;
            this.bettingArea.onTableInfoUpdate(this.tableInfo);
            this.roadmap.updateRoadData(tableInfo.roadmap);
          }
        }
      }

      protected onBetDetailUpdate(evt: egret.Event) {
        const tableInfo = <data.TableInfo>evt.data;
        if (tableInfo.tableid === this.tableID) {
          this.bettingArea.onBetDetailUpdate(this.tableInfo);
        }
      }

      protected onBetResultReceived(evt: egret.Event) {
        const result: data.PlayerBetResult = evt.data;
        if (result.success) {
          this.bettingArea.onBetConfirmed();
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        console.log('BaccaratScene::onRoadDataUpdate');
        // const tableInfo = <data.TableInfo>evt.data;
        // if (tableInfo.tableid === this.tableID) {
        // this.roadmap.updateRoadData(tableInfo.roadmap);
        // }
      }
    }
  }
}
