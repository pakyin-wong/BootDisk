namespace we {
  export namespace utils {
    export class BetHistory {
        public static formatBetType(gametype, bettype: string) {
          switch (gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAS:
            case we.core.GameType.BAI:
            case we.core.GameType.BAM:
              return i18n.t(`betfield_baccarat_${bettype.toLowerCase()}`);

            case we.core.GameType.DT:
              return i18n.t(`betfield_dragonTiger_${bettype.toLowerCase()}`);
            case we.core.GameType.DI:
              return i18n.t(`dice.${bettype.toLowerCase()}`);
            case we.core.GameType.DIL:
              const res = bettype;
              const dilresultStr = res.split('_');
              const dilresult = dilresultStr[1];
              return dilresult;
            case we.core.GameType.RO:
            case we.core.GameType.ROL:
              return i18n.t(`roulette.${bettype.toLowerCase()}`);
            case we.core.GameType.LW:
              let lwresult;
              switch (bettype.toLowerCase()) {
                case 'lw_0':
                  lwresult = 'east';
                  break;
                case 'lw_1':
                  lwresult = 'south';
                  break;
                case 'lw_2':
                  lwresult = 'west';
                  break;
                case 'lw_3':
                  lwresult = 'north';
                  break;
                case 'lw_4':
                  lwresult = 'red';
                  break;
                case 'lw_5':
                  lwresult = 'green';
                  break;
                case 'lw_6':
                  lwresult = 'white';
                  break;
              }
              return i18n.t(`luckywheel.${lwresult}`);
            default:
              return i18n.t(`betfield_${bettype.toLowerCase()}`);
          }
        }

        
        public static formatRemark(remark) {
          switch (remark) {
            case 1:
              return i18n.t('overlaypanel_bethistory_remark_win');
            case -1:
              return i18n.t('overlaypanel_bethistory_remark_lose');
            case 0:
              return i18n.t('overlaypanel_bethistory_remark_ties');
            default:
              return '';
          }
        }

        public static createGameResult(gametype, gameResult) {
          switch (gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAS:
            case we.core.GameType.BAI:
            case we.core.GameType.BAM:
              return new overlay.betHistory.BaResultItem(gameResult);
            case we.core.GameType.DT:
              return new overlay.betHistory.DtResultItem(gameResult);
            case we.core.GameType.RO:
              return new overlay.betHistory.RoResultItem(gameResult);
            case we.core.GameType.ROL:
              return new overlay.betHistory.RolResultItem(gameResult);
            case we.core.GameType.DI:
              return new overlay.betHistory.DiResultItem(gameResult);
            case we.core.GameType.DIL:
              return new overlay.betHistory.DilResultItem(gameResult);
            case we.core.GameType.LW:
              return new overlay.betHistory.LwResultItem(gameResult);
            case we.core.GameType.LO:
              return new overlay.betHistory.LoResultItem(gameResult);
            case we.core.GameType.RC:
              return new overlay.betHistory.RcResultItem(gameResult);
            default:
              return new eui.Component();
          }
        }
    }
  }
}