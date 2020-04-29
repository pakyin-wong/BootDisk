namespace we {
  export namespace core {
    export class Director {
      private static _director: Director;

      public static get Instance(): Director {
        return this._director ? this._director : new Director();
      }

      // public socket: socket.MQTTSocketComm;
      public config: any;
      public socket: ISocket;
      public evtHandler: EventHandler;
      public errHandler: ErrorHandler;
      public audioCtr: AudioCtr;
      public layerCtr: LayerCtr;
      public sceneCtr: SceneCtr;
      public meterCtr: MeterCtr;
      public monitor: Monitor;
      public videoPool: utils.Pool<egret.FlvVideo>;
      public lobbyResources: lobby.ILobbyResources;
      public liveResources: live.ILiveResources;
      public uaParser: UAParser;
      public advancedRoadPool: ui.GameComponentPool;
      public analysisPool: ui.GameComponentPool;
      public lobbyRoadPool: ui.LobbyRoadPool;
    }
  }
}

let dir: we.core.Director = we.core.Director.Instance;
