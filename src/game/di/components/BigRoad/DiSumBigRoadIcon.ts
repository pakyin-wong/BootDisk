namespace we {
  export namespace di {
    export class DiSumBigRoadIcon extends ba.BARoadIconBase {
      private iconText: egret.TextField;

      public constructor(size: number = 30) {
        super(size);
        this.initGraphics();
        this.setByObject({});
      }

      protected initGraphics() {
        this.iconText = new egret.TextField();

        this.addChild(this.iconText);

        // draw the icon text
        this.iconText.textAlign = egret.HorizontalAlign.CENTER;
        this.iconText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.iconText.textColor = 0x000000;
        this.iconText.text = '2';
        this.iconText.width = this.size;
        this.iconText.height = this.size;
        this.iconText.size = this.size * 0.7;
        // this.iconText.fontFamily = 'Times New Roman';


      }

      public setByObject(value: any) {
        this.reset();
        this.value = value;
        if (value.v != null) {
          this.iconText.text = value.v;
        }
      }

      public reset() {
        this.iconText.text = '';
        this.value = null;
      }

    }
  }
}
