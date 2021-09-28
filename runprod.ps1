$imgName = "hustlegotreal/tools:hgrweb-test"

$error.clear()
try { 
    $env:DOCKER_BUILDKIT=0;
    docker build . -f .\dockerfile.prod -o tty -t $imgName
 }
catch { "Error occured" }
if (!$error) { 
    docker run `
    -it `
    --rm `
    -v ${PWD}:/app `
    -v /app/node_modules `
    -p 3001:3000 `
    -e CHOKIDAR_USEPOLLING=true `
    $imgName
 }
