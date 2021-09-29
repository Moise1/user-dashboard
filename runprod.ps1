$imgName = "hustlegotreal/tools:hgrweb-test"

$error.clear()
try { 
    yarn install --mode update-lockfile

    $env:DOCKER_BUILDKIT=0;
    docker build . -f .\production.dockerfile -o tty -t $imgName
 }
catch { "Error occured" }
if (!$error) { 
    docker run `
    -it `
    --rm `
    -v ${PWD}:/app `
    -v /app/node_modules `
    -p 3000:80 `
    -e CHOKIDAR_USEPOLLING=true `
    $imgName
 }
