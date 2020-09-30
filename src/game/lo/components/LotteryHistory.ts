namespace we {
  export namespace overlay {
    export class LotteryHistory extends ui.Panel {
      protected _key;
      protected _list: eui.List;
      protected _arrCol: eui.ArrayCollection;
      protected _tableId;

      constructor(tableid, key) {
        super(`${key}.LotteryHistory`);
        this._key = key;
        this._tableId = tableid;
      }

      protected mount() {
        super.mount();
        this._arrCol = new eui.ArrayCollection();

        this.updateStatistic(env.tableInfos[this._tableId].gamestatistic['loresults']);

        this._list.itemRenderer = lo.LotteryHistoryIR;
        this._list.itemRendererSkinName = utils.getSkinByClassname(`${this._key}.LotteryHistoryIR`);
        this._list.dataProvider = this._arrCol;
        dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        if (evt.data.tableid === this._tableId) {
          this.updateStatistic(evt.data.gamestatistic['loresults']);
        }
      }

      protected updateStatistic(s) {
        const r = [];

        if (s && s.length) {
          for (let i = s.length - 1; i >= 0; i--) {
            r.push({
              round: s[i].Roundnumber, ...s[i].Data
            });
          }
        }

        for (let j = r.length; j < 10; j++) {
          r.push({
            round: '--------',
          });
        }

        this._arrCol.replaceAll(r);
      }
    }
  }
}
