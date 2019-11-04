namespace we {
  export namespace utils {
    export function getLang(lang: string) {
      const mapping = {
        'en-us': core.lang.EN,
        'zh-cn': core.lang.CN,
      };
      return mapping[lang] ? mapping[lang] : core.lang.EN;
    }
  }
}
