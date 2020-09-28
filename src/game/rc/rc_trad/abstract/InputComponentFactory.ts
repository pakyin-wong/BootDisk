// TypeScript file
namespace we {
  export namespace rc {
    export class InputComponentFactory extends lo.InputComponentFactory {
      // TODO
      public static generateInputComponent(index, config): lo.AInputComponent {
        const { type } = config;
        switch (type) {
          case lo.InputComponentType.BALLS:
            return new lo.SSCBallRowInput(index, config);
          // throw new Error('No Ball Component');
          case lo.InputComponentType.TEXTAREA:
            return new RCTextAreaInput(index, config);
          case lo.InputComponentType.CHECKBOXES:
            return new lo.SSCCheckBoxInput(index, config);
          // default:
          // throw new Error('Input type not defined.')
        }
        return null;
      }
    }
  }
}
