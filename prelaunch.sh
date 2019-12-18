arch=$(uname -s)

echo "args: $@ | arch: $arch"

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

sleep 1 && prettier --write 'src/**/*.ts' && sleep 0.5 && tslint -c tslint.json --fix 'src/**/*.ts' && sleep 0.5 && $bin $@
