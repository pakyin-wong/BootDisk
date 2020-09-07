namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BaResultItem extends core.BaseEUI {
        private _gameResult;

        private _txt_player: ui.RunTimeLabel;
        private _pCard1: eui.Image;
        private _pCard2: eui.Image;
        private _pCard3: eui.Image;
        private _txt_pPoint: eui.Label;

        private _txt_banker: ui.RunTimeLabel;
        private _bCard1: eui.Image;
        private _bCard2: eui.Image;
        private _bCard3: eui.Image;
        private _txt_bPoint: eui.Label;

        public constructor(gameresult: any) {
          super('BaResultItem');
          this._gameResult = gameresult;
        }

        protected mount() {
          this._txt_player.renderText = () => `${i18n.t('overlaypanel_bethistory_baresult_player')}`;
          this._txt_banker.renderText = () => `${i18n.t('overlaypanel_bethistory_baresult_banker')}`;
          this._txt_pPoint.text = this._gameResult.playerpoint;
          this._txt_bPoint.text = this._gameResult.bankerpoint;
          this._pCard1.source = this.getCardRes(this._gameResult.b1);
          this._pCard2.source = this.getCardRes(this._gameResult.b2);
          this._pCard3.source = this.getCardRes(this._gameResult.b3);
          this._bCard1.source = this.getCardRes(this._gameResult.a1);
          this._bCard2.source = this.getCardRes(this._gameResult.a2);
          this._bCard3.source = this.getCardRes(this._gameResult.a3);
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
