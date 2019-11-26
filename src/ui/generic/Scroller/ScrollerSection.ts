namespace we {
  export namespace ui {
    export class ScrollerSection extends core.BaseEUI {
      protected _header: eui.Component;
      protected _content: eui.Component;
      protected _scroller: ui.Scroller;
      // protected _offset: number;

      public isHeaderSticky: boolean = false;
      public isHeaderOverlay: boolean = false;

      // public set offset(value: number) {
      //   this._offset = value;
      //   this.update();
      // }
      // public get offset(): number {
      //   return this._offset;
      // }
      public set header(value: eui.Component) {
        if (this._header && this.parent) {
          this.removeChild(this._header);
        }
        this._header = value;

        if (this._content && !this.isHeaderOverlay) {
          // update content position
          this._content.y = this._header.height;
        }
        if (this.stage) {
          this.addChild(this._header);
          if (this.scroller) {
            this.scroller.dispatchEvent(new egret.Event(egret.Event.CHANGE));
          }
        }
      }
      public get header(): eui.Component {
        return this._header;
      }

      public set content(value: eui.Component) {
        if (this._content && this.parent) {
          this.removeChild(this._content);
        }
        this._content = value;
        if (this._header && !this.isHeaderOverlay) {
          this._content.y = this._header.height;
        }
        if (this.stage) {
          this.addChildAt(this._content, 0);
          if (this.scroller) {
            this.scroller.dispatchEvent(new egret.Event(egret.Event.CHANGE));
          }
        }
      }
      public get content(): eui.Component {
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

      protected update() {
        if (this.stage && this._header && this.isHeaderSticky) {
          const point = new egret.Point();
          this.parent.localToGlobal(this.x, this.y, point);

          const offset = this.scroller.y - point.y + this.scroller.headerOffset;
          const maxOffset = this.height - this._header.height;
          this._header.y = Math.min(Math.max(0, offset), maxOffset);
        }
      }

      public constructor() {
        super();
      }

      protected mount() {
        if (this._content) {
          // add content to section
          let height = 0;
          if (this._header && !this.isHeaderOverlay) {
            height = this._header.height;
          }
          this._content.y = height;
          this.addChild(this._content);
        }
        if (this._header) {
          // add header to section
          this.addChild(this._header);
        }
        this.update();
      }

      protected onScroll() {
        this.update();
      }

      protected destroy() {
        if (this.scroller) {
          this.scroller.removeEventListener(egret.Event.CHANGE, this.onScroll, this);
        }
      }
    }
  }
}
