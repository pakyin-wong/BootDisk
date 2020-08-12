/* tslint:disable no-bitwise one-variable-per-declaration */
namespace we {
  export namespace utils {
    export function isVerticalLine(point1: egret.Point, point2: egret.Point) {
      if (point1.x === point2.x) {
        return true;
      }
      return false;
    }

    export function isHorizontalLine(point1: egret.Point, point2: egret.Point) {
      if (point1.y === point2.y) {
        return true;
      }
      return false;
    }

    export function roundRectPoints(width: number, height: number, roundCorner: number[], x = 0, y = 0) {
      return [
        // start point
        new egret.Point(x, y + roundCorner[7]),
        // top left
        new egret.Point(x, y),
        new egret.Point(x + roundCorner[0], y),
        new egret.Point(x + width - roundCorner[1], y),
        // top right
        new egret.Point(x + width, y),
        new egret.Point(x + width, y + roundCorner[2]),
        new egret.Point(x + width, y + height - roundCorner[3]),
        // bottom right
        new egret.Point(x + width, y + height),
        new egret.Point(x + width - roundCorner[4], y + height),
        new egret.Point(x + roundCorner[5], y + height),
        // bottom left
        new egret.Point(x, y + height),
        new egret.Point(x, y + height - roundCorner[6]),
        new egret.Point(x, y + roundCorner[7]),
      ];
    }

    export function drawRoundRect(graphics: egret.Graphics, points: egret.Point[]) {
      graphics.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < 13; i += 3) {
        if (!utils.isHorizontalLine(points[i - 1], points[i + 1]) && !utils.isVerticalLine(points[i - 1], points[i + 1])) {
          graphics.curveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        }
        graphics.lineTo(points[i + 2].x, points[i + 2].y);
      }
    }
  }
}
