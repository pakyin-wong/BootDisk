// // TypeScript file
// namespace we {
//   export namespace di {
//     export class TableInfoPanel extends ui.TableInfoPanel {
//       protected contentTwo: eui.Group;

//       protected gameIdLabel: eui.Label;

//       protected betLimitLabel: eui.Label;

//       protected oddevenLabel: eui.Label;
//       protected sizeLabel: eui.Label;
//       protected tripleLabel: eui.Label;
//       protected allTripleLabel: eui.Label;
//       protected doubleLabel: eui.Label;

//       public pBetLimit: ui.RunTimeLabel;
//       protected pGameID: eui.Label;
//       protected pOddEven: eui.Label;
//       protected pSize: eui.Label;
//       protected pTriple: eui.Label;
//       protected pAllTriple: eui.Label;
//       protected pDouble: eui.Label;

//       protected fourSeventeenLabel: eui.Label;
//       protected pFourSeventeen: eui.Label;

//       protected fiveSixteenLabel: eui.Label;
//       protected pFiveSixteen: eui.Label;

//       protected sixFifthteenLabel: eui.Label;
//       protected pSixFifthTeen: eui.Label;

//       protected sevenFourteenLabel: eui.Label;
//       protected pSevenFourTeen: eui.Label;

//       protected eightThirdteenLabel: eui.Label;
//       protected pEightThirdteen: eui.Label;

//       protected nineTenLabel: eui.Label;
//       protected pNineTen: eui.Label;

//       protected paiGowLabel: eui.Label;
//       protected pPaiGow: eui.Label;

//       protected specificSingleLabel: eui.Label;
//       protected pSpecificSingle: eui.Label;

//       protected specificDoubleLabel: eui.Label;
//       protected pSpecificDouble: eui.Label;

//       protected specificTripleLabel: eui.Label;
//       protected pSpecificTriple: eui.Label;

//       private slides = [];
//       private duration = 1.0;
//       private currentIndex = 0;
//       private direction: string;
//       private isDown = false;
//       private isMoved = false;
//       private isAnimating = false;
//       private autoPlayTimer: number;

//       private _bulletOne: eui.Image;
//       private _bulletTwo: eui.Image;
//       private initX;

//       public constructor() {
//         super();
//       }

//       protected childrenCreated(): void {
//         super.childrenCreated();

//         this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
//         // this.contentTwo.alpha = 0;
//         this.configSlides();
//       }

//       public configSlides() {
//         this.slides = [this.content, this.contentTwo];
//         logger.l(utils.LoggerTarget.DEBUG, this.width, this.height, this.slides);

//         if (!this.slides.length) {
//           return;
//         }

//         const slide = this.slides[this.currentIndex];
//       }

//       private onTouchBegin(event: egret.TouchEvent): void {
//         if (env.orientation === 'landscape') {
//           return;
//         }

//         if (!this.touchEnabled) {
//           return;
//         }
//         if (this.isAnimating) {
//           clearTimeout(this.autoPlayTimer);
//           return;
//         }
//         this.isDown = true;
//         this.initX = event.$stageX;
//         this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
//         this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
//       }

//       private onTouchMove(event: egret.TouchEvent): void {
//         if (env.orientation === 'landscape') {
//           return;
//         }

//         this.isMoved = true;

//         if (!this.slides.length) {
//           return;
//         }

//         this.content.x = event.$stageX - this.initX;
//         if (this.content.x > 0) {
//           // invisible one to left (prev)
//           this.contentTwo.x = this.content.x - 2484;
//           this.direction = 'prev';
//         } else {
//           // invisble one to right (next)
//           this.contentTwo.x = this.content.x + 2484;
//           this.direction = 'next';
//         }
//         const index = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;
//         this.contentTwo.alpha = 1;
//       }

//       private onTouchEnd(event: egret.TouchEvent): void {
//         if (env.orientation === 'landscape') {
//           return;
//         }
//         clearTimeout(this.autoPlayTimer);
//         this.isDown = false;
//         this.isMoved = false;
//         this.isAnimating = true;
//         this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
//         this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

//         const diff = event.$stageX - this.initX;

//         if (Math.abs(diff) / 2484 <= 0.25) {
//           // not reach threshold, don't slide
//           TweenLite.to(this.content, this.duration, {
//             x: 0,
//           });
//           TweenLite.to(this.contentTwo, this.duration, {
//             x: this.direction === 'next' ? 2484 : -2484,
//           });

//           setTimeout(() => {
//             this.contentTwo.alpha = 0;
//             this.isAnimating = false;
//           }, this.duration * 1000 + 50);
//           return;
//         }

//         // Before Animate
//         this.currentIndex = (this.slides.length + (this.currentIndex + (this.direction === 'prev' ? -1 : 1))) % this.slides.length;

//         TweenLite.to(this.contentTwo, this.duration, {
//           x: 0,
//         });
//         TweenLite.to(this.content, this.duration, {
//           x: this.direction === 'next' ? -2484 : 2484,
//         });

//         setTimeout(() => {
//           this.isAnimating = false;
//         }, this.duration * 1000 + 50);
//       }

//       public setValue(tableInfo: data.TableInfo) {
//         super.setValue(tableInfo);

//         const betLimitSet = env.betLimits[env.currentSelectedBetLimitIndex];
//         if (betLimitSet.limits && betLimitSet.limits.di) {
//           const limits = betLimitSet.limits.di;
//           const list = [
//             { target: this.pOddEven, value: limits.ODD_EVEN.maxlimit },
//             { target: this.pSize, value: limits.BIG_SMALL.maxlimit },
//             { target: this.pTriple, value: limits.TRIPLE.maxlimit },
//             { target: this.pAllTriple, value: limits.TRIPLE_ALL.maxlimit },
//             { target: this.pDouble, value: limits.DOUBLE.maxlimit },
//             { target: this.pFourSeventeen, value: limits.SUM_4_17.maxlimit },
//             { target: this.pFiveSixteen, value: limits.SUM_5_16.maxlimit },
//             { target: this.pSixFifthTeen, value: limits.SUM_6_15.maxlimit },
//             { target: this.pSevenFourTeen, value: limits.SUM_7_14.maxlimit },
//             { target: this.pNineTen, value: limits.SUM_9_10_11_12.maxlimit },
//             { target: this.pPaiGow, value: limits.COMBINE.maxlimit },
//             { target: this.pSpecificSingle, value: limits.SPECIFIC_1.maxlimit },
//             { target: this.pSpecificDouble, value: limits.SPECIFIC_2.maxlimit },
//             { target: this.pSpecificTriple, value: limits.SPECIFIC_3.maxlimit },
//           ];
//           for (const { target, value } of list) {
//             target.text = value.toString();
//           }
//         }
//       }
//     }
//   }
// }
