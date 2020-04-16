// TypeScript file
namespace we {
  export namespace di {
    export class StatisticChartPanel extends ui.Panel {
      protected contentTwo: eui.Group;
      protected _diPie: DiPie;
      protected _diChance: DiChance;

      private slides = [];
      private duration = 1.0;
      private currentIndex = 0;
      private direction: string;
      private isDown = false;
      private isMoved = false;
      private isAnimating = false;
      private autoPlayTimer: number;

      private initX;

      private _bulletOne: eui.Image;
      private _bulletTwo: eui.Image;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.contentTwo.alpha = 0;
        this.configSlides();
      }

      public configSlides() {
        this.slides = [this.content, this.contentTwo];
        logger.l(this.width, this.height, this.slides);

        if (!this.slides.length) {
          return;
        }

        const slide = this.slides[this.currentIndex];
      }

      private onTouchBegin(event: egret.TouchEvent): void {
        if (!this.touchEnabled) {
          return;
        }
        if (this.isAnimating) {
          clearTimeout(this.autoPlayTimer);
          return;
        }
        this.isDown = true;
        this.initX = event.$stageX;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      }

      private onTouchMove(event: egret.TouchEvent): void {
        this.isMoved = true;

        if (!this.slides.length) {
          return;
        }

        this.content.x = event.$stageX - this.initX;
        if (this.content.x > 0) {
          // invisible one to left (prev)
          this.contentTwo.x = this.content.x - 2484;
          this.direction = 'prev';
        } else {
          // invisble one to right (next)
          this.contentTwo.x = this.content.x + 2484;
          this.direction = 'next';
        }
        const index = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;
        this.contentTwo.alpha = 1;
      }

      private onTouchEnd(event: egret.TouchEvent): void {
        clearTimeout(this.autoPlayTimer);
        this.isDown = false;
        this.isMoved = false;
        this.isAnimating = true;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        const diff = event.$stageX - this.initX;

        if (Math.abs(diff) / 2484 <= 0.25) {
          // not reach threshold, don't slide
          TweenLite.to(this.content, this.duration, {
            x: 0,
          });
          TweenLite.to(this.contentTwo, this.duration, {
            x: this.direction === 'next' ? 2484 : -2484,
          });

          setTimeout(() => {
            this.contentTwo.alpha = 0;
            this.isAnimating = false;
          }, this.duration * 1000 + 50);
          return;
        }

        // Before Animate
        this.currentIndex = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;

        TweenLite.to(this.contentTwo, this.duration, {
          x: 0,
        });
        TweenLite.to(this.content, this.duration, {
          x: this.direction === 'next' ? -2484 : 2484,
        });

        setTimeout(() => {
          this.isAnimating = false;
        }, this.duration * 1000 + 50);
      }
    }
  }
}
