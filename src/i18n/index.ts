namespace i18n {
  export let lang = 'sc';

  export function t(s: string) {
    function ds(p: any, c: string) {
      const a: string[] = c.split('.');
      if (typeof p === 'object' && s !== '') {
        return ds(p[a.shift()], a.join('.'));
      } else if (typeof p === 'string' || typeof p === 'object') {
        return p;
      } else {
        return s;
      }
    }

    return ds(i18n[i18n.lang], s);
  }

  export function setLang(s) {
    i18n.lang = s;
    dir.evtHandler.dispatch(enums.i18n.event.SWITCH_LANGUAGE, s);
  }
}
