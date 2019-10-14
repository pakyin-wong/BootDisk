class Main extends eui.UILayer {
  protected createChildren(): void {
    super.createChildren();

    egret.lifecycle.addLifecycleListener(context => {
      // custom lifecycle plugin
    });

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
    };

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
    };

    // inject the custom material parser
    // 注入自定义的素材解析器
    const assetAdapter = new AssetAdapter();
    egret.registerImplementation('eui.IAssetAdapter', assetAdapter);

    this.init().catch(e => {
      console.log(e);
    });
  }

  private async init() {
    // step 1: init director elements (socket comm, controller, handler)
    dir.socket = new socket.MQTTSocketComm();
    dir.evtHandler = new handler.EventHandler();
    dir.errHandler = new handler.ErrorHandler();
    dir.layerCtr = new controller.LayerCtr(this.stage);
    dir.sceneCtr = new controller.SceneCtr();

    await this.loadResource();

    // step 2: create loading scene
    dir.sceneCtr.goto('LoadingScene');
  }

  private async loadResource() {
    try {
      await RES.loadConfig('resource/default.res.json', 'resource/');
    } catch (e) {
      console.error(e);
    }
  }
}
