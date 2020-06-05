echo packing images under resource/assets/images...
cd texturepacker
node index.js
cd ..
echo packing completed
echo Lossless compress images at resource/assets/spritesheet...
optipng resource/assets/spritesheet/**/**/*.png
echo Compression finished

# read -n 1 -r -s -p $'Press enter to continue...\n'