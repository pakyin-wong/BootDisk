namespace we {
  export namespace lw {
    export class MobileSideBetResultMessage extends SideBetResultMessage implements we.ui.IGameResultMessage {
      public constructor(skin?: string) {
        super('lw.SideBetResultMessage');
        this.visible = false;
        this._isAnimating = false;
      }

      protected getResultImage(value) {
        switch (value) {
          case '01':
            return 'm_lw_listpenal_result_east_png';
          case '02':
            return 'm_lw_listpenal_result_south_png';
          case '03':
            return 'm_lw_listpenal_result_west_png';
          case '04':
            return 'm_lw_listpenal_result_north_png';
          case '05':
            return 'm_lw_listpenal_result_red_png';
          case '06':
            return 'm_lw_listpenal_result_green_png';
          case '07':
            return 'm_lw_listpenal_result_white_png';
        }
        return null;
      }

      protected getBannerImage(value) {
        switch (value) {
          case '01':
            return 'm_lw_listpenal_result_money_bg_east_png';
          case '02':
            return 'm_lw_listpenal_result_money_bg_south_png';
          case '03':
            return 'm_lw_listpenal_result_money_bg_west_png';
          case '04':
            return 'm_lw_listpenal_result_money_bg_north_png';
          case '05':
            return 'm_lw_listpenal_result_money_bg_red_png';
          case '06':
            return 'm_lw_listpenal_result_money_bg_gold_png';
          case '07':
            return 'm_lw_listpenal_result_money_bg_white_png';
        }
        return null;
      }
    }
  }
}
