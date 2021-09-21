#!/bin/sh


# printf "Hello from the hook!"


changedFiles="$(git diff-tree -r --name-status --no-commit-id ORIG_HEAD HEAD)"

changedFilesNoStatus="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

printf "$changedFiles\n"

runOnChange() {
	echo "$changedFiles" | grep -q "$1" && echo -e "$2"
}

haschanged() {
    # we are only interested in modified or added status, not deleted.
  exists=$(echo "$changedFiles" | grep -E "[AM].*$1.*");
  if [ -z $exists ]
  then
    # 1 = false
    return 1
  else
    # 0 = true    
    
    return 0
  fi
}


if haschanged "package-lock.json"; then
    printf "USE YARN TO INSTALL PACKAGES, NOT NPM: \033[33m yarn --ignore-optional \033[35m !. \033[31m Delete \033[35m your \033[31m package-lock.json \033[35m file.\n"
    exit 1;
fi

npx tsc
yarn lint
git add $changedFilesNoStatus

#warn "caca"
#TXT=$(warn "package-lock.json") && runOnChange package-lock.json "$TEXT"
#TXT=$(warn "yarn-lock.json") && runOnChange yarn-lock.json "$TEXT"

# run tests, or whatever..

# yarn --ignore-optional
# yarn build

# echo "All good, commit is fine."
# exit 1