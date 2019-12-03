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

    export function getBettingTableGridDenom(denomlist: number[], amount) {
      let total = amount;
      let index = denomlist.length - 1;
      const b = new Array();
      while (total > 0) {
        if (total >= denomlist[index]) {
          total -= denomlist[index];
          b.push(denomlist[index]);
        } else {
          index--;
        }
      }
      return b;
    }

    export function getChipFace(value: number): string {
      if (value > 1000) {
        return value / 1000 + 'k';
      } else {
        return value + '';
      }
    }
  }
}
