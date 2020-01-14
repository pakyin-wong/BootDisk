class Main extends eui.UILayer {
  protected createChildren(): void {
    super.createChildren();

    mouse.enable(this.stage);

    this.stage['inFocusItems'] = [];

    this.init().catch(err => {
      logger.e(err);
    });
  }

  private async init() {
    // step 1: init director elements (socket comm, controller, handler)
    // dir.socket = new socket.SocketMock();
    dir.config = await we.utils.getConfig();
    if (dir.config.mode === 'comm') {
      dir.socket = new we.core.SocketComm();
    } else {
      dir.socket = new we.core.SocketMock();
    }
    dir.evtHandler = new we.core.EventHandler();
    dir.errHandler = new we.core.ErrorHandler();
    dir.audioCtr = new we.core.AudioCtr(this.stage);
    dir.layerCtr = new we.core.LayerCtr(this.stage);
    dir.sceneCtr = new we.core.SceneCtr();
    dir.meterCtr = new we.core.MeterCtr();
    dir.moniter = new we.core.Monitor();
    dir.videoPool = new we.utils.Pool(egret.FlvVideo);
    env.init();

    // step 2: init Egrets Asset / onResume
    we.i18n.setLang('sc');
    await this.initRes();

    // step 3: create loading scene
    dir.sceneCtr.goto('loading');
  }

  private async initRes() {
    egret.registerImplementation('eui.IAssetAdapter', new AssetAdapter());
    egret.registerImplementation('eui.IThemeAdapter', new ThemeAdapter());
    try {
      await RES.loadConfig('resource/default.res.json', 'resource/');
      await this.loadTheme();
      fontMgr.loadFonts([{ res: 'barlow_woff', name: 'Barlow' }]);
      await RES.loadGroup(we.core.res.EgretBasic);
    } catch (err) {
      logger.e(err);
    }
  }

  private loadTheme(): Promise<{}> {
    const prerequisiteTheme = new eui.Theme('resource/preloaddefault.thm.json', this.stage);
    const theme = new eui.Theme('resource/default.thm.json', this.stage);
    return we.utils.wait(theme, eui.UIEvent.COMPLETE);
  }
}
