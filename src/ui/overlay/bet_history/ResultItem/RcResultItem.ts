namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class RcResultItem extends core.BaseEUI {
        protected _gameResult;
        protected b10: eui.Label;
        protected b9: eui.Label;
        protected b8: eui.Label;
        protected b7: eui.Label;
        protected b6: eui.Label;
        protected b5: eui.Label;
        protected b4: eui.Label;
        protected b3: eui.Label;
        protected b2: eui.Label;
        protected b1: eui.Label;

        public constructor(gameresult: any) {
          super('RcResultItem');
          this._gameResult = gameresult;
        }

        protected mount() {
          const balls = this._gameResult.a1.split(',');
          this.b1.text = balls[0] >= 0 ? `${balls[0]}` : `-`;
          this.b2.text = balls[1] >= 0 ? `${balls[1]}` : `-`;
          this.b3.text = balls[2] >= 0 ? `${balls[2]}` : `-`;
          this.b4.text = balls[3] >= 0 ? `${balls[3]}` : `-`;
          this.b5.text = balls[4] >= 0 ? `${balls[4]}` : `-`;
          this.b6.text = balls[5] >= 0 ? `${balls[5]}` : `-`;
          this.b7.text = balls[6] >= 0 ? `${balls[6]}` : `-`;
          this.b8.text = balls[7] >= 0 ? `${balls[7]}` : `-`;
          this.b9.text = balls[8] >= 0 ? `${balls[8]}` : `-`;
          this.b10.text = balls[9] >= 0 ? `${balls[9]}` : `-`;
        }
      }
    }
  }
}
