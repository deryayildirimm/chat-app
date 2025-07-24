const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

function generateToken(user) {
    const payload = {
         userId: user._id,
         email: user.email
    }
    return jwt.sign(payload, secretKey, { expiresIn });
}

function verifyToken (token) {
    return jwt.verify(token , secretKey);
}

module.exports = {
    verifyToken,
    generateToken,
}