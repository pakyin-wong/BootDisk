namespace we {
  export namespace ui {
    export class StickyContent extends core.BaseEUI {
      protected _content: eui.Component | eui.Group;
      protected _scroller: ui.Scroller;
      // protected _offset: number;

      public constructor() {
        super();
      }

      // public set offset(value: number) {
      //   this._offset = value;
      //   this.update();
      // }
      // public get offset(): number {
      //   return this._offset;
      // }
      public set contentPaddingTop(value: number) {
        this.update();
      }

      public set content(value: eui.Component | eui.Group) {
        if (this._content && this.parent) {
          this.removeChild(this._content);
        }
        this._content = value;

        if (this.stage) {
          this.addChild(this._content);
          if (this.scroller) {
            this.scroller.dispatchEvent(new egret.Event(egret.Event.CHANGE));
          }
        }
      }

      public get content(): eui.Component | eui.Group {
        return this._content;
      }

      public set scroller(value: ui.Scroller) {
        if (!this._scroller) {
          value.addEventListener(egret.Event.CHANGE, this.onScroll, this);
        }
        this._scroller = value;
      }

      public get scroller(): ui.Scroller {
        return this._scroller;
      }

      public update() {
        if (this.stage) {
          if (this._content) {
            const point = new egret.Point();
            this.parent.localToGlobal(this.x, this.y, point);

            const offset = this.scroller.y - point.y + this.scroller.headerOffset;
            this._content.y = Math.max(0, offset);
            // const maxOffset = this.height - this._content.height;
            // this._content.y = Math.min(Math.max(0, offset), maxOffset);
          }
        }
      }

      protected mount() {
        if (this._content) {
          // add header to section
          this.addChild(this._content);
        }
        this.update();
      }

      protected onScroll() {
        this.update();
      }

      protected destroy() {
        super.destroy();
        if (this.scroller) {
          this.scroller.removeEventListener(egret.Event.CHANGE, this.onScroll, this);
        }
      }
    }
  }
}
