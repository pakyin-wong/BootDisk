/* tslint:disable max-classes-per-file */
namespace we {
  export namespace data {
    export class BetLimitSet {
      public currency: core.Currency;
      public maxlimit: number;
      public minlimit: number;
      // public chipsList: [{ chipid?: string; value: number }];
      public chips: number[];
      public limits?: {
        ba?: BABetFieldBetLimit;
        dt?: DTBetFieldBetLimit;
        ro?: ROBetFieldBetLimit;
        di?: DIBetFieldBetLimit;
        dil?: DILBetFieldBetLimit;
        lw?: LWBetFieldBetLimit;
      };
    }

    export class BetFieldBetLimit {
      public odd: string;
      public maxlimit: number;
    }

    export class BABetFieldBetLimit {
      public BANKER: BetFieldBetLimit; // 0.95:1
      public PLAYER: BetFieldBetLimit;
      public TIE: BetFieldBetLimit;
      public BANKER_PAIR: BetFieldBetLimit;
      public PLAYER_PAIR: BetFieldBetLimit;
      public SUPER_SIX: BetFieldBetLimit;
      public SUPER_SIX_BANKER: BetFieldBetLimit; // 1:1
    }

    export class DTBetFieldBetLimit {
      public DRAGON: BetFieldBetLimit;
      public TIGER: BetFieldBetLimit;
      public TIE: BetFieldBetLimit;
    }
    export class ROBetFieldBetLimit {
      public DIRECT: BetFieldBetLimit;
      public SEPARATE: BetFieldBetLimit;
      public STREET: BetFieldBetLimit;
      public CORNER: BetFieldBetLimit;
      public LINE: BetFieldBetLimit;
      public ROW: BetFieldBetLimit;
      public DOZEN: BetFieldBetLimit;
      public RED_BLACK: BetFieldBetLimit;
      public ODD_EVEN: BetFieldBetLimit;
      public BIG_SMALL: BetFieldBetLimit;
    }
    export class DIBetFieldBetLimit {
      public BIG_SMALL: BetFieldBetLimit;
      public ODD_EVEN: BetFieldBetLimit;
      public TRIPLE: BetFieldBetLimit;
      public TRIPLE_ALL: BetFieldBetLimit;
      public DOUBLE: BetFieldBetLimit;
      public SUM_4_17: BetFieldBetLimit;
      public SUM_5_16: BetFieldBetLimit;
      public SUM_6_15: BetFieldBetLimit;
      public SUM_7_14: BetFieldBetLimit;
      public SUM_8_13: BetFieldBetLimit;
      public SUM_9_10_11_12: BetFieldBetLimit;
      public COMBINE: BetFieldBetLimit;
      public SPECIFIC_1: BetFieldBetLimit; // 1:1
      public SPECIFIC_2: BetFieldBetLimit; // 2:1
      public SPECIFIC_3: BetFieldBetLimit; // 3:1
    }
    export class DILBetFieldBetLimit {
      // to be confirmed from backend
      public SUM_3_18: BetFieldBetLimit;
      public SUM_4_17: BetFieldBetLimit;
      public SUM_5_16: BetFieldBetLimit;
      public SUM_6_15: BetFieldBetLimit;
      public SUM_7_14: BetFieldBetLimit;
      public SUM_8_13: BetFieldBetLimit;
      public SUM_9_12: BetFieldBetLimit;
      public SUM_10_11: BetFieldBetLimit;
    }
    export class LWBetFieldBetLimit {
      public LW_0: BetFieldBetLimit;
      public LW_1: BetFieldBetLimit;
      public LW_2: BetFieldBetLimit;
      public LW_3: BetFieldBetLimit;
      public LW_4: BetFieldBetLimit;
      public LW_5: BetFieldBetLimit;
      public LW_6: BetFieldBetLimit;
    }
  }
}
