// TypeScript file
namespace we {
  export namespace lo {
    export namespace RandomSelectionFunction {
      export function NormalRandom(inputsCount: number, inputRange: number, minSelect: number[]): string[] {
        const output = [];
        // inputsCount = 5/4/3/2 ,minSelect = 1,

        let random = Math.floor(Math.random() * inputRange);
        const item = '';
        const currentInput = [];
        for (let i = 0; i < inputsCount; i++) {
          let item = '';
          const currentInput = [];
          for (let k = 0; k < minSelect[i]; k++) {
            random = Math.floor(Math.random() * inputRange);
            if (k > 0 && minSelect[i] > 1) {
              while (random === currentInput[k - 1]) {
                random = Math.floor(Math.random() * inputRange);
              }
            }
            currentInput.push(random);
          }
          for (let j = 0; j < currentInput.length; j++) {
            item += currentInput[j];
          }
          output.push(item);
        }
        return output;
      }
    }
  }
}
