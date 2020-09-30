// TypeScript file
// TypeScript file
namespace we {
  export namespace rc {
    export namespace BetFieldTranslationFunction {
      export function tradbetfieldtranslate(betfield: string): any {
        // string 12345Optional
        // string ????optionalFree
        const reg = /(\d+)/g;
        const check = betfield.split(reg).filter(Boolean);
        const checknum = check[0];
        const nonNumberBetCode = check[1];

        let numString = '';

        numString += i18n.t(`lo_trad.rcballresultpos.p${check[0]}`);

        return { selectType: numString, betCode: nonNumberBetCode };
      }
    }
  }
}
