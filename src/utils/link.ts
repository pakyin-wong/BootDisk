namespace we {
  export namespace utils {
    export function linkTo(linkUrl: string, name?: string, specs?: string) {
      // check the protocol
      const arr = linkUrl.split('/');
      switch (arr[0]) {
        case 'http:':
        case 'https:':
          window.open(linkUrl, name, specs);
          break;
        case 'weweb:':
          // get the scene and the tableid(if any)
          switch (arr[2]) {
            case 'scene':
              if (arr.length > 3) {
                const query = arr[3].split('?');
                const game: string = query[0];

                // check if the game is valid
                egret.log(core.GameName[game]);
                if (core.GameName[game]) {
                  const query = linkUrl.split('?');
                  let data = null;
                  if (query.length > 1) {
                    data = {};
                    const queryParamArray = query[1].split('&');
                    // iterate over parameter array
                    queryParamArray.forEach(function (queryParam) {
                      // split the query parameter over '='
                      const item = queryParam.split('=');
                      data[item[0]] = decodeURIComponent(item[1]);
                    });
                    // print result object
                    console.log(data);
                  }
                  dir.sceneCtr.goto(game, data);
                } else {
                  egret.error('Link is not valid');
                }
              } else {
                egret.error('Link is not valid');
              }
              break;
          }
          // goto the game scene with tableid

          break;
      }
    }
  }
}
