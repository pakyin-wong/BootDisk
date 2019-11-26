namespace we {
  export namespace ui {
    export class ScrollingMessage extends eui.Label {
      constructor() {
        super();
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        const label = new eui.Label();
        label.text = this.text;
        const container = new eui.Group();
        container.width = this.width;
        container.height = this.height;
        container.x = this.x;
        container.y = this.y;
        container.addChild(label);
        const par = this.parent;
        par.removeChild(this);
        par.addChild(container);
      }
    }
  }
}
