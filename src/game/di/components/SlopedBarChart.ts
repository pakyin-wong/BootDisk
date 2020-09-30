namespace we {
  export namespace di {
    export class SlopedBarChart extends eui.Component {
      protected shape: egret.Shape;
      protected graphic: egret.Graphics;
      protected startHeight: number;
      protected barWidth: number;
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
        this.setChartStyles([[[0x2552fc, 0x5ad9ff], [1, 1], [0, 255], 0], [[0xe4e85c, 0x1fe479], [1, 1], [0, 255], 0], [[0xfc2424, 0xfa936e], [1, 1], [0, 255], 0]]);
      }

      public setChartStyles(colorSettings: any, startHeight: number = 200, barWidth: number = 100, barGap: number = 5) {
        this.colorSettings = colorSettings.slice();
        this.startHeight = startHeight;
        this.barWidth = barWidth;
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
          const funcChange = function(): void {
            const tempRanks = [];
            if (!this.previousTargetRanks) {
              this.previousTargetRanks = this.targetRanks;
            }
            for (let i = 0; i < this.targetRanks.length; i++) {
              tempRanks[i] = (this.targetRanks[i] * (this.percentTransit / 100) + this.previousTargetRanks[i] * ((100 - this.percentTransit) / 100)) * (this.percentStart / 100);
            }
            this.renderRanks(tempRanks, this.colorSettings);
          };
          const funcCompleted = function(): void {
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
      protected renderRanks(ranks: number[], rankSettings: any) {
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

        if (rankTotal > 0) {
          let lastX: number = 0; // start from x 0
          for (let i = 0; i < ranksCopy.length; i++) {
            const rank = ranksCopy[i];
            let nextRank = -1;
            if (i < ranksCopy.length - 1) {
              nextRank = ranksCopy[i + 1];
            }
            const setting = rankSettings[i];
            const matrix = new egret.Matrix();

            const x1: number = lastX;
            const hLeft: number = this.startHeight * (rank / rankMax) * (this.percentStart / 100);
            const y1: number = this.startHeight - hLeft;
            const x2: number = x1 + this.barWidth;
            const hRight: number = nextRank === -1 ? hLeft : this.startHeight * (nextRank / rankMax) * (this.percentStart / 100);
            const y2: number = this.startHeight - hRight;
            // const gradientAngle: number = setting[3]* Math.PI / 180;
            // const gradientAngle: number = startAngle + ((endAngle - startAngle) * 0.5) + (Math.PI);//from center arc to center
            const gradientAngle: number = Math.PI * 0.5 + (setting[3] * Math.PI) / 180; // from top(color1) to bottom(color2) + offset angle
            // const gradientAngle: number = startAngle + (Math.PI); //from start angle to center
            // const gradientAngle: number = endAngle + (Math.PI);//from end angle to center
            matrix.createGradientBox(this.barWidth, hLeft, gradientAngle, x1, y1);
            this.graphic.moveTo(x1, y1);
            this.graphic.beginGradientFill(egret.GradientType.LINEAR, setting[0], setting[1], setting[2], matrix);
            this.graphic.lineTo(x1, this.startHeight);
            this.graphic.lineTo(x2, this.startHeight);
            this.graphic.lineTo(x2, y2);
            this.graphic.lineTo(x1, y1);
            this.graphic.endFill();
            lastX = x2 + this.barGap;
          }
        }
      }
    }
  }
}
