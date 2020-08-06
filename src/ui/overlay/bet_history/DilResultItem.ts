namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class DilResultItem extends core.BaseEUI {
        private _gameResult;

        public diceImage: eui.Image;
        public oddLabel: eui.Label;
        public resultLabel: eui.Label;

        public constructor(gameresult: any) {
          super('DilResultItem');
          this._gameResult = gameresult;
        }

        protected mount() {
          const totalResult = this._gameResult.a1 + this._gameResult.a2 + this._gameResult.a3;
          this.diceImage.source = dil.Mapping.numberToColor[totalResult];
          this.resultLabel.text = totalResult;
          this.oddLabel.text = `${this._gameResult.odd} x`;
        }
      }
    }
  }
}
