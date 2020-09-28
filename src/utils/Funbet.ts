namespace we {
  export namespace utils {
    export function getFunBet() {
      return utils.Funbet(env.sceneId);
    }
    export function Funbet(id) {
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
