const User = require('../models/userModel');
const userRepo = require('../repository/userRepository');
const AppError = require('../errors/AppError');
const errorMessages = require('../constants/errorMessages');

async function registerUser(userName, passw) {


    const existing = userRepo.findByUserName(userName);
    if (existing) throw new AppError(errorMessages.USERNAME_ALREADY_EXISTS , 400 );
    if (passw == null) throw new AppError(errorMessages.PASSWORD_REQUIRED, 400);

    const user = new User(userName, passw);

    userRepo.saveUser(user);

    return user;

}

async function loginUser() {

    const user = userRepo.findByUserName(userName);
    if (!user || user.password !== password) {
        throw new AppError(errorMessages.INVALID_CREDENTIALS, 401);
    }

    return 'Giriş başarılı';

}

module.exports = {
    loginUser,
    registerUser
};