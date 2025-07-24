const messages = require('../constants/errorMessages');

function errorHandler(err, req, res, next) {

    const status = err.statusCode || 500 ;
    const message = err.message || messages.INTERNAL_SERVER_ERROR;

    console.error(`[ERROR] ${req.method} ${req.url} → ${message}`);

    res.status(status).json({
       err : message,
    });

}

module.exports = errorHandler;