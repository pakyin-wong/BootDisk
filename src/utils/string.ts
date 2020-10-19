namespace we {
  export namespace utils {
    export function zeroPad(num, places) {
      let val = parseInt(num, 10);
      const sign = utils.sign(val);
      val *= sign;
      const zero = places - val.toString().length + 1;
      return (sign < 0 ? '-' : '') + Array(+(zero > 0 && zero)).join('0') + val;
    }

    export function trunc(str: string, n: number) {
      return str.substr(0, n - 1) + (str.length > n ? '...' : '');
    }

    export function numberToFaceValue(value: number) {
      value = Math.floor(value / 100);
      if (!value) {
        return '0';
      } else if (value >= 1000000000) {
        return value / 1000000000 + 'B';
      } else if (value >= 1000000) {
        return value / 1000000 + 'M';
      } else if (value >= 1000) {
        return value / 1000 + 'k';
      } else {
        return value.toString();
      }
    }

    export function formatNumber(target: string | number, withDP: boolean = true): string {
      const str = `${target}`;
      let result = zeroPad(str, 3);
      result = result.replace(/(\d)(?=(\d{2})(?!\d))/g, '$1.');
      result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

      if (!withDP) {
        result = result.substring(0, result.length - 3);
      }
      return result;
    }

    export function formatPrice(target: number): string {
      return `${target.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
    }

    export function formatTime(timestamp) {
      return moment.unix(timestamp).utcOffset(8).format('YYYY/MM/DD HH:mm:ss');
    }

    // for mobile in game display
    export function formatTime2(timestamp) {
      return moment.unix(timestamp).utcOffset(8).format('YY/MM/DD HH:mm:ss');
    }

    export function formatCard(source) {
      return source
        .replace(/^(.+?)([0-9ajqk][0]?)$/, '$1_$2')
        .replace('diamond', 'diamonds')
        .replace('heart', 'hearts')
        .replace(/(1(?!0))/, 'a');
    }

    export function formatCardForFlip(source: string) {
      let result = source.replace('club', 'clover');
      let lastChar = result[result.length - 1];
      if (lastChar === '1') {
        lastChar = 'A';
      }
      result = result.substring(0, result.length - 1);
      result += lastChar.toUpperCase();
      return result;
    }

    export function cardToNumber(source) {
      return source
        .replace(/^(.+?)([0-9ajqk][0]?)$/, '$2')
        .replace('a', '1')
        .replace('j', '0')
        .replace('q', '0')
        .replace('k', '0');
    }

    export function getWinMessageKey(gameType, winType, isShort = false) {
      const shortStr = isShort ? '.short' : '';
      switch (gameType) {
        case we.core.GameType.BAC:
        case we.core.GameType.BAS:
        case we.core.GameType.BAI:
        case we.core.GameType.BAM:
        case we.core.GameType.BAB:
          return `winType.ba${shortStr}.${ba.WinType[winType]}`;
        case we.core.GameType.DT:
          return `winType.dt${shortStr}.${dt.WinType[winType]}`;
        case we.core.GameType.RO:
        case we.core.GameType.ROL:

        default:
          return `winType.ro${shortStr}.${ro.WinType[winType]}`;
      }
    }

    export function getGameTypeNamespace(gametype: core.GameType) {
      switch (gametype) {
        case core.GameType.BAC:
        case core.GameType.BAI:
        case core.GameType.BAS:
        case core.GameType.BAM:
        case core.GameType.BAB:
          return 'ba';
        case core.GameType.DT:
          return 'dt';
        case core.GameType.RO:
        case core.GameType.ROL:
          return 'ro';
        case core.GameType.DI:
          return 'di';
        case core.GameType.DIL:
          return 'dil';
        case core.GameType.LW:
          return 'lw';
        case core.GameType.LO:
          return 'lo';
        case core.GameType.RC:
          return 'rc';
      }
    }

    export function measureTextWidth(text, values, style) {
      style = style || {};
      const italic = style.italic == null ? values.italic : style.italic;
      const bold = style.bold == null ? values.bold : style.bold;
      const size = style.size == null ? values.size : style.size;
      const fontFamily = style.fontFamily || values.fontFamily || egret.TextField.default_fontFamily;
      return egret.sys.measureText(text, fontFamily, size, bold, italic);
    }
  }
}

