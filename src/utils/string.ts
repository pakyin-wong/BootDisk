namespace we {
  export namespace utils {
    function zeroPad(num, places) {
      const zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join('0') + num;
    }

    export function numberToFaceValue(value: number) {
      value = Math.floor(value / 100);
      if (!value) {
        return '0';
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
      return moment
        .unix(timestamp)
        .utcOffset(8)
        .format('YYYY/MM/DD HH:mm:ss');
    }

    export function formatCard(source) {
      return source
        .replace(/^(.+?)([0-9ajqk][0]?)$/, '$1_$2')
        .replace('diamond', 'diamonds')
        .replace('heart', 'hearts');
    }

    export function getWinMessageKey(gameType, winType, isShort = false) {
      const shortStr = isShort ? '.short' : '';
      switch (gameType) {
        case we.core.GameType.BAC:
        case we.core.GameType.BAS:
        case we.core.GameType.BAI:
          return `winType.ba${shortStr}.${ba.WinType[winType]}`;
        case we.core.GameType.DT:
          return `winType.dt${shortStr}.${dt.WinType[winType]}`;
      }
    }
  }
}
