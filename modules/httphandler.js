let mdnm = "http";
let http = require("http");
let logger = require("./logger.js");
let filehandler = require("./filehandler.js");

http.createServer(async function (req, res) {
    let requestData = "";
    req.on('data', function(data) {
        requestData += data;
    });
    req.on('end', function() {
        if (requestData != "") {
            res.writeHead(200, {'Content-Type': 'text/html'});
            filehandler.handleFile(JSON.parse(requestData));
            res.write("processing");
            res.end();
        } else {
            res.writeHead(500);
            res.write("no data received");
            logger.log(mdnm, "WARN", "request with no data received!");
            res.end();
        }
    });
}).listen(8089);

function httpPost(url, data) {
    try {
        let httpRequest = newXMLHttpRequest();
        httpRequest.open("POST", url, false);
        httpRequest.send(data);
        logger.log(mdnm, "INFO", "GOT " + httpRequest.responseText);
    } catch {
        logger.log(mdnm, "ERROR", "Failed to send response");
    }
}

logger.log(mdnm, "INFO", "Http handler loaded");
