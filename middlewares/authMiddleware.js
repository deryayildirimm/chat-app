const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

const secretKey = '624efb9a7d00aec83b33c3152fd827eabc';

function authenticateToken(req, res, next) {
    
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if(!token) throw new AppError('Token eksik', 401);

   
    try {
    const data = jwt.verify(token, secretKey);
    req.user = data;
    next();
  } catch (err) {
    return next(new AppError("Token geçersiz", 401)); // global error handler yakalar
  }


}