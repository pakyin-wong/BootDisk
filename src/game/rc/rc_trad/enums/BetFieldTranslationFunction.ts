// TypeScript file
// TypeScript file
namespace we {
  export namespace rc {
    export namespace BetFieldTranslationFunction {
      export function tradbetfieldtranslate(betfield: string): any {
        // string 12345Optional
        // string ????optionalFree
        const reg = /\d+[0-9]/g;
        const checknum = betfield.split(reg)[0];
        const nonNumberBetCode = betfield.split(reg)[1];

        let numString = '';

        for (let i = 0; i < checknum.length; i++) {
          if (i === checknum.length - 1) {
            numString += i18n.t('lo_trad.rcballresultpos.p' + checknum[i]);
          } else {
            numString += `${i18n.t('lo_trad.rcballresultpos.p' + checknum[i])} ,`;
          }
        }

        return { selectType: numString, betCode: nonNumberBetCode };
      }
    }
  }
}
