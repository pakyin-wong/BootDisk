namespace we {
  export namespace lobby {
    export class LobbyQuickBetPanel extends eui.Component {
      constructor() {
        super();
        dir.evtHandler.addEventListener(we.core.Event.LOBBY_QUICKBET_CLICK, this.onQuickBetClick, this);
      }
      protected onQuickBetClick(evt: egret.Event) {
        console.dir('LobbyQuickBetPanel::onQuickBetClick ');
        console.dir(evt.data);
        const sprite = new eui.Rect();
        sprite.width = 500;
        sprite.height = 500;
        sprite.fillColor = 0x0066ff;
        this.addChild(sprite);
      }
    }
  }
}
