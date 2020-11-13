// TypeScript file
namespace we {
  export namespace ui {
    export class ListItemStateLabel extends core.BaseEUI {

      protected _label: ui.RunTimeLabel;
      protected _renderText: () => string;

      constructor() {
        super('ListItemStateLabelSkin',false);
      }

      protected initComponents() {
        super.initComponents();
        if (this._label && this._renderText) {
          this._label.renderText = this._renderText;
        }
      }

      public set renderText(val: () => string) {
        this._renderText = val;
        if (this._label) {
          this._label.renderText = val;
        }
      }

      public get renderText(): () => string {
        return this._renderText;
      }
    }
  }
}