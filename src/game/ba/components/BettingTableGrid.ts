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

      private _getSelectedBetLimit: () => number;
      private _getSelectedChipIndex: () => number;

      private _betChipZIndex: number;
      private _banner: ui.Banner;

      constructor() {
        super();
        this.lblName = new eui.Label();
        this._cfmBet = 0;
        this._uncfmBet = 0;
      }

      set getSelectedBetLimit(value: () => number) {
        this._getSelectedBetLimit = value;
      }

      get getSelectedBetLimit() {
        return this._getSelectedBetLimit;
      }

      set getSelectedChipIndex(value: () => number) {
        this._getSelectedChipIndex = value;
      }

      get getSelectedChipIndex() {
        return this._getSelectedChipIndex;
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
        return env.betLimits[this._getSelectedBetLimit()].chipsList[this._getSelectedChipIndex()].value;
      }

      public setBitmap(name) {
        this._bitmapName = name;
      }

      public setCfmBet(amount: number): void {
        this._cfmBet = amount;
        this.drawChips();
      }

      public setUncfmBet(amount: number): void {
        this._uncfmBet = amount;
        this.drawChips();
      }

      public addUncfmBet(amount: number): void {
        console.log('BettingTableGrid::addUncfmBet() - outside');
        this._uncfmBet += amount;
        this.drawChips();
      }

      public drawChips() {
        this.clearChips();
        if (!this._denomList) {
          return;
        }
        if (!this._uncfmBet && !this._cfmBet) {
          return;
        }
        if (this._uncfmBet) {
          const chip = new eui.Image();
          chip.texture = RES.getRes('d_ba_betcontrol_clipsset_flat_none_png');
          chip.horizontalCenter = 0;
          chip.verticalCenter = 0;
          chip.width = 100;
          chip.height = 100;
          this._chips.push(chip);
          this.addChild(chip);
          this.setChildIndex(chip, this._betChipZIndex + 1);
          this._banner = new we.ui.Banner();
          this._banner.label1text = ' ' + (this._uncfmBet + this._cfmBet);
          this._banner.resName = 'd_ba_gamerecord_chipvalue_png';
          this._banner.verticalCenter = 0;
          this._banner.horizontalCenter = 0;
          this.addChild(this._banner);
        } else {
          console.log('BettingTableGrid::drawChips ' + this._cfmBet + ' ' + this._uncfmBet);
          this._cfmDenom = utils.getBettingTableGridDenom(this._denomList, this._cfmBet);
          this._cfmDenom.map((value, index) => {
            console.log(utils.getChipImage(value, we.core.ChipType.CLIP));
            const chip = this.getChip(utils.getChipImage(value, we.core.ChipType.CLIP), index);
            this._chips.push(chip);
            this.addChild(chip);
            this.setChildIndex(chip, this._betChipZIndex + index);
          });
          this._banner = new we.ui.Banner();
          this._banner.label1text = ' ' + this._cfmBet;
          this._banner.resName = 'd_ba_gamerecord_chipvalue_png';
          this._banner.verticalCenter = 40;
          this._banner.horizontalCenter = 0;
          this.addChild(this._banner);
        }
      }

      public getChip(resvalue, index) {
        const chip = new eui.Image();
        chip.texture = RES.getRes(resvalue);
        chip.horizontalCenter = 0;
        chip.verticalCenter = index * -10;
        chip.width = 100;
        chip.height = 70;
        return chip;
      }

      private clearChips() {
        this._chips.forEach(value => {
          if (this.contains(value)) {
            this.removeChild(value);
          }
        });
        this._chips = new Array();
        if (this._banner) {
          this.removeChild(this._banner);
        }
        this._banner = null;
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
          /*
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
          */
        }
        if (this._bitmapName) {
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

        this.drawChips();
      }

      set betChipZIndex(value: number) {
        this._betChipZIndex = value;
      }

      get betChipZIndex() {
        return this._betChipZIndex;
      }
    }
  }
}
