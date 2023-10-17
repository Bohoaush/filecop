mdnm = "logger";
function log(modulename, level, message) {
    let stamp = (new Date()).toLocaleString('cs-CZ');
    let levelenum = 3;
    switch(level) {
        case "INFO":
            levelenum = 1;
            break;
        case "WARN":
            levelenum = 2;
            break;
        default:
            break;
    }
    let logstring = ("[" + stamp + "] [" + level + "] [" + modulename + "]: " + message);
    console.log(logstring);
}

module.exports = {
    log
}

log(mdnm, "INFO", "Logger loaded");
