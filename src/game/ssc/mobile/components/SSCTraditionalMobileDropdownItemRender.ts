// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalMobileDropdownItemRender extends eui.ItemRenderer {
      protected review: we.ui.RunTimeLabel;
      protected _key;

      public constructor() {
        super();
        this.skinName = 'skin_mobile_portrait.MobileDropdownItem';
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        // mouse.setButtonMode(this, true);
      }

      protected dataChanged() {
        const key = this.data.key;
        this._key = key;
        this.review.renderText = this.data.renderText ? () => this.data.renderText : () => key;
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
