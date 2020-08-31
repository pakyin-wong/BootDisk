namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class LoResultItem extends core.BaseEUI {
        protected _gameResult;
        protected b5: eui.Label;
        protected b4: eui.Label;
        protected b3: eui.Label;
        protected b2: eui.Label;
        protected b1: eui.Label;

        public constructor(gameresult: any) {
          super('LoResultItem');
          this._gameResult = gameresult;
        }

        protected mount() {
            let balls = this._gameResult.a1.split(',');
        this.b1.text = balls[0] >= 0 ? `${balls[0]}` : `-`;
        this.b2.text = balls[1] >= 0 ? `${balls[1]}` : `-`;
        this.b3.text = balls[2] >= 0 ? `${balls[2]}` : `-`;
        this.b4.text = balls[3] >= 0 ? `${balls[3]}` : `-`;
        this.b5.text = balls[4] >= 0 ? `${balls[4]}` : `-`;
        }
      }
    }
  }
}
