namespace we {
  export namespace lo {
    export class FunBetResult extends core.BaseEUI {
      protected b5: eui.Label;
      protected b4: eui.Label;
      protected b3: eui.Label;
      protected b2: eui.Label;
      protected b1: eui.Label;

      public update(r) {
        this.b1.text = r.ball1 >= 0 ? `${r.ball1}` : `-`;
        this.b2.text = r.ball2 >= 0 ? `${r.ball2}` : `-`;
        this.b3.text = r.ball3 >= 0 ? `${r.ball3}` : `-`;
        this.b4.text = r.ball4 >= 0 ? `${r.ball4}` : `-`;
        this.b5.text = r.ball5 >= 0 ? `${r.ball5}` : `-`;
      }
    }
  }
}