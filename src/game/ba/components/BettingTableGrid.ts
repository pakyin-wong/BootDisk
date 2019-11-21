namespace we {
  export namespace ba {
    export class BettingTableGrid extends eui.Component {
      private lblName: eui.Label;
      private lblUncfmBet: eui.Label;
      private lblCfmBet: eui.Label;

      private _fieldName: string;
      private _cfmBet: number;
      private _uncfmBet: number;
      private _bitmapName: string;

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

      public setBitmap(name) {
        this._bitmapName = name;
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
        this.setStyle(this._border, this._textColor, this._bgColor, this._bitmapName);
      }

      public cancelBet(): void {
        this.setUncfmBet(0);
      }

      public getUncfmBet(): number {
        return this._uncfmBet;
      }

      public async setStyle(border: number, textcolor: number, bgcolor: number, bitmapName: string = null) {
        this.removeChildren();
        console.log('BettingTableGrid::setStyle: bitmapName: ', bitmapName, ' this._bitmapName: ', this._bitmapName);

        if (bitmapName) {
          this._bitmapName = bitmapName;
          try {
            console.log('BettingTableGrid::loadGroup');
            await RES.loadGroup('scene_baccarat');
          } catch (e) {
            console.log('BettingTableGrid::loadGroup error');
          }
          const bitmap = new egret.Bitmap();
          bitmap.texture = RES.getRes(bitmapName);
          bitmap.width = this.width;
          bitmap.height = this.height;
          this.addChild(bitmap);
        } else if (this._bitmapName) {
          try {
            console.log('BettingTableGrid::loadGroup');
            await RES.loadGroup('scene_baccarat');
          } catch (e) {
            console.log('BettingTableGrid::loadGroup error');
          }
          const bitmap = new egret.Bitmap();
          bitmap.texture = RES.getRes(this._bitmapName);
          bitmap.width = this.width;
          bitmap.height = this.height;
          this.addChild(bitmap);
        }

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
}
