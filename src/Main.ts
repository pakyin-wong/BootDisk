class Main extends eui.UILayer {


  protected createChildren(): void {
    super.createChildren();

    egret.lifecycle.addLifecycleListener((context) => {
      // custom lifecycle plugin
    })

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
    }

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
    }

    this.init().catch(e => {
      console.log(e);
    })
  }

  private async init() {
    // step 1: init director elements (socket comm, controller, handler)
    dir.socket = new socket.MQTTSocketComm();
    dir.evtHandler = new handler.EventHandler();
    dir.errHandler = new handler.ErrorHandler();
    dir.layerCtr = new controller.LayerCtr(this.stage);
    dir.sceneCtr = new controller.SceneCtr();

    // step 2: create loading scene
    dir.sceneCtr.goto('LoadingScene');

    // step 2.1: connect socket

    // step 2.2: auth and get user profiles

    // step 2.3: load general resource (lobby, baccarat)

    // step 3: init complete, transfer to lobby scene
  }
}