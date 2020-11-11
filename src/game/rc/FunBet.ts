namespace we {
  export namespace rc {
    export class FunBet extends core.BaseEUI {
      public static evtHandler: egret.EventDispatcher = new egret.EventDispatcher();
      public static EVT_RESET = 'LOTTERY_FUNBET_RESET';

      private static GROUP_TYPE = {
        RCBASIC: 'BASIC_%id%',
        FIXPOS: '%id%FIXPOS2',
        DT2: 'DT%id%2',
        SUM12: '12SUM%id%',
        SUM12NUM: '12SUM_%id%',
      };

      public static bet: number = 0;
      public static totalBet: number = 0;
      public static betDetails = FunBet.createBetDetails();
      public static betratios = null;

      public static initRatios(b) {
        FunBet.betratios = b;
      }

      public static add(betInfo) {
        const betLimit = env.getBetLimitSet('Lottery', env.currentSelectedBetLimitIndex);
        let rBet = 0;

        if (FunBet.totalBet + FunBet.bet > env.balance) {
          FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_OVERBALANCE'));
          return null;
        }

        if (FunBet.betDetails[betInfo.id]) {
          rBet = FunBet.betDetails[betInfo.id].amt;
          if (rBet + FunBet.bet <= betLimit.maxlimit) {
            rBet += FunBet.bet;
            FunBet.betDetails[betInfo.id].amt = rBet;
            FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_UPDATE'));
          } else {
            FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_OVERBETLIMIT'));
          }
        } else {
          if (FunBet.bet <= betLimit.maxlimit) {
            FunBet.betDetails[betInfo.id] = {
              id: betInfo.id,
              type: betInfo.type,
              group: betInfo.group,
              field: betInfo.field,
              rate: betInfo.rate,
              amt: FunBet.bet,
            };
            rBet = FunBet.betDetails[betInfo.id].amt;
            FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_UPDATE'));
          } else {
            FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_OVERBETLIMIT'));
          }
        }

        return rBet * 0.01;
      }

      public static reset() {
        FunBet.betDetails = FunBet.createBetDetails();
        FunBet.totalBet = 0;
        FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_RESET'));
        FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_UPDATE'));
      }

      private static createBetDetails() {
        return {};
      }

      public static checkAllAvailable() {
        const betLimit = env.getBetLimitSet('Lottery', env.currentSelectedBetLimitIndex);

        if (FunBet.totalBet > env.balance) {
          FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_OVERBALANCE'));
          return false;
        }

        for (const id in FunBet.betDetails) {
          const amt = FunBet.betDetails[id].amt;
          if (amt < betLimit.minlimit) {
            FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_LOWERBETLIMIT'));
            return false;
          }
          if (amt > betLimit.maxlimit) {
            FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_OVERBETLIMIT'));
            return false;
          }
        }

        return true;
      }

      public static getBetId(type: string, group: string, field: string): string {
        switch (type) {
          case FunBet.GROUP_TYPE.RCBASIC:
            return `${group}${field}`;
          case FunBet.GROUP_TYPE.FIXPOS:
            return type.replace('%id%', group) + '_' + field;
          case FunBet.GROUP_TYPE.DT2:
            return type.replace('%id%', group) + '_' + field;
          case FunBet.GROUP_TYPE.SUM12:
            return type.replace('%id%', group);
          case FunBet.GROUP_TYPE.SUM12NUM:
            return type.replace('%id%', field);
        }
      }

      public static getBetRate(type: string, group: string, field: string): string {
        console.log('lo', env.betLimits.Lottery);

        return '1.8';
      }

      public static getBetLabel(type: string, group: string, field: string) {
        switch (type) {
          case FunBet.GROUP_TYPE.RCBASIC:
            return () => `${i18n.t('rc_fun_betfield_n_' + field)}`;

          case FunBet.GROUP_TYPE.FIXPOS:
            return () => `${field}`;

          case FunBet.GROUP_TYPE.DT2:
            return () => `${i18n.t('lo_fun_betfield_dt_' + field)}`;

          case FunBet.GROUP_TYPE.SUM12:
            return () => `${i18n.t('lo_fun_betfield_n_' + group)}`;

          case FunBet.GROUP_TYPE.SUM12NUM:
            return () => `${field}`;
        }
      }

      public static getBetDetailLabel(type: string, group: string, field: string) {
        const prefix = i18n.t('lo_fun_overlay_betPrefix');
        const groupKey = type.replace('%id%', group);

        switch (type) {
          case FunBet.GROUP_TYPE.RCBASIC:
            return `${prefix}${i18n.t('rc_fun_betgroup_' + groupKey)} - ${i18n.t('rc_fun_betfield_n_' + field)}`;

          case FunBet.GROUP_TYPE.FIXPOS:
            return `${prefix}${i18n.t('rc_fun_betgroup_' + groupKey)} - ${field}`;

          case FunBet.GROUP_TYPE.DT2:
            return `${prefix}${i18n.t('rc_fun_betgroup_' + groupKey)} - ${i18n.t('lo_fun_betfield_dt_' + field)}`;

          case FunBet.GROUP_TYPE.SUM12:
            return `${prefix}${i18n.t('rc_fun_betgroup_sum12')} - ${i18n.t('lo_fun_betfield_n_' + group)}`;

          case FunBet.GROUP_TYPE.SUM12NUM:
            return `${prefix}${i18n.t('rc_fun_betgroup_sum12num')} - ${field}`;
        }
      }
    }
  }
}
