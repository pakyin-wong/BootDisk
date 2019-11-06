namespace we {
  export namespace ba {
    export enum WinType {
      NONE,
      BANKER,
      PLAYER,
      TIE,
    }

    export enum GameState {
      IDLE = 0,
      BET = 1,
      DEAL = 2,
      FINISH = 3,
      REFUND = 4,
      SHUFFLE = 5,
    }

    export const BetField = {
      BANKER: 'BANKER',
      PLAYER: 'PLAYER',
      TIE: 'TIE',
      BANKER_PAIR: 'BANKER_PAIR',
      PLAYER_PAIR: 'PLAYER_PAIR',
      SUPER_SIX: 'SUPER_SIX',
    };
  }
}
