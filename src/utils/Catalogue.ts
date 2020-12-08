namespace we {
  export namespace utils {
    export class Catalogue {
        public static LIVE = {
            allGame: [
                GameType.BAC,
                GameType.BAI,
                GameType.BAM,
                GameType.BAB,
                GameType.BASB,
                GameType.BAMB,
                GameType.DTB,
                GameType.BAS,
                GameType.LW,
                GameType.DT,
                GameType.RO,
                GameType.ROL,
                GameType.DI,
                GameType.DIL,
            ].join(','),
            // baccarat: [GameType.BAC, GameType.BAI, GameType.BAM, GameType.BAB, GameType.BASB, GameType.BAMB, GameType.BAS].join(','),
            // special: [GameType.LW, GameType.ROL, GameType.DIL].join(','),
            // dragontiger: [GameType.DT, GameType.DTB].join(','),
            // roulette: [GameType.RO, GameType.ROL].join(','),
            // dice: [GameType.DI, GameType.DIL].join(','),
            // other: [GameType.LW].join(','),
            blockchain: [
                GameType.BAB,
                GameType.BASB,
                GameType.BAMB,
                GameType.DTB,
            ].join(','),
        };

        public static LOTTERY = {
            allLotteryGame: [GameType.LO, GameType.RC].join(','),
            lottery: [GameType.LO].join(','),
            race: [GameType.RC].join(','),
        };
    }
  }
}