// TypeScript file
namespace we {
  export namespace di {
    export class MobileSideBetResultMessage extends SideBetResultMessage implements we.ui.IGameResultMessage {
      protected _bg: eui.Image;

      public constructor(skin?: string) {
        super('di.SideBetResultMessage');
        this.visible = false;
        this._isAnimating = false;
      }

      protected getDiceBackground(hasbet) {
        if (hasbet) {
          return 'm_sb_panel_gamelist_result_data_win_png';
        }
        return 'm_sb_panel_gamelist_result_data_lose_png';
      }

      protected getAmountBackground(hasbet) {
        if (hasbet) {
          return 'm_sb_panel_gamelist_result_win_png';
        }
        return 'm_sb_panel_gamelist_result_lose_png';
      }
    }
  }
}
