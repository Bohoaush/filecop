let mdnm = "filehandler";
let logger = require("./logger.js");
let fs = require("fs");

function figurePath(path) {
    let dir = path.match(/.*\//);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
        logger.log(mdnm, "INFO", "created directory " + dir);
        return();
    } else {
        return();
    }
}

function handleFile(parameters) {
    let response = {id: parameters.id};
    switch(parameters.action) {
        case "copy":
            figurePath(parameters.destination);
            fs.copyFile(parameters.source, parameters.destination, (err) => {
                if (err) {
                    response.status = "fail";
                    response.info = err;
                    logger.log(mdnm, "ERROR", (JSON.stringify(response)));
                    return(response);
                } else {
                    response.status = "success";
                    response.info = "Copied " + parameters.source + " to " + parameters.destination;
                    logger.log(mdnm, "INFO", (JSON.stringify(response)));
                    return(response);
                }
            });
            break;

        case "move":

            break;

        case "rename":

            break;

        case "delete":

            break;

        default:
            response.status = "fail";
            response.info = "unknown action";
            logger.log(response)
            return(response);
            break;
    }
}

module.exports = {
    handleFile
}

logger.log(mdnm, "INFO", "File handler loaded");
