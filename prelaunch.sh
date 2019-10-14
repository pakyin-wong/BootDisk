arch=$(uname -s)

echo "args: $@ | arch: $arch"

case "${arch}" in
  Linux*|Darwin*)
    if [ -f "$HOME/.nvm/nvm.sh" ]; then
      source $HOME/.nvm/nvm.sh
    fi
    bin=$(which egret)
  ;;
  CYGWIN*|MINGW32*|MSYS*)
    bin=egret.cmd
  ;;
esac

tslint -c tslint.json --fix 'src/**/*.ts' && $bin $@
