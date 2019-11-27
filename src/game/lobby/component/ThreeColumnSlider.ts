namespace we {
  export namespace lobby {
    export class ThreeColumnSlider extends we.core.BaseEUI {
      public items;

      constructor() {
        super();
      }

      public mount() {
        console.log(this.width, this.height);
        const r = new eui.Rect();
        r.width = this.width;
        r.height = this.height;
        r.fillColor = 0x2c2c2c;
        this.addChild(r);
        const left = new eui.Label();
        left.text = '<';
        left.left = -40;
        left.verticalCenter = 0;
        this.addChild(left);
        const right = new eui.Label();
        right.text = '>';
        right.right = -40;
        right.verticalCenter = 0;
        this.addChild(right);
      }
    }
  }
}
