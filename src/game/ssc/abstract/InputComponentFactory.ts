// TypeScript file
namespace we {
  export namespace lo {
    export class InputComponentFactory {
      // TODO
      static generateInputComponent(index, config): AInputComponent {
        const { type } = config;
        switch (type) {
          case InputComponentType.BALLS:
            return new SSCBallRowInput(index, config);
          // throw new Error('No Ball Component');
          case InputComponentType.TEXTAREA:
            throw new Error('No TextArea Component');
          case InputComponentType.CHECKBOXES:
            throw new Error('No Checkboxes Component');
          // default:
          // throw new Error('Input type not defined.')
        }
        return null;
      }
    }
  }
}
