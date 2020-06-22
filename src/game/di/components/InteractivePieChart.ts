namespace we {
  export namespace di {
    export class InteractivePieChart extends RankedPieChart {
      protected theStage: egret.Stage;
      protected isOver: boolean;
      protected overAngle: number;
      protected overRankIndex: number;
      public constructor() {
        super();
        this.setChartStyles(
          [
            /*
            [[0xff5c00, 0xff9000], [1, 1], [0, 255], 0],
            [[0xee4343, 0xe033e7], [1, 1], [0, 255], 0],
            [[0x5a003e, 0xca0d59], [1, 1], [0, 255], 0],
            [[0xc68707, 0xeef700], [1, 1], [0, 255], 0],
            [[0x2ea853, 0x7cffa0], [1, 1], [0, 255], 0],
            [[0x3b7ad6, 0x37fbf1], [1, 1], [0, 255], 0],
            [[0x115bb7, 0x27abdd], [1, 1], [0, 255], 0],
            [[0x05076a, 0x0a4481], [1, 1], [0, 255], 0],
            [[0x2e219e, 0x5832e5], [1, 1], [0, 255], 0],
            [[0x812391, 0x8633e7], [1, 1], [0, 255], 0],*/

            [[0xff5c00, 0xff9000, 0xff5c00], [1, 1, 1], [0, 128, 255], 0],
            [[0xee4343, 0xe033e7, 0xee4343], [1, 1, 1], [0, 128, 255], 0],
            [[0x5a003e, 0xca0d59, 0x5a003e], [1, 1, 1], [0, 128, 255], 0],
            [[0xc68707, 0xeef700, 0xc68707], [1, 1, 1], [0, 128, 255], 0],
            [[0x2ea853, 0x7cffa0, 0x2ea853], [1, 1, 1], [0, 128, 255], 0],
            [[0x3b7ad6, 0x37fbf1, 0x3b7ad6], [1, 1, 1], [0, 128, 255], 0],
            [[0x115bb7, 0x27abdd, 0x115bb7], [1, 1, 1], [0, 128, 255], 0],
            [[0x05076a, 0x0a4481, 0x05076a], [1, 1, 1], [0, 128, 255], 0],
            [[0x2e219e, 0x5832e5, 0x2e219e], [1, 1, 1], [0, 128, 255], 0],
            [[0x812391, 0x8633e7, 0x812391], [1, 1, 1], [0, 128, 255], 0],
          ],
          60,
          120,
          0
        );

        if (!env.isMobile) {
          this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onOver, this);
          this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onOut, this);
        }
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
          let lastAngle: number = 1.5 * Math.PI; // start from top 0 degree
          for (let i = 0; i < ranks.length; i++) {
            const rank = ranks[i];
            const setting = rankSettings[i];
            const matrix = new egret.Matrix();
            // const radius = this.maxRadius - (rankArray.indexOf(rank) * this.reduceRadius); //the pie radius by its rank order
            const radius = this.maxRadius; // the pie radius by its rank value
            const startAngle: number = lastAngle % (2 * Math.PI);
            const endAngle: number = startAngle + (rank / rankTotal) * 2 * Math.PI;
            const rx = emptyRadius * Math.cos(endAngle);
            const ry = emptyRadius * Math.sin(endAngle);
            const rx2 = radius * Math.cos(startAngle);
            const ry2 = radius * Math.sin(startAngle);
            // const gradientAngle: number = setting[3]* Math.PI / 180;
            const gradientAngle: number = startAngle + (endAngle - startAngle) * 0.5 + Math.PI; // from center arc to center
            // const gradientAngle: number = Math.PI * 0.5 + (setting[3] * Math.PI) / 180; // from top(color1) to bottom(color2) + offset angle
            // const gradientAngle: number = startAngle + (Math.PI); //from start angle to center
            // const gradientAngle: number = endAngle + (Math.PI);//from end angle to center
            matrix.createGradientBox(radius * 2, radius * 2, gradientAngle, -radius, -radius);

            const alphas = [];
            if (this.isOver && !this.isBetween(startAngle, endAngle, this.overAngle)) {
              setting[1].forEach(element => {
                alphas.push(0.5);
              });
            } else {
              setting[1].forEach(element => {
                alphas.push(1);
              });
            }

            if (this.isOver && this.isBetween(startAngle, endAngle, this.overAngle)) {
              this.overRankIndex = i;
            }
            this.graphic.lineStyle(1, 0x000000);
            this.graphic.beginGradientFill(egret.GradientType.LINEAR, setting[0], alphas, setting[2], matrix);
            this.graphic.moveTo(rx, ry);
            this.graphic.drawArc(0, 0, emptyRadius, endAngle, startAngle, true);
            this.graphic.lineTo(rx2, ry2);
            this.graphic.drawArc(0, 0, radius, startAngle, endAngle, false);
            this.graphic.lineTo(rx, ry);
            this.graphic.endFill();
            lastAngle = endAngle;
          }
        }
      }

      private isBetween(start, end, mid): boolean {
        end = end - start < 0 ? end - start + Math.PI * 2 : end - start;
        mid = mid - start < 0 ? mid - start + Math.PI * 2 : mid - start;
        return mid < end;
      }

      private onOver(event: mouse.MouseEvent) {
        this.theStage = this.stage;
        mouse.setMouseMoveEnabled(true);
        this.stage.addEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
      }

      private onMove(event: egret.TouchEvent) {
        let pt: egret.Point = new egret.Point(0, 0);
        this.globalToLocal(event.stageX, event.stageY, pt);
        pt = pt;

        let angle = Math.atan2(pt.y, pt.x);
        if (angle < 0) {
          angle = Math.PI * 2 + angle;
        }
        const dis = pt.x * pt.x + pt.y * pt.y;
        if (dis < this.maxRadius * this.maxRadius && dis > this.emptyRadius * this.emptyRadius) {
          this.isOver = true;
          this.overAngle = angle;
          this.renderRanks(this.targetRanks, this.colorSettings, this.emptyRadius);
          // dispatch the angle rolled over by the user
          this.dispatchEvent(new egret.Event('RollOverResult', false, false, { angle, mouseX: event.stageX, mouseY: event.stageY, selectedIndex: this.overRankIndex }));
        } else {
          // dispatch rolled out result
          this.isOver = false;
          this.renderRanks(this.targetRanks, this.colorSettings, this.emptyRadius);
          this.overRankIndex = -1;
          this.dispatchEvent(new egret.Event('RollOutResult'));
        }
      }

      private onOut(event: mouse.MouseEvent) {
        this.isOver = false;
        this.overRankIndex = -1;
        if (this.stage.hasEventListener(mouse.MouseEvent.MOUSE_MOVE)) {
          mouse.setMouseMoveEnabled(false);
          this.stage.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
        }
        // dispatch rolled out result
        this.dispatchEvent(new egret.Event('RollOutResult'));

        this.renderRanks(this.targetRanks, this.colorSettings, this.emptyRadius);
      }

      public dispose() {
        super.dispose();
        this.isOver = false;
        this.overRankIndex = -1;
        if (this.hasEventListener(mouse.MouseEvent.ROLL_OVER)) {
          this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onOver, this);
        }
        if (this.hasEventListener(mouse.MouseEvent.ROLL_OUT)) {
          this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onOut, this);
        }
        if (this.theStage) {
          if (this.stage.hasEventListener(mouse.MouseEvent.MOUSE_MOVE)) {
            this.stage.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.onMove, this);
          }
        }
        mouse.setMouseMoveEnabled(false);
      }
    }
  }
}
