namespace we {
  export namespace lo {
    export class FunBet extends core.BaseEUI {

      public static evtHandler: egret.EventDispatcher = new egret.EventDispatcher();
      public static EVT_RESET = 'LOTTERY_FUNBET_RESET';

        private static GROUP_TYPE = {
            SIZEPARITY2: '%id%SIZEPARITY2',
            THREESPECIAL: '%id%THREESPECIAL',
            SUMSIZEPARITY: 'SUMSIZEPARITY',
            NUM: '%id%NUM',
            DT2: '%id%DT2',
            INTEREST1SPECIAL: 'INTEREST1SPECIAL_%id%',
        };

      public static bet: number = 0;
      public static betDetails = FunBet.createBetDetails();

        public static add(betInfo) {
            FunBet.betDetails[betInfo.id] = {
                id: betInfo.id,
                rate: betInfo.rate,
                amt: FunBet.bet,
            };
            return FunBet.bet;
        }

    public static reset() {
            FunBet.betDetails = FunBet.createBetDetails();
            FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_RESET'));
        }

        private static createBetDetails() {
            return {};
        }

    public static getBetId(type: string, group: string, field: string): string {
        let key = type.replace('%id%', group);
        if (field) {
            key += `_${field}`;
        }
        return key;
    }

    public static getBetRate(type: string, group: string, field: string): string {
        return '1.8';
    }

    public static getBetLabel(type: string, group: string, field: string) {
        switch (type) {
            case FunBet.GROUP_TYPE.NUM:
            return () => `${field}`;

            case FunBet.GROUP_TYPE.INTEREST1SPECIAL:
            return () => `${group}`;

            case FunBet.GROUP_TYPE.DT2:
            return () => `${i18n.t('lo_fun_betfield_dt_' + field)}`;

            case FunBet.GROUP_TYPE.THREESPECIAL:
            return () => `${i18n.t('lo_fun_betfield_n3_' + field)}`;

            case FunBet.GROUP_TYPE.SIZEPARITY2:
            return () => `${i18n.t('lo_fun_betfield_n_' + field)}`;

            case FunBet.GROUP_TYPE.SUMSIZEPARITY:
            return () => `${i18n.t('lo_fun_betfield_total_' + field)}`;
        }
    }

    }
  }
}
