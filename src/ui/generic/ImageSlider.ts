namespace we {
  export namespace ui {
    export class ImageSlider extends eui.Component implements eui.UIComponent {
      private _slides = [];
      private duration = 1.0;
      private currentIndex = 0;
      private direction: string;
      private isDown = false;
      private isMoved = false;
      private isAnimating = false;
      private imageVisible: eui.Image;
      private imageInvisible: eui.Image;
      private autoPlayTimer: number;

      public bullets: ImageSliderBullet;

      protected _selectedIndex: number = -1;

      public get slides(): any[] {
        return this._slides;
      }

      public get slideCount(): number {
        return this._slides.length;
      }

      public get selectedIndex(): number {
        return this.currentIndex;
      }

      public set selectedIndex(val: number) {
        if (this._selectedIndex === val) return;
        if (!this.isAnimating && val<this._slides.length && this._slides[val].loaded) {
          clearTimeout(this.autoPlayTimer);
          this._selectedIndex = val;
          this.moveToNext(val < this.currentIndex);
        }
      }

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('ImageSlider');
        // comment this line in case of performance issues
        // this.mask = new egret.Rectangle(0, 0, this.width, this.height);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
      }

      public configSlides(slides: core.IRemoteResourceItem[]) {
        this._slides = slides;
        logger.l(utils.LogTarget.DEBUG, this.width, this.height, slides);

        if (!this._slides.length) {
          return;
        }

        // load slides
        this._slides.forEach(async (slide: core.IRemoteResourceItem) => {
          if (slide.imageUrl) {
            const texture = await RES.getResByUrl(slide.imageUrl, null, this, RES.ResourceItem.TYPE_IMAGE);
            slide.image = texture;
            slide.loaded = true;
          }
        });
        
        // reset dimensions
        this.imageVisible.width = this.width;
        this.imageVisible.height = this.height;
        this.imageInvisible.width = this.width;
        this.imageInvisible.height = this.height;

        this.imageVisible.fillMode = 'cover';
        this.imageInvisible.fillMode = 'cover';
        // create dots
        const slide = this._slides[this.currentIndex];
        if (slide.loaded) {
          this.imageVisible.source = slide.image;
        }

        this.scheduleNext();
      }

      private initX;

      private onTouchBegin(event: egret.TouchEvent): void {
        if (!this.touchEnabled) {
          return;
        }
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

        if (!this._slides.length) {
          return;
        }

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
        // const index = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;
        const index = this.direction === 'prev'? this.getPrevIndex(): this.getNextIndex();
        this.imageInvisible.source = this._slides[index].image;
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
        this.currentIndex = this.direction === 'prev'? this.getPrevIndex(): this.getNextIndex();
        // this.currentIndex = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;

        TweenLite.to(this.imageInvisible, this.duration, {
          x: 0,
        });
        TweenLite.to(this.imageVisible, this.duration, {
          x: this.direction === 'next' ? -2600 : 2600,
        });

        if (this.bullets) {
          this.bullets.refresh();
        }

        // After Animate
        setTimeout(() => {
          this.imageVisible.source = this._slides[this.currentIndex].image;
          this.imageVisible.x = 0;
          this.imageInvisible.alpha = 0;
          this.isAnimating = false;
          this.scheduleNext();
        }, this.duration * 1000 + 50);
      }

      private scheduleNext(isPrev: boolean = false) {
        clearTimeout(this.autoPlayTimer);
        this.autoPlayTimer = setTimeout(() => {
          if (!this._slides.length || this.isDown) {
            this.scheduleNext();
            return;
          }
          this.moveToNext(isPrev);
        }, 1000);
      }

      protected moveToNext(isPrev: boolean = false) {
        this.currentIndex = this.getNextIndex();

        this.isAnimating = true;
        this.imageVisible.x = 0;
        this.imageInvisible.x = isPrev? -2600: 2600;
        this.imageInvisible.source = this._slides[this.currentIndex].image;
        this.imageInvisible.alpha = 1;

        if (this.bullets) {
          this.bullets.refresh();
        }

        TweenLite.to(this.imageInvisible, this.duration, {
          x: 0,
        });
        TweenLite.to(this.imageVisible, this.duration, {
          x: isPrev ? 2600 : -2600,
        });

        setTimeout(() => {
          this.imageVisible.x = 0;
          this.imageVisible.source = this._slides[this.currentIndex].image;
          this.imageInvisible.alpha = 0;
          this.isAnimating = false;
          this.scheduleNext();
        }, this.duration * 1000 + 50);
      }

      private onTap() {
        if (!this._slides.length) {
          return;
        }
        logger.l(utils.LogTarget.DEBUG, 'carousel', this._slides[this.currentIndex].link);
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'ba' });
      }

      protected getNextIndex() {
        const oldIndex = this.currentIndex;
        let index = this._selectedIndex>-1? this._selectedIndex: (this.currentIndex + 1) % this._slides.length;
        this._selectedIndex = -1;
        while (!this._slides[index].loaded && index !== oldIndex) {
          index = (index + 1) % this._slides.length;
        }
        return index;
      }

      protected getPrevIndex() {
        const oldIndex = this.currentIndex;
        let index = this._selectedIndex>-1? this._selectedIndex: (this.currentIndex + this._slides.length - 1) % this._slides.length;
        this._selectedIndex = -1;
        while (!this._slides[index].loaded && index !== oldIndex) {
          index = (index + this._slides.length - 1) % this._slides.length;
        }
        return index;
      }
    }
  }
}
