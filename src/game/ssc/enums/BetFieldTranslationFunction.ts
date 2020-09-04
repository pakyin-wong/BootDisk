// TypeScript file
namespace we {
  export namespace lo {
    export namespace BetFieldTranslationFunction {
      export function betfieldtranslate(betfield: string): string {
        // string 12345Optional
        // string ????optionalFree
        const reg = /[^0-9]/g;
        const checknum = betfield.split(reg)[0];
        const checkfree = betfield.split(reg)[1];
        // console.log(output);
        if (isNaN(parseInt(checknum, 10))) {
          // use whole word for i18n
          return i18n.t('lo_trad.betfield.' + `${betfield.toUpperCase()}`);
        }

        const num = checknum.length;
        let numString = '';
        switch(num){
          case 1:
            numString = 'ONE';
          break;
          case 2:
            numString = 'TWO';
          break;
          case 3:
            numString = 'THREE';
          break;
          case 4:
            numString = 'FOUR';
          break;
          case 5:
            numString = 'FIVE';
          break;
        }

        if (checkfree.search(/(free)/g) === -1) {
          // Any
          const betcode = checkfree;

          return `${i18n.t('lo_trad.betfield.'+betcode.toUpperCase())+'_'+numString}`
        }

        return ;
      }
    }
  }
}
