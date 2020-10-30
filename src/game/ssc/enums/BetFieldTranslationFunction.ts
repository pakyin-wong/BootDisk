// TypeScript file
namespace we {
  export namespace lo {
    export namespace BetFieldTranslationFunction {
      export function tradbetfieldtranslate(betfield: string): any {
        // string 12345Optional
        // string ????optionalFree
        const reg = /(\d+)/g;
        const checknum = betfield.split(reg).filter(Boolean)[0];
        const nonNumberBetCode = betfield.split(reg).filter(Boolean)[1];

        let numString = '';

        for (let i = 0; i < checknum.length; i++) {
          if (i === checknum.length - 1) {
            numString += i18n.t('lo_trad.ballresultpos.p' + checknum[i]);
          } else {
            numString += `${i18n.t('lo_trad.ballresultpos.p' + checknum[i])} ,`;
          }
        }

        return { selectType: numString, betCode: nonNumberBetCode };
      }

      export function tradbetfieldsplit(trans: string, betfields: string): string {
        let str = '';
        const betfieldsSplit = betfields.split('|');

        for (let i = 0; i < betfieldsSplit.length; i++) {
          if (i === 0) {
            str += `${i18n.t(trans + betfieldsSplit[i])}`;
          } else {
            str += `, ${i18n.t(trans + betfieldsSplit[i])}`;
          }
        }
        return str;
      }
    }
  }
}
