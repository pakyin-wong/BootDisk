echo Lossy compress json at resource/assets/dragonbones...
jszip-cli -c .zipdb.config.json
echo Compression finished

# read -n 1 -r -s -p $'Press enter to continue...\n'