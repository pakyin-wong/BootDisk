namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class RolResultItem extends core.BaseEUI {
        private _gameResult;
        private _ball: ro.ROBeadRoadIcon;
        private _ballContainer: eui.Group;

        public constructor(gameresult: any) {
          super('RolResultItem');
          this._gameResult = gameresult;
        }

        protected mount() {
          this._ball = new ro.ROBeadRoadIcon(this._ballContainer.width);
          this._ball.setByObject({
            v: Number(this._gameResult.a1),
          });
          this._ballContainer.addChild(this._ball);
        }
      }
    }
  }
}
