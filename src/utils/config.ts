namespace we {
  export namespace utils {
    export async function getConfig() {
      let text = await this.getText(`./config.json?t=${Date.now()}`);
      let obj = JSON.parse(text);
      try {
        text = await this.getText(`./config.${obj.target}.json?t=${Date.now()}`);
        obj = JSON.parse(text);
      } catch (error) {
        console.error('getConfig error. ' + error + '. Therefore it use ./config.json.');
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
  }
}
