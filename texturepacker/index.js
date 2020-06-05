const fs = require('fs')
const path = require('path')
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
    let images = [];

    images.push({path: "img1.png", contents: fs.readFileSync("./Button/button_up.png")});
    images.push({path: "img2.png", contents: fs.readFileSync("./Button/button_down.png")});
    images.push({path: "img3.png", contents: fs.readFileSync("./Button/d_ro.png")});

    let exporter = {
        fileExt: "json",
        template: "./Egret.mst"
    };

    let options = {
        textureName: "my-texture",
        width: 4096,
        height: 4096,
        fixedSize: false,
        powerOfTwo: true,
        padding: 2,
        allowRotation: true,
        detectIdentical: true,
        allowTrim: false,
        exporter: exporter,
        removeFileExtension: false,
        prependFolderName: true,
        scale: 0.5
    };

    try {
        const files = await texturePacker.packAsync(images, options);
        for(let item of files) {
            console.log(item.name, item.buffer);
            await fs.writeFileSync(item.name, item.buffer);
        }
    } catch(error) {
        console.error('Packaging failed', error);
    }
}();
