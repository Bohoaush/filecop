let mdnm = "main";
let logger = require("./modules/logger");
let files = require("./modules/filehandler.js");

logger.log(mdnm, "INFO", "Initializing...");
require("./modules/httphandler.js");

files.readSettings().then(() => {
    logger.log(mdnm, "INFO", "Fully initialized and ready");
});
