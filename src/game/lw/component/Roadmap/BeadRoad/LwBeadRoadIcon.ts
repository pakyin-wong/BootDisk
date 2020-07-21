namespace we {
  export namespace lw {
    export class LwBeadRoadIcon extends ba.BARoadIconBase {
      private emptyColor: number;
      private emptyAlpha: number;
      private iconWidth: number;
      private iconHeight: number;
      private image: eui.Image;
      private imageHighLight: eui.Image;

      private highLightSource: string;
      private eastSource: string;
      private southSource: string;
      private westSource: string;
      private northSource: string;
      private redSource: string;
      private greenSource: string;
      private whiteSource: string;

      public constructor(_width: number = 30, _height: number = 30) {
        super(_width);
        this.iconWidth = _width;
        this.iconHeight = _height;
        this.initGraphics();
        this.setByObject({});
      }

      protected updateSource() {
        if (env.isMobile) {
          this.highLightSource = 'm_lw_listpenal_history_record_hl_png';
          this.eastSource = 'm_lw_listpenal_history_record_east_png';
          this.southSource = 'm_lw_listpenal_history_record_south_png';
          this.westSource = 'm_lw_listpenal_history_record_west_png';
          this.northSource = 'm_lw_listpenal_history_record_north_png';
          this.redSource = 'm_lw_listpenal_history_record_red_png';
          this.greenSource = 'm_lw_listpenal_history_record_green_png';
          this.whiteSource = 'm_lw_listpenal_history_record_white_png';
        } else {
          this.highLightSource = 'd_lw_history_record_hl_png';
          this.eastSource = 'd_lw_history_record_east_png';
          this.southSource = 'd_lw_history_record_south_png';
          this.westSource = 'd_lw_history_record_west_png';
          this.northSource = 'd_lw_history_record_north_png';
          this.redSource = 'd_lw_history_record_red_png';
          this.greenSource = 'd_lw_history_record_green_png';
          this.whiteSource = 'd_lw_history_record_white_png';
        }
      }

      protected initGraphics() {
        this.updateSource();

        this.imageHighLight = new eui.Image();
        this.imageHighLight.x = -5;
        this.imageHighLight.y = -5;
        this.imageHighLight.width = this.iconWidth + 10;
        this.imageHighLight.height = this.iconHeight + 10;
        this.imageHighLight.source = this.highLightSource;
        this.addChild(this.imageHighLight);

        this.image = new eui.Image();
        this.image.width = this.iconWidth;
        this.image.height = this.iconHeight;
        this.image.source = this.eastSource;
        this.addChild(this.image);
      }

      public setByObject(value: any) {
        this.reset();
        this.value = value;
        if (value.v != null) {
          this.image.visible = true;
          if (value.v === '01') {
            this.image.source = this.eastSource;
          } else if (value.v === '02') {
            this.image.source = this.southSource;
          } else if (value.v === '03') {
            this.image.source = this.westSource;
          } else if (value.v === '04') {
            this.image.source = this.northSource;
          } else if (value.v === '05') {
            this.image.source = this.whiteSource;
          } else if (value.v === '06') {
            this.image.source = this.redSource;
          } else if (value.v === '07') {
            this.image.source = this.greenSource;
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
