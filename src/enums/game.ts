namespace enums {
  export const TableState = {
    CLOSED: 0,
    ONLINE: 10,
    OFFLINE: 20,
    MAINTENANCE: 30,
  };

  export const GameType = {
    BAC: 0, // classic baccarat
    BAS: 1, // speed baccarat
    BAI: 2, // insurance baccarat
    DI: 12, // Dice
    MJ: 13, // MaJong
    RO: 14, // Rolette
  };

  export const TableFilter = {
    FEATURED_TABLE: 1,
    BACCARAT: '123213',
    BACCARAT_GOOD_ROAD: 3,
    OTHER_GAMES: 4,
  };

  export const Mode = {
    UNKNOWN: 0,
    LIGHT: 1,
    DARK: 2,
  };

  export namespace baccarat {
    export const GameState = {
      IDLE: 0,
      BET: 1,
      DEAL: 2,
      FINISH: 3,
      REFUND: 4,
      SHUFFLE: 5,
    };

    export const BetField = {
      BANKER: 'BANKER',
      PLAYER: 'PLAYER',
      TIE: 'TIE',
      BANKER_PAIR: 'BANKER_PAIR',
      PLAYER_PAIR: 'PLAYER_PAIR',
      SUPER_SIX: 'SUPER_SIX',
    };

    export const FinishType = {
      BANKER_WIN: 1,
      PLAYER_WIN: 2,
      TIE: 3,
    };
  }
}
