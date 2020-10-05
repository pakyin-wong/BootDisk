namespace we {
  export namespace lo {
    export class LotteryHistoryIR extends eui.ItemRenderer {
      protected round: eui.Label;
      protected _result: eui.Group;
      // protected b1: eui.Label;
      // protected b2: eui.Label;
      // protected b3: eui.Label;
      // protected b4: eui.Label;
      // protected b5: eui.Label;

      public constructor() {
        super();
        // this.skinName = utils.getSkinByClassname('lo.LotteryHistoryIR');
      }

      protected dataChanged(): void {
        this.round.text = `${i18n.t('lo_history_round').replace('%round%', this.data.round)}`;
        for (let i = 0; i < this._result.numChildren; i++) {
          this._result.getChildAt(i)['text'] = this.data[`ball${i + 1}`] >= 0 ? this.data[`ball${i + 1}`] : '-';
        }
        // this.b1.text = this.data.ball1 >= 0 ? `${this.data.ball1}` : `-`;
        // this.b2.text = this.data.ball2 >= 0 ? `${this.data.ball2}` : `-`;
        // this.b3.text = this.data.ball3 >= 0 ? `${this.data.ball3}` : `-`;
        // this.b4.text = this.data.ball4 >= 0 ? `${this.data.ball4}` : `-`;
        // this.b5.text = this.data.ball5 >= 0 ? `${this.data.ball5}` : `-`;
      }
    }
  }
}
