namespace we {
  export namespace ba {
    export class BettingTableGrid extends core.BaseEUI {
      private _lblName: eui.Label;
      private _denomLayer: eui.Component;
      private _denomList: number[];
      private _fieldName: string;
      private _cfmBet: number;
      private _uncfmBet: number;
      private _image: eui.Image;
      private _imageRes: string;
      private _hoverRes: string;
      private _hasDenomLayer: string;

      private _textColor: number = 0xffffff;

      private _cfmDenom: number[];
      private _uncfmDenom: number[];

      private _type: we.core.BettingTableType;
      private _betChipStack: BetChipStack;

      private _getSelectedBetLimit: () => number;
      private _getSelectedChipIndex: () => number;

      private _betChipZIndex: number;
      private _banner: ui.Banner;

      private _chipWidth: number;
      private _chipHeight: number;
      private _chipInterval: number;
      private _totalCfmOffset: number;
      private _totalUncfmOffset: number;
      private _betSumBackgroundRes: string;
      private _labelSize: number;
      private _betSumBackgroundWidth: number;
      private _betSumBackgroundHeight: number;

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

      set denomLayer(value: eui.Component) {
        this._denomLayer = value;
      }

      get denomLayer() {
        return this._denomLayer;
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
        // console.log('BettingTableGrid::addUncfmBet() - outside');
        this._uncfmBet += amount;
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
          console.log('BettingTableGrid::draw: ', this._imageRes, this._image.x, this._image.y, this._image.width, this._image.height, this.x, this.y, this.width, this.height);
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
          this._denomLayer.addChild(this._betChipStack);
        }
        if (this.parent) {
          this.parent.setChildIndex(this, this._betChipZIndex);
        }
      }
    }
  }
}
