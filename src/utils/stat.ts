namespace we {
  export namespace utils {
    export namespace stat {
      export function toPercentages(args: number[]) {
        let total = 0;
        let result = new Array();
        args.map(value => {
          total += value;
        });
        result = args.map(value => {
          return Math.round((value / total) * 100);
        });
        return result;
      }
      export namespace ba {
        function toPercentages() {}
      }
      export namespace ro {}
      export namespace di {}
    }
  }
}
