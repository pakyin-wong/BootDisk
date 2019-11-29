namespace we {
  export namespace ui {
    export class CircularTimer extends we.core.BaseEUI {
      private size: number;
      private shape: egret.Shape;
      private label: eui.Label;
      private thickness: number = 4;
      private progress = 1;

      public constructor() {
        super();
        this.shape = new egret.Shape();
        this.label = new eui.Label();
        this.label.fontFamily = 'Barlow, Arial, Helvetica, sans-serif';
        this.label.textAlign = egret.HorizontalAlign.CENTER;
        this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.label.textColor = 0xffffff;
        this.label.percentWidth = 100;
        this.label.percentHeight = 100;
        this.addChild(this.shape);
        this.addChild(this.label);
      }

      protected mount() {
        this.size = this.width;
        this.label.size = this.size * 0.55;
        this.shape.width = this.shape.height = this.size;

        // start tick
        const totalDuration = 60 - Math.floor(10 + Math.random() * 20);
        const endTime = Date.now() + totalDuration * 1000;
        const ticker = () => {
          const now = Date.now();
          this.progress = (endTime - now) / 1000 / totalDuration;
          const duration = Math.floor(totalDuration * this.progress);
          this.label.text = duration.toString();
          this.changeGraphics(this.progress);
          if (this.progress <= 0) {
            this.label.text = '0';
            this.changeGraphics(1);
            egret.stopTick(ticker, this);
          }
          return false;
        };
        egret.startTick(ticker, this);
      }

      private hslToRgb(h, s, l) {
        let r;
        let g;
        let b;

        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) {
              t += 1;
            }
            if (t > 1) {
              t -= 1;
            }
            if (t < 1 / 6) {
              return p + (q - p) * 6 * t;
            }
            if (t < 1 / 2) {
              return q;
            }
            if (t < 2 / 3) {
              return p + (q - p) * (2 / 3 - t) * 6;
            }
            return p;
          };

          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        return (r << 16) + (g << 8) + b;
      }

      private changeGraphics(progress) {
        this.shape.graphics.clear();
        const radius = this.size / 2;
        const angle = (1 - progress) * 360;
        const color = this.hslToRgb(progress * 0.25, 1, 0.6);
        this.shape.graphics.beginFill(0x000000, 0.5);
        this.shape.graphics.drawCircle(radius, radius, radius);
        this.shape.graphics.endFill();
        this.shape.graphics.lineStyle(this.thickness, 0x555555, 1);
        this.shape.graphics.drawArc(radius, radius, radius, 0, (360 * Math.PI) / 180, true);
        this.shape.graphics.endFill();
        this.shape.graphics.lineStyle(this.thickness, color, 1);
        const startAngle = (0 / 360) * Math.PI * 2 - Math.PI / 2;
        const endAngle = (angle / 360) * Math.PI * 2 - Math.PI / 2;
        // this.shape.graphics.drawArc(radius, radius, radius, -90 / 360, (-90 * 360 * (angle * Math.PI)) / 180 - 90, true);
        this.shape.graphics.drawArc(radius, radius, radius, startAngle, endAngle, true);
        this.shape.graphics.endFill();
      }
    }
  }
}
