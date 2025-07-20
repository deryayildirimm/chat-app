const User = require('../models/userModel');
const userRepo = require('../repository/userRepository');
const AppError = require('../errors/AppError');
const errorMessages = require('../constants/errorMessages');



async function registerUser(userName, password, email) {


    const existing = await userRepo.findByUserName(userName);
    if (existing) throw new AppError(errorMessages.USERNAME_ALREADY_EXISTS, 400);

    const existingEmail = await userRepo.findByEmail(email);
    if (existingEmail) throw new AppError(errorMessages.EMAIL_ALREADY_EXISTS, 400);

    if (!password) throw new AppError(errorMessages.PASSWORD_REQUIRED, 400);

    const user = new User({userName, password, email});

    const newUser = await userRepo.saveUser(user);

    return newUser;

}

async function loginUser(userName, password) {

    const user = await userRepo.findByUserName(userName);
    if (!user || user.password !== password) {
        throw new AppError(errorMessages.INVALID_CREDENTIALS, 401);
    }

    return 'Giriş başarılı';

}

module.exports = {
    loginUser,
    registerUser
};