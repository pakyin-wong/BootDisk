// TypeScript file
namespace we {
  export namespace ui {
    export class HorizontalHolder extends eui.Group {
      protected _slides; // eui.Group
      protected _sortedSlides;
      private currentPageIdx: number = 0;
      private pageCount: number;

      public slideWidth: number = 0;
      public slideHeight: number = 0;
      public isLoop: boolean = true;
      public isAuto: boolean = true;

      private _currentTime;
      private _startTime;

      private _startPosition;
      private _previousPosition;
      private _endPosition;
      private _previousIdx;
      private _nextIdx;
      private _direction;

      private _duration = 500;
      private _autoTimer = -1;

      private _touchArea;
      private _bulletGroup;

      private _bulletOn = 'm_lobby_banner_bullet_active_png';
      private _bulletOff = 'm_lobby_banner_bullet_png';

      private isAnimating = false;
      private isPrevBlock = false;
      private isNextBlock = false;

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();

        this.initSlider();
      }

      public initSlider() {
        this.width = this.slideWidth;
        this.height = this.slideHeight;
        this.touchEnabled = true;
        this.touchChildren = true;

        this._slides = [];
        this.pageCount = this.numChildren;

        if (this.pageCount <= 1) {
          console.error('One page is not allowed');
          return;
        }

        this.currentPageIdx = 0;

        for (let i = 0; i < this.pageCount; i++) {
          this._slides.push(this.getChildAt(i));
          if (this._slides[i].width > this.slideWidth || this._slides[i].height > this.slideHeight) {
            this._slides[i].width = this.slideWidth;
            this._slides[i].height = this.slideHeight;
          }
        }

        this._slides[this.currentPageIdx].x = 0;
        this._slides[this.currentPageIdx].y = 0;

        // if(this.isLoop)
        // this.doLoop();
        this.sortSlides();
        this.initComponents();

        this.addListeners();

        // if (this.isAuto) this.doNext();
      }

      public addListeners() {
        if (env.isMobile) {
          this._touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
          this._touchArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
          this._touchArea.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
          this._touchArea.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
          this._touchArea.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        } else {
          // this.addEventListener(mouse.MouseEvent.,this.onTouchBegin,this);
          // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
          // this.addEventListener(mouse.MouseEvent.Mouse,this.onTouchEnd,this);
        }
      }

      public removeListeners() {
        if (env.isMobile) {
          this._touchArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
          this._touchArea.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
          this._touchArea.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
          this._touchArea.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this);
          this._touchArea.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        } else {
          // this.addEventListener(mouse.MouseEvent.,this.onTouchBegin,this);
          // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
          // this.addEventListener(mouse.MouseEvent.Mouse,this.onTouchEnd,this);
        }
      }

      protected initComponents() {
        this._bulletGroup = new eui.Group();

        this.addChild(this._bulletGroup);
        this._bulletGroup.horizontalCenter = 0;
        this._bulletGroup.bottom = 0;
        this._bulletGroup.width = this.width;
        this._bulletGroup.height = 20;

        let bullet: eui.Image;

        for (let i = 0; i < this.pageCount; i++) {
          bullet = new eui.Image();
          bullet.width = bullet.height = 20;
          bullet.source = this._bulletOff;
          bullet.horizontalCenter = 0;
          this._bulletGroup.addChild(bullet);
        }

        const layout = new eui.HorizontalLayout();
        layout.verticalAlign = 'middle';
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        layout.gap = 2;
        this._bulletGroup.layout = layout;

        this.updateBullets();

        let shape = new egret.Shape();
        let gr = shape.graphics;
        gr.clear();
        gr.beginFill(0x00ff00, 1);
        gr.drawRect(0, 0, this.slideWidth, this.slideHeight);
        gr.endFill();

        shape.x = 0;
        this.mask = shape;
        this.addChild(shape);

        this._touchArea = new egret.DisplayObjectContainer();
        this._touchArea.width = this.slideWidth;
        this._touchArea.height = this.slideHeight;
        this._touchArea.touchThrough = true;
        this._touchArea.touchEnabled = true;
        shape = new egret.Shape();
        gr = shape.graphics;
        gr.clear();
        gr.beginFill(0x00ff00, 0);
        gr.drawRect(0, 0, this.slideWidth, this.slideHeight);
        gr.endFill();

        shape.x = 0;
        shape.alpha = 0;
        this._touchArea.addChild(shape);
        this.addChildAt(this._touchArea, this.numChildren);
      }

      protected updateBullets() {
        for (let i = 0; i < this._bulletGroup.numChildren; i++) {
          (this._bulletGroup.getChildAt(i) as eui.Image).source = this._bulletOff;
        }

        (this._bulletGroup.getChildAt(this.currentPageIdx) as eui.Image).source = this._bulletOn;
      }

