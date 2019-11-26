namespace we {
  export namespace live {
    export class LiveQuickBetPanel extends eui.Component {
      private _opened: boolean = false;
      constructor() {
        super();
        dir.evtHandler.addEventListener(we.core.Event.LOBBY_QUICKBET_HOVER, this.onQuickBetClick, this);
      }

      protected onQuickBetClick(evt: egret.Event) {
        console.log('evt.data.open ' + evt.data.open);
        if (evt.data.open) {
          if (this._opened) {
            return;
          }
          this._opened = true;
          console.dir('LobbyQuickBetPanel::onQuickBetClick ');
          const bettingTable = new we.ba.BettingTable();
          bettingTable.skinName = utils.getSkin('LiveBaBettingTable');
          const pt = this.globalToLocal(evt.data.x, evt.data.y);
          bettingTable.x = pt.x - 50;
          console.log('evt.data.y:', evt.data.y);
          console.log('pt.y:', pt.y);
          if (pt.y > 1340 - 300) {
            bettingTable.bottom = 0;
          } else if (pt.y < 300) {
            bettingTable.top = 0;
          } else {
            bettingTable.y = pt.y;
          }
          bettingTable.width = evt.data.width + 100;
          bettingTable.height = evt.data.height + 100;

          this.addChild(bettingTable);

          bettingTable.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        }
      }
      protected onRollOut() {
        this.removeChildren();
        this._opened = false;
      }
    }
  }
}
