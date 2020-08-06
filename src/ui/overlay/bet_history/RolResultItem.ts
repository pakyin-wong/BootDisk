namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class RolResultItem extends core.BaseEUI {
        protected _gameResult;
        protected _ball: ro.ROBeadRoadIcon;
        protected _ballContainer: eui.Group;
        protected _oddLabel: eui.Label;

        public constructor(gameresult: any) {
          super('RolResultItem');
          this._gameResult = gameresult;
        }

        protected mount() {
          console.log('RolResultItem', this._gameResult);
          this._ball = new ro.ROBeadRoadIcon(this._ballContainer.width);
          this._ball.setByObject({
            v: Number(this._gameResult.a1),
          });
          this._ballContainer.addChild(this._ball);
          this._oddLabel.text = `${this._gameResult.odd} x`;
        }
      }
    }
  }
}
