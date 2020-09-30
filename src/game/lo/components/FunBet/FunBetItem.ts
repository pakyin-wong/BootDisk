namespace we {
  export namespace lo {
    export class FunBetItem extends core.BaseEUI {
      public public;
      public field: string = null;

      protected betInfo;
      protected highlight: ui.RoundRectShape;
      protected label: ui.RunTimeLabel;
      protected rate: eui.Label;
      protected betArea: ui.RoundRectButton;
      protected betAmt: eui.Label;
      protected funbet;

      constructor() {
        super();
        this.customKey = 'lo';
      }

      protected mount() {
        super.mount();
        this.funbet = utils.GetFunBet(this.customKey);

        utils.addButtonListener(this.betArea, this.onBet, this);
        this.funbet.evtHandler.addEventListener(this.funbet.EVT_RESET, this.reset, this);
      }

      protected destroy() {
        super.destroy();
        utils.removeButtonListener(this.betArea, this.onBet, this);
        this.funbet.evtHandler.removeEventListener(this.funbet.EVT_RESET, this.reset, this);
      }

      public setupBetId(type, group) {
        this.betInfo = {
          id: this.funbet.getBetId(type, group, this.field),
          type,
          group,
          field: this.field,
          rate: this.funbet.getBetRate(type, group, this.field),
        };

        this.rate.text = this.betInfo.rate;
        if (this.label) {
          this.label.renderText = this.funbet.getBetLabel(type, group, this.field);
        }
      }

      protected onBet() {
        const r = this.funbet.add(this.betInfo);
        if (r) {
          this.amount = r;
        }
      }

      protected reset() {
        this.amount = 0;
      }

      protected set amount(n: number) {
        this.highlight && (this.highlight.visible = n > 0);

        if (n > 0) {
          this.betAmt.text = n.toString(10);
        } else {
          this.betAmt.text = '';
        }
      }
    }
  }
}
