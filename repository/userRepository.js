const users = [] ;

async function findByUserName(userName) {

    return await users.find(u => u.userName === userName);

}

function saveUser(user) {
    users.push(user);
}

module.exports = {
    findByUserName,
    saveUser
};