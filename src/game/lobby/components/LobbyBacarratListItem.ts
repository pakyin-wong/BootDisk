namespace we {
  export namespace lobby {
    export class LobbyBacarratListItem extends eui.Component implements eui.IItemRenderer {
      public selected: boolean;
      public itemIndex: number;
      private _data: any;

      private rect: eui.Rect;
      private label: eui.Label;
      private quickbetButton: eui.Button;
      private closeQuickBetButton: eui.Button;
      private bettingTable: we.ba.BettingTable;

      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty = true;

      public constructor() {
        super();
        this.skinName = utils.getSkin('LobbyBacarratListItem');
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
        this.bettingTable.skinName = utils.getSkin('LobbyBaBettingTable');
        this.bettingTable.width = 640;
        this.bettingTable.height = 300;
      }

      public get data() {
        return this._data;
      }

      public set data(data: any) {
        this.isDirty = true;
        this._data = data;
        const table = env.tableInfos[data];
        // console.log(table);
        if (table.data.state === 1) {
          this.label.text = `TID${table.tableid} / ${utils.EnumHelpers.getKeyByValue(ba.GameState, table.data.state)}`;
        } else {
          this.label.text = `TID${table.tableid} / ${utils.EnumHelpers.getKeyByValue(ba.GameState, table.data.state)}`;
        }
        egret.Tween.removeTweens(this);
        // if (data === null) {
        //   this.visible = false;
        // } else {
        //   this.rect.fillColor = data;
        //   this.visible = true;
        // }
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

        console.log('LobbyBaccaratListItem::onQuickBetClick');

        /*
        let pos : number = 1;
        if(this.x >=0 && this.x < 623){
          pos = 1
        }else if (this.x >=623 && this.x < 1245){
          pos = 2
        }else if (this.x >=1245 && this.x < 1868){
          pos = 3
        }else if (this.x >=1868 ){
        pos =4}
        else {pos =1}
        */
        console.log(this.y);
        const pos = { x: this.x, y: this.y };
        dir.evtHandler.dispatch(we.core.Event.LOBBY_QUICKBET_CLICK, pos);
      }

      private onClick(evt: egret.Event) {
        console.log('LobbyBaccaratListItem::onClick');
        console.dir(evt.target);
        if (evt.target !== this.rect || evt.target === this.quickbetButton) {
          return;
        }
        const table = env.tableInfos[this._data];
        if (table.data && table.tableid) {
          dir.socket.enterTable(table.tableid);
          dir.sceneCtr.goto('ba', { tableid: table.tableid });
        }
      }
      private isDeltaIdentity(m) {
        return m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1;
      }

      public setLayoutBoundsPosition(x: number, y: number) {
        const matrix = this.$getMatrix();
        if (!this.isDeltaIdentity(matrix) || this.anchorOffsetX !== 0 || this.anchorOffsetY !== 0) {
          const bounds = egret.$TempRectangle;
          this.getLayoutBounds(bounds);
          x += this.$getX() - bounds.x;
          y += this.$getY() - bounds.y;
        }
        if (this.isDirty) {
          this.isDirty = false;
          this.destinationX = x;
          this.destinationY = y;
          const changed = super.$setX.call(this, x);
          if (super.$setY.call(this, y) || changed) {
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
          }
        } else {
          if (this.destinationX !== x || this.destinationY !== y) {
            this.destinationX = x;
            this.destinationY = y;
            // cancel current tween
            egret.Tween.removeTweens(this);
            // tween move to new position
            egret.Tween.get(this).to({ x, y }, 500);
            // dispatch move event
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
          }
        }

        // const changed = super.$setX.call(this, x);
        // if (super.$setY.call(this, y) || changed) {
        //   eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
        // }
      }
    }
  }
}
