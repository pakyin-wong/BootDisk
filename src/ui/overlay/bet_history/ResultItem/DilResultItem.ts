namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class DilResultItem extends core.BaseEUI {
        protected _gameResult;

        public diceImage: eui.Image;
        public oddLabel: eui.Label;
        public resultLabel: eui.Label;

        public constructor(gameresult: any) {
          super('DilResultItem');
          this._gameResult = gameresult;
          console.log('DILDILDILthis._gameResult',this._gameResult)
        }

        protected mount() {
          super.mount();
          const totalResult: number = parseInt(this._gameResult.a1, 10) + parseInt(this._gameResult.a2, 10) + parseInt(this._gameResult.a3, 10);
          this.diceImage.source = dil.Mapping.numberToColor[totalResult];
          this.resultLabel.text = totalResult.toString();
          if (this._gameResult.odd && this._gameResult.odd !== undefined) {
            this.oddLabel.text = `${this._gameResult.odd} x`;
          } else {
            this.oddLabel.text = '';
          }
        }
      }
    }
  }
}
