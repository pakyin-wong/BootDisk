namespace we {
  export namespace ui {
    export class BettingTableGrid extends core.BaseEUI {
      protected _lblName: eui.Label;
      protected _lblOdds: eui.Label;
      protected _lblTotalPerson: eui.Label;
      protected _lblTotalAmount: eui.Label;
      protected _totalPerson: number;
      protected _totalAmount: number;
      // protected _imgTotalPerson: eui.Image;
      // protected _imgTotalAmount: eui.Image;

      protected _denomLayer: eui.Component;
      protected _denomList: number[];
      protected _fieldName: string;
      protected _cfmBet: number;
      protected _uncfmBet: number;
      protected _image: eui.Image;
      protected _imageRes: string;
      protected _hoverRes: string;
      protected _hasDenomLayer: string;
      protected _odds: string;
      protected _oddsH: number;
      protected _oddsV: number;

      protected _textColor: number = 0xffffff;

      protected _cfmDenom: number[];
      protected _uncfmDenom: number[];

      protected _type: we.core.BettingTableType;
      protected _betChipStack: BetChipStack;
      protected _nameH: number;
      protected _nameV: number;

      protected _getSelectedBetLimit: () => number;
      protected _getSelectedChipIndex: () => number;

      protected _betChipZIndex: number;

      protected _chipWidth: number;
      protected _chipHeight: number;
      protected _chipInterval: number;
      protected _chipType: number;
      protected _chipLabelOffset: number;
      protected _chipLabelSize: number;
      protected _totalCfmOffset: number;
      protected _totalUncfmOffset: number;
      protected _betSumBackgroundRes: string;
      protected _labelSize: number;
      protected _betSumBackgroundWidth: number;
      protected _betSumBackgroundHeight: number;

      constructor() {
        super();
        this._cfmBet = 0;
        this._uncfmBet = 0;
        this.addRolloverEffect();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this._betChipStack = new BetChipStack();
        this._betChipStack.skinName = we.utils.getSkin('BetChipStack');
      }

      public addRolloverEffect() {
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
      }

      public removeRolloverEffect() {
        this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
      }

      set totalPerson(value: number) {
        this._totalPerson = value;
        if (this._lblTotalPerson) {
          this._lblTotalPerson.text = value.toString();
        }
      }

      get totalPerson() {
        return this._totalPerson;
      }

      set totalAmount(value: number) {
        this._totalAmount = value;
        if (this._lblTotalAmount) {
          this._lblTotalAmount.text = (value / 100).toString();
        }
      }

      get totalAmount() {
        return this._totalAmount;
      }

      set denomLayer(value: eui.Component) {
        this._denomLayer = value;
      }

      get denomLayer() {
        return this._denomLayer;
      }

      set odds(value: string) {
        this._odds = value;
      }

      get odds(): string {
        return this._odds;
      }

      set oddsV(value: number) {
        this._oddsV = value;
      }

      get oddsV(): number {
        return this._oddsV;
      }

      set oddsH(value: number) {
        this._oddsH = value;
      }

      get oddsH(): number {
        return this._oddsH;
      }

      set nameH(value: number) {
        this._nameH = value;
      }

      get nameH() {
        return this._nameH;
      }

      set nameV(value: number) {
        this._nameV = value;
      }

      get nameV() {
        return this._nameV;
      }

      protected onRollover(evt: egret.Event) {
        if (this._image && this._hoverRes) {
          this._image.texture = RES.getRes(this._hoverRes);
        }
      }

      protected onRollout(evt: egret.Event) {
        if (this._image && this._imageRes) {
          this._image.texture = RES.getRes(this._imageRes);
        }
      }

      set imageRes(value: string) {
        this._imageRes = value;
        if (this._image && this._imageRes) {
          this._image.texture = RES.getRes(this._imageRes);
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

      set chipWidth(value: number) {
        this._chipWidth = value;
      }

      get chipWidth() {
        return this._chipWidth;
      }

      set chipHeight(value: number) {
        this._chipHeight = value;
      }

      get chipHeight() {
        return this._chipHeight;
      }

      set chipInterval(value: number) {
        this._chipInterval = value;
      }

      get chipInterval() {
        return this._chipInterval;
      }

      set chipType(value: number) {
        this._chipType = value;
      }

      get chipType() {
        return this._chipType;
      }

      set chipLabelOffset(value: number) {
        this._chipLabelOffset = value;
      }

      get chipLabelOffset() {
        return this._chipLabelOffset;
      }

      set chipLabelSize(value: number) {
        this._chipLabelSize = value;
      }

      get chipLabelSize() {
        return this._chipLabelSize;
      }

      set totalCfmOffset(value: number) {
        this._totalCfmOffset = value;
      }
      get totalCfmOffset() {
        return this._totalCfmOffset;
      }
      set totalUncfmOffset(value: number) {
        this._totalUncfmOffset = value;
      }
      get totalUncfmOffset() {
        return this._totalUncfmOffset;
      }
      set betSumBackgroundRes(value: string) {
        this._betSumBackgroundRes = value;
      }
      get betSumBackgroundRes() {
        return this._betSumBackgroundRes;
      }

      public setFieldName(name) {
        this._fieldName = name;
      }

      public getFieldName() {
        return this._fieldName;
      }

      public getAmount() {
        return env.betLimits[this._getSelectedBetLimit()].chipList[this._getSelectedChipIndex()];
      }

      public setCfmBet(amount: number): void {
        this._cfmBet = amount;
        this.drawStack();
      }

      public setUncfmBet(amount: number): void {
        this._uncfmBet = amount;
        this.drawStack();
      }

      public addUncfmBet(amount: number): void {
        this._uncfmBet += amount;
        this.drawStack();
      }

      public reduceUnCfmBet(amount: number): void {
        this._uncfmBet -= amount;
        this.drawStack();
      }

      public drawStack() {
        if (!this._denomList) {
          return;
        }
        if (this._betChipStack) {
          this._betChipStack.width = this.width;
          this._betChipStack.height = this.height;
          this._betChipStack.verticalCenter = 0;
          this._betChipStack.horizontalCenter = 0;
          this._betChipStack.cfmBet = this._cfmBet;
          this._betChipStack.uncfmBet = this._uncfmBet;
          this._betChipStack.denomList = this._denomList;
          this._betChipStack.chipLabelOffset = this._chipLabelOffset;
          this._betChipStack.chipLabelSize = this._chipLabelSize;
          this._betChipStack.chipType = this._chipType;
          this._betChipStack.draw();
        }
      }

      set image(value: eui.Image) {
        this._image = value;
      }

      get image() {
        return this._image;
      }

      set text(text: string) {
        if (this._lblName) {
          this._lblName.text = text;
        }
      }

      get text(): string {
        if (this._lblName) {
          return this._lblName.text;
        } else {
          return null;
        }
      }

      public $setWidth(num: number) {
        super.$setWidth(num);
        this.draw();
      }

      public cancelBet(): void {
        this.setUncfmBet(0);
      }

      public getCfmBet(): number {
        return this._cfmBet;
      }

      public getUncfmBet(): number {
        return this._uncfmBet;
      }

      public draw(textcolor: number = 0xffffff, imageRes: string = null) {
        if (imageRes) {
          this._imageRes = imageRes;
        }

        if (this._imageRes) {
          this._image.texture = RES.getRes(this._imageRes);
          this._image.width = this.width;
          this._image.height = this.height;
        }

        if (this._lblName) {
          this._lblName.width = this.width;
          this._lblName.height = this.height;
          this._lblName.textAlign = egret.HorizontalAlign.CENTER;
          this._lblName.verticalAlign = egret.VerticalAlign.MIDDLE;
          this._lblName.textColor = textcolor;
        }

        this.drawStack();
      }

      set hasDenomLayer(value: string) {
        this._hasDenomLayer = value;
        if (we.utils.convertToBoolean(value)) {
          this._denomLayer = new eui.Component();
        } else {
          this._denomLayer = this;
        }
      }

      get hasDenomLayer() {
        return this._hasDenomLayer;
      }

      set labelSize(value: number) {
        this._labelSize = value;
      }

      get labelSize() {
        return this._labelSize;
      }
      set betSumBackgroundWidth(value: number) {
        this._betSumBackgroundWidth = value;
      }
      get betSumBackgroundWidth() {
        return this._betSumBackgroundWidth;
      }
      set betSumBackgroundHeight(value: number) {
        this._betSumBackgroundHeight = value;
      }
      get betSumBackgroundHeight() {
        return this._betSumBackgroundHeight;
      }

      set betChipZIndex(value: number) {
        this._betChipZIndex = value;
      }

      get betChipZIndex() {
        return this._betChipZIndex;
      }

      protected onAddToStage() {
        if (!this._denomLayer.contains(this._betChipStack)) {
          this._betChipStack.horizontalCenter = 0;

          this._betChipStack.verticalCenter = 0;

          this._betChipStack.chipHeight = this._chipHeight;
          this._betChipStack.chipWidth = this._chipWidth;
          this._betChipStack.chipInterval = this._chipInterval;
          this._betChipStack.totalCfmOffset = this._totalCfmOffset;
          this._betChipStack.totalUncfmOffset = this._totalUncfmOffset;
          this._betChipStack.betSumBackgroundRes = this._betSumBackgroundRes;
          this._betChipStack.betSumLabel.size = this._labelSize;
          this._betChipStack.betSumBackground.width = this._betSumBackgroundWidth;
          this._betChipStack.betSumBackground.height = this._betSumBackgroundHeight;
          if (this._odds && this._lblOdds) {
            this._lblOdds.text = this._odds;
            if (this._oddsH) {
              this._lblOdds.horizontalCenter = this._oddsH;
            }
            if (this._oddsV) {
              this._lblOdds.verticalCenter = this._oddsV;
            }
          }
          if (this._lblName) {
            if (this._nameH) {
              this._lblName.horizontalCenter = this._nameH;
            }
            if (this._nameV) {
              this._lblName.verticalCenter = this._nameV;
            }
          }

          this._denomLayer.addChild(this._betChipStack);
        }
        if (this.parent) {
          this.parent.setChildIndex(this, this._betChipZIndex);
        }
      }
    }
  }
}
