namespace we {
  export namespace ro {
    export class TableInfoPanel extends ui.TableInfoPanel {
      protected contentTwo: eui.Group;

      protected gameIdLabel: eui.Label;
      protected colorLabel: eui.Label;
      protected oddevenLabel: eui.Label;
      protected sizeLabel: eui.Label;
      protected columnbetLabel: eui.Label;
      protected rowbetLabel: eui.Label;

      protected pBetLimit: ui.RunTimeLabel;
      protected pGameID: eui.Label;
      protected pColor: eui.Label;
      protected pOddeven: eui.Label;
      protected pSize: eui.Label;
      protected pColumnbet: eui.Label;
      protected pRowbet: eui.Label;

      protected directNoteLabel: eui.Label;
      protected pDirectNote: eui.Label;
      protected pDirectNoteRatio: eui.Label;

      protected separateLabel: eui.Label;
      protected pSeparate: eui.Label;
      protected pSeparateRatio: eui.Label;

      protected streetLabel: eui.Label;
      protected pStreet: eui.Label;
      protected pStreetRatio: eui.Label;

      protected cornerLabel: eui.Label;
      protected pCorner: eui.Label;
      protected pCornerRatio: eui.Label;

      protected lineBetLabel: eui.Label;
      protected pLineBet: eui.Label;
      protected pLineBetRatio: eui.Label;

      protected rowLabel: eui.Label;
      protected pRow: eui.Label;
      protected pRowRatio: eui.Label;

      protected dozenLabel: eui.Label;
      protected pDozen: eui.Label;
      protected pDozenRatio: eui.Label;

      protected colorTwoLabel: eui.Label;
      protected pColorTwo: eui.Label;
      protected pColorTwoRatio: eui.Label;

      protected oddevenTwoLabel: eui.Label;
      protected pOddevenTwo: eui.Label;
      protected pOddevenTwoRatio: eui.Label;

      protected sizeTwoLabel: eui.Label;
      protected pSizeTwo: eui.Label;
      protected pSizeTwoRatio: eui.Label;

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

      private initX;

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

      public changeLang() {
        super.changeLang();

        this.colorLabel.text = i18n.t('roulette.betGroup.color');
        this.oddevenLabel.text = i18n.t('roulette.betGroup.oddeven');
        this.sizeLabel.text = i18n.t('roulette.betGroup.size');
        this.columnbetLabel.text = i18n.t('roulette.betGroup.column');
        this.rowbetLabel.text = i18n.t('roulette.betGroup.row');
      }

      public setValue(tableInfo: data.TableInfo) {
        super.setValue(tableInfo);

        // const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
        // if (betLimitSet.limits && betLimitSet.limits.ro) {
        //   const limits = betLimitSet.limits.ro;
        //   const list = [
        //     {target: this.pDirectNote, value: limits.DIRECT.maxlimit},
        //     {target: this.pDirectNoteRatio, value: limits.DIRECT.odd},
        //     {target: this.pSeparate, value: limits.SEPARATE.maxlimit},
        //     {target: this.pSeparateRatio, value: limits.SEPARATE.odd},
        //     {target: this.pStreet, value: limits.STREET.maxlimit},
        //     {target: this.pStreetRatio, value: limits.STREET.odd},
        //     {target: this.pCorner, value: limits.CORNER.maxlimit},
        //     {target: this.pCornerRatio, value: limits.CORNER.odd},
        //     {target: this.pLineBet, value: limits.LINE.maxlimit},
        //     {target: this.pLineBetRatio, value: limits.LINE.odd},
        //     {target: this.pRow, value: limits.ROW.maxlimit},
        //     {target: this.pRowRatio, value: limits.ROW.odd},
        //     {target: this.pDozen, value: limits.DOZEN.maxlimit},
        //     {target: this.pDozenRatio, value: limits.DOZEN.odd},
        //     {target: this.pColorTwo, value: limits.RED_BLACK.maxlimit},
        //     {target: this.pColorTwoRatio, value: limits.RED_BLACK.odd},
        //     {target: this.pOddevenTwo, value: limits.ODD_EVEN.maxlimit},
        //     {target: this.pOddevenTwoRatio, value: limits.ODD_EVEN.odd},
        //     {target: this.pSizeTwo, value: limits.BIG_SMALL.maxlimit},
        //     {target: this.pSizeTwoRatio, value: limits.BIG_SMALL.odd},
        //   ];
        //   for (const {target,value} of list) {
        //     target.text = value.toString();
        //   }
        }
      }


      // public setValue(tableInfo: data.TableInfo) {
      //   this.pBanker.text = tableInfo.gamestatistic.bankerCount.toString();
      //   this.pPlayer.text = tableInfo.gamestatistic.playerCount.toString();
      //   this.pTie.text = tableInfo.gamestatistic.tieCount.toString();
      //   this.pBankerPair.text = tableInfo.gamestatistic.bankerPairCount.toString();
      //   this.pPlayerPair.text = tableInfo.gamestatistic.playerPairCount.toString();
      //   if (this.pGameID) {
      //     this.pGameID.text = tableInfo.betInfo.gameroundid.toString();
      //   }
      //   if (this.pGameID) {
      //     this.pGameID.text = data.BetLimit.toString();
      //   }
      // }
    }
  }
}
