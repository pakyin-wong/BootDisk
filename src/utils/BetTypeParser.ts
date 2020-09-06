namespace we {
  export namespace utils {
    export class BetTypeParser {
      public static parse(gametype, bettype: string) {
        switch (gametype) {
          case GameType.LO:
            return this.parseLO(bettype);
          default:
            return {};
        }
      }

      public static parseLO(bettype) {
        const b = bettype.split('@')[0].split('_');
        switch (b[0]) {
          case 'MILSIZEPARITY2':
          case 'THOUSIZEPARITY2':
          case 'HUNSIZEPARITY2':
          case 'TENSIZEPARITY2':
          case 'SINSIZEPARITY2':
          case 'SUMSIZEPARITY':
            return {
              type: i18n.t('lo_fun_bettype_n'),
              group: i18n.t(`lo_fun_betgroup_${b[0]}`),
              field: i18n.t(`lo_fun_betfield_n_${b[1]}`),
            };

          case '123THREESPECIAL':
          case '234THREESPECIAL':
          case '345THREESPECIAL':
            return {
              type: i18n.t('lo_fun_bettype_n3'),
              group: i18n.t(`lo_fun_betgroup_${b[0]}`),
              field: i18n.t(`lo_fun_betfield_n3_${b[1]}`),
            };
          case 'MILLIONNUM':
          case 'THOUSANDNUM':
          case 'HUNDREDNUM':
          case 'TENNUM':
          case 'SINGLENUM':
            return {
              type: i18n.t('lo_fun_bettype_num'),
              group: i18n.t(`lo_fun_betgroup_${b[0]}`),
              field: `${b[1]}`,
            };
          case '12DT2':
          case '13DT2':
          case '14DT2':
          case '15DT2':
          case '23DT2':
          case '24DT2':
          case '25DT2':
          case '34DT2':
          case '35DT2':
          case '45DT2':
            return {
              type: i18n.t('lo_fun_bettype_dt'),
              group: i18n.t(`lo_fun_betgroup_${b[0]}`),
              field: i18n.t(`lo_fun_betfield_dt_${b[1]}`),
            };
          case 'INTEREST1SPECIAL':
            return {
              type: i18n.t('lo_fun_bettype_five1'),
              group: i18n.t(`lo_fun_bettype_five1`),
              field: `${b[1]}`,
            };
          default:
            return {
              type: '',
              group: '',
              field: '',
            };
        }
      }
    }
  }
}
