// TypeScript file
namespace we {
  export namespace ui {
    export class DefaultLoadingUI extends core.BaseEUI implements ILoadingUI {
      protected label: ui.Label;

      constructor() {
        super('DefaultLoadingUISkin', false);
      }

      public mount() {
        this.label.text = `-, -/ -`;
      }

      public onProgress(progress, current, total) {
        if (this.label) {
          this.label.text = `${progress.toFixed(2)}, ${current}/ ${total}`;
        }
      }
    }
  }
}
