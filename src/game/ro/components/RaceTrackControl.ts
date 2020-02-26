namespace we {
  export namespace ro {
    export class RaceTrackControl extends core.BaseEUI {
      protected _distributionLabel: ui.RunTimeLabel;
      protected _distNumLabel: eui.Label;
      protected _addButton: ui.BaseImageButton;
      protected _lessButton: ui.BaseImageButton;
      protected _value: number;
      protected _min: number = 0;
      protected _max: number = 7;

      public constructor() {
        super('ro/RaceTrackControl');
        this._value = 0;
      }

      protected mount() {
        this._distributionLabel.renderText = () => i18n.t('roulette.distribution');
        this._addButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.add, this);
        this._lessButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minus, this);
      }

      protected add() {
        this._value++;
        this.draw();
      }

      protected minus() {
        this._value--;
        this.draw();
      }

      protected draw() {
        this._distNumLabel.text = this.value.toString();
        this._lessButton.enabled = this._value > this._min;
        this._addButton.enabled = this._value < this._max;
      }

      set value(value: number) {
        this._value = value;
      }

      get value() {
        return this._value;
      }
    }
  }
}
