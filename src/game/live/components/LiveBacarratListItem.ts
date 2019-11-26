namespace we {
  export namespace live {
    export class LiveBacarratListItem extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private rect: eui.Rect;
      private label: eui.Label;
      private quickbetButton: eui.Button;
      private closeQuickBetButton: eui.Button;
      private bettingTable: we.ba.BettingTable;

      private dealerImage: eui.Image;

      private bigRoad: we.ba.BALobbyBigRoad;

      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty = true;

      public constructor() {
        super();

        this.skinName = utils.getSkin('LiveBacarratListItem');
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onMouseOver, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onMouseOut, this);

        this.quickbetButton = new eui.Button();
        this.quickbetButton.label = 'Quick Bet';
        this.quickbetButton.verticalCenter = 0;
        this.quickbetButton.horizontalCenter = 0;
        this.quickbetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickBetClick, this);

        this.closeQuickBetButton = new eui.Button();
        this.closeQuickBetButton.label = 'X';

        this.bettingTable = new we.ba.BettingTable();
        this.bettingTable.skinName = utils.getSkin('LiveBaBettingTable');
        this.bettingTable.width = 640;
        this.bettingTable.height = 300;

        this.mount();
      }

      private async mount() {
        try {
          console.log('LiveBacarratListItem::mount');
          await RES.loadGroup('temp');
        } catch (e) {
          console.log('LiveBacarratListItem::mount error');
        }
        const imageResName = Math.floor(Math.random() * Math.floor(1)) ? 'temp_baccarat_dealer_1' : 'temp_baccarat_dealer_2';
        this.dealerImage.texture = RES.getRes(imageResName);
      }

      public itemDataChanged() {
        super.itemDataChanged();
        const table = env.tableInfos[this.itemData];
        // console.log(table);
        this.bigRoad.updateRoadData(table.roadmap);

        if (table.data.state === 1) {
          this.label.text = `TID${table.tableid} / ${utils.EnumHelpers.getKeyByValue(ba.GameState, table.data.state)}`;
        } else {
          this.label.text = `TID${table.tableid} / ${utils.EnumHelpers.getKeyByValue(ba.GameState, table.data.state)}`;
        }
        egret.Tween.removeTweens(this);
      }

      private onMouseOver() {
        if (this.quickbetButton && !this.contains(this.quickbetButton)) {
          this.addChild(this.quickbetButton);
        }
      }

      private onMouseOut() {
        if (this.quickbetButton && this.contains(this.quickbetButton)) {
          this.removeChild(this.quickbetButton);
        }
      }

      private onQuickBetClick(evt: egret.Event) {
        if (evt.target !== this.quickbetButton) {
          return;
        }

        console.log('LiveBaccaratListItem::onQuickBetClick');
        let globalPt: egret.Point;
        if (this.parent) {
          globalPt = this.parent.localToGlobal(this.x, this.y);
        } else {
          globalPt = this.localToGlobal(this.x, this.y);
        }

        console.dir(globalPt);
        const pos = { x: globalPt.x, y: globalPt.y, width: this.width, height: this.height };
        dir.evtHandler.dispatch(we.core.Event.LOBBY_QUICKBET_CLICK, pos);
      }

      private onClick(evt: egret.Event) {
        console.log('LiveBaccaratListItem::onClick');
        console.dir(evt.target);
        if (evt.target !== this.rect || evt.target === this.quickbetButton) {
          return;
        }
        const table = env.tableInfos[this.itemData];
        if (table.data && table.tableid) {
          dir.socket.enterTable(table.tableid);
          dir.sceneCtr.goto('ba', { tableid: table.tableid });
        }
      }
    }
  }
}
