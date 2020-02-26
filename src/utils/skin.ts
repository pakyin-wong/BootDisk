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
  }
}
