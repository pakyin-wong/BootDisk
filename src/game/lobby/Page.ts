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

      constructor(data: any = null) {
        super('LobbyPage', data);
        this.collection = new eui.ArrayCollection(this.roomIds);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        if (env.isMobile) {
          const contentInitializer = new MPageContentInitializer();
          contentInitializer.initContent(this);
        } else {
          const contentInitializer = new DPageContentInitializer();
          contentInitializer.initContent(this);
        }
      }
    }
  }
}
