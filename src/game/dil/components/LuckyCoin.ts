namespace we {
  export namespace dil {
    export class LuckyCoin extends core.BaseEUI {
      protected _amountLabel: eui.Label;
      protected _bigCoinImage: eui.Image;

      constructor() {
        super('LuckyCoin');
      }

      public set amount(value: number) {
        if (this._amountLabel) {
          this._amountLabel.text = value.toString();
        }
        if (this._bigCoinImage) {
          this._bigCoinImage.source = this.getNumberSource(value);
        }
      }

      protected getNumberSource(value: number) {
        // Waiting coin
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
    }
  }
}
