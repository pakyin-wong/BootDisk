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

# if test $lastrun -gt 60; then
    # greater than 30 seconds
    echo "[prelaunch] started linting (${lastrun}s)"
    # $0[0]=space=unstaged, $0[1]=character=staged (git added)
    flist="$(git status --porcelain | awk '{ if ( (substr($0,1,1) ~ /^[[:space:]]$/ || substr($0,1,1) !~ /^[[:space:]]$/) && $2 ~ /\.ts$/ && $2 !~ /\.d\.ts$/ ) print $2 }')"
    echo -e "[prelaunch] file list:\n$flist"
    flist="$(echo $flist | tr '\r\n' ' ' | awk '{$1=$1};1')"
    # if [ ! "$flist" ]; then
        sleep 1 && prettier --write src/**/*.ts && sleep 0.5 && tslint -c tslint.json --fix 'src/**/*.ts' && sleep 0.5 && $bin $@
    # else
    #     sleep 1 && prettier --write $flist && sleep 0.5 && tslint -c tslint.json --fix $flist && sleep 0.5 && $bin $@
    # fi
# else
#     # skip linting
#     echo "[prelaunch] skipped linting for this run (${lastrun}s)"
#     $bin $@
# fi
