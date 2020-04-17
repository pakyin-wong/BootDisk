namespace we {
  export namespace di {
    export class RankedPieChart extends eui.Component {
      protected shape: egret.Shape;
      protected graphic: egret.Graphics;
      protected maxRadius: number;
      protected reduceRadius: number;
      protected emptyRadius: number;
      public colorSettings: any; // items order starts from North, clock-wise, each array of [colors, alpha, color_ratio, angle_offset]
      public firstStarted: boolean; // flag that indicate the first start
      public percentStart: number = 0; // percent that the whole piechart start showing
      public percentTransit: number = 0; // percent that transit to new ranks
      protected targetRanks: number[]; // target ranks to transition to
      protected previousTargetRanks: number[]; // the previous target ranks
      protected _maxChartSize = 130;

      public constructor() {
        super();
        this.firstStarted = false;
        this.shape = new egret.Shape();
        this.graphic = this.shape.graphics;
        this.addChild(this.shape);
        this.setChartStyles([[[0x2552fc, 0x5ad9ff], [1, 1], [0, 255], 0], [[0xe4e85c, 0x1fe479], [1, 1], [0, 255], 0], [[0xfc2424, 0xfa936e], [1, 1], [0, 255], 0]]);
      }

      public set maxChartSize(value: number) {
        this._maxChartSize = value;
      }

      public get maxChartSize() {
        return this._maxChartSize;
      }

      public setChartStyles(colorSettings: any, emptyRadius: number = 20, maxRadius: number = 65, reduceRadius: number = 5) {
        this.colorSettings = colorSettings.slice();
        this.colorSettings.push([[0x000000, 0x000000], [0, 0], [0, 255], 0]); // add a blank color setting at the end
        this.emptyRadius = emptyRadius;
        this.maxRadius = maxRadius;
        this.reduceRadius = reduceRadius;
      }

      public setRanksAndAnimate(ranks: number[], duration: number = 1000) {
        if (this.colorSettings.length - 1 !== ranks.length) {
          logger.e('Error in RankedPieChart: the length of colorSettings doesnt match the length of the ranks');
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
        const funcChange = function (): void {
          const tempRanks = [];
          if (!this.previousTargetRanks) {
            this.previousTargetRanks = this.targetRanks;
          }
          for (let i = 0; i < this.targetRanks.length; i++) {
            tempRanks[i] = (this.targetRanks[i] * (this.percentTransit / 100) + this.previousTargetRanks[i] * ((100 - this.percentTransit) / 100)) * (this.percentStart / 100);
          }
          tempRanks[this.targetRanks.length] = 100 - this.percentStart;
          this.renderRanks(tempRanks, this.colorSettings, this.emptyRadius);
        };
        const funcCompleted = function (): void {
          this.renderRanks(ranks, this.colorSettings, this.emptyRadius);
        };
        egret.Tween.removeTweens(this);
        egret.Tween.get(this, { onChange: funcChange, onChangeObj: this })
          .to({ percentStart: 100, percentTransit: 100 }, duration, egret.Ease.quintIn)
          .call(funcCompleted, this);
      }

      public dispose() {
        egret.Tween.removeTweens(this);
      }

      // total ranks should be <100, ordered from top 0 degree clockwisely
      // settings should be arrays of [colors[], alphas[], ratios[], angle] and will apply to each of the according rank
      protected renderRanks(ranks: number[], rankSettings: any, emptyRadius: number = 20) {
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
        if (rankTotal > 0) {
          let lastAngle: number = -0.5 * Math.PI; // start from top 0 degree
          for (let i = 0; i < ranksCopy.length; i++) {
            const rank = ranksCopy[i];
            const setting = rankSettings[i];
            const matrix = new egret.Matrix();
            // const radius = this.maxRadius - (rankArray.indexOf(rank) * this.reduceRadius); //the pie radius by its rank order
            const radius = emptyRadius + 30 + rank * 0.3; // the pie radius by its rank value
            const startAngle: number = lastAngle;
            const endAngle: number = startAngle + (rank / rankTotal) * 2 * Math.PI;
            const rx = emptyRadius * Math.cos(endAngle);
            const ry = emptyRadius * Math.sin(endAngle);
            const rx2 = radius * Math.cos(startAngle);
            const ry2 = radius * Math.sin(startAngle);
            // const gradientAngle: number = setting[3]* Math.PI / 180;
            // const gradientAngle: number = startAngle + ((endAngle - startAngle) * 0.5) + (Math.PI);//from center arc to center
            const gradientAngle: number = Math.PI * 0.5 + (setting[3] * Math.PI) / 180; // from top(color1) to bottom(color2) + offset angle
            // const gradientAngle: number = startAngle + (Math.PI); //from start angle to center
            // const gradientAngle: number = endAngle + (Math.PI);//from end angle to center
            matrix.createGradientBox(radius * 2, radius * 2, gradientAngle, -radius, -radius);
            this.graphic.beginGradientFill(egret.GradientType.LINEAR, setting[0], setting[1], setting[2], matrix);
            this.graphic.moveTo(rx, ry);
            this.graphic.drawArc(0, 0, emptyRadius, endAngle, startAngle, true);
            this.graphic.lineTo(rx2, ry2);
            this.graphic.drawArc(0, 0, radius, startAngle, endAngle, false);
            this.graphic.lineTo(rx, ry);
            this.graphic.endFill();
            lastAngle = endAngle;
          }
          const bound = this.shape.getBounds();
          if (Math.max(bound.width, bound.height) > 0) {
            this.shape.scaleX = this.shape.scaleY = this._maxChartSize / Math.max(bound.width, bound.height);
          } // limit the max chart size to 130
        }
      }
    }
  }
}
