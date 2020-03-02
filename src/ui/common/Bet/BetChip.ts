namespace we {
  export namespace ui {
    export class BetChip extends core.BaseEUI implements eui.UIComponent, IBetChip {
      protected _value: number;
      protected _chipImage: eui.Image;
      protected _chipValueLabel: eui.Label;
      protected _type: we.core.ChipType;
      protected _highlight: boolean;
      protected _glowImage: eui.Image;

      protected _index: number;

      public constructor(value: number = null, index: number = null, type: we.core.ChipType = we.core.ChipType.BETTING, highlight: boolean = false) {
        super('BetChip');
        this._value = value;
        this._index = index;
        this._type = type;
        this._highlight = highlight;
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected mount() {
        this.draw();
      }

      public setValue(value: number, index: number, type: we.core.ChipType = null) {
        this._value = value;
        this._index = index;
        this._type = type;
        this.draw();
      }

      public getValue() {
        return this._value;
      }

      get highlight(): boolean {
        return this._highlight;
      }

      set highlight(value: boolean) {
        this._highlight = value;
        if (value) {
          this._glowImage = new eui.Image();
          this._glowImage.source = env.isMobile ? 'd_lobby_panel_betcontrol_chips_select_png' : 'd_lobby_panel_betcontrol_chips_select_png';
          this._glowImage.bottom = this._chipImage.bottom - 6;
          this._glowImage.top = this._chipImage.top - 6;
          this._glowImage.left = this._chipImage.left - 6;
          this._glowImage.right = this._chipImage.right - 6;
          this._glowImage.verticalCenter = this._chipImage.verticalCenter;
          this._glowImage.horizontalCenter = this._chipImage.horizontalCenter;
          this._glowImage.height = this._chipImage.height;
          this._glowImage.width = this._chipImage.width;
          this.addChild(this._glowImage);
        } else {
          if (this._glowImage && this.contains(this._glowImage)) {
            this.removeChild(this._glowImage);
          }
        }
      }

      public set index(value: number) {
        this._index = value;
        this._chipImage.source = this.getChipSource(this._type);
      }

      public set labelOffset(value: number) {
        if (this._chipValueLabel) {
          this._chipValueLabel.verticalCenter = value;
        }
      }

      public get labelOffset() {
        if (this._chipValueLabel) {
          return this._chipValueLabel.verticalCenter;
        }
        return null;
      }

      public set labelSize(value: number) {
        if (this._chipValueLabel) {
          this._chipValueLabel.size = value;
        }
      }

      public get labelSize() {
        if (this._chipValueLabel) {
          return this._chipValueLabel.size;
        }
        return null;
      }

      set type(value: number) {
        if (value) {
          this._type = +value;
        }
        this.draw();
      }

      get type() {
        return this._type;
      }

      public draw() {
        switch (this._type) {
          case we.core.ChipType.FLAT:
            this._chipImage.source = this.getChipSource(this._type);
            this._chipValueLabel.text = utils.numberToFaceValue(this._value);
            this._chipValueLabel.verticalCenter = this.height * -0.025;
            this._chipValueLabel.scaleY = 1;
            break;
          case we.core.ChipType.PERSPECTIVE:
            this._chipImage.source = this.getChipSource(this._type);
            this._chipValueLabel.text = utils.numberToFaceValue(this._value);
            this._chipValueLabel.verticalCenter = this.height * -0.1;
            this._chipValueLabel.scaleY = 0.65;
            break;
          case we.core.ChipType.BETTING:
          default:
            this._chipValueLabel.text = '';
            this._chipImage.source = this.getChipSource(this._type);
            break;
        }
      }

      protected getChipSource(type): string {
        let filename: string;

        switch (type) {
          case we.core.ChipType.FLAT:
            filename = 'm_lobby_panel_betcontrol_chip' + `0${this._index + 1}`.slice(-2) + '_active_png';
            break;
          case we.core.ChipType.PERSPECTIVE:
            filename = 'm_lobby_panel_betcontrol_chip' + `0${this._index + 1}`.slice(-2) + '_png';
            break;
          case we.core.ChipType.BETTING:
          default:
            filename = 'd_common_chips_betting_png';
        }

        return filename;
      }
    }
  }
}
