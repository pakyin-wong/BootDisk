namespace utils {
  export async function getConfig() {
    let obj: any = {};
    const configsText = await this.getText('./config.json');
    obj = JSON.parse(<string>configsText);
    console.log(obj);
    try {
      const configsText = await this.getText('./config.' + obj.target + '.json');
      obj = JSON.parse(<string>configsText);
    } catch (error) {
      console.log(error + '. Therefore it use ./config.json.');
    }
    return obj;
  }

  export async function getText(path) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
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
