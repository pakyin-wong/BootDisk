// TypeScript file
namespace we {
  export namespace bam {
    export class SqueezeTutorial extends we.ui.Panel {
      private _nextButton;
      private _prevButton;
      public _close;
      private _holder: we.ui.HorizontalHolder;

      private _allOpenOne;
      private _allOpenTwo;
      private _allOpenThree;

      private _captionOne;
      private _captionTwo;
      private _captionThree;
      private _captionFour;
      private _captionArr;

      private _pageText;
      private _pageIndex = 0;

      private _mask;

      constructor(skin) {
        super(skin);

        // this._skinKey = 'SqueezeTutorial';
        // this.skinName = utils.getSkinByClassname('SqueezeTutorial');
        // this.init();
      }
      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
      }

      protected initComponents() {
        super.initComponents();
        this.addListeners();
        this.init();
      }

      protected arrangeComponents() {
        super.arrangeComponents();
        this.init();
      }

      protected init() {
        this._captionArr = [];
        this._captionArr.push(this._captionOne);
        this._captionArr.push(this._captionTwo);
        this._captionArr.push(this._captionThree);
        if (this._captionFour) {
          this._captionArr.push(this._captionFour);
        }

        for (const caption of this._captionArr) {
          caption.visible = false;
        }

        this._captionArr[0].visible = true;

        this._pageIndex = 0;

        if (env.isMobile === false) {
          if (this._nextButton) {
            this._nextButton.currentState = 'on';
          }
          if (this._prevButton) {
            this._prevButton.currentState = 'off';
          }
        }
        if (!env.isMobile) {
          const shape = new egret.Shape();
          const matrix = new egret.Matrix();

          matrix.createGradientBox(this._allOpenThree.width, this._allOpenThree.height, Math.PI / 2, 0, 0);
          shape.graphics.beginGradientFill(egret.GradientType.LINEAR, [0xffffff, 0xffffff, 0xffffff, 0xffffff], [1, 0.3, 0, 0], [0, 50, 150, 255], matrix);
          shape.graphics.drawRect(0, 0, this._allOpenThree.width, this._allOpenThree.height); //

          this._mask.addChild(shape);
          this._mask.mask = shape;

          // add childs then init holder(if DragonBone)
        }
      }

      private addListeners() {
        this._nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doNext, this);
        if (this._prevButton) {
          this._prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doPrev, this);
        }
        if (this._prevButton) {
          this._close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doDestroy, this);
        }
      }

      private removeListners() {
        this._nextButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.doNext, this);
        if (this._prevButton) {
          this._prevButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.doPrev, this);
        }
        this._close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.doDestroy, this);
      }

      private doNext(e) {
        if (this._holder.isAnimating) {
          return;
        }

        this._holder.doNext(true);
        this._pageIndex++;
        if (this._pageIndex < this._captionArr.length) {
          this.updateText(this._pageIndex);
        } else {
          this._pageIndex = this._captionArr.length - 1;
        }

        this.updateButton(this._pageIndex);
      }

      private doPrev(e) {
        if (this._holder.isAnimating) {
          return;
        }

        this._holder.doPrevious(true);

        this._pageIndex--;
        if (this._pageIndex >= 0) {
          this.updateText(this._pageIndex);
        } else {
          this._pageIndex = 0;
        }

        this.updateButton(this._pageIndex);
      }

      private doDestroy(e) {
        this.removeListners();
        this.parent.removeChild(this);
      }

      private updateButton(index) {
        if (env.isMobile) {
          return;
        }

        if (index < 2) {
          this._nextButton.currentState = 'on';
        } else {
          this._nextButton.currentState = 'off';
        }

        if (index > 0) {
          this._prevButton.currentState = 'on';
        } else {
          this._prevButton.currentState = 'off';
        }
      }

      private updateText(index: number) {
        for (const caption of this._captionArr) {
          caption.visible = false;
        }

        if (index >= 0 && index < this._captionArr.length) {
          this._captionArr[index].visible = true;
        }

        if (this._pageText) {
          this._pageText.text = (index + 1).toString() + '/3';
        }
      }
    }
  }
}
