class RoundRect {
  // cornerRadius = {tl:12, tr:12, bl:0, br:0} //top left , top right, bottom left, bottom right, >0 for round corner raidus, 0 for no round corner
  public static drawRoundRect(graphics: egret.Graphics, x: number, y: number, width: number, height: number, cornerRadius: any) {
    let startAngle: number = 0;
    let endAngle: number = 0;

    // start from top-left corner clockwise
    if (cornerRadius.tl) {
      graphics.moveTo(x, y + cornerRadius.tl);
      startAngle = -Math.PI; // start from west
      endAngle = startAngle + 0.5 * Math.PI;
      graphics.drawArc(x + cornerRadius.tl, y + cornerRadius.tl, cornerRadius.tl, startAngle, endAngle);
    } else {
      graphics.moveTo(x, y);
    }

    // draw the top & top-right corner
    if (cornerRadius.tr) {
      // top
      graphics.lineTo(x + width - cornerRadius.tr, y);

      // top-right corner
      startAngle = -0.5 * Math.PI;
      endAngle = startAngle + 0.5 * Math.PI;
      graphics.drawArc(x + width - cornerRadius.tr, y + cornerRadius.tr, cornerRadius.tr, startAngle, endAngle);
    } else {
      graphics.lineTo(x + width, y);
    }

    // draw the right & bottom-right corner
    if (cornerRadius.br) {
      // right
      graphics.lineTo(x + width, y + height - cornerRadius.br);

      // bottom-right corner
      startAngle = 0;
      endAngle = startAngle + 0.5 * Math.PI;
      graphics.drawArc(x + width - cornerRadius.br, y + height - cornerRadius.br, cornerRadius.br, startAngle, endAngle);
    } else {
      graphics.lineTo(x + width, y + height);
    }

    // draw the bottom & bottom-left corner
    if (cornerRadius.bl) {
      // bottom
      graphics.lineTo(x + cornerRadius.bl, y + height);

      // bottom-left corner
      startAngle = 0.5 * Math.PI;
      endAngle = startAngle + 0.5 * Math.PI;
      graphics.drawArc(x + cornerRadius.bl, y + height - cornerRadius.bl, cornerRadius.bl, startAngle, endAngle);
    } else {
      graphics.lineTo(x, y + height);
    }

    // draw the left
    if (cornerRadius.tl) {
      graphics.lineTo(x, y + cornerRadius.tl);
    } else {
      graphics.lineTo(x, y);
    }
  }
}