      protected sortSlides() {
        this.isPrevBlock = false;
        this.isNextBlock = false;

        for (let i = 0; i < this.pageCount; i++) {
          this._slides[i].visible = false;
        }

        this._previousIdx = this.currentPageIdx - 1;

        if (!this.isLoop && this._previousIdx < 0) {
          this.isPrevBlock = true;
        }
        if (this._previousIdx < 0) this._previousIdx = this.pageCount - 1;

        this._nextIdx = this.currentPageIdx + 1;

        if (!this.isLoop && this._nextIdx > this.pageCount - 1) {
          this.isNextBlock = true;
        }

        if (this._nextIdx > this.pageCount - 1) this._nextIdx = 0;

        // // check current page

        // this._previousIdx = this.currentPageIdx-- >= 0 ? this.currentPageIdx : this.pageCount - 1;
        // this._nextIdx = this.currentPageIdx++ <= this.pageCount - 1 ? this.currentPageIdx : 0;

        const prev = this._slides[this._previousIdx];
        const current = this._slides[this.currentPageIdx];
        const next = this._slides[this._nextIdx];

        prev.x = -this.slideWidth;
        prev.visible = true;
        current.x = 0;
        current.visible = true;
        next.x = this.slideWidth;
        next.visible = true;

        // this._sortedSlides = [];
        // this._sortedSlides.push(prev);
        // this._sortedSlides.push(current);
        // this._sortedSlides.push(next);
        // }
        // else {
        // this._sortedSlides = [];
        // this._sortedSlides.push(this._slides[0]);
        // this._sortedSlides.push(this._slides[1]);
        // }
      }

      protected checkCurrentIndex() {
        if (this.currentPageIdx > this.pageCount - 1) this.currentPageIdx = 0;

        if (this.currentPageIdx < 0) this.currentPageIdx = this.pageCount - 1;
      }

      protected doNext() {
        this.isAnimating = true;
        // check current page

        const previous = this._slides[this._previousIdx];
        const current = this._slides[this.currentPageIdx];
        const next = this._slides[this._nextIdx];

        if (this._previousIdx === this._nextIdx) next.x = current.x + this.slideWidth;

        const targetX = -this.slideWidth;
        const duration = this.calculateDuration(targetX, current.x);

        egret.Tween.get(current).to(
          {
            x: -this.slideWidth,
          },
          duration
        );

        egret.Tween.get(next)
          .to(
            {
              x: 0,
            },
            duration
          )
          .call(this.onMoveFinished, this, [1]);

        // setTimeout(() => {
        //   this.onMoveFinished(1);
        // }, 2005);
      }

      protected onMoveFinished(e: number) {
        this.isAnimating = false;
        this.currentPageIdx += e;
        this.checkCurrentIndex();
        this.sortSlides();
        this.updateBullets();
        // if (this.isAuto)
        //   this._autoTimer = setTimeout(() => {
        //     this.doPrevious();
        //   }, 3000);
      }

      protected doPrevious() {
        // this._sortedSlides[this._nextIdx].visible = false;
        this.isAnimating = true;

        const current = this._slides[this.currentPageIdx];
        const previous = this._slides[this._previousIdx];
        const next = this._slides[this._nextIdx];

        if (this._previousIdx === this._nextIdx) previous.x = current.x - this.slideWidth;

        const targetX = this.slideWidth;
        const duration = this.calculateDuration(targetX, current.x);
        // will change after touchEvent
        egret.Tween.get(current).to(
          {
            x: this.slideWidth,
          },
          duration
        );

        egret.Tween.get(previous)
          .to(
            {
              x: 0,
            },
            duration
          )
          .call(this.onMoveFinished, this, [-1]);

        // setTimeout(() => {
        //   this.onMoveFinished(-1);
        // }, 2005);
      }

      protected doAuto() {
        this._autoTimer = setTimeout(() => {
          this.doNext();
        }, 5000);
      }

      protected clearAuto() {
        clearTimeout(this._autoTimer);
        this._autoTimer = -1;
      }

      protected onTouchBegin(e: egret.TouchEvent) {
        if (this.isAnimating) return;

        const current = this._slides[this.currentPageIdx];
        const previous = this._slides[this._previousIdx];
        const next = this._slides[this._nextIdx];

        this.clearAuto();

        egret.Tween.removeTweens(current);
        egret.Tween.removeTweens(previous);
        egret.Tween.removeTweens(next);

        this._startPosition = e.$stageX;
        this._startTime = egret.getTimer();
        // current.x = this.globalToLocal(0, 0).x + this._startPosition - this.slideWidth / 2; // centerpoint
        // next.x = this.globalToLocal(0, 0).x + this._startPosition + this.slideWidth - this.slideWidth / 2;
        // previous.x = this.globalToLocal(0, 0).x + this._startPosition - this.slideWidth - this.slideWidth / 2;

        previous.visible = true;
        next.visible = true;
      }

