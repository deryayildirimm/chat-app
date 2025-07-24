const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
const errorMessages = require("../constants/errorMessages");

const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {

    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) throw new AppError(errorMessages.TOKEN_MISSING, 401);


    try {
        const user = jwt.verify(token, secretKey);
        req.user = user;
        next();
    } catch (err) {
        return next(new AppError(errorMessages.TOKEN_INVALID, 403));
    }


}

module.exports = authenticateToken;