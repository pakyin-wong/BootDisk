namespace baccarat {
  export class BettingTableGrid extends eui.Component {
    private lblName: eui.Label;
    private rect: egret.Shape;
    private lblUncfmBet: eui.Label;
    private lblCfmBet: eui.Label;

    private _fieldName: string;
    private _cfmBet: number;
    private _uncfmBet: number;

    private _border: number = 10;
    private _textColor: number = 0xffffff;
    private _bgColor: number = 0x000000;

    constructor() {
      super();
      this.lblName = new eui.Label();
      this.lblUncfmBet = new eui.Label();
      this.lblCfmBet = new eui.Label();
      this._cfmBet = 0;
      this._uncfmBet = 0;
    }

    protected childrenCreated() {
      super.childrenCreated();
      this.setUncfmBet(0);
      this.setCfmBet(0);

      this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    protected onClick() {
      const amount = env.betLimits[env.currentSelectedBetLimitIndex].chipsList[env.currentChipSelectedIndex].value;
      this.dispatchEvent(new egret.Event('TABLE_GRID_CLICK', false, false, { field: this._fieldName, amount }));
    }

    public setFieldName(name) {
      this._fieldName = name;
    }

    public setCfmBet(amount: number): void {
      this._cfmBet = amount;
      this.lblCfmBet.text = this._cfmBet.toString();
    }

    public setUncfmBet(amount: number): void {
      this._uncfmBet = amount;
      this.lblUncfmBet.text = this._uncfmBet.toString();
    }

    public addUncfmBet(amount: number): void {
      this._uncfmBet += amount;
      this.lblUncfmBet.text = this._uncfmBet.toString();
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
      this.setStyle(this._border, this._textColor, this._bgColor);
    }

    public cancelBet(): void {
      this.setUncfmBet(0);
    }

    public getUncfmBet(): number {
      return this._uncfmBet;
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
      this.setUncfmBet(this._uncfmBet);
      this.lblUncfmBet.bottom = 20;
      this.lblUncfmBet.left = 20;

      this.addChild(this.lblCfmBet);
      this.setCfmBet(this._cfmBet);
      this.lblCfmBet.bottom = 20;
      this.lblCfmBet.right = 20;
    }
  }
}
