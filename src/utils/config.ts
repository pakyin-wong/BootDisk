namespace we {
  export namespace utils {
    export async function getConfig() {
      let obj: any = {};
      const configsText = await this.getText(`./config.json?t=${Date.now()}`);
      obj = JSON.parse(<string> configsText);
      console.log(obj);
      try {
        const configsText = await this.getText(`./config.${obj.target}.json?t=${Date.now()}`);
        obj = JSON.parse(<string> configsText);
      } catch (error) {
        console.log(error + '. Therefore it use ./config.json.');
      }
      return obj;
    }

    export async function getText(path) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject('Config::getText() cannot read ' + path);
            }
          }
        };
        xhr.open('GET', path);
        xhr.send();
      });
    }

    export function getChipImage(value: number, mode): string {
      let faceString: string;
      let filename: string;

      if (value > 1000) {
        faceString = value / 1000 + 'k';
      } else {
        faceString = value + '';
      }

      switch (mode) {
        case we.core.ChipType.CLIP:
          filename = we.core.ChipSetInfo.clip + we.core.ChipSetInfo.HKD.set1[faceString] + '_png';
          break;
        case we.core.ChipType.FLAT:
          filename = we.core.ChipSetInfo.flat + we.core.ChipSetInfo.HKD.set1[faceString] + '_png';
          break;
        case we.core.ChipType.BETTING:
        default:
          filename = we.core.ChipSetInfo.betting + '_png';
      }

      return filename;
    }
  }
}
