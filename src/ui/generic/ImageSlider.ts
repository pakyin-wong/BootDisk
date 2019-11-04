namespace we {
  export namespace ui {
    export class ImageSlider extends eui.Component implements eui.UIComponent {
      private images = [];
      private currentIndex = 0;
      private direction = 0;
      private imageVisible: eui.Image;
      private imageInvisible: eui.Image;

      public constructor() {
        super();
        this.skinName = utils.getSkin('ImageSlider');
        this.images = [RES.getRes('bg_jpg'), RES.getRes('egret_icon_png')];
        // comment this line in case of performance issues
        this.mask = new egret.Rectangle(0, 0, 2560, 600);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);

        // create dots
        this.imageVisible.source = this.images[this.currentIndex];
        this.imageVisible.width = 2560;
        this.imageVisible.height = 2560 / ((this.images[this.currentIndex] as egret.Texture).$bitmapWidth / (this.images[this.currentIndex] as egret.Texture).$bitmapHeight);
        this.imageVisible.y = (this.imageVisible.height - 600) / -2;

        this.imageInvisible.width = 2560;
        this.imageInvisible.height = 2560 / ((this.images[this.currentIndex] as egret.Texture).$bitmapWidth / (this.images[this.currentIndex] as egret.Texture).$bitmapHeight);
        this.imageInvisible.y = (this.imageVisible.height - 600) / -2;
      }

      private initX;

      private onTouchBegin(event: egret.TouchEvent): void {
        this.initX = event.$stageX;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      }

      private onTouchMove(event: egret.TouchEvent): void {
        this.imageVisible.x = event.$stageX - this.initX;
        if (this.imageVisible.x > 0) {
          // invisible one to left (next)
          this.imageInvisible.x = this.imageVisible.x - 2560;
          this.imageInvisible.source = this.images[Math.abs((this.currentIndex - 1) % this.images.length)];
          this.direction = 1;
        } else {
          // invisble one to right (prev)
          this.imageInvisible.x = this.imageVisible.x + 2560;
          this.imageInvisible.source = this.images[(this.currentIndex + 1) % this.images.length];
          this.direction = -1;
        }
      }

      private onTouchEnd(event: egret.TouchEvent): void {
        const diff = event.$stageX - this.initX;
        const duration = 0.3;
        if (Math.abs(diff) / 2560 <= 0.25) {
          // not reach threshold, don't slide
          TweenLite.to(this.imageVisible, duration, {
            x: 0,
          });
          TweenLite.to(this.imageInvisible, duration, {
            x: this.direction === -1 ? 2560 : -2560,
          });
          return;
        }
        TweenLite.to(this.imageInvisible, duration, {
          x: 0,
        });
        TweenLite.to(this.imageVisible, duration, {
          x: this.direction === -1 ? -2560 : 2560,
        });
        setTimeout(() => {
          this.currentIndex = Math.abs((this.currentIndex + this.direction) % this.images.length);
          this.imageVisible.x = 0;
          this.imageVisible.source = this.images[this.currentIndex];
          this.imageInvisible.x = 2560;
        }, duration * 1000);

        const stage = event.$currentTarget;
        stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      }
    }
  }
}
