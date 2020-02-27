namespace we {
  export namespace ui {
    export class RuntimeLabelListItem extends ui.ItemRenderer {
      protected _label: ui.RunTimeLabel;

      constructor() {
        super();
      }

      public itemDataChanged() {
        super.itemDataChanged();
        this._label.renderText = () => i18n.t(this.itemData);
      }

      // public getCurrentState() {
      //   var state = "up";
      //   if (!this.enabled) {
      //     state = "disabled";
      //   }
      //   if (this.touchCaptured) {
      //     state = "down";
      //   }
      //   if (this._selected) {
      //     var selectedState = state + "AndSelected";
      //     var skin = this.skin;
      //     if (skin && skin.hasState(selectedState)) {
      //       return selectedState;
      //     }
      //     return state == "disabled" ? "disabled" : "down";
      //   }
      //   return state;
      // };
    }
  }
}
