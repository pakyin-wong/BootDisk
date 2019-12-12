namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BaResultItem extends core.BaseEUI {
        private _gameResult;

        private _txt_player: ui.RunTimeLabel;
        private _pCard1: eui.Image;
        private _pCard2: eui.Image;
        private _pCard3: eui.Image;
        private _txt_pPoint: eui.Label;

        private _txt_banker: ui.RunTimeLabel;
        private _bCard1: eui.Image;
        private _bCard2: eui.Image;
        private _bCard3: eui.Image;
        private _txt_bPoint: eui.Label;

        public constructor(gameresult: any) {
          super('overlay/BaResultItem');
          this._gameResult = gameresult;
        }

        protected mount() {}
      }
    }
  }
}
