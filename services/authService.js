const User = require('../models/userModel');
const userRepo = require('../repository/userRepository');
const AppError = require('../errors/AppError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const errorMessages = require('../constants/errorMessages');
const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const { response } = require('express');


async function registerUser(userName, password, email) {

    const saltRound = 10;

    const existing = await userRepo.findByUserName(userName);
    if (existing) throw new AppError(errorMessages.USERNAME_ALREADY_EXISTS, 400);

    const existingEmail = await userRepo.findByEmail(email);
    if (existingEmail) throw new AppError(errorMessages.EMAIL_ALREADY_EXISTS, 400);

    if (!password) throw new AppError(errorMessages.PASSWORD_REQUIRED, 400);

    const hashPassword = await bcrypt.hash(password, saltRound);

    const user = new User({
        userName,
        password : hashPassword,
        email
    });

    const newUser = await userRepo.saveUser(user);

    return newUser;

}

async function loginUser(userName, password) {

    const user = await userRepo.findByUserName(userName);
   
    if (!user)  throw new UserNotFoundError(errorMessages.USER_NOT_FOUND, 401);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new AppError(errorMessages.INVALID_PASSWORD, 401);

    const token = generateToken(user);

    return {
        message : 'Giriş başarılı',
        token,
        user : {
            userName : user.userName,
            email : user.email,
        },
    };

}

module.exports = {
    loginUser,
    registerUser
};