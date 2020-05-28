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
          const dice = this._gameResult.dice;

          this.diceImage1.source = 'd_sic_history_lv2_dice-' + dice[0] + '_png';
          this.diceImage2.source = 'd_sic_history_lv2_dice-' + dice[1] + '_png';
          this.diceImage3.source = 'd_sic_history_lv2_dice-' + dice[2] + '_png';
        }
      }
    }
  }
}
