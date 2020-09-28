namespace we {
  export namespace utils {
    export function GetFunBet(id) {
      switch (id) {
        case 'rc':
          return rc.FunBet;

        case 'lo':
        default:
          return lo.FunBet;
      }
    }
  }
}
