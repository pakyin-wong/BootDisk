namespace we {
  export namespace ui {
    export abstract class AdvancedRoad extends core.BaseEUI implements we.ui.IAdvancedRoad {
      protected _tableInfo: data.TableInfo;
      public analysis: we.ui.IAnalysis;

      protected roadsContainer: egret.DisplayObjectContainer;

      protected roadsContainerDisplay: egret.Bitmap;
      protected roadsContainerRT: egret.RenderTexture;

      public constructor(skin?: string) {
        super(skin);
        this.init();
      }

      protected clearOrientationDependentComponent() {
        this.stage.removeEventListener(egret.Event.RESIZE, this.render, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      protected initOrientationDependentComponent() {
        this.stage.addEventListener(egret.Event.RESIZE, this.render, this);
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      public set tableInfo(value: data.TableInfo) {
        this._tableInfo = value;
      }

      public get tableInfo() {
        return this._tableInfo;
      }

      // protected mount() {}

      protected init() {
        this.initRoad();
        this.changeLang();
        this.render();
      }

      protected abstract initRoad();

      public changeLang() {
        // this.totalCountLabel.text = this.totalCount + '';
        // this.playerButtonLabel.text = i18n.t('baccarat.askPlayer');
        // this.bankerButtonLabel.text = i18n.t('baccarat.askBanker');
      }

      // render text by tableInfo
      public update() {
        if (this.tableInfo) {
          this.render();
        }
      }

      public render() {
        this.roadsContainer.visible = true;
        this.roadsContainerRT.drawToTexture(this.roadsContainer, this.roadsContainer.getBounds(), 1);
        this.roadsContainer.visible = false;
        this.roadsContainerDisplay.visible = true;
      }

      public destroy() {
        super.destroy();

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }
    }
  }
}
