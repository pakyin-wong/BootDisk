class GradientFill {
  public static beginGradientFill(
    graphics: egret.Graphics,
    width: number,
    height: number,
    colorAlphaArr: string[], // '0xff0000' or with alpha percent '0xff000030' which mean 30% alpha
    fillAngle: number = 0
  ) {
    const matrix = new egret.Matrix();
    const gradientAngle: number = Math.PI * 0.5 + (fillAngle * Math.PI) / 180;
    matrix.createGradientBox(width, height, gradientAngle);
    const colorArr = [];
    const alphas = [];
    const ratios = [];
    let count = 0;
    if (colorAlphaArr.length > 1) {
      colorAlphaArr.forEach(color => {
        if (color.length <= 8) {
          colorArr.push(parseInt(color, 16));
          alphas.push(1);
          ratios.push((255 * count) / (colorAlphaArr.length - 1));
        } else {
          colorArr.push(parseInt(color.substr(0, 8), 16));
          alphas.push(parseInt(color.substr(8, 2), 10) / 100);
          ratios.push((255 * count) / (colorAlphaArr.length - 1));
        }
        count++;
      });

      graphics.beginGradientFill(egret.GradientType.LINEAR, colorArr, alphas, ratios, matrix);
    }
  }
}
