// TypeScript file
namespace we {
  export namespace lo {
    export class SSCCheckBoxInput extends AInputComponent {
      private _description: ui.RunTimeLabel;

      private _checkBoxGroup: eui.Group;
      private _checkBox_0: eui.Group;
      private _checkBox_1: eui.Group;
      private _checkBox_2: eui.Group;
      private _checkBox_3: eui.Group;
      private _checkBox_4: eui.Group;

      private checkBoxArray = [this._checkBox_0, this._checkBox_1, this._checkBox_2, this._checkBox_3, this._checkBox_4];
      private checkBoxImg = [];
      private checkBoxValueArray: boolean[] = [false, false, false, false, false];

      constructor(index: number, config: any) {
        super(index, config);

        this.skinName = 'skin_desktop.lo.SSCCheckBoxInput';
        // this.bigTagIndex = currentBigTagIndex;
        // this.smallTagIndex = currentSmallTagIndex;
        this.init();
        // this.initComponents();
      }

      public init() {
        for (let i = 0; i < this.checkBoxArray.length; i++) {
          this.checkBoxArray[i] = new eui.Group();
          this.checkBoxArray[i].height = 40;

          const img = new eui.Image();
          img.width = img.height = 28;
          img.source = this.checkBoxValueArray[i] ? 'checkbox_select_up_png' : 'checkbox_unselect_png';
          this.checkBoxArray[i].addChild(img);
          this.checkBoxImg.push(img);

          const lbl = new ui.RunTimeLabel();
          lbl.size = 22;
          lbl.textColor = 0xb7b9bc;
          lbl.renderText = () => `${i18n.t('lo_trad.inputTitle.' + this._config.title[i])}`;

          this.checkBoxArray[i].addChild(lbl);

          const layout = new eui.HorizontalLayout();
          layout.verticalAlign = egret.VerticalAlign.MIDDLE;
          layout.gap = 5;
          this.checkBoxArray[i].layout = layout;
          this.checkBoxArray[i].touchChildren = this.checkBoxArray[i].touchThrough = false;

          this._checkBoxGroup.addChild(this.checkBoxArray[i]);
          this._checkBoxGroup.touchChildren = true;

          this.checkBoxArray[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCheckBox, this);
        }

        if (this._description && this._config.minSelect) {
        }
        this.addEventListener('INIT_CHECKBOXES', this.onInitAllCheckBox, this);
        // this.updateData();
      }

      public onTouchCheckBox(e: egret.TouchEvent) {
        for (let i = 0; i < this.checkBoxArray.length; i++) {
          if (e.target === this.checkBoxArray[i]) {
            this.checkBoxValueArray[i] = !this.checkBoxValueArray[i];
          }
          this.checkBoxImg[i].source = this.checkBoxValueArray[i] ? 'checkbox_select_up_png' : 'checkbox_unselect_png';
        }
        this.updateData();
      }

      protected updateText() {
        for (let i = 0; i < this.checkBoxArray.length; i++) {
          (this.checkBoxArray[i].getChildAt(1) as ui.RunTimeLabel).renderText = () => `${i18n.t('lo_trad.inputTitle.' + this._config.title[i])}`;
        }
      }

      public onInitAllCheckBox(e: egret.Event) {
        for (let i = 0; i < this.checkBoxValueArray.length; i++) {
          this.checkBoxValueArray[i] = true;
        }
        this.updateData();
      }

      public updateData() {
        this._data = [];

        const inputs = [];
        const combinations = [];
        for (let i = 0; i < this.checkBoxValueArray.length; i++) {
          if (this.checkBoxValueArray[i]) {
            inputs.push((i + 1).toString());
          } else {
            inputs.push('');
          }
        }
        const sample = parseInt(this._config.minSelect, 10);

        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i] !== '') {
            we.lo.InputComponentFactory.findNextCombination(inputs, this._data, sample, i, 1, (i + 1).toString());
          }
        }

        this.dispatchEventWith(egret.Event.CHANGE, false, { index: this._index, data: this._data });
      }
    }
  }
}
