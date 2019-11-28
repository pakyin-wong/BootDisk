namespace we {
  export namespace live {
    export class LiveBaccaratListItem extends eui.Component {
      public selected: boolean;
      public itemIndex: number;

      private rect: eui.Rect;
      private label: eui.Label;
      private _dealerImage: eui.Image;
      private _bigRoad: we.ba.BALobbyBigRoad;

      private _originalx: number;
      private _originaly: number;
      public constructor() {
        super();
        this.skinName = utils.getSkin('LiveBaccaratListItem');
        this.touchEnabled = true;
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        this.mount();
      }

      public childrenCreated() {
        super.childrenCreated();
        this._originalx = this.x;
        this._originaly = this.y;
        this.anchorOffsetX = this.width / 2;
        this.x += this.anchorOffsetX;
      }

      get dealerImage() {
        return this._dealerImage;
      }

      set dealerImage(value: eui.Image) {
        this._dealerImage = value;
      }

      get bigRoad() {
        return this._bigRoad;
      }

      set bigRoad(value: we.ba.BALobbyBigRoad) {
        this._bigRoad = value;
      }

      private async mount() {
        try {
          console.log('LiveBaccaratListItem::mount');
          await RES.loadGroup('temp');
        } catch (e) {
          console.log('LiveBaccaratListItem::mount error');
        }
        const imageResName = Math.round(Math.random()) ? 'temp_baccarat_dealer_1' : 'temp_baccarat_dealer_2';
        this._dealerImage.texture = RES.getRes(imageResName);
      }

      private onRollover() {
        console.log('LiveBaccaratListItem::onRollover');
        const tw = TweenMax.to(this, 1, { scaleX: 1.05, scaleY: 1.05 });
      }

      private onRollout() {
        const tw = TweenLite.to(this, 1, { scaleX: 1, scaleY: 1 });
      }
    }
  }
}
