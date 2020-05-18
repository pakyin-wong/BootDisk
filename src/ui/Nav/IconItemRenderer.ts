namespace we {
  export namespace ui {
    export class IconItemRenderer extends DropdownItemRenderer {
      private _icon: eui.Image;

      protected dataChanged() {
        // this._key = this.data.key;
        // this._icon.source = this.data.url;
        this._icon.source = this.data;
      }

      // protected getCurrentState() {
      //   let state = 'up';
      //   if (!this.enabled) {
      //     state = 'disabled';
      //   }
      //   if (this.isTouchCaptured) {
      //     state = 'down';
      //   }
      //   if (this.selected) {
      //     const selectedState = state + 'AndSelected';
      //     const skin = this.skin;
      //     if (skin && skin.hasState(selectedState)) {
      //       return selectedState;
      //     }
      //     return state === 'disabled' ? 'disabled' : 'down';
      //   }
      //   return state;
      // }
    }
  }
}
