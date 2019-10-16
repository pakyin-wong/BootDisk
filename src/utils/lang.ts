namespace utils {
  export function getLang(lang: string) {
    const mapping = {
      'en-us': enums.lang.EN,
      'zh-cn': enums.lang.CN,
    };
    return mapping[lang] ? mapping[lang] : enums.lang.EN;
  }
}
