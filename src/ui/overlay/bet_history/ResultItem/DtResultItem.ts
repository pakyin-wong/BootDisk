namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class DtResultItem extends core.BaseEUI {
        private _gameResult;

        private _txt_player: ui.RunTimeLabel;
        private _pCard1: eui.Image;
        private _txt_pPoint: eui.Label;

        private _txt_banker: ui.RunTimeLabel;
        private _bCard1: eui.Image;
        private _txt_bPoint: eui.Label;

        public constructor(gameresult: any) {
          super('DtResultItem');
          this._gameResult = gameresult;
        }

        protected mount() {
          this._txt_player.renderText = () => `${i18n.t('overlaypanel_bethistory_dtresult_dragon')}`;
          this._txt_banker.renderText = () => `${i18n.t('overlaypanel_bethistory_dtresult_tiger')}`;
          this._txt_pPoint.text = this._gameResult.playerpoint;
          this._txt_bPoint.text = this._gameResult.bankerpoint;
          this._pCard1.source = this.getCardRes(this._gameResult.b1);
          this._bCard1.source = this.getCardRes(this._gameResult.a1);
        }

        protected getCardRes(source) {
          if (env.isMobile) {
            return source !== '' ? `m_sq_bac_small_poker_${utils.formatCard(source)}_vertical_png` : '';
          } else {
            return source !== '' ? `d_common_poker_vertical_${utils.formatCard(source)}_png` : '';
          }
        }
      }
    }
  }
}
