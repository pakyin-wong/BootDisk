namespace we {
  export namespace ui {
    export class RoundRectShape extends core.BaseEUI {
      private _shape: egret.Shape;
      private _gr: egret.Graphics;

      public cornerTL_TR_BL_BR: string = ''; // eg. "8,8,0,0" for TL:8, TR:8, BL:0, BR:0
      public cornerTL: number = 8;
      public cornerTR: number = 8;
      public cornerBL: number = 8;
      public cornerBR: number = 8;
      public fillColor: string = '0xff0000'; // support graident by a string: "0xff0000,0x00ff0080,90" will create a gradient from red to green with 80% alpha at angle 90 (from right to left)
      public fillAlpha: number = 1;
      public stroke: number = 1;
      public strokeColor: number = 0x00ff00;
      public strokeAlpha: number = 1;
      public strokeIn: number = 1;
      public strokeInColor: number = 0x0000ff;
      public strokeInAlpha: number = 1;

      protected mount() {
        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this._gr = this._shape.graphics;

        this.refresh();
      }

      public setRoundRectStyle(
        width: number,
        height: number,
        cornerRadius: any,
        fillColor: any = 0xff0000,
        fillAlpha: number = 1,
        stroke: number = 1,
        strokeColor: number = 0x00ff00,
        strokeAlpha: number = 1,
        strokeIn: number = 0,
        strokeInColor: number = 0x0000ff,
        strokeInAlpha: number = 1
      ) {
        this._gr.clear();
        if (fillAlpha >= 0) {
          fillColor = fillColor.toString();
          if (fillColor.indexOf(',') > 0) {
            const parms = fillColor
              .split(' ')
              .join('')
              .split(',');

            if (parms.length === 2) {
              GradientFill.beginGradientFill(this._gr, width, height, [parms[0], parms[1]]);
            } else if (parms.length === 3) {
              GradientFill.beginGradientFill(this._gr, width, height, [parms[0], parms[1]], parseInt(parms[2], 10));
            }
          } else {
            this._gr.beginFill(parseInt(fillColor, 16), fillAlpha);
          }
        }
        if (stroke > 0) {
          this._gr.lineStyle(stroke, strokeColor, strokeAlpha);
        }

        RoundRect.drawRoundRect(this._gr, 0, 0, width, height, cornerRadius);
        if (fillAlpha >= 0) {
          this._gr.endFill();
        }

        // stroke Inside
        if (strokeIn > 0) {
          this._gr.lineStyle(strokeIn, strokeInColor, strokeInAlpha);
          const strokeSum = strokeIn + stroke;
          /*
          const cRadius = {
            tl: cornerRadius.tl > 0 ? cornerRadius.tl - strokeSum * 0.5 : 0,
            tr: cornerRadius.tr > 0 ? cornerRadius.tr - strokeSum * 0.5 : 0,
            bl: cornerRadius.bl > 0 ? cornerRadius.bl - strokeSum * 0.5 : 0,
            br: cornerRadius.br > 0 ? cornerRadius.br - strokeSum * 0.5 : 0,
          };
          RoundRect.drawRoundRect(this._gr, strokeSum * 0.5, strokeSum * 0.5, width - strokeSum, height - strokeSum, cRadius);
          */

          const cRadius = {
            tl: cornerRadius.tl > 0 ? cornerRadius.tl - strokeIn * 0.5 : 0,
            tr: cornerRadius.tr > 0 ? cornerRadius.tr - strokeIn * 0.5 : 0,
            bl: cornerRadius.bl > 0 ? cornerRadius.bl - strokeIn * 0.5 : 0,
            br: cornerRadius.br > 0 ? cornerRadius.br - strokeIn * 0.5 : 0,
          };
          RoundRect.drawRoundRect(this._gr, strokeIn * 0.5, strokeIn * 0.5, width - strokeIn, height - strokeIn, cRadius);
          // RoundRect.drawRoundRect(this._gr, strokeIn * 0.5, strokeIn * 0.5, width - strokeSum, height - strokeIn, cRadius);
        }
      }

      public refresh() {
        if (this.cornerTL_TR_BL_BR !== '') {
          const corners = this.cornerTL_TR_BL_BR
            .split(' ')
            .join('')
            .split(',');
          this.cornerTL = parseInt(corners[0], 10);
          this.cornerTR = parseInt(corners[1], 10);
          this.cornerBL = parseInt(corners[2], 10);
          this.cornerBR = parseInt(corners[3], 10);
        }

        this.setRoundRectStyle(
          this.width,
          this.height,
          { tl: this.cornerTL, tr: this.cornerTR, bl: this.cornerBL, br: this.cornerBR },
          this.fillColor,
          this.fillAlpha,
          this.stroke,
          this.strokeColor,
          this.strokeAlpha,
          this.strokeIn,
          this.strokeInColor,
          this.strokeInAlpha
        );
      }
    }
  }
}
