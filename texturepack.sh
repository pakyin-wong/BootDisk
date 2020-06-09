echo packing images under resource/assets/images...
cd texturepacker
npm install
node index.js
cd ..
echo packing completed
echo Lossless compress images at resource/assets/spritesheet...
optipng resource/assets/spritesheet/**/**/*.png
pngquant --force --ext .png --skip-if-larger resource/assets/nmimages/**/**/*.png
jpegoptim --max=70 resource/assets/nmimages/**/*.jpg
optipng resource/assets/fonts/*.png
optipng resource/assets/dragonbones/**/*.png
optipng resource/assets/dragonbones/**/**/*.png
optipng resource/assets/dragonbones/**/**/**/*.png
echo Compression finished

# read -n 1 -r -s -p $'Press enter to continue...\n'