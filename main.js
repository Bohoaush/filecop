let mdnm = "main";
let logger = require("./modules/logger");

logger.log(mdnm, "INFO", "Initializing...");

require("./modules/filehandler.js");
require("./modules/httphandler.js");

logger.log(mdnm, "INFO", "Fully initialized and ready");
