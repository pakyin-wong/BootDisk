namespace we {
  export namespace ba {
    export class BettingTableGrid extends eui.Component {
      private _lblName: eui.Label;
      // private lblUncfmBet: eui.Label;
      // private lblCfmBet: eui.Label;
      private _denomLayer: eui.Component;

      private _denomList: number[];
      private _fieldName: string;
      private _cfmBet: number;
      private _uncfmBet: number;
      private _image: eui.Image;
      private _imageRes: string;
      private _hoverRes: string;

      private _textColor: number = 0xffffff;

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
        this._image = new eui.Image();
        this._lblName = new eui.Label();
        this._cfmBet = 0;
        this._uncfmBet = 0;
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
      }

      set denomLayer(value: eui.Component) {
        this._denomLayer = value;
      }

      get denomLayer() {
        return this._denomLayer;
      }

      protected onRollover(evt: egret.Event) {
        if (this._image && this._hoverRes) {
          this._image.source = this._hoverRes;
        }
      }

      protected onRollout(evt: egret.Event) {
        if (this._image && this._imageRes) {
          this._image.source = this._imageRes;
        }
      }

      set imageRes(value: string) {
        if (this._image) {
          this._imageRes = value;
          this._image.source = value;
        }
      }

      get imageRes() {
        return this._imageRes;
      }

      set hoverRes(value: string) {
        this._hoverRes = value;
      }

      get hoverRes() {
        return this._hoverRes;
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

        this.addChild(this._image);
        this.addChild(this._lblName);
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

      public setCfmBet(amount: number): void {
        this._cfmBet = amount;
        this.drawChips();
      }

      public setUncfmBet(amount: number): void {
        this._uncfmBet = amount;
        this.drawChips();
      }

      public addUncfmBet(amount: number): void {
        // console.log('BettingTableGrid::addUncfmBet() - outside');
        this._uncfmBet += amount;
        this.drawChips();
      }

      public drawChips() {
        this.clearChips();
        if (!this._denomList) {
          return;
        }
        const depth = -1;
        if (!this._uncfmBet && !this._cfmBet) {
          return;
        }
        if (this._uncfmBet) {
          const chip = new eui.Image();
          chip.source = 'd_ba_betcontrol_clipsset_flat_none_png';
          chip.horizontalCenter = 0;
          chip.verticalCenter = 0;
          chip.width = 100;
          chip.height = 100;
          this._chips.push(chip);
          this._denomLayer.addChild(chip);
          this._denomLayer.setChildIndex(chip, this._betChipZIndex + 1);
          this._banner = new we.ui.Banner();
          this._banner.label1text = ' ' + (this._uncfmBet + this._cfmBet);
          this._banner.resName = 'd_ba_gamerecord_chipvalue_png';
          this._banner.verticalCenter = 0;
          this._banner.horizontalCenter = 0;
          this._denomLayer.addChild(this._banner);
        } else {
          // console.log('BettingTableGrid::drawChips ' + this._cfmBet + ' ' + this._uncfmBet);
          this._cfmDenom = utils.getBettingTableGridDenom(this._denomList, this._cfmBet);
          this._cfmDenom.map((value, index) => {
            console.log(utils.getChipImage(value, we.core.ChipType.CLIP));
            const chip = this.getChip(utils.getChipImage(value, we.core.ChipType.CLIP), index);
            this._chips.push(chip);
            this._denomLayer.addChild(chip);
            this._denomLayer.setChildIndex(chip, this._betChipZIndex + index);
          });
          this._banner = new we.ui.Banner();
          this._banner.label1text = ' ' + this._cfmBet;
          this._banner.resName = 'd_ba_gamerecord_chipvalue_png';
          this._banner.verticalCenter = 40;
          this._banner.horizontalCenter = 0;
          this._denomLayer.addChild(this._banner);
          // this._uncfmDenom = utils.getBettingTableGridDenom(this._denomList, this._uncfmBet);
          // this._uncfmDenom.map((value, index) => {
          //   const chip = this.getChip(utils.getChipFace(value), index + depth + 1);
          //   this._chips.push(chip);
          //   this.addChild(chip);
          //   this.setChildIndex(chip, this._betChipZIndex + index + depth + 1);
          // });

          // console.log('BettingTableGrid::addUncfmBet() - inside');
        }
      }

      public getChip(chipvalue, index) {
        const chip = new eui.Image();
        // console.log(`d_ba_betcontrol_image_clipsset${chipvalue}_png`);
        chip.source = chipvalue;
        chip.horizontalCenter = 0;
        chip.verticalCenter = index * -10;
        chip.width = 100;
        chip.height = 70;
        return chip;
      }

      private clearChips() {
        this._chips.forEach(value => {
          if (this.contains(value)) {
            this._denomLayer.removeChild(value);
          }
        });
        this._chips = new Array();
        if (this._banner) {
          this._denomLayer.removeChild(this._banner);
        }
        this._banner = null;
      }

      set text(text: string) {
        this._lblName.text = text;
      }
      get text(): string {
        return this._lblName.text;
      }

      public $setWidth(num: number) {
        super.$setWidth(num);
        this.setStyle(this._textColor, this._imageRes);
      }

      public cancelBet(): void {
        this.setUncfmBet(0);
      }

      public getUncfmBet(): number {
        return this._uncfmBet;
      }

      public async setStyle(textcolor: number, imageRes: string = null) {
        // console.log('BettingTableGrid::setStyle: imageRes: ', imageRes, ' this._imageRes: ', this._imageRes);

        if (imageRes) {
          this._imageRes = imageRes;
        }

        if (this._imageRes) {
          this._image.source = this._imageRes;
          this._image.width = this.width;
          this._image.height = this.height;
        }

        this._lblName.width = this.width;
        this._lblName.height = this.height;
        this._lblName.textAlign = egret.HorizontalAlign.CENTER;
        this._lblName.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._lblName.textColor = textcolor;

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
