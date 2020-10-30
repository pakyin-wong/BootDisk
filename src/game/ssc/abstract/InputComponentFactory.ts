// TypeScript file
namespace we {
  export namespace lo {
    export class InputComponentFactory {
      // TODO
      public static generateInputComponent(index, config): AInputComponent {
        const { type } = config;
        switch (type) {
          case InputComponentType.BALLS:
            return new SSCBallRowInput(index, config);
          // throw new Error('No Ball Component');
          case InputComponentType.TEXTAREA:
            return new SSCTextAreaInput(index, config);
          case InputComponentType.CHECKBOXES:
            return new SSCCheckBoxInput(index, config);
          // default:
          // throw new Error('Input type not defined.')
        }
        return null;
      }

      public static generateMobileInputComponent(index, config): AInputComponent {
        const { type } = config;
        switch (type) {
          case InputComponentType.BALLS:
            return new SSCMobileBallRowInput(index, config);
          // throw new Error('No Ball Component');
          case InputComponentType.TEXTAREA:
            return new SSCTextAreaInput(index, config);
          case InputComponentType.CHECKBOXES:
            return new SSCCheckBoxInput(index, config);
          // default:
          // throw new Error('Input type not defined.')
        }
        return null;
      }

      public static findNextCombination(inputData: string[], combinations: string[], sample: number, i: number, depth: number, itemString: string) {
        if (depth === sample) {
          if (InputComponentFactory.validateCombination(itemString, sample)) {
            const stringCheck = itemString.split('_');
            if (stringCheck.length !== sample) {
            } else {
              combinations.push(itemString);
            }
          }
        }

        for (let j = i + 1; j < inputData.length; j++) {
          if (inputData[j] !== '') {
            InputComponentFactory.findNextCombination(inputData, combinations, sample, j, depth + 1, itemString + '_' + (j + 1).toString());
          } else {
            InputComponentFactory.findNextCombination(inputData, combinations, sample, j, depth + 1, itemString);
          }
        }
      }

      public static validateCombination(itemStr: string, sampleSize: number): boolean {
        const items = itemStr.split('_');
        if (items.length === sampleSize) {
          return true;
        }
        return false;
      }
    }
  }
}
