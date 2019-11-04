class Main extends eui.UILayer {
  protected createChildren(): void {
    super.createChildren();
    // add global mouse event handler
    mouse.enable(this.stage);

    // egret.lifecycle.addLifecycleListener(context => {
    //   // custom lifecycle plugin
    // });

    // egret.lifecycle.onPause = () => {
    //   egret.ticker.pause();
    // };

    // egret.lifecycle.onResume = () => {
    //   egret.ticker.resume();
    // };

    this.init().catch(e => {
      console.log(e);
    });
  }

  private async init() {
    // step 1: init director elements (socket comm, controller, handler)
    dir.socket = new socket.SocketMock();
    // dir.socket = new socket.SocketComm();
    dir.evtHandler = new handler.EventHandler();
    dir.errHandler = new handler.ErrorHandler();
    dir.layerCtr = new controller.LayerCtr(this.stage);
    dir.sceneCtr = new controller.SceneCtr();
    dir.moniter = new Monitor();
    dir.videoPool = new Pool(egret.FlvVideo);

    // step 2: init Egrets Asset / Res
    await this.initRes();

    // step 3: create loading scene
    dir.sceneCtr.goto('LoadingScene');
  }

  private async initRes() {
    egret.registerImplementation('eui.IAssetAdapter', new AssetAdapter());
    egret.registerImplementation('eui.IThemeAdapter', new ThemeAdapter());
    try {
      await RES.loadConfig('resource/default.res.json', 'resource/');
      await this.loadTheme();
      await RES.loadGroup(enums.res.EgretBasic);
    } catch (e) {
      console.error(e);
    }
  }

  private async loadTheme() {
    const theme = new eui.Theme('resource/default.thm.json', this.stage);
    await evt.wait(theme, eui.UIEvent.COMPLETE);
  }
}
