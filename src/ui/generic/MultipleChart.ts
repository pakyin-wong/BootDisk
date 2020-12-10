namespace we {
  export namespace ui {
    export class MultipleChart extends ui.SimpleChart {
      protected _lineWidth = 15;
      protected _radius = 100;
      protected _firstAngle = 120; // red
      protected _secondAngle = 120; // blue
      protected _firstColor = 0xff6651;
      protected _secondColor = 0x3c38ff;
      protected _thirdColor = 0xe362ff;
      protected _fourthColor = 0x606060;

      protected _thirdAngle = this._secondAngle;
      protected _startingAngle = 90;

    //   public set lineWidth(value: number) {
    //     this._lineWidth = value;
    //   }

    //   public set radius(value: number) {
    //     this._radius = value;
    //   }

      public set firstAngle(value: number) {
        this._firstAngle = value;
      }

      public set secondAngle(value: number) {
        this._secondAngle = value;
      }

      public set thirdAngle(value: number) {
        this._thirdAngle = value;
      }

    //   public set firstColor(value: number) {
    //     this._firstColor = value;
    //   }

    //   public set secondColor(value: number) {
    //     this._secondColor = value;
    //   }

      public set fourthColor(value: number) {
        this._fourthColor = value;
      }

      protected mount() {
        this.drawPairChart();
      }

    //   public drawChart(shapeGrey?: boolean) {
    //     this.removeChildren();

    //     const shapeRed: egret.Shape = new egret.Shape();
    //     shapeRed.graphics.lineStyle(this._lineWidth, this._firstColor);
    //     shapeRed.graphics.drawArc(this._radius, this._radius, this._radius, -this._firstAngle * (Math.PI / 180) - Math.PI / 2, -Math.PI / 2, false);
    //     shapeRed.graphics.endFill();
    //     this.addChild(shapeRed);

    //     const shapeBlue: egret.Shape = new egret.Shape();
    //     shapeBlue.graphics.lineStyle(this._lineWidth, this._secondColor);
    //     shapeBlue.graphics.drawArc(this._radius, this._radius, this._radius, -Math.PI / 2, this._secondAngle * (Math.PI / 180) - Math.PI / 2, false);
    //     shapeBlue.graphics.endFill();
    //     this.addChild(shapeBlue);

    //     const shapeGreen: egret.Shape = new egret.Shape();
    //     if (shapeGrey) {
    //       shapeGreen.graphics.lineStyle(this._lineWidth, 0x606060);
    //     } else {
    //       shapeGreen.graphics.lineStyle(this._lineWidth, this._thirdColor);
    //     }
    //     shapeGreen.graphics.drawArc(this._radius, this._radius, this._radius, this._secondAngle * (Math.PI / 180) - Math.PI / 2, -this._firstAngle * (Math.PI / 180) - Math.PI / 2, false);
    //     shapeGreen.graphics.endFill();
    //     this.addChild(shapeGreen);
    //   }

      public drawPairChart(shapeGrey?: boolean) {
        this.removeChildren();

        const shapeRed: egret.Shape = new egret.Shape();
        shapeRed.graphics.lineStyle(this._lineWidth, this._firstColor);
        shapeRed.graphics.drawArc(this._radius, this._radius, this._radius, -this._firstAngle * (Math.PI / 180) - Math.PI / 2, -Math.PI / 2, false);
        shapeRed.graphics.endFill();


        const shapeBlue: egret.Shape = new egret.Shape();
        shapeBlue.graphics.lineStyle(this._lineWidth, this._secondColor);
        shapeBlue.graphics.drawArc(this._radius, this._radius, this._radius, -Math.PI / 2, this._secondAngle * (Math.PI / 180) - Math.PI / 2, false);
        shapeBlue.graphics.endFill();

        const shapePurple:  egret.Shape = new egret.Shape();
        shapePurple.graphics.lineStyle(this._lineWidth, this._thirdColor);
        // shapePurple.graphics.drawArc(this._radius, this._radius, this._radius, this._secondAngle * (Math.PI / 180) - Math.PI / 2 + this._thirdAngle * (Math.PI / 180), this._secondAngle * (Math.PI / 180) - Math.PI / 2, false);
        shapePurple.graphics.drawArc(this._radius, this._radius, this._radius,this._secondAngle * (Math.PI / 180) - Math.PI / 2, (this._secondAngle * (Math.PI / 180) - Math.PI / 2) + this._thirdAngle * (Math.PI / 180) , false);
        shapePurple.graphics.endFill();
        this.addChild(shapePurple);

        const shapeGreen: egret.Shape = new egret.Shape();
        // if (shapeGrey) {
          shapeGreen.graphics.lineStyle(this._lineWidth, this._fourthColor);
        // } else {
        //   shapeGreen.graphics.lineStyle(this._lineWidth, this._thirdColor);
        // }
        if ( this._firstAngle === 0 && this._secondAngle === 0 && this._thirdAngle === 0){
          shapeGreen.graphics.drawArc(this._radius, this._radius, this._radius,0, 2 * Math.PI  , true);
        } else {
          shapeGreen.graphics.drawArc(this._radius, this._radius, this._radius, (this._secondAngle * (Math.PI / 180) - Math.PI / 2) + this._thirdAngle * (Math.PI / 180) ,  -this._firstAngle * (Math.PI / 180) - Math.PI / 2, false);
        }
        shapeGreen.graphics.endFill();
        this.addChild(shapeGreen);
        this.addChild(shapeRed);
        this.addChild(shapeBlue);
        this.addChild(shapePurple);
      }
    }
  }
}
