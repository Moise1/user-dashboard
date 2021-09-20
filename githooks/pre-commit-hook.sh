#!/bin/sh




changedFiles="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

runOnChange() {
	echo "$changedFiles" | grep -q "$1" && echo -e "$2"
}


read -r -d '' packageLockWarning <<- EOM
    \033[35m*******************************************************************************
    * \033[33mpackage-lock.json\033[35m has changed. Run\033[33m yarn --ignore-optional\033[35m to update your dependencies. *
    *******************************************************************************
EOM


runOnChange package-lock.json "$packageLockWarning"

echo "NO COMMITS!"
exit 1;

# exit 1