namespace we {
  export namespace lobby {
    export class LobbyQuickBetPanel extends eui.Component {
      constructor() {
        super();
        dir.evtHandler.addEventListener(we.core.Event.LOBBY_QUICKBET_CLICK, this.onQuickBetClick, this);
      }
      protected onQuickBetClick(evt: egret.Event) {
        this.removeChildren();
        console.dir('LobbyQuickBetPanel::onQuickBetClick ');
        const bettingTable = new we.ba.BettingTable();
        bettingTable.skinName = utils.getSkin('LobbyBaBettingTable');
        const pt = this.globalToLocal(evt.data.x, evt.data.y);
        bettingTable.x = pt.x - 50;
        console.log('evt.data.y:', evt.data.y);
        console.log('pt.y:', pt.y);
        if (pt.y > 1340 - 300) {
          bettingTable.y = 1040;
        } else if (pt.y < 300) {
          bettingTable.y = 0;
        } else {
          bettingTable.y = pt.y;
        }
        bettingTable.width = evt.data.width + 100;
        bettingTable.height = evt.data.height + 100;

        this.addChild(bettingTable);
      }
    }
  }
}
