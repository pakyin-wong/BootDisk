namespace we {
  export namespace core {
    export enum BettingTableType {
      NORMAL = 0,
      LOBBY = 1,
      BETSUMMARY = 2,
    }
    export enum TableState {
      CLOSED = 0,
      ONLINE = 10,
      OFFLINE = 20,
      MAINTENANCE = 30,
    }

    export enum GameType {
      BAC = 0, // classic baccarat
      BAS = 1, // speed baccarat
      BAI = 2, // insurance baccarat
      BAM = 18, // squeeze BACCARAT
      BAB = 27, // Blockchain Baccarat
      BAMB = 29,
      DT = 5, // Dragon Tiger
      DTB = 28, // Blockchain DragonTiger
      RO = 14, // Roulette
      ROL = 17, // Roulette (God of Wealth) // L stands for luck
      DI = 12, // Dice
      DIL = 19, // Dice (God of Wealth)
      LW = 16, // Lucky Wheel
      // MJ = 13, // MaJong
      LO = 15,
      RC = 22,
    }

    export enum ChipType {
      FLAT = 1,
      PERSPECTIVE = 2,
      BETTING = 3,
    }

    export enum GameName {
      lobby = 'lobby',
      ba = 'ba',
    }
    export enum PageName {
      lobby = 'lobby',
      live = 'live',
    }

    // export enum GameGroupTab {
    //   live = 'live',
    //   lottery = 'lottery',
    // }

    export enum LiveGameTab {
      all = 'allGame',
      ba = 'baccarat',
      dt = 'dragontiger',
      ro = 'roulette',
      di = 'dice',
      lw = 'luckywheel',
      // other = 'other',
      // goodroad = 'goodroad',
    }

    export enum LotteryTab {
      all = 'allLotteryGame',
      lo = 'lottery',
      rc = 'race',
    }

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

    export const NotificationType = {
      GoodRoad: 0,
      Result: 1,
    };

    export enum GameState {
      IDLE = 0,
      BET = 1,
      DEAL = 2,
      FINISH = 3,
      REFUND = 4,
      SHUFFLE = 5,
      PEEK = 6,
      PEEK_PLAYER = 7,
      PEEK_BANKER = 8,
      UNKNOWN = 99,
    }
  }
}
