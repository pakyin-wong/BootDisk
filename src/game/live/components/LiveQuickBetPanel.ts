namespace we {
  export namespace live {
    export class LiveQuickBetPanel extends eui.Component {
      private _panelEnlarged: boolean = false;
      private _currTableID: number;
      constructor() {
        super();
        dir.evtHandler.addEventListener(we.core.Event.LOBBY_QUICKBET_HOVER, this.onQuickBetHover, this);
      }

      protected onQuickBetHover(evt: egret.Event) {
        if (this._panelEnlarged && this._currTableID === evt.data.tableid) {
          return;
        }
        this.removeChildren();
        this._panelEnlarged = true;
        this._currTableID = evt.data.tableid;
        console.dir('LobbyQuickBetPanel::onQuickBetClick ');
        const liveBaccaratExpanded = new we.live.LiveBaccaratExpanded();
        liveBaccaratExpanded.skinName = utils.getSkin('LiveBaccaratExpanded');
        const pt = this.globalToLocal(evt.data.x, evt.data.y);
        liveBaccaratExpanded.x = pt.x;
        liveBaccaratExpanded.y = pt.y;
        liveBaccaratExpanded.width = evt.data.width;
        liveBaccaratExpanded.height = evt.data.height;
        this.addChild(liveBaccaratExpanded);
        const tw1 = TweenMax.to(liveBaccaratExpanded, 1, {
          scaleX: 618 / 575,
          scaleY: 618 / 575,
          x: pt.x - 20,
        });

        liveBaccaratExpanded.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
      }

      protected onRollOut() {
        console.log('LobbyQuickBetPanel::onRollOut');
        this.removeChildren();
        this._panelEnlarged = false;
      }
    }
  }
}
