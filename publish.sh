arch=$(uname -s)

if [ -z "$1" ]
  then
    echo "Please specify the target platform (testing|staging|production|development|release)"
    exit 1
elif [ "$1" != "staging" ] && [ "$1" != "production" ] && [ "$1" != "development" ] && [ "$1" != "testing" ]; then
    echo "Unknown target platform (development|testing|staging|production|release)"
    exit 1
fi

echo "Publish for $1"

path=`dirname "$0"`
target=$path/bin-release/web/$1
echo "path: $path | target: $target"
rm -rf $target
mkdir -p $target

case "${arch}" in
  Linux*|Darwin*)
    if [ -f "$HOME/.nvm/nvm.sh" ]; then
      source $HOME/.nvm/nvm.sh
    fi
    bin=$(which egret)
  ;;
  CYGWIN*|MINGW32*|MSYS*|MINGW64*)
    bin=egret.cmd
  ;;
esac

$bin publish -version $1

echo `cp $path/config.json $target`
cp -f $path/config.json $target
cp -f $path/style.css $target
cp -f $path/swipeup.png $target
cp -rf $path/jslib $target
cp $path/config.$1.json $target
case "${arch}" in
  Linux*|Darwin*)
    sed -i "" "s/\"target\":.*/\"target\": \"$1\",/g" "$target/config.json"
    sed -i "" "s/js\.zip/js\.zip?v=$(date +%s)/g" bin-release/web/$1/index.html
    if [ "$1" == "development" ] || [ "$1" == "staging" ]; then sed -i "" "s/\data-show-fps=\"false\"/data-show-fps=\"true\"/g" bin-release/web/$1/index.html; fi
  ;;
  CYGWIN*|MINGW32*|MSYS*|MINGW64*)
    sed -i "s/\"target\":.*/\"target\": \"$1\",/g" "$target/config.json"
    sed -i "s/js\.zip/js\.zip?v=$(date +%s)/g" bin-release/web/$1/index.html
    if [ "$1" == "development" ] || [ "$1" == "staging" ]; then sed -i "s/\data-show-fps=\"false\"/data-show-fps=\"true\"/g" bin-release/web/$1/index.html; fi
  ;;
esac

#zip /js 
jszip-cli add $target/js > $target/js.zip
# cd $target
# cross-zip js js.zip
# cd ../../..
for i in $(ls $target/js | grep -v jszip); do rm "$target/js/$i"; done;
