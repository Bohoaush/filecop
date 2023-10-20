let mdnm = "http";
let http = require("http");
let logger = require("./logger.js");
let filehandler = require("./filehandler.js");

function httpPost(url, data) {
    try {
        let httpRequest = http.request(("http://" + url.replace("::ffff:", "")), (res) => {
            //logger.log(mdnm, "INFO", "got response " + JSON.stringify(res)); TODO fix
        });
        httpRequest.write(JSON.stringify(data));
        httpRequest.end();
    } catch {
        logger.log(mdnm, "ERROR", "Failed to send response");
    }
}

function testAuth(remoteIP) {
    return new Promise((resolve, reject) => {
        for (allowedIP of filehandler.config.allow_requests_from) {
            if (allowedIP === remoteIP) {
                console.log("test" + remoteIP);
                resolve("Access granted to " + remoteIP);
            }
        }
        console.log("test" + remoteIP);
        reject("Acess denied from " + remoteIP);
    });
}

http.createServer(async function (req, res) {
    testAuth(req.socket.remoteAddress).then((msg) => {
        logger.log(mdnm, "INFO", msg);
        let requestData = "";
        req.on('data', function(data) {
            requestData += data;
        });
        req.on('end', function() {
            if (requestData != "") {
                res.writeHead(200, {'Content-Type': 'text/html'});
                filehandler.handleFile(JSON.parse(requestData)).then((response) => {
                    httpPost(req.socket.remoteAddress + filehandler.config.reply_endpoint, response);
                });
                res.write("processing");
                res.end();
            } else {
                res.writeHead(500);
                res.write("no data received");
                logger.log(mdnm, "WARN", "request with no data received!");
                res.end();
            }
        });
    }).catch((rejection) => {
        logger.log(mdnm, "WARN", JSON.stringify(rejection));
        res.writeHead(403);
        res.write(JSON.stringify(rejection));
        res.end();
    });
}).listen(8089);

logger.log(mdnm, "INFO", "Http handler loaded");
