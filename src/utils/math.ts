/* tslint:disable no-bitwise one-variable-per-declaration */
namespace we {
  export namespace utils {
    export function deg2rad(deg: number): number {
      return (deg * Math.PI) / 180;
    }

    export function getProportion(value: number, min: number, max: number) {
      value = Math.max(Math.min(value, max), min); // clamp to [0,1]
      return (value - min) / (max - min);
    }

    export function lerpColor(a, b, amount) {
      const ar = a >> 16,
        ag = (a >> 8) & 0xff,
        ab = a & 0xff,
        br = b >> 16,
        bg = (b >> 8) & 0xff,
        bb = b & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

      return (rr << 16) + (rg << 8) + (rb | 0);
    }

    export function dot(p1: egret.Point, p2: egret.Point) {
      return p1.x * p2.x + p1.y * p2.y;
    }

    export function cross(p1: egret.Point, p2: egret.Point) {
      return p1.x * p2.y - p1.y * p2.x;
    }

    export function magnitude(p: egret.Point) {
      return Math.sqrt(p.x * p.x + p.y * p.y);
    }

    export function clampPoint(p: egret.Point, minX, minY, maxX, maxY) {
      p.x = Math.max(Math.min(p.x, maxX), minX);
      p.y = Math.max(Math.min(p.y, maxY), minY);
    }

    export function rad2deg(rad: number) {
      return (rad * 180) / Math.PI;
    }

    export function sign(x) {
      return (x > 0 ? 1 : 0) + (x < 0 ? -1 : 0) || +x;
    }

    // Reference from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    export function permutate(array) {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  }
}
