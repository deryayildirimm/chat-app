const jwt = require('jsonwebtoken');

const secretKey = '624efb9a7d00aec83b33c3152fd827eabc';

function generateToken(user) {
    const payload = {
         userId: user._id,
         email: user.email
    }
    return jwt.sign(payload, secretKey, { expiresIn: "1d" });
}

function verifyToken (token) {
    return jwt.verify(token , secretKey);
}

module.exports = {
    verifyToken,
    generateToken,
}