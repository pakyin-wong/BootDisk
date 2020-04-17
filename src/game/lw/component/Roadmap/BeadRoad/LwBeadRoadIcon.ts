namespace we {
  export namespace lw {
    export class LwBeadRoadIcon extends ba.BARoadIconBase {
      private emptyColor: number;
      private emptyAlpha: number;
      private iconWidth: number;
      private iconHeight: number;
      private image: eui.Image;
      private imageHighLight: eui.Image;

      public constructor(_width: number = 30, _height: number = 30) {
        super(_width);
        this.iconWidth = _width;
        this.iconHeight = _height;
        this.initGraphics();
        this.setByObject({});
      }

      protected initGraphics() {
        this.imageHighLight = new eui.Image();
        this.imageHighLight.x = -2;
        this.imageHighLight.y = -2;
        this.imageHighLight.width = this.iconWidth + 4;
        this.imageHighLight.height = this.iconHeight + 4;
        this.imageHighLight.source = 'd_lw_history_record_hl_png';
        this.addChild(this.imageHighLight);

        this.image = new eui.Image();
        this.image.width = this.iconWidth;
        this.image.height = this.iconHeight;
        this.image.source = 'd_lw_game_detail_record_bet_east_png';
        this.addChild(this.image);
      }

      public setByObject(value: any) {
        this.reset();
        this.value = value;
        if (value.v != null) {
          this.image.visible = true;
          if (value.v === '01') {
            this.image.source = 'd_lw_game_detail_record_bet_east_png';
          } else if (value.v === '02') {
            this.image.source = 'd_lw_game_detail_record_bet_south_png';
          } else if (value.v === '03') {
            this.image.source = 'd_lw_game_detail_record_bet_west_png';
          } else if (value.v === '04') {
            this.image.source = 'd_lw_game_detail_record_bet_north_png';
          } else if (value.v === '05') {
            this.image.source = 'd_lw_game_detail_record_bet_red_png';
          } else if (value.v === '06') {
            this.image.source = 'd_lw_game_detail_record_bet_green_png';
          } else if (value.v === '07') {
            this.image.source = 'd_lw_game_detail_record_bet_white_png';
          }
        }
      }

      public showHighLight() {
        if (this.value) {
          if (this.value.v) {
            this.imageHighLight.visible = true;
          }
        }
      }

      public reset() {
        this.imageHighLight.visible = false;
        this.value = null;
        this.image.visible = false;
      }

      public addToLayer(staticLayer: egret.DisplayObjectContainer) {
        this.isAtAnimateLayer = false;
        staticLayer.addChild(this);
      }
    }
  }
}
