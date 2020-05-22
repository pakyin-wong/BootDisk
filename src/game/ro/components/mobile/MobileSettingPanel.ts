namespace we {
  export namespace ro {
    export class MobileSettingPanel extends core.BaseGamePanel {
      protected _btn_race: egret.DisplayObject;
      protected _btn_gamelist: egret.DisplayObject;
      protected _btn_combination: egret.DisplayObject;

      protected _hl_combination: egret.DisplayObject;

      protected mount() {
        super.mount();
        this.addListeners();
      }

      protected addListeners() {
        utils.addButtonListener(this._btn_race, this.onClickRace, this);
        utils.addButtonListener(this._btn_gamelist, this.onClickGameList, this);
      }

      protected removeListeners() {
        utils.removeButtonListener(this._btn_race, this.onClickRace, this);
        utils.removeButtonListener(this._btn_gamelist, this.onClickGameList, this);
      }

      protected onClickRace() {
        this.dispatchEvent(new egret.Event('RACE_BTN_CLICKED'));
      }

      protected onClickGameList() {
        dir.evtHandler.dispatch(core.Event.TOGGLE_SIDE_GAMELIST);
      }

      public get btnCombination(): egret.DisplayObject {
        return this._btn_combination;
      }

      public set combonationActived(b: boolean) {
        this._hl_combination.visible = b;
      }
    }
  }
}
