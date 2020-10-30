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
      public static betratios = null;

      public static initRatios(b) {
        FunBet.betratios = b;
      }

      public static add(betInfo) {
        const betLimit = env.betLimits.Lottery[env.currentSelectedBetLimitIndex];
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
        const betLimit = env.betLimits.Lottery[env.currentSelectedBetLimitIndex];

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
        if(!FunBet.betratios) return '0.000';

        let ratio = 0;
        switch(type) {
          case FunBet.GROUP_TYPE.SIZEPARITY2:
          case FunBet.GROUP_TYPE.SUMSIZEPARITY:
            ratio = FunBet.betratios.RATIO_SUMSIZEPARITY;
            break;
          case FunBet.GROUP_TYPE.THREESPECIAL:
            switch(field) {
              case "SAME":
                ratio = FunBet.betratios.RATIO_SPECIAL_SAME;
              break;
		          case "ORDER":
                ratio = FunBet.betratios.RATIO_SPECIAL_ORDER;
              break;
		          case "DOUBLE":
                ratio = FunBet.betratios.RATIO_SPECIAL_DOUBLE;
              break;
		          case "HALFORDER":
                ratio = FunBet.betratios.RATIO_SPECIAL_HALFORDER;
              break;
              case "OTHER":
                ratio = FunBet.betratios.RATIO_SPECIAL_OTHER;
              break;
            }
            break;
          case FunBet.GROUP_TYPE.NUM:
              ratio = FunBet.betratios.RATIO_SINGLENUM;
              break;
          case FunBet.GROUP_TYPE.INTEREST1SPECIAL:
              ratio = FunBet.betratios.RATIO_INTEREST1;
              break;
          case FunBet.GROUP_TYPE.DT2:
            switch(field) {
              case 'DRAGON':
              ratio = FunBet.betratios.RATIO_DRAGON;
              break;
              case 'TIGER':
              ratio = FunBet.betratios.RATIO_TIGER;
              break;
              case 'TIE':
              ratio = FunBet.betratios.RATIO_TIE;
              break;
            }
            break;
        }
        return (ratio * 0.01).toFixed(3);
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
