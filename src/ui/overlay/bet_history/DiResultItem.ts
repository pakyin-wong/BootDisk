namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class DiResultItem extends core.BaseEUI {
        private _gameResult;

        public diceImage1: eui.Image;
        public diceImage2: eui.Image;
        public diceImage3: eui.Image;

        public constructor(gameresult: any) {
          super('DiResultItem');
          this._gameResult = gameresult;
        }

        protected mount() {
          this.diceImage1.source = 'd_sic_history_lv2_dice-' + this._gameResult.a1 + '_png';
          this.diceImage2.source = 'd_sic_history_lv2_dice-' + this._gameResult.a2 + '_png';
          this.diceImage3.source = 'd_sic_history_lv2_dice-' + this._gameResult.a3 + '_png';
        }
      }
    }
  }
}
