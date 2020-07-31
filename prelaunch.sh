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
echo "[prelaunch] started linting (${lastrun}s)"

if test $lastrun -gt 21600; then
    echo "[prelaunch] using case 1"
    # More than 6 hours not linted, force lint all files
    flist="$(find src -name "*.ts")"
    flist="$(echo $flist | tr '\r\n' ' ' | awk '{$1=$1};1')"
    prettier --write $flist && tslint -c tslint.json --fix $flist && $bin $@
else
    # $0[0]=space=unstaged, $0[1]=character=staged (git added)
    # awk ifs:
    # 1. substr($1,1,1) ~ /^M|\?$/  =  is modified or newly added files
    # 2. $2 ~ /\.ts$/  =  is .ts files
    # 3. $2 !~ /\.d\.ts$/  =  is not .d.ts files
    flist="$(git status --porcelain | awk '{ if ( substr($1,1,1) ~ /^M|\?$/ && $2 ~ /\.ts$/ && $2 !~ /\.d\.ts$/ ) print $2 }')"
    flist="$(echo $flist | tr '\r\n' ' ' | awk '{$1=$1};1')"

    if [ ! "$flist" ]; then
        # No unstaged files found, maybe changes are commited?
        commitsahead=$(git rev-list --count origin/$(git rev-parse --abbrev-ref HEAD)..HEAD)
        if test $commitsahead -lt 1; then
            # No commit ahead remote branch, probably no files changed at all
            echo "[prelaunch] using case 2"
            $bin $@
        else
            # no unstaged files, lint all
            echo "[prelaunch] using case 3"
            flist="$(find src -name "*.ts")"
            flist="$(echo $flist | tr '\r\n' ' ' | awk '{$1=$1};1')"
            prettier --write $flist && tslint -c tslint.json --fix $flist && $bin $@
        fi
    else
        echo "[prelaunch] using case 4"
        prettier --write $flist && tslint -c tslint.json --fix $flist && $bin $@
    fi
fi

# if test $lastrun -gt 60; then
#     # greater than 30 seconds
#     echo "[prelaunch] started linting (${lastrun}s)"
#     # $0[0]=space=unstaged, $0[1]=character=staged (git added)
#     flist="$(git status --porcelain | awk '{ if ( (substr($0,1,1) ~ /^[[:space:]]$/ || substr($0,1,1) !~ /^[[:space:]]$/) && $2 ~ /\.ts$/ && $2 !~ /\.d\.ts$/ ) print $2 }')"
#     echo -e "[prelaunch] file list:\n$flist"
#     flist="$(echo $flist | tr '\r\n' ' ' | awk '{$1=$1};1')"
#     if [ ! "$flist" ]; then
#         sleep 1 && prettier --write src/**/*.ts && sleep 0.5 && tslint -c tslint.json --fix 'src/**/*.ts' && sleep 0.5 && $bin $@
#     else
#         sleep 1 && prettier --write $flist && sleep 0.5 && tslint -c tslint.json --fix $flist && sleep 0.5 && $bin $@
#     fi
# else
#     # skip linting
#     echo "[prelaunch] skipped linting for this run (${lastrun}s)"
#     $bin $@
# fi
