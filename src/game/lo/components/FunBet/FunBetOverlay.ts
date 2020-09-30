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

      constructor(tableInfo: data.TableInfo, key: string) {
        super('lo.FunBetOverlay');

        this._tableInfo = tableInfo;
        this._betDetail = [];
        this.customKey = key;
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

        for (const bd in this.funbet.betDetails) {
          this._betDetail.push({
            field: `${this.funbet.betDetails[bd].id}@${this.funbet.betDetails[bd].amt}#1`,
            amount: this.funbet.betDetails[bd].amt,
          });
          const data = this.funbet.betDetails[bd];
          arrCol.addItem({
            field: this.funbet.getBetDetailLabel(data.type, data.group, data.field),
            rate: data.rate,
            amt: data.amt,
          });
          total += this.funbet.betDetails[bd].amt;
          count++;
        }

        logger.l(2, this._betDetail);

        this._scroller.useMiniScrollBar = true;

        this._list.itemRenderer = lo.FunBetOverlayIR;
        this._list.dataProvider = arrCol;

        this._tf_table.text = this._tableInfo.data.tableid;
        this._tf_round.text = this._tableInfo.data.gameroundid;
        this._tf_count.text = `${count}`;
        this._tf_total.text = `$${(total * 0.01).toFixed(2)}`;

        utils.addButtonListener(this._btnConfirm, this.onClickConfirm, this);
        this.funbet.evtHandler.addEventListener('LOTTERY_FUNBET_CLEANSCREEN', this.onClosed, this);
      }

      protected destroy() {
        super.destroy();
        utils.removeButtonListener(this._btnConfirm, this.onClickConfirm, this);
        this.funbet.evtHandler.removeEventListener('LOTTERY_FUNBET_CLEANSCREEN', this.onClosed, this);
      }

      protected onClickConfirm() {
        dir.socket.bet(this._tableInfo.tableid, this._betDetail, this.onBetReturned.bind(this));
      }

      protected onBetReturned(result) {
        this.funbet.evtHandler.dispatchEvent(new egret.Event(core.Event.PLAYER_BET_RESULT, false, false, result));
      }

      protected onClosed() {
        this.foreclosed();
      }

      protected get funbet() {
        return utils.GetFunBet(this.customKey);
      }
    }
  }
}
