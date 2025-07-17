const AppError = require("./AppError");
const messages = require('../constants/errorMessages');

class UserNotFoundError extends AppError {

    constructor() {
        super(messages.USER_NOT_FOUND, 404);
    }
}

module.exports = UserNotFoundError;