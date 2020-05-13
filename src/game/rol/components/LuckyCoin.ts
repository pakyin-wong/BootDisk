namespace we {
  export namespace rol {
    export class LuckyCoin extends core.BaseEUI {
      protected _oddLabel: eui.Label;
      protected _amountLabel: eui.Label;
      protected _valueLabel: eui.Label;
      protected _bigCoinImage: eui.Image;
      protected _smallCoinGroup: eui.Group;

      constructor() {
        super('LuckyCoin');
      }

      public set odd(value: number) {
        if (this._oddLabel && value) {
          this._oddLabel.text = value.toString() + 'x';
        }
      }

      public set amount(value: number) {
        if (this._amountLabel && value) {
          this._amountLabel.text = value.toString();
          this._smallCoinGroup.visible = true;
        }
      }

      public set value(value: number) {
        if (this._valueLabel && (value === 0 || value)) {
          this._valueLabel.text = value.toString();
          this._bigCoinImage.source = this.getNumberSource(value);
        }
      }

      protected getNumberSource(value: number) {
        if (value === 0 || value) {
          switch (ro.RACETRACK_COLOR[value]) {
            case ro.Color.GREEN:
              return 'd_gow_rou_lucky_number_gn_png';
            case ro.Color.RED:
              return 'd_gow_rou_lucky_number_red_png';
            case ro.Color.BLACK:
              return 'd_gow_rou_lucky_number_bk_png';
            default:
              break;
          }
        }
        return null;
      }

      protected mount() {
        super.mount();
      }
    }
  }
}
