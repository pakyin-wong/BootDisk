const fs = require('fs')
const path = require('path')
const glob = require('fast-glob')
let texturePacker = require("free-tex-packer-core");
// const arg = require('arg');

// const args = arg({
//     // Types
//     '--help':    Boolean,
//     '--version': Boolean,
//     // '--verbose': arg.COUNT,   // Counts the number of times --verbose is passed
//     '--input': String,

//     // Aliases
//     // '-v':        '--verbose',
//     '-i':        '--input',    // -n <string>; result is stored in --name
// });

// console.log(args["--input"]);
void async function() {
  const configPath = '../texturepacker.config.json';

  const configFile = fs.readFileSync(configPath);
  const directories = JSON.parse(configFile);

  console.log(directories);

  const baseDir = '../resource/assets/images'
  const outBaseDir = '../resource/assets/spritesheet'

  fs.rmdirSync(outBaseDir, {recursive: true});

  const platforms = ['m','d'];
  for (const platform of platforms) {
    for (const item of directories) {
      const dir = item.dir;
      let entries = await glob([`${baseDir}/${platform}/${dir}/**/*.png`])

      entries = entries.map( entry => {
        let dir = path.dirname(entry).replace(`${baseDir}/`, '')
        let name = path.basename(entry).replace('.png', '_png')

        return {
          path: name,
          contents: fs.readFileSync(entry)
        }
      })

      let exporter = {
        fileExt: "json",
        template: "./Egret.mst"
      };

      let options = {
        textureName: dir.replace('/', '_'),
        width: 8192,
        height: 8192,
        fixedSize: false,
        powerOfTwo: true,
        padding: 2,
        allowRotation: false,
        detectIdentical: true,
        allowTrim: false,
        exporter: exporter,
        removeFileExtension: false,
        prependFolderName: true,
        scale: item[platform].scale,
        packer: 'MaxRectsPacker'
      };

      try {
        const files = await texturePacker.packAsync(entries, options);
        for(let item of files) {
          const outDir = `${outBaseDir}/${platform}/${dir.split('/')[0]}`;
          console.log(`${outDir}/${item.name}`);

          fs.mkdirSync(outDir, {recursive: true});
          await fs.writeFileSync(`${outDir}/${item.name}`, item.buffer);
        }
      } catch(error) {
        console.error('Packaging failed', error);
      }
    }
  }
}();
