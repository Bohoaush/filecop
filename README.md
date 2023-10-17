# filecop
simple file copier controlled through http requests

### example of request JSON
{
    "id":"cp01",
    "action":"copy/move/delete/rename",
    "source":"filename.ext",
    "destination":"filename.ext",
    "overwrite":"true/false",
    "createdir":"true/false"
}
### example of successful reply
{
    "id":"cp01",
    "status":"success",
    "info":"copied filename.ext to filename.ext"
}
### example of fail reply
{
    "id":"cp01",
    "status":"fail",
    "info":"resource busy"
}
