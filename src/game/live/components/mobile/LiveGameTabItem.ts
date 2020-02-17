namespace we {
  export namespace live {
    export class LiveGameTabItem extends ui.ItemRenderer {
      public itemIndex: number;

      private _image: eui.Image;
      private _label: ui.RunTimeLabel;
      private boldWidth = null;

      public destinationX: number = Infinity;
      public destinationY: number = Infinity;

      public constructor() {
        super();
        this.skinName = utils.getSkin('LiveGameTabItem');
      }

      public itemDataChanged() {
        super.itemDataChanged();

        this._label.renderText = () => i18n.t(`live.gametype.${this.data}`);
        this.setIcon();
      }

      protected setIcon() {
        switch (this.data) {
          case 'bacarrat':
            this._image.source = 'm_lobby_submenu_icon_baccarat_png';
            break;
          case 'other':
            this._image.source = 'm_lobby_submenu_icon_other_png';
            break;
        }
      }
    }
  }
}
