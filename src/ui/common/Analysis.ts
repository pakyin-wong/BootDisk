namespace we {
  export namespace ui {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _tableId;

      protected _content: eui.Group;
      protected containerDisplay: egret.Bitmap;
      protected containerRT: egret.RenderTexture;

      public advancedRoad: we.ui.IAdvancedRoad;

      constructor(skin) {
        super(skin);
      }

      protected mount() {
        super.mount();

        this.init();

        // if (this._content) {
        //   this.containerRT = new egret.RenderTexture();
        //   this.containerDisplay = new egret.Bitmap();
        //   this.containerDisplay.texture = this.containerRT;
        //   this.containerDisplay.x = this._content.x;
        //   this.containerDisplay.y = this._content.y;
        //   const idx = this.getChildIndex(this._content);
        //   this.addChildAt(this.containerDisplay, idx+1);

        //   this.render();
        // }
      }

      protected init() {}

      public render() {
        // if (this._content) {
        //   this._content.visible = true;
        //   this._content.validateNow();
        //   this.containerRT.drawToTexture(this._content, this._content.getBounds(), 1);
        //   this._content.visible = false;
        //   this.containerDisplay.visible = true;
        // }
        if (this.containerDisplay) { this.containerDisplay.visible = false; }
        if (this._content) { this._content.visible = true; }
      }

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      public updateTableBetInfo() {
        if (!this._tableId) {
          return;
        }
        if (this._content) {
          this.render();
        }
      }

      public updateRoad() {
        // if (!this._tableId) {
        //   return;
        // }
        // if (this._content) {
        //   this.render();
        // }
      }
    }
  }
}
