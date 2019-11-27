namespace we {
  export namespace live {
    export class LiveQuickBetPanel extends eui.Component {
      private _opened: boolean = false;
      private _currTableID: number;
      constructor() {
        super();
        dir.evtHandler.addEventListener(we.core.Event.LOBBY_QUICKBET_HOVER, this.onQuickBetHover, this);
      }

      protected onQuickBetHover(evt: egret.Event) {
        if (this._opened && this._currTableID === evt.data.tableid) {
          return;
        }
        this.removeChildren();
        this._opened = true;
        this._currTableID = evt.data.tableid;
        console.dir('LobbyQuickBetPanel::onQuickBetClick ');
        const liveBaccaratExpanded = new we.live.LiveBacarratExpanded();
        liveBaccaratExpanded.skinName = utils.getSkin('LiveBacarratExpanded');
        const pt = this.globalToLocal(evt.data.x, evt.data.y);
        liveBaccaratExpanded.x = pt.x - 20;

        console.log('evt.data.y:', evt.data.y);
        console.log('pt.y:', pt.y);

        liveBaccaratExpanded.y = pt.y;
        liveBaccaratExpanded.width = evt.data.width + 40;
        liveBaccaratExpanded.height = evt.data.height + 27;
        this.addChild(liveBaccaratExpanded);

        liveBaccaratExpanded.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
      }

      protected onRollOut() {
        console.log('LobbyQuickBetPanel::rollOut');
        this.removeChildren();
        this._opened = false;
      }
    }
  }
}
