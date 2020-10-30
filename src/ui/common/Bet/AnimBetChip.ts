namespace we {
  export namespace ui {
    export class AnimBetChip extends core.BaseEUI implements eui.UIComponent, IBetChip {
      // protected chipImageMapping = ['Lv1_Blue', 'Lv1_Yellow', 'Lv1_Orange', 'Lv1_Light_Red', 'Lv1_Purple', 'Lv1_Magentas_Dark', 'Lv1_Green', 'Lv1_Blue_Dark', 'Lv1_Green_Dark', 'Lv1_Gray_Light'];
      protected chipImageMapping = ['Lv1_Yellow', 'Lv1_Light_Red', 'Lv1_Blue', 'Lv1_Green', 'Lv1_Blue_Dark', 'Lv2_Purple_Light', 'Lv2_Green', 'Lv2_Blue_Light', 'Lv2_Red', 'Lv2_Mud', 'Lv1_Gray_Light'];
      protected _value: number;
      protected _chipAnim: dragonBones.EgretArmatureDisplay;
      protected _type: we.core.ChipType;
      protected _prevType: we.core.ChipType;
      protected _highlight: boolean;
      protected _index: number;
      protected _labelSize: number = 28;
      protected _chipScale: number = 1;
      protected _valueLabel: eui.Label;
      protected _labelGroup: eui.Group;

      public aspectRatio: number = 0.7;
      protected _touchArea: eui.Rect;

      protected _factory: dragonBones.EgretFactory;

      public constructor(value: number = null, index: number = 0, type: we.core.ChipType = we.core.ChipType.PERSPECTIVE) {
        super();
        this._value = value;
        this._index = index;
        this._prevType = null;
        this._type = type;
        this.touchChildren = false;
      }

      protected createChipAnim() {
        if (!this._factory) {
          const skeletonData = RES.getRes(`chips_select_ske_json`);
          const textureData = RES.getRes(`chips_select_tex_json`);
          const texture = RES.getRes(`chips_select_tex_png`);
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          this._factory = factory;
        }
        return this._factory.buildArmatureDisplay('chips_select');
      }

      protected mount() {
        this._touchArea = new eui.Rect();
        this._touchArea.fillAlpha = 0;
        this.addChild(this._touchArea);
        this._touchArea.percentWidth = 100;
        this._touchArea.percentHeight = 100;

        this._chipAnim = this.createChipAnim();
        this.touchEnabled = true;
        this.touchChildren = false;
        this._chipAnim.touchEnabled = false;
        this._chipAnim.touchChildren = false;
        this._chipAnim.scaleX = this._chipScale;
        this._chipAnim.scaleY = this._chipScale;
        this.addChild(this._chipAnim);

        this.setChipValueSlot();
        this.setChipSelectSlot();
        this.setChipDeselectSlot();

        this._type = this._type || core.ChipType.PERSPECTIVE;
        this.draw(true);

        if (!env.isMobile) {
          mouse.setButtonMode(this, true);
        }
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.beep, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.beep, this);
      }

      protected destroy() {
        super.destroy();
      }

      public dispose() {
        if (this._chipAnim) {
          this._chipAnim.animation.stop();
          this._chipAnim.armature.dispose();
          this._chipAnim.dispose();
          this.removeChild(this._chipAnim);
          this._chipAnim = null;
        }
        if (this._factory) this._factory.clear(true);
      }

      protected beep() {
        console.log('beep');
      }

      protected setChipValueSlot() {
        // only set label
        if (!(this._chipAnim && (this._index || this._index === 0) && (this._value || this._value === 0))) {
          return null;
        }
        this._valueLabel = new eui.Label();
        this._valueLabel.text = utils.formatNumber(this._value, false);
        // this._valueLabel.text = utils.numberToFaceValue(this._value);
        this._valueLabel.fontFamily = 'Barlow';
        this._valueLabel.bold = true;
        this._valueLabel.scaleX = 0.7;

        this._valueLabel.size = this._labelSize;
        this._valueLabel.textColor = this._index < 5 ? 0x000000 : 0xf4f0b2;
        this._valueLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._valueLabel.textAlign = egret.HorizontalAlign.CENTER;
        this._valueLabel.verticalCenter = 0;
        this._valueLabel.horizontalCenter = 0;

        this._valueLabel.textColor = utils.getChipLabelColor(this._value);

        this._labelGroup = new eui.Group();
        this._labelGroup.width = 0;
        this._labelGroup.height = 0;
        this._labelGroup.touchThrough = true;
        this._labelGroup.touchEnabled = false;
        this._labelGroup.addChild(this._valueLabel);

        const chipSlot = this._chipAnim.armature.getSlot('number');
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
        chip.touchEnabled = false;
        // chip.anchorOffsetX = this._armatureWidth / 2;
        // chip.anchorOffsetY = this._armatureHeight / 2;

        const group = new eui.Group();
        group.touchEnabled = false;
        group.touchChildren = false;
        group.width = 0;
        group.height = 0;
        group.addChild(chip);

        const chipSlot = this._chipAnim.armature.getSlot('chips_select');
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
        chip.touchEnabled = false;
        // chip.anchorOffsetX = this._armatureWidth / 2;
        // chip.anchorOffsetY = this._armatureHeight / 2;

        const group = new eui.Group();
        group.touchEnabled = false;
        group.touchChildren = false;
        group.width = 0;
        group.height = 0;
        group.addChild(chip);

        const chipSlot = this._chipAnim.armature.getSlot('chips_deselect');
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

      public set chipScale(val: number) {
        this._chipScale = val;
        if (this._chipAnim) {
          this._chipAnim.scaleX = this._chipScale;
          this._chipAnim.scaleY = this._chipScale;
        }
      }

      public get chipScale(): number {
        return this._chipScale;
      }

      set type(value: number) {
        if (value) {
          if (this._chipAnim) {
            this._prevType = this._type;
          }
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
                if (this._chipAnim) this._chipAnim.animation.play('loop', 0);
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
        const chipImageStr = utils.getChipImage(this._value);

        switch (type) {
          case we.core.ChipType.FLAT:
            // filename = `${this.chipImageMapping[this._index]}_png`;
            filename = `${chipImageStr}_png`;
            break;
          case we.core.ChipType.PERSPECTIVE:
            // filename = `${this.chipImageMapping[this._index]}_B_png`;
            filename = `${chipImageStr}_B_png`;
            break;
          default:
            filename = 'd_common_chips_betting_png';
        }

        return filename;
      }
    }
  }
}
