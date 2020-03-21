/* tslint:disable no-eval */
namespace we {
  export namespace utils {
    export function getSkin(name: string, orientationDependent: boolean = true) {
      let device = `desktop`;

      if (env.isMobile) {
        device = `mobile${orientationDependent ? `_${env.orientation.toLowerCase()}` : ''}`;
      }

      // check current device
      return `resource/skin_${device}/${name}.exml`;
    }

    export function getSkinByClassname(name: string, orientationDependent: boolean = true) {
      let device = `desktop`;

      if (env.isMobile) {
        device = `mobile${orientationDependent ? `_${env.orientation.toLowerCase()}` : ''}`;
      }
      // check current device
      return `skin_${device}.${name}`;
    }

    export function getSkinWithFallbackOrientation(name: string, orientationDependent: boolean = true, fallbackOrientation: string = 'portrait') {
      let device = `desktop`;

      if (env.isMobile) {
        device = `mobile${orientationDependent ? `_${env.orientation.toLowerCase()}` : ''}`;
        let _ = eval(utils.getSkin(`resource/skin_${device}/${name}.exml`));
        if (!_) {
          _ = eval(utils.getSkin(`resource/skin_mobile_${fallbackOrientation}/${name}.exml`));
          if (!_) {
            throw new Error(`Skin ${name} does not exists!`);
          } else {
            device = `mobile_${fallbackOrientation}`;
          }
        }
      }

      // check current device
      return `resource/skin_${device}/${name}.exml`;
    }

    export function assertSkinClassExists(skinClass: string) {
      const _ = eval(utils.getSkinByClassname(skinClass));
      if (!_) {
        throw new Error(`Skin ${skinClass} does not exists!`);
      }
    }

    export function assertSkinExists(skinKey: string) {
      const _ = eval(utils.getSkin(skinKey));
      if (!_) {
        throw new Error(`Skin ${skinKey} does not exists!`);
      }
    }
  }
}
