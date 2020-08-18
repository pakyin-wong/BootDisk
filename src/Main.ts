class Main extends eui.UILayer {
  protected orientationManager: we.utils.OrientationManager;

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
      logger.e(we.utils.LogTarget.DEBUG, err);
    });
  }

  private async init() {
    egret.ImageLoader.crossOrigin = 'anonymous';

    eui.Label.default_fontFamily = 'Microsoft JhengHei,Sans-Serif';
    egret.TextField.default_fontFamily = 'Microsoft JhengHei,Sans-Serif';
    we.ui.RunTimeLabel.default_fontFamily = 'Microsoft JhengHei,Sans-Serif';
    // step 1: init director elements (socket comm, controller, handler)
    // dir.socket = new socket.SocketMock();
    dir.config = await we.utils.getConfig();
    if (dir.config.mode === 'comm') {
      dir.socket = new we.core.SocketComm();
    } else {
      dir.socket = new we.core.SocketMock();
    }
    dir.uaParser = new UAParser();
    env.UAInfo = dir.uaParser.getResult();

    logger.l(we.utils.LogTarget.DEBUG, env.UAInfo);
    logger.l(we.utils.LogTarget.DEBUG, egret.Capabilities.runtimeType, egret.Capabilities.isMobile, egret.Capabilities.os);

    const cn = [];
    cn.push('MainWindow');
    cn.push(env.UAInfo.os.name);
    cn.push(env.UAInfo.browser.name);
    if (env.UAInfo.device.vendor === 'Apple' && env.UAInfo.device.type === 'mobile') {
      cn.push('iPhone');
    }
    document.documentElement.className = cn.join(' ');

    const { type } = env.UAInfo.device;


    // if (type === 'mobile') {
    // if (true) {
    env.isMobile = true;
    this.updateMobileHitTest();
    // use these when there is portrait mode only
    // this.stage.setContentSize(1242, 2155);
    // this.stage.orientation = egret.OrientationMode.PORTRAIT;
    // env.orientation = egret.OrientationMode.PORTRAIT;
    // this.stage.setContentSize(2155, 1242);
    // this.stage.orientation = egret.OrientationMode.LANDSCAPE;
    // env.orientation = egret.OrientationMode.LANDSCAPE;

    // uncomment below when there are both portrait and landscape layout
    this.orientationManager = new we.utils.OrientationManager(this.stage);
    // }

    dir.evtHandler = new we.core.EventHandler();
    dir.errHandler = new we.core.ErrorHandler();
    dir.audioCtr = new we.core.AudioCtr(this.stage);
    dir.tooltipCtr = new we.core.TooltipCtr(this.stage);
    dir.layerCtr = new we.core.LayerCtr(this.stage);
    dir.sceneCtr = new we.core.SceneCtr();
    dir.meterCtr = new we.core.MeterCtr();
    dir.monitor = new we.core.Monitor();
    dir.videoPool = new we.utils.Pool(egret.FlvVideo);
    env.init();
    env.frameRate = this.stage.frameRate;

    we.utils.updateEgretSys();

    FullScreenManager.OnLoad(this.stage);
    IPhoneChromeFullscreen.OnLoad(this.stage);

    // step 2: init Egrets Asset / onResume
    we.i18n.setLang('sc', true);
    await this.initRes();
    env.initialized = true;
    if (type !== 'mobile') {
      const opt = {
        ba: 8,
        dt: 8,
        ro: 8,
        di: 8,
        lw: 8,
      };
      dir.advancedRoadPool = new we.ui.AdvancedRoadPool(opt);
      dir.analysisPool = new we.ui.AnalysisPool(opt);
      const opt2 = {
        ba: 16,
        dt: 16,
        ro: 16,
        di: 16,
        lw: 16,
      };
      dir.lobbyRoadPool = new we.ui.LobbyRoadPool(opt2);
    }

    this.showVersionNumber();
    // step 3: create loading scene
    dir.sceneCtr.goto('loading');
    // egret.sys.resizeContext
    // egret.updateAllScreens();
    egret.updateAllScreens = () => {
      this.updateAllScreens();
      logger.l(we.utils.LogTarget.DEBUG, '*******************************updateAllScreens***********************************');
    };
  }

  protected showVersionNumber() {
    if (env.versionNotShownIn.indexOf(dir.config.target) > -1) {
      return;
    }
    const version = new eui.Label();
    version.text = `version: ${env.version}`;
    version.textColor = 0xffffff;
    version.bottom = 0;
    dir.layerCtr.version.addChild(version);
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

    RES.processor.map('zip', new ZipProcessor());

    try {
      let prodStr = '.prod';
      if (DEBUG) {
        prodStr = '';
      }
      await RES.loadConfig(`resource/${env.isMobile ? 'mobile' : 'desktop'}${prodStr}.res.json`, 'resource/');
      await this.loadTheme();

      fontMgr.loadFonts([
        { res: 'Barlow-Regular_otf', name: 'Barlow' },
        { res: 'BarlowCondensed-SemiBold_otf', name: 'BarlowCondensed' },
        { res: 'NeonOne_otf', name: 'NeonOne' },
      ]);

      // await RES.loadGroup(we.core.res.EgretBasic);
    } catch (err) {
      logger.e(we.utils.LogTarget.DEBUG, err);
    }
  }

  private async loadTheme(): Promise<{}> {
    const prerequisiteTheme = new eui.Theme(`resource/preloaddefault.thm.json`, this.stage);
    await we.utils.wait(prerequisiteTheme, eui.UIEvent.COMPLETE);
    const theme = new eui.Theme(`resource/default.thm.json`, this.stage);
    return we.utils.wait(theme, eui.UIEvent.COMPLETE);
  }

  private updateMobileHitTest() {
    const $hitTest = egret.DisplayObjectContainer.prototype.$hitTest;
    egret.DisplayObjectContainer.prototype.$hitTest = function (stageX, stageY) {
      if (!this.$touchEnabled && !this.$touchChildren) {
        return null;
      }
      const rs = $hitTest.call(this, stageX, stageY);
      return rs;
    };
  }
}
