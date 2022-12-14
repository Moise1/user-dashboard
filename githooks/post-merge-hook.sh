#!/bin/sh

changedFiles="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

runOnChange() {
	echo "$changedFiles" | grep -q "$1" && echo -e "$2"
}

runOnChange package-lock.json "\033[35m*******************************************************************************\n* \033[33mpackage-lock.json\033[35m has changed. Run\033[33m npm install\033[35m to update your dependencies. *\n*******************************************************************************"

exit 0
