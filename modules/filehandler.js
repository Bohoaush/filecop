let mdnm = "filehandler";
let logger = require("./logger.js");
let fs = require("fs");

function readSettings() {
    return new Promise((resolve, reject) => {
        fs.readFile("./settings.json", function(err, data) {
            if (err) {
                logger.log(mdnm, "ERROR", "Unable to read settings"); //TODO generate new settings file
                reject();
            }
            if (data != null) {
                module.exports.config = JSON.parse(data);
                logger.log(mdnm, "INFO", "Loaded settings from file");
                resolve();
            }
        });
    });
}

function figurePath(path) {
    let dir = path.match(/.*\//)[0];
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
        logger.log(mdnm, "INFO", "created directory " + dir);
        return;
    } else {
        return;
    }
}

async function handleFile(parameters) {
    return new Promise((resolve) => {
        let response = {id: parameters.id};
        switch(parameters.action) {
            case "copy":
                if (parameters.createdir) {
                    figurePath(parameters.destination);
                }
                if (!parameters.overwrite && fs.existsSync(parameters.destination)) {
                    response.status = "fail";
                    response.info = "Not overwriting destination file";
                    logger.log(mdnm, "ERROR", JSON.stringify(response));
                    resolve(response);
                } else {
                    fs.copyFile(parameters.source, parameters.destination, (err) => {
                        if (err) {
                            response.status = "fail";
                            response.info = err;
                            logger.log(mdnm, "ERROR", (JSON.stringify(response)));
                            resolve(response);
                        } else {
                            response.status = "success";
                            response.info = "Copied " + parameters.source + " to " + parameters.destination;
                            logger.log(mdnm, "INFO", (JSON.stringify(response)));
                            resolve(response);
                        }
                    });
                }
                break;

            case "rename":
                if (parameters.createdir) {
                    figurePath(parameters.destination);
                }
                if (!parameters.overwrite && fs.existsSync(parameters.destination)) {
                    response.status = "fail";
                    response.info = "Not overwriting destination file";
                    logger.log(mdnm, "ERROR", JSON.stringify(response));
                    resolve(response);
                } else {
                    fs.rename(parameters.source, parameters.destination, (err) => {
                        if (err) {
                            response.status = "fail";
                            response.info = err;
                            logger.log(mdnm, "ERROR", (JSON.stringify(response)));
                            resolve(response);
                        } else {
                            response.status = "success";
                            response.info = "Renamed " + parameters.source + " to " + parameters.destination;
                            logger.log(mdnm, "INFO", (JSON.stringify(response)));
                            resolve(response);
                        }
                    });
                }
                break;

            case "delete":
                fs.unlink(parameters.source, (err) => {
                    if (err) {
                        response.status = "fail";
                        response.info = err;
                        logger.log(mdnm, "ERROR", (JSON.stringify(response)));
                        resolve(response);
                    } else {
                        response.status = "success";
                        response.info = "Deleted " + parameters.source;
                        logger.log(mdnm, "INFO", (JSON.stringify(response)));
                        resolve(response);
                    }
                });
                break;

            default:
                response.status = "fail";
                response.info = "unknown action";
                logger.log(response)
                resolve(response);
                break;
        }
    });
}

module.exports = {
    handleFile,
    readSettings,
    config: {}
}

logger.log(mdnm, "INFO", "File handler loaded");
