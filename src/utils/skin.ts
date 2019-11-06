namespace we {
  export namespace utils {
    export function getSkin(name: string) {
      const device: string = 'desktop';

      // check current device
      return `resource/skin_${device}/${name}.exml`;
    }
  }
}
