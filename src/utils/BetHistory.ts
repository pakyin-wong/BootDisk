namespace we {
  export namespace utils {
    export class BetHistory {
        public static formatBetType(gametype, bettype: string) {
          switch (gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAS:
            case we.core.GameType.BAI:
            case we.core.GameType.BAM:
            case we.core.GameType.BAB:
            case we.core.GameType.BAMB:
              return i18n.t(`betfield_baccarat_${bettype.toLowerCase()}`);

            case we.core.GameType.DT:
            case we.core.GameType.DTB:
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
              const roresult = this.formatROBetType(bettype.toLowerCase());
              // return i18n.t(`roulette.${bettype.toLowerCase()}`);
              return roresult;
            case we.core.GameType.LW:
              const lwresult = this.formatLWBetType(bettype.toLowerCase());
              return i18n.t(`luckywheel.${lwresult}`);
            default:
              return i18n.t(`betfield_${bettype.toLowerCase()}`);
          }
        }

        private static formatROBetType(bettype) {
          const bettypearray = bettype.split('_'); // direct,SEPARAT,street,corner,LINE,row,DOZEN,RED,black,odd,even,small,big
          switch (bettypearray[0]) {
            case 'direct':
              return `${i18n.t(`roulette.betGroup.direct`)} ${bettypearray[1]}`;
            case 'separate':
              return `${i18n.t(`roulette.betGroup.separate`)} (${bettypearray[1]},${bettypearray[2]})`;
            case 'street':
              return `${i18n.t(`roulette.betGroup.street`)} (${bettypearray[1]},${bettypearray[2]},${bettypearray[3]})`;
            case 'corner':
              return `${i18n.t(`roulette.corner`)} (${bettypearray[1]},${bettypearray[2]},${bettypearray[3]},${bettypearray[4]})`;
            case 'line':
              return `${i18n.t(`roulette.betGroup.line`)} (${bettypearray[1]},${(parseInt(bettypearray[1], 10) + 1).toString()},${(parseInt(bettypearray[1], 10) + 2).toString()},${(
                parseInt(bettypearray[1], 10) + 3
              ).toString()},${(parseInt(bettypearray[1], 10) + 4).toString()}, ${bettypearray[2]})`;
            case 'row':
              return `${i18n.t(`roulette.betGroup.row`)}_${i18n.t(`roulette.${bettype}`)}`;
            case 'dozen':
              return `${i18n.t(`roulette.dozen`)} (${bettypearray[1]} ${i18n.t(`roulette.to`)} ${bettypearray[2]})`;
            case 'red':
              return `${i18n.t(`roulette.roadRed`)}`;
            case 'black':
              return `${i18n.t(`roulette.roadBlack`)}`;
            case 'odd':
              return `${i18n.t(`roulette.roadOdd`)}`;
            case 'even':
              return `${i18n.t(`roulette.roadEven`)}`;
            case 'small':
              return `${i18n.t(`roulette.roadSmall`)}`;
            case 'big':
              return `${i18n.t(`roulette.roadBig`)}`;
          }
        }
        private static formatLWBetType(bettype) {
          switch (bettype) {
            case 'lw_0':
              return 'east';
            case 'lw_1':
              return 'south';
            case 'lw_2':
              return 'west';
            case 'lw_3':
              return 'north';
            case 'lw_4':
              return 'red';
            case 'lw_5':
              return 'green';
            case 'lw_6':
              return 'white';
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
            case we.core.GameType.BAB:
            case we.core.GameType.BAMB:
              return new overlay.betHistory.BaResultItem(gameResult);
            case we.core.GameType.DT:
            case we.core.GameType.DTB:
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

        public static updateWinText(label:eui.Label, remark, amt) {
          if (!label) {
            return;
          }

          switch (remark) {
            case -1:
              label.textColor = 0xff5555;
              break;
            default:
              label.textColor = 0x43ce5c;
              break;
          }

          if (amt > 0) {
            label.text = `+${utils.formatNumber(Math.abs(amt), true)}`;
          } else if (amt === 0) {
            label.text = `${utils.formatNumber(Math.abs(amt), true)}`;
          } else {
            label.text = `-${utils.formatNumber(Math.abs(amt), true)}`;
          }
        }
    }
  }
}