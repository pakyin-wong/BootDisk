namespace we {
  export namespace ui {
    export class IconItemRenderer extends DropdownItemRenderer {
      private _icon: eui.Image;
      private _iconFrame: eui.Image;

      protected dataChanged() {
        // this._key = this.data.key;
        // this._icon.source = this.data.url;
        console.log('this.data', this.data);
        this._icon.source = env.icons && env.icons[this.data] ? env.icons[this.data] : '';
      }
    }
  }
}
