echo zip json at resource/assets/dragonbones...
jszip-cli -c .zipdb.d.config.json
jszip-cli -c .zipdb.m.config.json
echo Compression finished

# read -n 1 -r -s -p $'Press enter to continue...\n'