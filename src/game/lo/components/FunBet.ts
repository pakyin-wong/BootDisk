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
      public static totalBet: number = 0;
      public static betDetails = FunBet.createBetDetails();

      public static add(betInfo) {
        const betLimit = env.betLimits[env.currentSelectedBetLimitIndex];
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
        const betLimit = env.betLimits[env.currentSelectedBetLimitIndex];

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

      public static getBetDetailLabel(type: string, group: string, field: string) {
        const prefix = i18n.t('lo_fun_overlay_betPrefix');
        const groupKey = type.replace('%id%', group);

        switch (type) {
          case FunBet.GROUP_TYPE.NUM:
            return `${prefix}${i18n.t('lo_fun_betgroup_' + groupKey)} - ${field}`;

          case FunBet.GROUP_TYPE.INTEREST1SPECIAL:
            return `${prefix}${i18n.t('lo_fun_betlayer_tab_five1')} - ${group}`;

          case FunBet.GROUP_TYPE.DT2:
            return `${prefix}${i18n.t('lo_fun_betgroup_' + groupKey)} - ${i18n.t('lo_fun_betfield_dt_' + field)}`;

          case FunBet.GROUP_TYPE.THREESPECIAL:
            return `${prefix}${i18n.t('lo_fun_betgroup_' + groupKey)} - ${i18n.t('lo_fun_betfield_n3_' + field)}`;

          case FunBet.GROUP_TYPE.SIZEPARITY2:
            return `${prefix}${i18n.t('lo_fun_betgroup_' + groupKey)} - ${i18n.t('lo_fun_betfield_n_' + field)}`;

          case FunBet.GROUP_TYPE.SUMSIZEPARITY:
            return `${prefix}${i18n.t('lo_fun_betgroup_' + groupKey)} - ${i18n.t('lo_fun_betfield_total_' + field)}`;
        }
      }
    }
  }
}
