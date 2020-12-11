namespace we {
  export namespace ba {
    export enum WinType {
      NONE,
      BANKER,
      PLAYER,
      TIE,
    }

    export const BetField = {
      BANKER: 'BANKER',
      PLAYER: 'PLAYER',
      TIE: 'TIE',
      BANKER_PAIR: 'BANKER_PAIR',
      PLAYER_PAIR: 'PLAYER_PAIR',
      SUPER_SIX: 'SUPER_SIX',
      SUPER_SIX_BANKER: 'SUPER_SIX_BANKER',
      SUPER_SIX_PLAYER: 'SUPER_SIX_PLAYER',
      SUPER_SIX_TIE: 'SUPER_SIX_TIE',
      SUPER_SIX_BANKER_PAIR: 'SUPER_SIX_BANKER_PAIR',
      SUPER_SIX_PLAYER_PAIR: 'SUPER_SIX_PLAYER_PAIR'
    };
  }
}
