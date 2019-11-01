namespace baccarat {
  export class BARoadDataConverter {
    public constructor() {}
    private dict = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      '-',
      '.',
    ];

    public createStringFromBeadRoad(input: any): string {
      let face = 3;
      if (input.v === 'b') {
        face = 0;
      } else if (input.v === 'p') {
        face = 1;
      } else if (input.v === 't') {
        face = 2;
      }

      const v: number = face; // 0-1 bits are b/p/t (value = 0/1/2)
      const b: number = input.b * Math.pow(2, 2); // 2 bit is banker pair (value = 0/1)
      const p: number = input.p * Math.pow(2, 3); // 3 bit is banker pair (value = 0/1)
      const bv: number = input.bv * Math.pow(2, 4); // 4-7 bits are values for banker (value = 0-9)
      const pv: number = input.pv * Math.pow(2, 8); // 8-11 bits are values for player (value = 0-9)

      const total: number = v + b + p + bv + pv;

      const index1 = total % Math.pow(2, 6);
      const index2 = (total - index1) / Math.pow(2, 6);

      return this.dict[index1] + this.dict[index2];
    }

    public getBeadRoadFromString(input: string): any {
      const str1: string = input.substr(0, 1);
      const str2: string = input.substr(1, 1);

      const sum: number = this.dict.indexOf(str1) + this.dict.indexOf(str2) * Math.pow(2, 6);

      const bitString = sum.toString(2); // convert the number to bit string

      const v = this.getNumberFromBits(bitString, 0, 1); // 0-1 bits are b/p/t (value = 0/1/2)
      const b = this.getNumberFromBits(bitString, 2); // 2 bit is banker pair (value = 0/1)
      const p = this.getNumberFromBits(bitString, 3); // 3 bit is banker pair (value = 0/1)
      const bv = this.getNumberFromBits(bitString, 4, 7); // 4-7 bits are values for banker (value = 0-9)
      const pv = this.getNumberFromBits(bitString, 8, 11); // 8-11 bits are values for player (value = 0-9)

      let face = '';
      if (v === 0) {
        face = 'b';
      } else if (v === 1) {
        face = 'p';
      } else if (v === 2) {
        face = 't';
      }

      const obj = { v: face, b, p, bv, pv };
      return obj;
    }

    private getNumberFromBits(input: string, startIndex: number, endIndex: number = -1): number {
      let total = 0;

      if (endIndex === -1) {
        endIndex = startIndex;
      }

      for (let i = startIndex; i <= endIndex; i++) {
        if (i + 1 > input.length) {
          total += 0;
        } else {
          if (input[input.length - 1 - i] === '1') {
            total += Math.pow(2, i - startIndex);
          }
        }
      }

      return total;
    }
  }
}
