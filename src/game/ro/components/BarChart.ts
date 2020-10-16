namespace we {
  export namespace ro {
    export class BarChart extends core.BaseEUI {
      protected _moveGroup: eui.Group;
      protected _staticGroup: eui.Group;
      protected _totalWidth: number;
      protected _a: number;
      protected _b: number;
      protected _c: number;
      protected _x: number;
      protected _y: number;
      protected _height: number;
      protected _barRightColor: number[];
      protected _barMidColor: number[];
      protected _barLeftColor: number[];
      protected _totalLeftCount: eui.Label;
      protected _totalMidCount: eui.Label;
      protected _totalRightCount: eui.Label;

      protected _zeroLabel: ui.RunTimeLabel;
      protected _evenLabel: ui.RunTimeLabel;
      protected _oddLabel: ui.RunTimeLabel;
      protected _bigLabel: ui.RunTimeLabel;
      protected _smallLabel: ui.RunTimeLabel;
      protected _bigZeroLabel: ui.RunTimeLabel;

      public get zeroLabel() {
        return this._zeroLabel;
      }
      public get evenLabel() {
        return this._evenLabel;
      }
      public get oddLabel() {
        return this._oddLabel;
      }
      public get bigLabel() {
        return this._bigLabel;
      }
      public get smallLabel() {
        return this._smallLabel;
      }
      public get bigZeroLabel() {
        return this._bigZeroLabel;
      }

      public setParam(
        totalWidth: number,
        a: number,
        b: number,
        c: number,
        x: number,
        y: number,
        height: number,
        barRightColor: number[] = [0x607dff, 0x3050e0], // blue
        barMidColor: number[] = [0x2dc85c, 0x188d43], // green
        barLeftColor: number[] = [0xff3c3c, 0xab2020] // red
      ) {
        this._totalWidth = totalWidth;
        this._a = a;
        this._b = b;
        this._c = c;
        this._x = x;
        this._y = y;
        this._height = height;
        this._barLeftColor = barLeftColor;
        this._barMidColor = barMidColor;
        this._barRightColor = barRightColor;
      }

      public updateValue(a: number, b: number, c: number) {
        this._a = a;
        this._b = b;
        this._c = c;
      }

      public draw() {
        const totalAmount = this._a + this._b + this._c;
        const widthA = this._totalWidth * (this._a / totalAmount);
        const widthB = this._totalWidth * (this._b / totalAmount);
        const widthC = this._totalWidth * (this._c / totalAmount);

        this._moveGroup.x = (this._x + widthA + widthB) / 2 + 27.5;

        const matrixGreen = new egret.Matrix();
        matrixGreen.createGradientBox(widthB, this._height, Math.PI / 2, this._x + widthA, this._y);

        const rectGreen: egret.Shape = new egret.Shape();
        rectGreen.graphics.beginGradientFill(egret.GradientType.LINEAR, this._barMidColor, [1, 1], [0, 255], matrixGreen);
        rectGreen.graphics.drawRect(this._x + widthA, this._y, widthB, this._height);
        rectGreen.graphics.endFill();
        this._staticGroup.addChild(rectGreen);

        const matrixRed = new egret.Matrix();
        matrixRed.createGradientBox(widthA, this._height, Math.PI / 2, this._x, this._y);

        const rectRed: egret.Shape = new egret.Shape();
        rectRed.graphics.beginGradientFill(egret.GradientType.LINEAR, this._barLeftColor, [1, 1], [0, 255], matrixRed);
        rectRed.graphics.drawRect(this._x, this._y, widthA, this._height);
        rectRed.graphics.endFill();
        this._staticGroup.addChild(rectRed);

        const matrixBlue = new egret.Matrix();
        matrixBlue.createGradientBox(widthC, this._height, Math.PI / 2, this._x + this._totalWidth - widthC, this._y);

        const rectBlue: egret.Shape = new egret.Shape();
        rectBlue.graphics.beginGradientFill(egret.GradientType.LINEAR, this._barRightColor, [1, 1], [0, 255], matrixBlue);
        rectBlue.graphics.drawRect(this._x + this._totalWidth - widthC, this._y, widthC, this._height);
        rectBlue.graphics.endFill();
        this._staticGroup.addChild(rectBlue);

        const _barBorder = new ui.RoundRectShape();
        _barBorder.width = this._totalWidth;
        _barBorder.height = this._height;
        _barBorder.setRoundRectStyle(this._totalWidth + 100, this._height + 100, { tl: 10, tr: 10, bl: 10, br: 10 }, '0x6d7278', 0, 3, 0x6d7278, 1);
        _barBorder.x = this._x;
        _barBorder.y = this._y;
        this._staticGroup.addChild(_barBorder);

        const groupMask: egret.Shape = new egret.Shape();
        groupMask.graphics.beginFill(0x00000);
        groupMask.graphics.drawRoundRect(this._x - 1, this._y - 1, this._totalWidth + 2, this._height + 2, 33, 33);
        groupMask.graphics.endFill();
        this._staticGroup.addChild(groupMask);
        this._staticGroup.mask = groupMask;

        const stat = we.utils.stat.toPercentages([this._a, this._b, this._c]);
        this._totalLeftCount.text = stat[0];
        this._totalMidCount.text = stat[1];
        this._totalRightCount.text = stat[2];
      }
    }
  }
}
