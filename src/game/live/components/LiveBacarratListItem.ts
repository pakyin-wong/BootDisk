namespace we {
  export namespace live {
    export class LiveBacarratListItem extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private rect: eui.Rect;
      private label: eui.Label;
      private expandedPanel: eui.Component;
      // private quickbetButton: eui.Button;

      // private closeQuickBetButton: eui.Button;
      // private bettingTable: we.ba.BettingTable;

      private dealerImage: eui.Image;

      private bigRoad: we.ba.BALobbyBigRoad;

      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty = true;

      public constructor() {
        super();
        this.skinName = utils.getSkin('LiveBacarratListItem');
        this.touchEnabled = true;
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMouseOver, this);

        this.mount();
      }

      private async mount() {
        try {
          console.log('LiveBacarratListItem::mount');
          await RES.loadGroup('temp');
        } catch (e) {
          console.log('LiveBacarratListItem::mount error');
        }
        const imageResName = Math.round(Math.random()) ? 'temp_baccarat_dealer_1' : 'temp_baccarat_dealer_2';
        this.dealerImage.texture = RES.getRes(imageResName);
      }

      public itemDataChanged() {
        super.itemDataChanged();
        const table = env.tableInfos[this.itemData];
        this.bigRoad.updateRoadData(table.roadmap);

        if (table.data.state === 1) {
          this.label.text = `TID${table.tableid} / ${utils.EnumHelpers.getKeyByValue(ba.GameState, table.data.state)}`;
        } else {
          this.label.text = `TID${table.tableid} / ${utils.EnumHelpers.getKeyByValue(ba.GameState, table.data.state)}`;
        }
        egret.Tween.removeTweens(this);
      }

      private onMouseOver() {
        console.log('LiveBacarratListItem::onMouseOver');
        let globalPt: egret.Point;
        if (this.parent) {
          globalPt = this.parent.localToGlobal(this.x, this.y);
        } else {
          globalPt = this.localToGlobal(this.x, this.y);
        }

        console.dir(globalPt);
        const table = env.tableInfos[this.itemData];
        const data = { open: true, x: globalPt.x, y: globalPt.y, width: this.width, height: this.height, tableid: table.tableid };
        dir.evtHandler.dispatch(we.core.Event.LOBBY_QUICKBET_HOVER, data);
      }
    }
  }
}
