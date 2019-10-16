class Main extends eui.UILayer {
  protected createChildren(): void {
    super.createChildren();

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
    // dir.socket = new socket.MQTTSocketComm();
    dir.socket = new socket.SockMock();
    dir.evtHandler = new handler.EventHandler();
    dir.errHandler = new handler.ErrorHandler();
    dir.layerCtr = new controller.LayerCtr(this.stage);
    dir.sceneCtr = new controller.SceneCtr();

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
      await RES.loadGroup('egret_basic');
      await RES.loadGroup('common');
    } catch (e) {
      console.error(e);
    }
  }

  private async loadTheme() {
    const theme = new eui.Theme('resource/default.thm.json', this.stage);
    await evt.wait(theme, eui.UIEvent.COMPLETE);
  }
}
