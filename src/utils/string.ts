namespace we {
  export namespace utils {
    export function formatNumber(target: string | number): string {
      const str = `${target}`;
      let result = str.replace(/(\d)(?=(\d{2})(?!\d))/g, '$1.');
      result = str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      return result;
    }

    export function formatPrice(target: number): string {
      return `${target.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
    }

    export function formatTime(unix) {
      return moment.unix(unix).format('YYYY/MM/DD HH:mm:ss');
    }

    export function formatCard(source) {
      return source.replace(/^(.+?)([0-9ajqk][0]?)$/, '$1_$2').replace('diamond', 'diamonds').replace('heart', 'hearts');
    }
  }
}
