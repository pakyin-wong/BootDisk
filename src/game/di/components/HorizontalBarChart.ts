namespace we {
  export namespace di {
    export class HorizontalBarChart extends eui.Component {
      protected shape: egret.Shape;
      protected graphic: egret.Graphics;
      protected maxLength: number;
      protected barHeight: number;
      protected barGap: number;

      public colorSettings: any; // items order starts from North, clock-wise, each array of [colors, alpha, color_ratio, angle_offset]
      public firstStarted: boolean; // flag that indicate the first start
      public percentStart: number = 0; // percent that the whole piechart start showing
      public percentTransit: number = 0; // percent that transit to new ranks
      protected targetRanks: number[]; // target ranks to transition to
      protected previousTargetRanks: number[]; // the previous target ranks

      public constructor() {
        super();
        this.firstStarted = false;
        this.shape = new egret.Shape();
        this.graphic = this.shape.graphics;
        this.addChild(this.shape);
        this.setChartStyles([
          [[0x2ea853, 0x7cffa0], [1, 1], [0, 255], 0],
          [[0x1aa796, 0x6effd0], [1, 1], [0, 255], 0],
          [[0x3583af, 0x67e8ff], [1, 1], [0, 255], 0],
          [[0x0065dc, 0x008bef], [1, 1], [0, 255], 0],
          [[0x05076a, 0x0a4481], [1, 1], [0, 255], 0],
          [[0x2e219e, 0x5832e5], [1, 1], [0, 255], 0],
        ]);
      }

      public setChartStyles(colorSettings: any, maxLength: number = 382, barHeight: number = 16, barGap: number = 26) {
        this.colorSettings = colorSettings.slice();
        this.maxLength = maxLength;
        this.barHeight = barHeight;
        this.barGap = barGap;
      }

      public setRanksAndAnimate(ranks: number[], duration: number = 1000) {
        if (this.colorSettings.length < ranks.length) {
          logger.e(utils.LogTarget.DEBUG, 'Error in SlopedBarChart: the length of colorSettings doesnt match the length of the ranks');
          return;
        }
        if (!this.firstStarted) {
          // only show start animation for once
          this.firstStarted = true;
          this.percentStart = 0;
          this.percentTransit = 100;
        } else {
          // animate to new ranks only if the ranks are changed
          if (this.targetRanks.join(',') === ranks.join(',')) {
            return;
          }
          this.percentTransit = 0;
        }
        this.previousTargetRanks = this.targetRanks; // store the last targetRanks to current ranks
        this.targetRanks = ranks; // set targetRanks to new ranksCopy
        if (duration >= 0) {
          const funcChange = function (): void {
            const tempRanks = [];
            if (!this.previousTargetRanks) {
              this.previousTargetRanks = this.targetRanks;
            }
            for (let i = 0; i < this.targetRanks.length; i++) {
              tempRanks[i] = (this.targetRanks[i] * (this.percentTransit / 100) + this.previousTargetRanks[i] * ((100 - this.percentTransit) / 100)) * (this.percentStart / 100);
            }
            this.renderRanks(tempRanks, this.colorSettings);
          };
          const funcCompleted = function (): void {
            this.renderRanks(ranks, this.colorSettings);
          };
          egret.Tween.removeTweens(this);
          egret.Tween.get(this, { onChange: funcChange, onChangeObj: this })
            .to({ percentStart: 100, percentTransit: 100 }, duration, egret.Ease.quintIn)
            .call(funcCompleted, this);
        } else {
          this.percentStart = 100;
          this.percentTransit = 100;
          this.renderRanks(ranks, this.colorSettings);
        }
      }

      public dispose() {
        egret.Tween.removeTweens(this);
      }

      // total ranks should be <100, ordered from top 0 degree clockwisely
      // settings should be arrays of [colors[], alphas[], ratios[], angle] and will apply to each of the according rank
      protected renderRanks(ranks: number[], rankSettings: any) { // setting[4] 0:dont render 1/undefine:render
        this.graphic.clear();
        const ranksCopy = ranks.slice();
        const ranksSort = ranksCopy.slice().sort((n1, n2) => n2 - n1);
        const rankArray = [];
        let lastRank = -1;
        let rankTotal = 0;
        for (const rank of ranksSort) {
          rankTotal += rank;
          if (rank !== lastRank) {
            rankArray.push(rank);
            lastRank = rank;
          }
        }
        const rankMax = ranksSort[0];

        if (rankTotal >= 0) {
          let lastY: number = 0; // start from x 0
          for (let i = 0; i < ranksCopy.length; i++) {
            const rank = ranksCopy[i];
            let nextRank = -1;
            if (i < ranksCopy.length - 1) {
              nextRank = ranksCopy[i + 1];
            }
            const setting = rankSettings[i];
            if (setting[4] === 0) {
              continue
            } 
            const matrix = new egret.Matrix();

            // the max bar length
            const barLengthMax: number = this.maxLength - this.barHeight * 0.5;
            const barLength = ((this.percentStart / 100) * (barLengthMax * rank)) / rankMax + this.barHeight * 0.5;

            // draw bg
            this.graphic.beginFill(0x000000, 0.3);
            RoundRect.drawRoundRect(this.graphic, 0, lastY, this.maxLength, this.barHeight, { tl: 0, tr: this.barHeight * 0.5, br: this.barHeight * 0.5, bl: 0 });
            this.graphic.endFill();
            if(rank>0) {
              // draw bar
              const gradientAngle: number = (setting[3] * Math.PI) / 180;
              matrix.createGradientBox(barLength, this.barHeight, gradientAngle, 0, lastY);
              this.graphic.beginGradientFill(egret.GradientType.LINEAR, setting[0], setting[1], setting[2], matrix);
              RoundRect.drawRoundRect(this.graphic, 0, lastY, barLength, this.barHeight, { tl: 0, tr: this.barHeight * 0.5, br: this.barHeight * 0.5, bl: 0 });
              this.graphic.endFill();
            }

            lastY = lastY + this.barHeight + this.barGap;
          }
        }
      }
    }
  }
}
