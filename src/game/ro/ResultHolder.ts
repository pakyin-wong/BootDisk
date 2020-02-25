namespace we {
  export namespace ro {
    export class ResultHolder extends eui.Component implements ui.IResultDisplay {
      private gameData: GameData;
      protected _lblResult: eui.Label;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('ro.ResultHolderSkin');
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.reset();
      }

      public updateResult(gameData: data.GameData) {
        if ((<ro.GameData> gameData).value) {
          this._lblResult.text = (<ro.GameData> gameData).value.toString();
        } else {
          this._lblResult.text = 'Waiting Result';
        }
      }

      public reset() {
        this._lblResult.text = '';
      }
    }
  }
}
