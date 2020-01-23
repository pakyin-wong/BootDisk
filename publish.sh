arch=$(uname -s)

if [ -z "$1" ]
  then
    echo "Please specify the target platform (testing|staging|production)"
    exit 1
elif [ "$1" != "staging" ] && [ "$1" != "production" ] && [ "$1" != "testing" ]; then
    echo "Unknown target platform (testing|staging|production)"
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
cp -rf $path/jslib $target
cp $path/config.$1.json $target

case "${arch}" in
  Linux*|Darwin*)
    sed -i "" "s/\"target\":.*/\"target\": \"$1\",/g" "$target/config.json"
  ;;
  CYGWIN*|MINGW32*|MSYS*|MINGW64*)
    sed -i "s/\"target\":.*/\"target\": \"$1\",/g" "$target/config.json"
  ;;
esac
