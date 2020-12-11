namespace we {
  export namespace live {
    export class LiveDisplayModeSwitch extends ALobbyGridLayoutSwitch {
      private container: eui.Group;
      // private buttonNames = ['d_lobby_viewmode_icon_tiny', 'd_lobby_viewmode_icon_general', 'd_lobby_viewmode_icon_pro'];
      private buttonNames = ['d_lobby_viewmode_icon_pro', 'd_lobby_viewmode_icon_general', 'd_lobby_viewmode_icon_tiny'];
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
        hlayout.gap = 0;
        this.container.layout = hlayout;
        this.buttonNames.forEach((name, idx) => {
          const btn = new we.ui.BaseAnimationButton();
          btn.dbClass = 'lobby_ui';
          btn.dbDisplay = name;
          btn['tooltipText'] = 'nav.tooltip.' + name;
          btn['tooltipPosition'] = 'above';
          btn.isSwitch = true;
          btn.height = 30;
          btn.width = 30;
          btn.verticalCenter = 0;
          btn.horizontalCenter = 0;

          const btnContainer = new eui.Group();
          btnContainer.width = 40;
          btnContainer.height = 40;
          btnContainer.addChild(btn);

          utils.addButtonListener(btnContainer, this.onItemClick.bind(this, idx), this);
          this.container.addChild(btnContainer);
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
