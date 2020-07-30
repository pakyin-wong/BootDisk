namespace we {
  export namespace di {
    export class MaskedHorizontalBarChart extends HorizontalBarChart {
      protected barRadius: number;
      protected maskColor: number;
      protected bgColor: number;
      public constructor() {
        super();
      }

      public setChartStyles(colorSettings: any, maxLength: number = 382, barHeight: number = 16, barGap: number = 26, barRadius: number = 8, bgColor: number = 0xaaaaaa, maskColor: number = 0x000000) {
        super.setChartStyles(colorSettings, maxLength, barHeight, barGap);
        this.barRadius = barRadius;
        this.bgColor = bgColor;
        this.maskColor = maskColor;
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

        if (rankTotal > 0) {
          let lastY: number = 0; // start from x 0
          for (let i = 0; i < ranksCopy.length; i++) {
            const rank = ranksCopy[i];
            let nextRank = -1;
            if (i < ranksCopy.length - 1) {
              nextRank = ranksCopy[i + 1];
            }
            const setting = rankSettings[i];
            const matrix = new egret.Matrix();

            // the max bar length
            const barLength = (this.percentStart / 100) * (this.maxLength * rank) + this.barRadius;

            // draw bg
            this.graphic.beginFill(this.bgColor);
            RoundRect.drawRoundRect(this.graphic, 0, lastY, this.maxLength, this.barHeight, { tl: 0, tr: this.barRadius, br: this.barRadius, bl: 0 });
            this.graphic.endFill();

            // draw bar
            if (barLength > this.barRadius) {
              const gradientAngle: number = (setting[3] * Math.PI) / 180;
              matrix.createGradientBox(barLength, this.barHeight, gradientAngle, 0, lastY);
              this.graphic.beginGradientFill(egret.GradientType.LINEAR, setting[0], setting[1], setting[2], matrix);
              RoundRect.drawRoundRect(this.graphic, -this.barRadius, lastY, barLength, this.barHeight, { tl: 0, tr: this.barRadius, br: this.barRadius, bl: 0 });
              this.graphic.endFill();
            }

            // draw mask

            this.graphic.beginFill(this.maskColor);
            this.graphic.moveTo(this.barRadius, lastY);

            // draw the top-right corner
            let startAngle = Math.PI; // start from west
            let endAngle = startAngle + 0.5 * Math.PI;
            this.graphic.drawArc(this.barRadius, lastY - 1 + this.barRadius, this.barRadius, startAngle, endAngle);
            this.graphic.lineTo(this.barRadius, lastY - 1);

            // draw the top/left/bottom sides
            this.graphic.lineTo(-this.barRadius - 1, lastY - 1);
            this.graphic.lineTo(-this.barRadius - 1, lastY - 1 + this.barHeight + 2);
            this.graphic.lineTo(this.barRadius, lastY - 1 + this.barHeight + 2);

            // draw the bottom-right corner
            startAngle = 0.5 * Math.PI;
            endAngle = startAngle + 0.5 * Math.PI;
            this.graphic.drawArc(this.barRadius, lastY - 1 + this.barHeight + 2 - this.barRadius, this.barRadius, startAngle, endAngle);

            // draw the right side
            if (this.barRadius * 2 < this.barHeight) {
              this.graphic.lineTo(0, lastY - 1 + this.barRadius);
            }

            lastY = lastY + this.barHeight + this.barGap;
          }
        }
      }
    }
  }
}
