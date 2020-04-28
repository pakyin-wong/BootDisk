namespace we {
  export namespace utils {
    export namespace stat {
      export namespace ba {
        function toPercentages() {}
      }
      export namespace di {
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
      }
    }
  }
}
