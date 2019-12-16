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

    export function formatTime(timestamp) {
      return moment(timestamp).format('YYYY/MM/DD HH:mm:ss');
    }
  }
}
