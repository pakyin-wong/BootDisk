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
          let item = this.checkBoxArray[i];
          item = new eui.Group();
          item.height = 40;

          const img = new eui.Image();
          img.width = img.height = 28;
          img.source = 'checkbox_unselect_png';
          item.addChild(img);

          const lbl = new ui.RunTimeLabel();
          lbl.size = 22;
          lbl.textColor = 0xb7b9bc;
          lbl.text = 'TEST';
          item.addChild(lbl);

          const layout = new eui.HorizontalLayout();
          layout.verticalAlign = egret.VerticalAlign.MIDDLE;
          layout.gap = 5;
          item.layout = layout;

          this._checkBoxGroup.addChild(item);
          item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCheckBox, this);
        }
      }

      public onTouchCheckBox(e: egret.TouchEvent) {
        for (let i = 0; i < this.checkBoxArray.length; i++) {
          if (e.target === this.checkBoxArray[i]) {
            this.checkBoxValueArray[i] = !(this.checkBoxValueArray[i] as boolean);
          }
          this.updateData();
        }
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
