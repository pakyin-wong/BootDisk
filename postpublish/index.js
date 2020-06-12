// test whether merging all the js file better than individual files in terms of loading time
// result: same loading time

const fs = require('fs')
const path = require('path')
const minify = require('minify')
const concat = require('concat')
const tryToCatch = require('try-to-catch');
const args = require ('args');
const generateHash = require('random-hash').generateHash

args
.option('path', 'target path');
 
const flags = args.parse(process.argv)

console.log(flags.path);

const options = {
  css: {
      compatibility: '*',
  }
}


void async function() {
  // get target path from arg
  // if (!flags.path) return;

  const targetPath = flags.path || '../bin-release/web/test';

  // minify style.css
  const [error, data] = await tryToCatch(minify, `${targetPath}/style.css`, options);
    
  if (error)
      return console.error(error.message);
  
  fs.writeFileSync(`${targetPath}/style.css`, data);

  // read manifest file
  const manifestData = fs.readFileSync(`${targetPath}/manifest.json`);
  const manifest = JSON.parse(manifestData);

  var list = manifest.initial.concat(manifest.game).map(name=>`${targetPath}/${name}`);

  // concat all js files and write to file
  const hash = generateHash({ length: 8, charset:'abcdefghijklmnopqrstuvwxy0123456' });
  const outputName = `bundle_${hash}.js`
  concat(list, `${targetPath}/${outputName}`);

  // update manifest file
  manifest.initial = [outputName];
  manifest.game = [];
  fs.writeFileSync(`${targetPath}/manifest.json`, JSON.stringify(manifest));
}();