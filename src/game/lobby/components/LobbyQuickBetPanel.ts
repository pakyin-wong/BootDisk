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
        this.addChild(bettingTable);
        bettingTable.skinName = utils.getSkin('LobbyBaBettingTable');
        bettingTable.x = evt.data.x;
        bettingTable.y = 500;
        bettingTable.width = 600;
        bettingTable.height = 300;
      }
    }
  }
}
