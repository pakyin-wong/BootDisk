namespace we {
  export namespace ro {
    export class TableInfoPanel extends ui.TableInfoPanel {
      // <<<<<<< HEAD
      protected directLabel: eui.Label;
      // =======
      //       protected contentTwo: eui.Group;

      //       protected gameIdLabel: ui.RunTimeLabel;
      //       protected colorLabel: ui.RunTimeLabel;
      //       protected oddevenLabel: ui.RunTimeLabel;
      //       protected sizeLabel: ui.RunTimeLabel;
      //       protected columnbetLabel: ui.RunTimeLabel;
      //       protected rowbetLabel: ui.RunTimeLabel;
      //       protected betLimitLabel: ui.RunTimeLabel;

      //       public pBetLimit: ui.RunTimeLabel;
      //       protected pGameID: eui.Label;
      //       protected pColor: eui.Label;
      //       protected pOddeven: eui.Label;
      //       protected pSize: eui.Label;
      //       protected pColumnbet: eui.Label;
      //       protected pRowbet: eui.Label;

      //       protected directNoteLabel: eui.Label;
      //       protected pDirectNote: eui.Label;
      //       protected pDirectNoteRatio: eui.Label;

      // >>>>>>> develop
      protected separateLabel: eui.Label;
      protected streetLabel: eui.Label;
      protected cornerLabel: eui.Label;
      // <<<<<<< HEAD
      protected lineLabel: eui.Label;
      protected rowLabel: eui.Label;
      protected columnbetLabel: eui.Label;
      protected colorLabel: eui.Label;
      protected oddevenLabel: eui.Label;
      protected sizeLabel: eui.Label;

      protected pDirectMax: eui.Label;
      protected pDirectOdd: eui.Label;

      protected pSeparateMax: eui.Label;
      protected pSeparateOdd: eui.Label;

      protected pStreetMax: eui.Label;
      protected pStreetOdd: eui.Label;

      protected pCornerMax: eui.Label;
      protected pCornerOdd: eui.Label;

      protected pLineMax: eui.Label;
      protected pLineOdd: eui.Label;

      protected pRowMax: eui.Label;
      protected pRowOdd: eui.Label;

      protected pDozenMax: eui.Label;
      protected pDozenOdd: eui.Label;

      protected pRedBlackMax: eui.Label;
      protected pRedBlackOdd: eui.Label;

      protected pOddEvenMax: eui.Label;
      protected pOddEvenOdd: eui.Label;

      protected pBigSmallMax: eui.Label;
      protected pBigSmallOdd: eui.Label;
      // =======
      // protected pCorner: eui.Label;
      // protected pCornerRatio: eui.Label;

      // protected lineBetLabel: eui.Label;
      // protected pLineBet: eui.Label;
      // protected pLineBetRatio: eui.Label;

      // protected rowLabel: ui.RunTimeLabel;
      // protected pRow: eui.Label;
      // protected pRowRatio: eui.Label;

      // protected dozenLabel: ui.RunTimeLabel;
      // protected pDozen: eui.Label;
      // protected pDozenRatio: eui.Label;

      // protected colorTwoLabel: ui.RunTimeLabel;
      // protected pColorTwo: eui.Label;
      // protected pColorTwoRatio: eui.Label;

      // protected oddevenTwoLabel: ui.RunTimeLabel;
      // protected pOddevenTwo: eui.Label;
      // protected pOddevenTwoRatio: eui.Label;

      // protected sizeTwoLabel: ui.RunTimeLabel;
      // protected pSizeTwo: eui.Label;
      // protected pSizeTwoRatio: eui.Label;

      private slides = [];
      private duration = 1.0;
      private currentIndex = 0;
      private direction: string;
      private isDown = false;
      private isMoved = false;
      private isAnimating = false;
      private autoPlayTimer: number;

      private _bulletOne: eui.Image;
      private _bulletTwo: eui.Image;

      public constructor() {
        super();
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        // if (this.contentTwo) {
        //   this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        //   this.contentTwo.alpha = 0;
        //   this.configSlides();
        // }
      }

      // public configSlides() {
      //   this.slides = [this.content, this.contentTwo];
      //   logger.l(this.width, this.height, this.slides);

      //   if (!this.slides.length) {
      //     return;
      //   }

      //   const slide = this.slides[this.currentIndex];
      // }

      private initX;

      // private onTouchBegin(event: egret.TouchEvent): void {
      //   if (!this.touchEnabled) {
      //     return;
      //   }
      //   if (this.isAnimating) {
      //     clearTimeout(this.autoPlayTimer);
      //     return;
      //   }
      //   this.isDown = true;
      //   this.initX = event.$stageX;
      //   this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
      //   this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
      // }

      // private onTouchMove(event: egret.TouchEvent): void {
      //   this.isMoved = true;

      //   if (!this.slides.length) {
      //     return;
      //   }

      //   this.content.x = event.$stageX - this.initX;
      //   if (this.content.x > 0) {
      //     // invisible one to left (prev)
      //     this.contentTwo.x = this.content.x - 2484;
      //     this.direction = 'prev';
      //   } else {
      //     // invisble one to right (next)
      //     this.contentTwo.x = this.content.x + 2484;
      //     this.direction = 'next';
      //   }
      //   const index = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;
      //   this.contentTwo.alpha = 1;
      // }

      // private onTouchEnd(event: egret.TouchEvent): void {
      //   clearTimeout(this.autoPlayTimer);
      //   this.isDown = false;
      //   this.isMoved = false;
      //   this.isAnimating = true;
      //   this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
      //   this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

      //   const diff = event.$stageX - this.initX;

      //   if (Math.abs(diff) / 2484 <= 0.25) {
      //     // not reach threshold, don't slide
      //     TweenLite.to(this.content, this.duration, {
      //       x: 0,
      //     });
      //     TweenLite.to(this.contentTwo, this.duration, {
      //       x: this.direction === 'next' ? 2484 : -2484,
      //     });

      //     setTimeout(() => {
      //       this.contentTwo.alpha = 0;
      //       this.isAnimating = false;
      //     }, this.duration * 1000 + 50);
      //     return;
      //   }

      //   // Before Animate
      //   this.currentIndex = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;

      //   TweenLite.to(this.contentTwo, this.duration, {
      //     x: 0,
      //   });
      //   TweenLite.to(this.content, this.duration, {
      //     x: this.direction === 'next' ? -2484 : 2484,
      //   });
      // >>>>>>> develop

      //   setTimeout(() => {
      //     this.isAnimating = false;
      //   }, this.duration * 1000 + 50);
      // }

      // <<<<<<< HEAD
      //   this.directLabel.text = i18n.t('roulette.betGroup.direct');
      //   this.separateLabel.text = i18n.t('roulette.betGroup.separate');
      //   this.streetLabel.text = i18n.t('roulette.betGroup.street');
      //   this.cornerLabel.text = i18n.t('roulette.betGroup.corner');
      //   this.lineLabel.text = i18n.t('roulette.betGroup.line');
      //   this.rowbetLabel.text = i18n.t('roulette.betGroup.row');
      //   this.columnbetLabel.text = i18n.t('roulette.betGroup.column');
      //   this.colorLabel.text = i18n.t('roulette.betGroup.color');
      //   this.oddevenLabel.text = i18n.t('roulette.betGroup.oddeven');
      //   this.sizeLabel.text = i18n.t('roulette.betGroup.size');
      // }
      // =======
      public changeLang() {
        super.changeLang();
        this.directLabel.text = i18n.t('roulette.betGroup.direct');
        this.separateLabel.text = i18n.t('roulette.betGroup.separate');
        this.streetLabel.text = i18n.t('roulette.betGroup.street');
        this.cornerLabel.text = i18n.t('roulette.betGroup.corner');
        this.lineLabel.text = i18n.t('roulette.betGroup.line');
        this.rowLabel.text = i18n.t('roulette.betGroup.row');
        this.columnbetLabel.text = i18n.t('roulette.betGroup.column');
        this.colorLabel.text = i18n.t('roulette.betGroup.color');
        this.oddevenLabel.text = i18n.t('roulette.betGroup.oddeven');
        this.sizeLabel.text = i18n.t('roulette.betGroup.size');
      }
      // >>>>>>> develop

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);

        const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
        if (betLimitSet.limits && betLimitSet.limits.ro) {
          const limits = betLimitSet.limits.ro;
          const list = [
            { target: this.pDirectMax, value: utils.numberToFaceValue(limits.DIRECT.maxlimit) },
            { target: this.pDirectOdd, value: limits.DIRECT.odd },
            { target: this.pSeparateMax, value: utils.numberToFaceValue(limits.SEPARATE.maxlimit) },
            { target: this.pSeparateOdd, value: limits.SEPARATE.odd },
            { target: this.pStreetMax, value: utils.numberToFaceValue(limits.STREET.maxlimit) },
            { target: this.pStreetOdd, value: limits.STREET.odd },
            { target: this.pCornerMax, value: utils.numberToFaceValue(limits.CORNER.maxlimit) },
            { target: this.pCornerOdd, value: limits.CORNER.odd },
            { target: this.pLineMax, value: utils.numberToFaceValue(limits.LINE.maxlimit) },
            { target: this.pLineOdd, value: limits.LINE.odd },
            { target: this.pRowMax, value: utils.numberToFaceValue(limits.ROW.maxlimit) },
            { target: this.pRowOdd, value: limits.ROW.odd },
            { target: this.pDozenMax, value: utils.numberToFaceValue(limits.DOZEN.maxlimit) },
            { target: this.pDozenOdd, value: limits.DOZEN.odd },
            { target: this.pRedBlackMax, value: utils.numberToFaceValue(limits.RED_BLACK.maxlimit) },
            { target: this.pRedBlackOdd, value: limits.RED_BLACK.odd },
            { target: this.pOddEvenMax, value: utils.numberToFaceValue(limits.ODD_EVEN.maxlimit) },
            { target: this.pOddEvenOdd, value: limits.ODD_EVEN.odd },
            { target: this.pBigSmallMax, value: utils.numberToFaceValue(limits.BIG_SMALL.maxlimit) },
            { target: this.pBigSmallOdd, value: limits.BIG_SMALL.odd },
          ];
          for (const { target, value } of list) {
            if (target) {
              if (value) {
                target.text = value.toString();
              } else {
                target.text = '-';
              }
            }
          }
        }
      }
    }
  }
}
