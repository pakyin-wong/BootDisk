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
      let filepart: string;
      let filename: string;

      if (value > 1000) {
        filepart = value / 1000 + 'k';
      } else {
        filepart = value + '';
      }

      switch (mode) {
        case we.core.ChipType.CLIP:
          filename = `d_ba_betcontrol_image_clipsset${filepart}_png`;
          break;
        case we.core.ChipType.FLAT:
        default:
          filename = `d_ba_betcontrol_clipsset_flat_${filepart}_png`;
      }

      return filename;
    }
  }
}
