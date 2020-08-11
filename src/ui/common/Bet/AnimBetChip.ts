namespace we {
  export namespace ui {
    export class AnimBetChip extends core.BaseEUI implements eui.UIComponent, IBetChip {
      protected chipImageMapping = ['Lv1_Blue', 'Lv1_Yellow', 'Lv1_Orange', 'Lv1_Light_Red', 'Lv1_Purple', 'Lv1_Magentas_Dark', 'Lv1_Green', 'Lv1_Blue_Dark', 'Lv1_Green_Dark', 'Lv1_Gray_Light'];
      protected _value: number;
      protected _chipAnim: dragonBones.EgretArmatureDisplay;
      protected _type: we.core.ChipType;
      protected _prevType: we.core.ChipType;
      protected _highlight: boolean;
      protected _index: number;
      protected _labelSize: number = 30;
      protected _armatureHeight: number = 86;
      protected _armatureWidth: number = 89;
      protected _offsetY: number = 10; // hardcode
      protected _offsetX: number = 0;
      protected _valueLabel: eui.Label;
      protected _labelGroup: eui.Group;

      public aspectRatio: number = 0.7;
      public debugRect: eui.Rect;

      public constructor(value: number = null, index: number = 0, type: we.core.ChipType = we.core.ChipType.PERSPECTIVE) {
        super();
        this._value = value;
        this._index = index;
        this._prevType = null;
        this._type = type;
        this.touchChildren = false;
      }

      protected createChipAnim() {
        const skeletonData = RES.getRes(`common_ui_ske-new_json`);
        const textureData = RES.getRes(`common_ui_tex-new_json`);
        const texture = RES.getRes(`common_ui_tex-new_png`);
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        return factory.buildArmatureDisplay('Chips_Select');
      }

      protected mount() {
        // this.debugRect = new eui.Rect();
        // this.debugRect.fillColor = 0xffffff;
        // this.addChild(this.debugRect);

        this._chipAnim = this.createChipAnim();
        this._chipAnim.touchEnabled = false;
        this._chipAnim.touchChildren = false;
        this.addChild(this._chipAnim);

        this.setChipValueSlot();
        this.setChipSelectSlot();
        this.setChipDeselectSlot();

        this._type = this._type || core.ChipType.PERSPECTIVE;
        this.draw(true);
      }

      protected setChipValueSlot() {
        if (!(this._chipAnim && (this._index || this._index === 0) && (this._value || this._value === 0))) {
          return null;
        }
        this._valueLabel = new eui.Label();
        this._valueLabel.text = utils.numberToFaceValue(this._value);
        this._valueLabel.fontFamily = 'Barlow';

        this._valueLabel.size = this._labelSize;
        this._valueLabel.textColor = 0x000000;
        this._valueLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._valueLabel.textAlign = egret.HorizontalAlign.CENTER;
        this._valueLabel.verticalCenter = 0;
        this._valueLabel.horizontalCenter = 0;

        this._labelGroup = new eui.Group();
        this._labelGroup.width = 0;
        this._labelGroup.height = 0;
        this._labelGroup.touchThrough = true;
        this._labelGroup.touchEnabled = false;
        this._labelGroup.addChild(this._valueLabel);

        const chipSlot = this._chipAnim.armature.getSlot('Number');
        chipSlot.display = this._labelGroup;
      }

      protected setChipSelectSlot() {
        if (!(this._chipAnim && (this._index || this._index === 0) && (this._value || this._value === 0))) {
          return null;
        }
        const chip = new eui.Image();
        chip.source = this.getChipSource(we.core.ChipType.FLAT);
        chip.horizontalCenter = 0;
        chip.verticalCenter = 0;
        // chip.anchorOffsetX = this._armatureWidth / 2;
        // chip.anchorOffsetY = this._armatureHeight / 2;

        const group = new eui.Group();
        group.width = 0;
        group.height = 0;
        group.addChild(chip);

        const chipSlot = this._chipAnim.armature.getSlot('Chips_Select');
        chipSlot.display = group;
      }

      protected setChipDeselectSlot() {
        if (!(this._chipAnim && (this._index || this._index === 0) && (this._value || this._value === 0))) {
          return null;
        }

        const chip = new eui.Image();
        chip.source = this.getChipSource(we.core.ChipType.PERSPECTIVE);
        chip.horizontalCenter = 0;
        chip.verticalCenter = 0;
        // chip.anchorOffsetX = this._armatureWidth / 2;
        // chip.anchorOffsetY = this._armatureHeight / 2;

        const group = new eui.Group();
        group.width = 0;
        group.height = 0;
        group.addChild(chip);

        const chipSlot = this._chipAnim.armature.getSlot('Chips_Deselect');
        chipSlot.display = group;
      }

      public setValue(value: number, index: number, type: we.core.ChipType = null) {
        this._value = value;
        this._index = index;
        this._type = type;
        this.setChipValueSlot();
      }

      public getValue() {
        return this._value;
      }

      public get highlight(): boolean {
        return this._highlight;
      }

      public set highlight(value: boolean) {
        this._highlight = value;
      }

      public set index(value: number) {
        this._index = value;
        this.setChipSelectSlot();
        this.setChipDeselectSlot();
      }

      public set labelSize(value: number) {
        this._labelSize = value;
        this.setChipValueSlot();
      }

      public get labelSize() {
        return this._labelSize;
      }

      set type(value: number) {
        if (value) {
          if (this._chipAnim) { this._prevType = this._type; }
          this._type = value;
        }
        this.draw();
      }

      get type() {
        return this._type;
      }

      public $setWidth(value: number) {
        super.$setWidth(value);
        /*
        switch (this._type) {
          case we.core.ChipType.PERSPECTIVE:
            this.$setHeight(value * this.aspectRatio);
            break;
          case we.core.ChipType.FLAT:
          case we.core.ChipType.BETTING:
          default:
            this.$setHeight(value);
            break;
        }
        this._chipValueLabel.verticalCenter = this.height * -0.1;
        */
      }

      public draw(noAnim: boolean = false) {
        console.log('draw AnimBetChip');
        if (!this._chipAnim) {
          return;
        }
        // this._chipAnim.scaleX = this.width / this._armatureWidth;
        // this._chipAnim.scaleY = this.height / this._armatureHeight;
        // this._chipAnim.y = this._offsetY;
        // this.setChipValueSlot();
        // this.setChipSelectSlot();
        // this.setChipDeselectSlot();

        if (this._prevType === this._type) {
          return;
        }

        if (this._prevType === null || noAnim) {
          switch (this._type) {
            case we.core.ChipType.FLAT:
              (async () => {
                if (!this._chipAnim) {
                  return;
                }
                // this._valueLabel.scaleX = 1;
                // this._valueLabel.anchorOffsetY = this._armatureHeight / 2;
                this._chipAnim.animation.stop();
                // const p2 = we.utils.waitDragonBone(this._chipAnim);
                this._chipAnim.animation.play('loop', 0);
                // await p2;
              })();
              break;
            case we.core.ChipType.PERSPECTIVE:
              (async () => {
                if (!this._chipAnim) {
                  return;
                }
                // this._valueLabel.scaleX = 0.4;
                // this._valueLabel.anchorOffsetY = this._armatureHeight / 2 ;

                this._chipAnim.animation.stop();
                this._chipAnim.animation.gotoAndStopByFrame('in', 0);
                this._chipAnim.animation.reset();
              })();
              break;
          }
          return;
        }

        switch (this._type) {
          case we.core.ChipType.FLAT:
            (async () => {
              if (!this._chipAnim) {
                return;
              }
              // this._valueLabel.scaleY = 1;
              // this._valueLabel.anchorOffsetY = this._armatureHeight / 2;

              this._chipAnim.animation.stop();

              const p1 = we.utils.waitDragonBone(this._chipAnim);
              this._chipAnim.animation.play('in', 1);
              await p1;
              if (this._type === we.core.ChipType.FLAT) {
                // if still equal to FLAT
                this._chipAnim.animation.play('loop', 0);
              }
            })();
            break;
          case we.core.ChipType.PERSPECTIVE:
            (async () => {
              if (!this._chipAnim) {
                return;
              }
              // this._valueLabel.scaleY = 0.4;
              // this._valueLabel.anchorOffsetY = this._armatureHeight / 2 ;

              // this._chipAnim.animation.stop();

              // const p1 = we.utils.waitDragonBone(this._chipAnim);
              this._chipAnim.animation.play('out', 1);
              // await p1;

              // this._chipAnim.animation.gotoAndStopByFrame('out', 20);
            })();
            break;
        }
      }

      protected getChipSource(type: we.core.ChipType = this._type): string {
        let filename: string;

        switch (type) {
          case we.core.ChipType.FLAT:
            filename = `${this.chipImageMapping[this._index]}_png`;
            break;
          case we.core.ChipType.PERSPECTIVE:
            filename = `${this.chipImageMapping[this._index]}_B_png`;
            break;
          default:
            filename = 'd_common_chips_betting_png';
        }

        return filename;
      }
    }
  }
}
