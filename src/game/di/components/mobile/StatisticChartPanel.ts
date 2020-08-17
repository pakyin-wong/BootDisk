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
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
        if (env.orientation === 'portrait') {
          this.contentTwo.x = this.stage.width;
        }
        this.configSlides();
      }

      protected destroy() {
        super.destroy();
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }

      public configSlides() {
        this.slides = [this.content, this.contentTwo];
        logger.l(utils.LogTarget.DEBUG, this.width, this.height, this.slides);

        if (!this.slides.length) {
          return;
        }

        const slide = this.slides[this.currentIndex];
      }

      private onTouchBegin(event: egret.TouchEvent): void {
        if (env.orientation === 'landscape') {
          return;
        }

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
        if (env.orientation === 'landscape') {
          return;
        }
        this.isMoved = true;

        if (!this.slides.length) {
          return;
        }

        switch (this.currentIndex) {
          case 0:
            // this.content.x = event.$stageX;
            // this.contentTwo.x = this.content.x + this.content.width;
            this.direction = 'next';
            break;
          case 1:
            // this.contentTwo.x = event.$stageX;
            // this.content.x = this.contentTwo.x - this.contentTwo.width;
            this.direction = 'prev';
            break;
        }

        // let temp;
        // let temp2;

        // switch (this.currentIndex) {
        //   case 0:
        //     temp = this.content;
        //     temp2 = this.contentTwo;
        //     break;
        //   case 1:
        //     temp = this.contentTwo;
        //     temp2 = this.content;
        //     break;
        // }

        // temp.x = event.$stageX - this.initX;
        // if (temp.x > 0) {
        //   // invisible one to left (prev)
        //   temp2.x = temp.x - temp.width;
        //   this.direction = 'prev';
        // } else {
        //   // invisble one to right (next)
        //   temp2 = temp.x + temp.width;
        //   this.direction = 'next';
        // }
        // const index = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;
        // this.contentTwo.alpha = 1;
      }

      private onTouchEnd(event: egret.TouchEvent): void {
        if (env.orientation === 'landscape') {
          return;
        }

        clearTimeout(this.autoPlayTimer);
        this.isDown = false;
        this.isMoved = false;
        this.isAnimating = true;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        const diff = event.$stageX - this.initX;

        switch (this.currentIndex) {
          case 0:
            if (Math.abs(diff) / this.content.width <= 0.25) {
              TweenLite.to(this.content, this.duration, {
                x: 0,
              });
              TweenLite.to(this.contentTwo, this.duration, {
                x: this.content.width,
              });
            }
            break;
          case 1:
            if (Math.abs(diff) / this.contentTwo.width <= 0.25) {
              TweenLite.to(this.contentTwo, this.duration, {
                x: 0,
              });
              TweenLite.to(this.content, this.duration, {
                x: -this.content.width,
              });
            }
            break;
        }

        this.currentIndex++;
        if (this.currentIndex >= this.slides.length) {
          this.currentIndex = 0;
        }

        switch (this.direction) {
          case 'next':
            TweenLite.to(this.contentTwo, this.duration, {
              x: 0,
            });
            TweenLite.to(this.content, this.duration, {
              x: -this.content.width,
            });
            break;
          case 'prev':
            TweenLite.to(this.content, this.duration, {
              x: 0,
            });
            TweenLite.to(this.contentTwo, this.duration, {
              x: this.content.width,
            });
            break;
        }

        setTimeout(() => {
          this.isAnimating = false;
        }, this.duration * 1000 + 50);

        // let temp;
        // let temp2;

        // switch (this.currentIndex) {
        //   case 0:
        //     temp = this.content;
        //     temp2 = this.contentTwo;
        //     break;
        //   case 1:
        //     temp = this.contentTwo;
        //     temp2 = this.content;
        //     break;
        // }

        // if (Math.abs(diff) / temp.width <= 0.25) {
        //   // not reach threshold, don't slide
        //   TweenLite.to(temp, this.duration, {
        //     x: 0,
        //   });
        //   TweenLite.to(temp2, this.duration, {
        //     x: this.direction === 'next' ? temp.width : -temp.width,
        //   });

        //   setTimeout(() => {
        //     this.contentTwo.alpha = 0;
        //     this.isAnimating = false;
        //   }, this.duration * 1000 + 50);
        //   return;
        // }

        // // Before Animate
        // this.currentIndex = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;

        // TweenLite.to(temp2, this.duration, {
        //   x: 0,
        // });
        // TweenLite.to(temp, this.duration, {
        //   x: this.direction === 'next' ? -temp.width / 2 : temp.width,
        // });

        // setTimeout(() => {
        //   this.isAnimating = false;
        // }, this.duration * 1000 + 50);
      }

      public setValue(tableInfo: data.TableInfo) {
        if (!tableInfo || !tableInfo.gamestatistic) {
          return;
        }
        if (tableInfo.gamestatistic.diOdd) {
          this._diPie.setPieOdd([tableInfo.gamestatistic.diOdd.odd, tableInfo.gamestatistic.diOdd.even, tableInfo.gamestatistic.diOdd.tie]);
          this._diPie.setOddValues(tableInfo.gamestatistic.diOdd);
        }
        if (tableInfo.gamestatistic.diSize) {
          this._diPie.setPieSize([tableInfo.gamestatistic.diSize.small, tableInfo.gamestatistic.diSize.big, tableInfo.gamestatistic.diSize.tie]);
          this._diPie.setSizeValues(tableInfo.gamestatistic.diSize);
        }
        if (tableInfo.gamestatistic.points) {
          this._diChance.setDiceValues(tableInfo.gamestatistic.points);
        }
      }

      public changeLang() {
        this._diPie.changeLang();
      }
    }
  }
}
