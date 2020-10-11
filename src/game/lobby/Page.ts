namespace we {
  export namespace lobby {
    export class Page extends core.BasePage implements ILobbyPage {
      public scroller: ui.Scroller;
      protected collection: eui.ArrayCollection;
      protected roomIds: number[] = [];

      public _txt_hotgame: ui.RunTimeLabel;
      public _bannerSlider: ui.ImageSlider;
      public _posterContainer: eui.Group;
      public _hotgameContainer: eui.Group;

      public _contentInitializer: core.IContentInitializer;

      constructor(data: any = null) {
        super('LobbyPage', data);
        this.collection = new eui.ArrayCollection(this.roomIds);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      public set orientationDependent(value: boolean) {
        this._orientationDependent = value;
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        env.currentPage = 'lobby';

        if (env.isMobile) {
          this._contentInitializer = new MPageContentInitializer();
          this._contentInitializer.initContent(this);
        } else {
          this._contentInitializer = new DPageContentInitializer();
          this._contentInitializer.initContent(this);
        }

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }


      protected changeLang(e: egret.Event) {
        this._contentInitializer.reloadBanners();
      }
    }
  }
}
