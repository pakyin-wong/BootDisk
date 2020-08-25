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

#####################
##  Git checking
#####################

UPSTREAM="@{u}"
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse $UPSTREAM)
BASE=$(git merge-base @ $UPSTREAM)

gitStatus='diverged'

if [ "$LOCAL" = "$REMOTE" ]; then
    gitStatus='up_to_date'
elif [ "$LOCAL" = "$BASE" ]; then
    gitStatus='pull_needed'
elif [ "$REMOTE" = "$BASE" ]; then
    gitStatus='push_needed'
fi

echo "Git status: $gitStatus"

hasUntrack=$(git diff-index --quiet HEAD -- || echo "yes")

if [ "$hasUntrack" = "yes" ]; then
    if test $lastrun -gt 3600; then
        echo $now > /tmp/egretlastrun.tmp
        flist="$(/usr/bin/find src -name "*.ts")"
        flist="$(echo $flist | tr '\r\n' ' ' | awk '{$1=$1};1')"
        prettier --write $flist && tslint -c tslint.json --fix $flist
    fi
fi

$bin $@

# if test $lastrun -gt 21600; then
#     echo "[prelaunch] using case 1"
#     # More than 6 hours not linted, force lint all files
#     flist="$(/usr/bin/find src -name "*.ts")"
#     flist="$(echo $flist | tr '\r\n' ' ' | awk '{$1=$1};1')"
#     prettier --write $flist && tslint -c tslint.json --fix $flist && $bin $@
# else
#     # $0[0]=space=unstaged, $0[1]=character=staged (git added)
#     # awk ifs:
#     # 1. substr($1,1,1) ~ /^M|\?$/  =  is modified or newly added files
#     # 2. $2 ~ /\.ts$/  =  is .ts files
#     # 3. $2 !~ /\.d\.ts$/  =  is not .d.ts files
#     flist="$(git status --porcelain | awk '{ if ( substr($1,1,1) ~ /^M|\?$/ && $2 ~ /\.ts$/ && $2 !~ /\.d\.ts$/ ) print $2 }')"
#     flist="$(echo $flist | tr '\r\n' ' ' | awk '{$1=$1};1')"

#     if [ ! "$flist" ]; then
#         # No unstaged files found, maybe changes are commited?
#         commitsahead=$(git rev-list --count origin/$(git rev-parse --abbrev-ref HEAD)..HEAD)
#         if test $commitsahead -lt 1; then
#             # No commit ahead remote branch, probably no files changed at all
#             echo "[prelaunch] using case 2"
#             $bin $@
#         else
#             # no unstaged files, lint all
#             echo "[prelaunch] using case 3"
#             flist="$(/usr/bin/find src -name "*.ts")"
#             flist="$(echo $flist | tr '\r\n' ' ' | awk '{$1=$1};1')"
#             prettier --write $flist && tslint -c tslint.json --fix $flist && $bin $@
#         fi
#     else
#         echo "[prelaunch] using case 4"
#         prettier --write $flist && tslint -c tslint.json --fix $flist && $bin $@
#     fi
# fi
