namespace we {
  export namespace i18n {
    export let lang = 'cn';

    export function t(s: string, ...variables: any[]) {
      function ds(p: any, c: string) {
        const a: string[] = c.split('.');
        if (typeof p === 'object' && s !== '') {
          return ds(p[a.shift()], a.join('.'));
        } else if (typeof p === 'string') {
          return replace(p, variables);
        } else if (typeof p === 'object') {
          return p;
        } else {
          // console.log('miss', s);
          return s;
        }
      }

      return ds(i18n[i18n.lang], s);
    }

    // waiting to be reviewed - if it is right, it will be used to replace this.t()
    export function e(s: string, ...variables: any[]) {
      function ds(p: any, c: string) {
        const a: string[] = c.split('.');
        if (typeof p === 'object' && c !== '') {
          return ds(p[a.shift()], a.join('.'));
        } else if (typeof p === 'string') {
          return replace(p, variables);
        } else if (typeof p === 'object') {
          return p;
        } else {
          return s;
        }
      }

      return ds(i18n[i18n.lang], s);
    }

    function replace(output: string, variables: any[]): string {
      for (let i = 1; i <= variables.length; i++) {
        output = output.replace('$' + i, variables[i - 1]);
      }
      return output;
    }

    export async function setLang(s, isInit: boolean = false) {
      const langCodeList = Object.keys(core.lang).map(key => core.lang[key]);
      if (langCodeList.indexOf(s) < 0) {
        env.language = core.lang.CN;
        i18n.lang = core.lang.CN;
      } else {
        env.language = s;
        i18n.lang = s;
      }
      dir.evtHandler.dispatch(core.Event.NICKNAME_UPDATE);

      if (!isInit) {
        //  && !env._nicknames[env.language]
        const tasks = [
          () =>
            dir.socket.getStaticInitDataAsync(async res => {
              if (res.error) {
              } else {
                if (res.Nicknames) {
                  env.nicknameSet = res.Nicknames;
                }
                if (res.Localizations) {
                  env.localization = res.Localizations;
                }
              }
            }, this),
          () => utils.BannerLoader.loadBanners(),
        ];
        await loadingMgr.load(tasks, { isSequence: true });
      }

      dir.evtHandler.dispatch(core.Event.SWITCH_LANGUAGE, s);
    }

    export function register(item: ui.IRunTimeComponent) {
      dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, item.render, item);
    }

    export function drop(item: ui.IRunTimeComponent) {
      dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, item.render, item);
    }

    export function replaceOdd(string) {
      if (env.language === core.lang.CN || env.language === core.lang.ZH) {
        let re = /([\d\.]+)[ ]?:[ ]?([\d\.]+)/;
        let midText = env.language === core.lang.CN?'赔':'賠';
        let newstr = string.replace(re, `$2${midText}$1`);
        return newstr;
      }
      return string;
    }
    // localization for odd string, objKey (e.g. ba.BANKER)
    export function oddt(objKey) {
      const a: string[] = objKey.split('.');
      if (a.length==2) {
        try {
          const limitSet = env.getBetLimitSet('Live', env.currentSelectedBetLimitIndex);
          const cat = a[0];
          const field = a[1];
          const limits = limitSet.limits[cat];
          const c = a.join('.');
          const newstr = replaceOdd(limits[field].odd);
          return newstr;
        } catch(err) {
          return objKey;
        }
      } else {
        return objKey;
      }
    }
  }
}
