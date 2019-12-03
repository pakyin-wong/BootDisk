namespace we {
  export namespace ba {
    export class BettingTableGrid extends eui.Component {
      private lblName: eui.Label;
      // private lblUncfmBet: eui.Label;
      // private lblCfmBet: eui.Label;

      private _denomList: number[];
      private _fieldName: string;
      private _cfmBet: number;
      private _uncfmBet: number;
      private _bitmapName: string;

      private _textColor: number = 0xffffff;
      private _bgColor: number = 0x000000;

      private _cfmDenom: number[];
      private _uncfmDenom: number[];

      private _type: we.core.BettingTableType;
      private _chips: eui.Image[] = new Array();

      constructor() {
        super();
        this.lblName = new eui.Label();
        this._cfmBet = 0;
        this._uncfmBet = 0;
      }

      set denomList(value: number[]) {
        this._denomList = value;
      }

      get denomList() {
        return this._denomList;
      }

      set type(value: we.core.BettingTableType) {
        this._type = value;
      }

      get type() {
        return this._type;
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.setUncfmBet(0);
        this.setCfmBet(0);
      }

      public setFieldName(name) {
        this._fieldName = name;
      }

      public getFieldName() {
        return this._fieldName;
      }

      public getAmount() {
        return env.betLimits[env.currentSelectedBetLimitIndex].chipsList[env.currentChipSelectedIndex].value;
      }

      public setBitmap(name) {
        this._bitmapName = name;
      }

      public setCfmBet(amount: number): void {
        this._cfmBet = amount;
        if (this._denomList && amount) {
          this._cfmDenom = utils.getBettingTableGridDenom(this._denomList, amount);
        }
        // this.lblCfmBet.text = this._cfmBet.toString();
      }

      public setUncfmBet(amount: number): void {
        this._uncfmBet = amount;
        if (this._denomList && amount) {
          this._uncfmDenom = utils.getBettingTableGridDenom(this._denomList, amount);
        }
        // this.lblUncfmBet.text = this._uncfmBet.toString();
      }

      private drawCfmBet() {
        if (this._uncfmDenom) {
        }
      }

      private drawUncfmBet() {
        if (this._uncfmDenom) {
        }
      }

      public addUncfmBet(amount: number): void {
        console.log('BettingTableGrid::addUncfmBet() - outside');
        this._uncfmBet += amount;
        if (this._denomList && amount) {
          console.log('BettingTableGrid::addUncfmBet() - inside');
          this.clearChips();
          this._uncfmDenom = utils.getBettingTableGridDenom(this._denomList, this._uncfmBet);
          this._uncfmDenom.map((value, index) => {
            const chip = this.getChip(utils.getChipFace(value), index);
            this._chips.push(chip);
            this.addChild(chip);
          });
        }
      }

      public getChip(chipvalue, index) {
        const chip = new eui.Image();
        console.log('d_ba_betcontrol_image_clipsset' + chipvalue + '_png');
        chip.texture = RES.getRes('d_ba_betcontrol_image_clipsset' + chipvalue + '_png');
        chip.horizontalCenter = 0;
        chip.verticalCenter = index * -10;
        chip.width = 100;
        chip.height = 100;
        return chip;
      }

      private clearChips() {
        this._chips.forEach(value => {
          if (this.contains(value)) {
            this.removeChild(value);
          }
        });
        this._chips = new Array();
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
        this.setStyle(this._textColor, this._bgColor, this._bitmapName);
      }

      public cancelBet(): void {
        this.setUncfmBet(0);
      }

      public getUncfmBet(): number {
        return this._uncfmBet;
      }

      public async setStyle(textcolor: number, bgcolor: number, bitmapName: string = null) {
        this.removeChildren();
        // console.log('BettingTableGrid::setStyle: bitmapName: ', bitmapName, ' this._bitmapName: ', this._bitmapName);

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

        //        this.addChild(this.lblUncfmBet);
        this.setUncfmBet(this._uncfmBet);
        /*
        this.lblUncfmBet.bottom = 20;
        this.lblUncfmBet.left = 20;

        this.addChild(this.lblCfmBet);
        */
        this.setCfmBet(this._cfmBet);
        // this.lblCfmBet.bottom = 20;
        // this.lblCfmBet.right = 20;
      }
    }
  }
}
