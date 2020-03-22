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

    export function getSkinByClassname(name: string, orientationDependent: boolean = true, fallbackOrientation: string = 'portrait') {
      //   let device = `desktop`;

      //   if (env.isMobile) {
      //     device = `mobile${orientationDependent ? `_${env.orientation.toLowerCase()}` : ''}`;
      //   }
      //   // check current device
      //   return `skin_${device}.${name}`;
      // }

      // export function getSkinByClassnameWithFallbackOrientation(name: string, orientationDependent: boolean = true, fallbackOrientation: string = 'portrait') {
      let device = `desktop`;

      if (env.isMobile) {
        device = `mobile${orientationDependent ? `_${env.orientation.toLowerCase()}` : ''}`;
        const skin = `skin_${device}.${name}`;
        let clazz;
        try {
          clazz = eval(skin);
        } catch (err) {
          return this.getFallbackSkin(name, fallbackOrientation);
        }
        if (!clazz) {
          return this.getFallbackSkin(name, fallbackOrientation);
        }
      }

      // check current device
      return `skin_${device}.${name}`;
    }

    export function getFallbackSkin(name: string, fallbackOrientation: string = 'portrait') {
      try {
        const device = `mobile_${fallbackOrientation}`;
        const clazz = eval(`skin_${device}.${name}`);
        if (!clazz) {
          throw new Error(`Skin ${name} does not exists!`);
        }
        return `skin_${device}.${name}`;
      } catch (err) {
        throw new Error(`Skin ${name} does not exists!`);
      }
    }

    export function assertSkinClassExists(skinClass: string) {
      const clazz = egret.getDefinitionByName(utils.getSkinByClassname(skinClass));
      // const _ = eval(utils.getSkinByClassname(skinClass));
      if (!clazz) {
        throw new Error(`Skin ${skinClass} does not exists!`);
      }
    }
  }
}
