namespace we {
  export namespace ui {
    export class IconItemRenderer extends DropdownItemRenderer {
      private _icon: eui.Image;

      protected dataChanged() {
        // this._key = this.data.key;
        // this._icon.source = this.data.url;
        this._icon.source = this.data;
      }
    }
  }
}
