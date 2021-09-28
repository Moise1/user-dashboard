$imgName = "hustlegotreal/tools:hgrweb-test"

$error.clear()
try { 
    docker build . -f .\dockerfile -t $imgName
 }
catch { "Error occured" }
if (!$error) { 
    Write-Host "Running on port 1337 - https://localhost:1337"
    docker run -it --rm -p 1337:80 $imgName
 }
