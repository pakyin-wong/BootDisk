namespace we {
  export namespace ui {
    export class GameListButton extends core.BaseEUI {
      private _lblBetted: eui.Label;
      private _lblGoodRoad: eui.Label;
      private _bettedGroup: eui.Group;
      private _goodRoadGroup: eui.Group;
      private _badgeGroup: eui.Group;

      constructor() {
        super('sidegamelist/GameListButtonSkin');
      }

      protected mount() {
        super.mount();
        this._badgeGroup.removeChild(this._bettedGroup);
        this._badgeGroup.removeChild(this._goodRoadGroup);

        this.addEventListeners();
      }

      protected destroy() {
        this.removeEventListeners();
      }

      protected addEventListeners() {
        // listen to good road list update
        dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.addEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);
      }

      protected removeEventListeners() {
        // listen to good road list update
        dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.removeEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);
      }

      protected onGoodRoadTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        const count = tableList.length;
        if (count > 0) {
          this._badgeGroup.addChildAt(this._goodRoadGroup, 1);
          this._lblGoodRoad.text = count;
        } else {
          if (this._goodRoadGroup.parent) this._badgeGroup.removeChild(this._goodRoadGroup);

          // this._goodRoadGroup.visible = true;
          // this._lblGoodRoad.text = '30';

        }
      }

      protected onBetTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        const count = tableList.length;
        if (count > 0) {
          this._badgeGroup.addChildAt(this._bettedGroup, 0);

          this._lblBetted.text = count;
        } else {
          if (this._badgeGroup.parent) this._badgeGroup.removeChild(this._badgeGroup);
        }
      }

    }
  }
}