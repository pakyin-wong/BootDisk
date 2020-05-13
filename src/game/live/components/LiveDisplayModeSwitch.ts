namespace we {
  export namespace live {
    export class LiveDisplayModeSwitch extends ALobbyGridLayoutSwitch {
      private container: eui.Group;
      private buttonNames = ['d_lobby_viewmode_icon_tiny', 'd_lobby_viewmode_icon_general', 'd_lobby_viewmode_icon_pro'];
      private buttons: we.ui.BaseAnimationButton[] = [];
      private selectedIndex: number;

      constructor() {
        super();
      }

      protected mount() {
        super.mount();
        this.right = 0;
        this.verticalCenter = 0;
        this.container = new eui.Group();
        const hlayout = new eui.HorizontalLayout();
        hlayout.gap = 20;
        this.container.layout = hlayout;
        this.buttonNames.forEach((name, idx) => {
          const btn = new we.ui.BaseAnimationButton();
          btn.dbClass = 'lobby_ui';
          btn.dbDisplay = name;
          btn.height = 60;
          btn.width = 60;
          btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemClick.bind(this, idx), this);
          this.container.addChild(btn);
          this.buttons.push(btn);
        });
        this.addChild(this.container);
        // set initial active btn
        this._setSelectedIndex(env.lobbyGridType);
      }

      private _setSelectedIndex(selectedIndex: number) {
        this.selectedIndex = selectedIndex;
        env.lobbyGridType = selectedIndex;
        this.buttons.forEach((img, idx) => {
          img.active = idx === selectedIndex;
        });
        this.setGridType(selectedIndex);
      }

      public onItemClick(index: number) {
        if (!env.livepageLocked) {
          this._setSelectedIndex(index);
        }
      }
    }
  }
}
