namespace we {
  export namespace utils {
    export function getSkin(name: string) {
      let device = `desktop`;

      if (env.isMobile) {
        device = `mobile_${env.orientation.toLowerCase()}`;
      }

      // check current device
      return `resource/skin_${device}/${name}.exml`;
    }

    export function getSkinByClassname(name: string) {
      let device = `desktop`;

      if (env.isMobile) {
        device = `mobile_${env.orientation.toLowerCase()}`;
      }
      // check current device
      return `skin_${device}.${name}`;
    }
  }
}
