#     -n ` == act --dry-run
act `
    -s DOCKERHUB_USER=$env:DOCKERHUB_USER `
    -s DOCKERHUB_TOKEN=$env:DOCKERHUB_TOKEN `
    -P ubuntu-latest=nektos/act-environments-ubuntu:18.04 `
    -P self-hosted=nektos/act-environments-ubuntu:18.04 `
    -j checkout-build-dockerize-and-redeploy