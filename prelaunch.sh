now=$(date +'%s')
arch=$(uname -s)

echo "[prelaunch] args: $@ | arch: $arch"

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

lastrun=0
if [ -f /tmp/egretlastrun.tmp ]; then
    lastrun=$(cat /tmp/egretlastrun.tmp)
fi
lastrun=$(expr $now - $lastrun)

echo $now > /tmp/egretlastrun.tmp

if test $lastrun -gt 60; then
    # greater than 30 seconds
    echo "[prelaunch] started linting (${lastrun}s)"
    sleep 1 && prettier --write 'src/**/*.ts' && sleep 0.5 && tslint -c tslint.json --fix 'src/**/*.ts' && sleep 0.5 && $bin $@
else
    # skip linting
    echo "[prelaunch] skipped linting for this run (${lastrun}s)"
    $bin $@
fi
