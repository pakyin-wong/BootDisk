namespace baccarat {
  export class BettingTableGrid extends eui.Component {
    private lblName: eui.Label;
    private rect: egret.Shape;
    private lblUncfmBet: eui.Label;
    private lblCfmBet: eui.Label;
    private cfmBet: number;
    private uncfmBet: number;

    private border: number = 10;
    private textColor: number = 0xffffff;
    private bgColor: number = 0x000000;

    constructor() {
      super();
      this.lblName = new eui.Label();
      this.lblUncfmBet = new eui.Label();
      this.lblCfmBet = new eui.Label();
      this.cfmBet = 0;
      this.uncfmBet = 0;
    }

    protected childrenCreated() {
      super.childrenCreated();
      this.addEventListener(
        egret.TouchEvent.TOUCH_TAP,
        function() {
          this.setUncfmBet();
        },
        this
      );
    }

    public setUncfmBet() {
      if (env.betLimits && env.betLimits.denominationList[env.currentChipSelectedIndex]) {
        this.cfmBet += env.betLimits.denominationList[env.currentChipSelectedIndex];
        this.lblUncfmBet.text = this.cfmBet.toString();
      }
    }

    public setSize(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
    set text(text: string) {
      this.lblName.text = text;
    }
    get text(): string {
      return this.lblName.text;
    }

    public $setWidth(num: number) {
      super.$setWidth(num);
      this.setStyle(this.border, this.textColor, this.bgColor);
    }

    public setStyle(border: number, textcolor: number, bgcolor: number) {
      this.removeChildren();

      this.rect = new egret.Shape();
      this.addChild(this.rect);
      // this.rect.x = 0;
      // this.rect.y = 0;

      this.rect.width = this.width;
      this.rect.height = this.height;
      this.rect.graphics.clear();
      this.rect.graphics.beginFill(textcolor);
      this.rect.graphics.drawRect(0, 0, this.width, this.height);
      this.rect.graphics.endFill();
      this.rect.graphics.beginFill(bgcolor);
      this.rect.graphics.drawRect(border, border, this.width - border * 2, this.height - border * 2);
      this.rect.graphics.endFill();

      this.addChild(this.lblName);
      this.lblName.width = this.width;
      this.lblName.height = this.height;
      this.lblName.textAlign = egret.HorizontalAlign.CENTER;
      this.lblName.verticalAlign = egret.VerticalAlign.MIDDLE;
      this.lblName.textColor = textcolor;

      this.addChild(this.lblUncfmBet);
      this.setUncfmBet();
      this.lblUncfmBet.bottom = 20;
      this.lblUncfmBet.left = 20;
    }
  }
}
