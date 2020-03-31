namespace we {
  export namespace ui {
    export class MobileDropdownItemRender extends eui.ItemRenderer {
      protected review: ui.RunTimeLabel;
      protected _key;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('MobileDropdownItem');
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        // mouse.setButtonMode(this, true);
      }

      protected dataChanged() {
        const key = this.data.key ? this.data.key : this.data;
        this._key = key;
        this.review.renderText = this.data.renderText ? this.data.renderText : () => key;
      }

      public get key() {
        return this._key;
      }

      public get renderText() {
        return this.review.renderText;
      }
    }
  }
}
