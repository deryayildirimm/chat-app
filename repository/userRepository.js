const User = require('../models/userModel');


async function findByUserName(userName) {
    return await User.findOne({ userName });
}


async function findByEmail(email) {
   return await User.findOne({ email });
}

async function saveUser(user) {
   return await user.save();
}

async function findById(id) {
    return await User.findById(id);
}

async function deleteUserById(id) {
    return await User.findByIdAndDelete(id);
}

async function deleteUserByUsername(userName) {
    return await User.deleteOne({ userName });
}



module.exports = {
    findByEmail,
    findById,
    deleteUserById,
    deleteUserByUsername,
    findByUserName,
    saveUser,
};