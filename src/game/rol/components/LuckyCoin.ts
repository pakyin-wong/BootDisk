namespace we {
  export namespace rol {
    export class LuckyCoin extends core.BaseEUI {
      protected _amountLabel: eui.Label;
      protected _bigCoinImage: eui.Image;

      constructor() {
        super('LuckyCoin');
      }

      public set amount(value: number) {
        if (this._amountLabel) {
          this._amountLabel.text = value.toString();
          this._amountLabel.textColor = 0x000000;
          this._amountLabel.bold = true;
          this._amountLabel.size = 60;
          this._amountLabel.verticalCenter = -20;
        }
        if (this._bigCoinImage) {
          this._bigCoinImage.source = this.getNumberSource(value);
        }
      }

      protected getNumberSource(value: number) {
        if (value === 0 || value) {
          switch (ro.RACETRACK_COLOR[value]) {
            case ro.Color.GREEN:
              if (!env.isMobile) {
                return 'd_gow_rou_lucky_number_gn_png';
              } else {
                return 'm_lobby_panel_betcontrol_chip11_png';
              }
            case ro.Color.RED:
              if (!env.isMobile) {
                return 'd_gow_rou_lucky_number_red_png';
              } else {
                return 'm_lobby_panel_betcontrol_chip11_png';
              }
            case ro.Color.BLACK:
              if (!env.isMobile) {
                return 'd_gow_rou_lucky_number_bk_png';
              } else {
                return 'm_lobby_panel_betcontrol_chip11_png';
              }
            default:
              break;
          }
        }
        return null;
      }
    }
  }
}
