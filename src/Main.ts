class Main extends eui.UILayer {
  protected createChildren(): void {
    super.createChildren();

    egret.lifecycle.addLifecycleListener(context => {
      // custom lifecycle plugin
    });

    egret.lifecycle.onPause = () => {
      dir.audioCtr.pause();
      // egret.ticker.pause();
    };

    egret.lifecycle.onResume = () => {
      dir.audioCtr.resume();
      // egret.ticker.resume();
    };

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

    dir.uaParser = new UAParser();
    env.UAInfo = dir.uaParser.getResult();
    const cn = [];
    cn.push('MainWindow');
    cn.push(env.UAInfo.os.name);
    cn.push(env.UAInfo.browser.name);
    if (env.UAInfo.device.vendor === 'Apple' && env.UAInfo.device.type === 'mobile') {
      cn.push('iPhone');
    }
    document.documentElement.className = cn.join(' ');
    FullScreenManager.OnLoad(this.stage);
    IPhoneChromeFullscreen.OnLoad(this.stage);
    // step 2: init Egrets Asset / onResume
    we.i18n.setLang('sc');
    await this.initRes();

    // step 3: create loading scene
    dir.sceneCtr.goto('loading');
    // egret.sys.resizeContext
    // egret.updateAllScreens();
    const newScreenFunction = () => {
      this.updateAllScreens();
      console.log('*******************************updateAllScreens***********************************');
    };
    egret.updateAllScreens = newScreenFunction;
  }

  private updateAllScreens() {
    const containerList = document.querySelectorAll('.egret-player');
    const length = containerList.length;
    for (let i = 0; i < length; i++) {
      const container = containerList[i];
      const player = container['egret-player'];
      player.updateScreenSize();
    }
  }

  private async initRes() {
    const versionController = new we.core.VersionController();
    await versionController.init();

    egret.registerImplementation('eui.IAssetAdapter', new AssetAdapter());
    egret.registerImplementation('eui.IThemeAdapter', new ThemeAdapter());
    RES.registerVersionController(versionController);
    try {
      await RES.loadConfig(`resource/default.res.json`, 'resource/');
      await this.loadTheme();
      fontMgr.loadFonts([{ res: 'barlow_woff', name: 'Barlow' }]);
      await RES.loadGroup(we.core.res.EgretBasic);
    } catch (err) {
      logger.e(err);
    }
  }

  private loadTheme(): Promise<{}> {
    const prerequisiteTheme = new eui.Theme(`resource/preloaddefault.thm.json`, this.stage);
    const theme = new eui.Theme(`resource/default.thm.json`, this.stage);
    return we.utils.wait(theme, eui.UIEvent.COMPLETE);
  }
}
