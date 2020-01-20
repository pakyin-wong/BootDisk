namespace we {
  export namespace utils {
    export function getQueryParams(queryStr: string) {
      const data = {};
      const queryParamArray = queryStr.split('&');
      // iterate over parameter array
      queryParamArray.forEach(function (queryParam) {
        // split the query parameter over '='
        const item = queryParam.split('=');
        data[item[0]] = decodeURIComponent(item[1]);
      });
      return data;
    }
    export function linkTo(linkUrl: string, name?: string, specs?: string) {
      // check the protocol
      const querySplit = linkUrl.split('?');
      let data = {};
      if (querySplit.length === 2) {
        data = getQueryParams(querySplit[1]);
      }
      const arr = querySplit[0].split('/');

      switch (arr[0]) {
        case 'http:':
        case 'https:':
          window.open(linkUrl, name, specs);
          break;
        case 'weweb:':
          // get the scene and the tableid(if any)
          // arr[2] - scene
          const scene = arr.length > 2 ? arr[2] : null;
          // arr[3] - page
          const page = arr.length > 3 ? arr[3] : null;
          // arr[4] - tab
          const tab = arr.length > 4 ? arr[4] : null;

          if (scene && core.GameName[scene]) {
            if (page) {
              data['page'] = page;
            }
            if (tab) {
              data['tab'] = tab;
            }
            dir.sceneCtr.goto(scene, data);
          } else {
            egret.error('Link is not valid');
          }
          break;
        default:
          egret.error('Link is not valid');
          break;
      }
    }
  }
}
