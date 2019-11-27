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
          const liveBaccaratExpanded = new we.live.LiveBacarratExpanded();
          liveBaccaratExpanded.skinName = utils.getSkin('LiveBacarratExpanded');
          const pt = this.globalToLocal(evt.data.x, evt.data.y);
          liveBaccaratExpanded.x = pt.x - 20;

          console.log('evt.data.y:', evt.data.y);
          console.log('pt.y:', pt.y);
          if (pt.y > 1340 - 300) {
            liveBaccaratExpanded.bottom = 0;
          } else if (pt.y < 300) {
            liveBaccaratExpanded.top = 0;
          } else {
            liveBaccaratExpanded.y = pt.y;
          }
          liveBaccaratExpanded.width = evt.data.width + 40;
          liveBaccaratExpanded.height = evt.data.height + 27;
          this.addChild(liveBaccaratExpanded);

          liveBaccaratExpanded.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        }
      }
      protected onRollOut() {
        console.log('LobbyQuickBetPanel::rollOut')
        this.removeChildren();
        this._opened = false;
      }
    }
  }
}
