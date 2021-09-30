$imgName = "hustlegotreal/tools:hgrweb-test"

$error.clear()
try { 
    docker build . -f .\dockerfile -t $imgName
 }
catch { "Error occured" }
if (!$error) { 
    Write-Host "Running on port 3000 - https://localhost:3000"
    docker run -it --rm -p 3000:3000 $imgName
 }
