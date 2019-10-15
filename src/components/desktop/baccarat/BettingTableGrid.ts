namespace components {
  export class BettingTableGrid extends eui.Component {
    private label: eui.Label;
    private rect: egret.Shape;
    constructor() {
      super();
      this.label = new eui.Label();
    }

    public setSize(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
    set text(text: string) {
      this.label.text = text;
    }
    get text(): string {
      return this.label.text;
    }
    public setStyle(border: number, textcolor: number, bgcolor: number) {
      this.removeChildren();

      this.rect = new egret.Shape();
      this.addChild(this.rect);
      this.rect.x = 0;
      this.rect.y = 0;
      this.rect.width = this.width;
      this.rect.height = this.height;
      this.rect.graphics.beginFill(textcolor);
      this.rect.graphics.drawRect(0, 0, this.width, this.height);
      this.rect.graphics.endFill();
      this.rect.graphics.beginFill(bgcolor);
      this.rect.graphics.drawRect(
        border,
        border,
        this.width - border * 2,
        this.height - border * 2
      );
      this.rect.graphics.endFill();

      this.addChild(this.label);
      this.label.width = this.width;
      this.label.height = this.height;
      this.label.textAlign = egret.HorizontalAlign.CENTER;
      this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
      this.label.textColor = textcolor;
    }
  }
}