      protected onTouchMove(e: egret.TouchEvent) {
        if (this.isAnimating) return;
        // const move
        const current = this._slides[this.currentPageIdx];
        const previous = this._slides[this._previousIdx];
        const next = this._slides[this._nextIdx];

        if (!this._previousPosition) {
          this._previousPosition = e.$stageX;
          return;
        }

        this._endPosition = e.$stageX;

        const offset = this._previousPosition - this._endPosition;
        const last = this._startPosition - this._endPosition;

        this._direction = 'origin';

        // if (offset >= 10) this._direction = 'next';

        // if (offset <= -10) this._direction = 'prev';

        if (last > this.slideWidth / 2) this._direction = 'next';

        if (last < -this.slideWidth / 2) this._direction = 'prev';

        if (!this.isLoop) {
          if (offset < 0 && this.isPrevBlock) return;
          if (offset > 0 && this.isNextBlock) return;
        }

        current.x = current.x - offset; // centerpoint

        if (this._nextIdx === this._previousIdx) {
          if (offset > 0) next.x = current.x + this.slideWidth;
          if (offset < 0) previous.x = current.x - this.slideWidth;
        } else {
          next.x = current.x + this.slideWidth;
          previous.x = current.x - this.slideWidth;
        }

        this._previousPosition = e.$stageX;
      }

      protected onTouchEnd(e: egret.TouchEvent) {
        if (this.isAnimating) return;

        const current = this._slides[this.currentPageIdx];
        const previous = this._slides[this._previousIdx];
        const next = this._slides[this._nextIdx];

        this._currentTime = egret.getTimer();

        const currentPosition = e.$stageX;
        const positionOffset = this._startPosition - currentPosition;
        const timeOffset = this._currentTime - this._startTime;

        if (timeOffset < 150) {
          if (positionOffset > 0) this._direction = 'next';

          if (positionOffset < 0) this._direction = 'prev';
        }

        if (!this.isLoop) {
          if (positionOffset < 0 && this.isPrevBlock) {
            this.clearTouch();
            return;
          }
          if (positionOffset > 0 && this.isNextBlock) {
            this.clearTouch();
            return;
          }
        }

        previous.visible = true;
        next.visible = true;

        switch (this._direction) {
          case 'origin':
            this.resetPosition();
            break;
          case 'next':
            this.doNext();
            break;
          case 'prev':
            this.doPrevious();
            break;
        }
        this.clearTouch();
      }

      protected clearTouch() {
        this._startPosition = null;
        this._previousPosition = null;
        this._endPosition = null;
        this._currentTime = null;
        this._startTime = null;
        this._direction = 'origin';
      }

      protected calculateDuration(targetX: number, currentX: number): number {
        let duration = 500;
        const speed = this.slideWidth / duration;
        const distance = Math.abs(targetX - currentX);
        duration = distance / speed;
        return duration;
      }

      protected resetPosition() {
        this.isAnimating = true;

        const current = this._slides[this.currentPageIdx];
        const previous = this._slides[this._previousIdx];
        const next = this._slides[this._nextIdx];

        let checkPage = 'normal';

        if (this._previousIdx === this._nextIdx) {
          if (current.x <= 0) {
            next.x = current.x + this.slideWidth;
            checkPage = 'next';
          } else {
            previous.x = current.x - this.slideWidth;
            checkPage = 'prev';
          }
        }

        const targetX = 0;
        const duration = this.calculateDuration(targetX, current.x);

        switch (checkPage) {
          case 'normal':
            egret.Tween.get(next).to(
              {
                x: this.slideWidth,
              },
              duration
            );

            egret.Tween.get(current).to(
              {
                x: 0,
              },
              duration
            );

            egret.Tween.get(previous)
              .to(
                {
                  x: -this.slideWidth,
                },
                duration
              )
              .call(this.onMoveFinished, this, [0]);
            break;
          case 'next':
            egret.Tween.get(next).to(
              {
                x: this.slideWidth,
              },
              duration
            );

            egret.Tween.get(current)
              .to(
                {
                  x: 0,
                },
                duration
              )
              .call(this.onMoveFinished, this, [0]);
            break;
          case 'prev':
            egret.Tween.get(current).to(
              {
                x: 0,
              },
              duration
            );

            egret.Tween.get(previous)
              .to(
                {
                  x: -this.slideWidth,
                },
                duration
              )
              .call(this.onMoveFinished, this, [0]);
            break;
        }

        // will change after touchEvent
      }

      // protected onMouseDown(e)
      // {

      // }

      // protected onMouseMove(e)
      // {

      // }

      // protected onMouseEnd(e)
      // {

      // }
    }
  }
}
