namespace we {
  export namespace overlay {
    export class FunBetOverlay extends ui.Panel {
      protected _txt_title: ui.RunTimeLabel;
      protected _txt_table: ui.RunTimeLabel;
      protected _txt_round: ui.RunTimeLabel;
      protected _txt_bet: ui.RunTimeLabel;
      protected _txt_rate: ui.RunTimeLabel;
      protected _txt_amt: ui.RunTimeLabel;
      protected _txt_totalBet: ui.RunTimeLabel;
      protected _txt_totalAmt: ui.RunTimeLabel;
      protected _txt_count: ui.RunTimeLabel;

      protected _scroller: ui.Scroller;
      protected _list: eui.List;

      protected _tf_table: eui.Label;
      protected _tf_round: eui.Label;
      protected _tf_count: eui.Label;
      protected _tf_total: eui.Label;

      protected _btnConfirm: ui.RoundRectButton;
      // protected _btnCancel: ui.RoundRectButton;

      protected _tableInfo: data.TableInfo;
      protected _betDetail: data.BetDetail[];

      constructor(tableInfo: data.TableInfo) {
        super('lo.FunBetOverlay');

        this._tableInfo = tableInfo;
        this._betDetail = [];
      }

      protected initTxt() {
        this._btnConfirm.label.renderText = () => `${i18n.t('lo_fun_overlay_confirm')}`;
        this.close['label'].renderText = () => `${i18n.t('lo_fun_overlay_cancel')}`;
        this._txt_title.renderText = () => `${i18n.t('lo_fun_overlay_title')}`;
        this._txt_table.renderText = () => `${i18n.t('lo_fun_overlay_table')}`;
        this._txt_round.renderText = () => `${i18n.t('lo_fun_overlay_round')}`;
        this._txt_bet.renderText = () => `${i18n.t('lo_fun_overlay_bet')}`;
        this._txt_rate.renderText = () => `${i18n.t('lo_fun_overlay_rate')}`;
        this._txt_amt.renderText = () => `${i18n.t('lo_fun_overlay_amt')}`;
        this._txt_totalBet.renderText = () => `${i18n.t('lo_fun_overlay_total')}`;
        this._txt_count.renderText = () => `${i18n.t('lo_fun_overlay_count')}`;
        this._txt_totalAmt.renderText = () => `${i18n.t('lo_fun_overlay_totalAmt')}`;
      }

      protected mount() {
        super.mount();
        this.initTxt();

        const arrCol: eui.ArrayCollection = new eui.ArrayCollection();
        let count = 0;
        let total = 0;

        for (const bd in lo.FunBet.betDetails) {
          this._betDetail.push({
            field: `${lo.FunBet.betDetails[bd].id}@${lo.FunBet.betDetails[bd].amt}`,
            amount: lo.FunBet.betDetails[bd].amt,
          });

          arrCol.addItem(lo.FunBet.betDetails[bd]);
          total += lo.FunBet.betDetails[bd].amt;
          count++;
        }

        this._scroller.useMiniScrollBar = true;

        this._list.itemRenderer = lo.FunBetOverlayIR;
        this._list.dataProvider = arrCol;

        this._tf_count.text = `${count}`;
        this._tf_total.text = `$${(total * 0.01).toFixed(2)}`;

        utils.addButtonListener(this._btnConfirm, this.onClickConfirm, this);
        lo.FunBet.evtHandler.addEventListener('LOTTERY_FUNBET_CLEANSCREEN', this.onClosed, this);
      }

      protected destroy() {
        super.destroy();
        utils.removeButtonListener(this._btnConfirm, this.onClickConfirm, this);
        lo.FunBet.evtHandler.removeEventListener('LOTTERY_FUNBET_CLEANSCREEN', this.onClosed, this);
      }

      protected onClickConfirm() {
        console.log('lo', this._betDetail);

        dir.socket.bet(this._tableInfo.tableid, this._betDetail, this.onBetReturned);
      }

      protected onBetReturned(result) {
        lo.FunBet.evtHandler.dispatchEvent(new egret.Event(core.Event.PLAYER_BET_RESULT, false, false, result));
      }

      protected onClosed() {
        this.foreclosed();
      }
    }
  }
}
