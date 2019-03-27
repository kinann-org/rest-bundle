(function(exports) {
    const {
        LEVEL,
    } = require('triple-beam');
    const {
        createLogger,
        format,
        transports,
    } = require("winston");
    const path = require('path');

    const LEVELS = {
        info: 'I',
        warn: 'WARN',
        error: 'ERROR',
        debug: 'D',
    };
    const customFormat = format.printf(info => {
        return `${info.timestamp} ${LEVELS[info.level]} ${info.message}`;
    });
    var consoleWarnLevels = ['info', 'warn', 'error', 'debug'];
    var consoleTransport = new transports.Console({
        consoleWarnLevels, // log all to stderr
    });
    var _logger;
    _logger = createLogger({
        format: format.combine(
            format.timestamp({
                format: 'YYYYMMDD HH:mm:ss',
            }),
            customFormat,
        ),
        transports: [ consoleTransport ],
    });
    if (process.env.NODE_ENV !== 'production') {
        //_logger.add(new transports.Console());
    }

    module.exports = exports.logger = _logger;

})(typeof exports === "object" ? exports : (exports = {}));
