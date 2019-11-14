namespace we {
  export namespace ui {
    export class ImageSlider extends eui.Component implements eui.UIComponent {
      private images = [];
      private duration = 0.3;
      private currentIndex = 0;
      private direction: string;
      private isDown = false;
      private isMoved = false;
      private isAnimating = false;
      private imageVisible: eui.Image;
      private imageInvisible: eui.Image;
      private autoPlayTimer: number;

      public constructor() {
        super();
        this.skinName = utils.getSkin('ImageSlider');
        this.images = [RES.getRes('banner-baccarat_png'), RES.getRes('lobby_banner1_png'), RES.getRes('lobby_banner2_png')];
        // comment this line in case of performance issues
        // this.mask = new egret.Rectangle(0, 0, 2600, 600);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);

        // create dots
        this.imageVisible.source = this.images[this.currentIndex];
        this.imageVisible.width = 2600;
        this.imageVisible.height = 2600 / ((this.images[this.currentIndex] as egret.Texture).$bitmapWidth / (this.images[this.currentIndex] as egret.Texture).$bitmapHeight);
        this.imageVisible.y = (this.imageVisible.height - this.height) / -2;

        this.imageInvisible.width = 2600;
        this.imageInvisible.height = 2600 / ((this.images[this.currentIndex] as egret.Texture).$bitmapWidth / (this.images[this.currentIndex] as egret.Texture).$bitmapHeight);
        this.imageInvisible.y = (this.imageVisible.height - this.height) / -2;

        this.scheduleNext();
      }

      private initX;

      private onTouchBegin(event: egret.TouchEvent): void {
        if (this.isAnimating) {
          clearTimeout(this.autoPlayTimer);
          // animation end event will scheduleNext
          return;
        }
        this.isDown = true;
        this.initX = event.$stageX;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      }

      private onTouchMove(event: egret.TouchEvent): void {
        this.isMoved = true;
        this.imageVisible.x = event.$stageX - this.initX;
        if (this.imageVisible.x > 0) {
          // invisible one to left (prev)
          this.imageInvisible.x = this.imageVisible.x - 2600;
          this.direction = 'prev';
        } else {
          // invisble one to right (next)
          this.imageInvisible.x = this.imageVisible.x + 2600;
          this.direction = 'next';
        }
        const index = (this.images.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.images.length;
        this.imageInvisible.source = this.images[index];
        this.imageInvisible.alpha = 1;
      }

      private onTouchEnd(event: egret.TouchEvent): void {
        clearTimeout(this.autoPlayTimer);
        if (!this.isMoved) {
          this.onTap();
        }
        this.isDown = false;
        this.isMoved = false;
        this.isAnimating = true;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        const diff = event.$stageX - this.initX;

        if (Math.abs(diff) / 2600 <= 0.25) {
          // not reach threshold, don't slide
          TweenLite.to(this.imageVisible, this.duration, {
            x: 0,
          });
          TweenLite.to(this.imageInvisible, this.duration, {
            x: this.direction === 'next' ? 2600 : -2600,
          });

          setTimeout(() => {
            this.imageInvisible.alpha = 0;
            this.isAnimating = false;
            this.scheduleNext();
          }, this.duration * 1000 + 50);
          return;
        }

        // Before Animate
        this.currentIndex = (this.images.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.images.length;

        TweenLite.to(this.imageInvisible, this.duration, {
          x: 0,
        });
        TweenLite.to(this.imageVisible, this.duration, {
          x: this.direction === 'next' ? -2600 : 2600,
        });

        // After Animate
        setTimeout(() => {
          this.imageVisible.source = this.images[this.currentIndex];
          this.imageVisible.x = 0;
          this.imageInvisible.alpha = 0;
          this.isAnimating = false;
          this.scheduleNext();
        }, this.duration * 1000 + 50);
      }

      private scheduleNext() {
        clearTimeout(this.autoPlayTimer);
        this.autoPlayTimer = setTimeout(() => {
          if (this.isDown) {
            this.scheduleNext();
            return;
          }

          this.currentIndex = (this.currentIndex + 1) % this.images.length;

          this.isAnimating = true;
          this.imageVisible.x = 0;
          this.imageInvisible.x = 2600;
          this.imageInvisible.source = this.images[this.currentIndex];
          this.imageInvisible.alpha = 1;

          TweenLite.to(this.imageInvisible, this.duration, {
            x: 0,
          });
          TweenLite.to(this.imageVisible, this.duration, {
            x: -2600,
          });

          setTimeout(() => {
            this.imageVisible.x = 0;
            this.imageVisible.source = this.images[this.currentIndex];
            this.imageInvisible.alpha = 0;
            this.isAnimating = false;
            this.scheduleNext();
          }, this.duration * 1000 + 50);
        }, 3000);
      }

      private onTap() {
        logger.l('carousel', this.currentIndex);
      }
    }
  }
}
