namespace we {
  export namespace live {
    export class LiveBaccaratExpanded extends core.BaseEUI {
      private dealerImage: eui.Image;
      private bigRoad: we.ba.BALobbyBigRoad;
      private quickBetButton: eui.Button;

      public constructor() {
        super();
      }
      public childrenCreated() {
        super.childrenCreated();
        const imageResName = Math.round(Math.random()) ? 'temp_baccarat_dealer_1' : 'temp_baccarat_dealer_2';
        this.dealerImage.texture = RES.getRes(imageResName);
        const tw1 = TweenLite.to(this.quickBetButton, 1.5, { alpha: 1, y: this.quickBetButton.y - 100 });
      }

      public setTableId() {}
    }
  }
}
