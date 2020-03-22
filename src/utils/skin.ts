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
