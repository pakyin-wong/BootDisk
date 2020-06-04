echo Lossy compress images at resource/assets/images...
pngquant --force --ext .png --skip-if-larger resource/assets/images/**/*.png
echo Compression finished

read -n 1 -r -s -p $'Press enter to continue...\n'