
const authService = require('../services/authService');
const wrap = require('../errors/wrapAsync');


const register = wrap(async (req, res) => {
    const { userName, password ,email } = req.body;

    await authService.registerUser(userName, password, email);
    res.status(201).json({ message: 'Kayıt başarılı' });
})


const login = wrap(async (req, res) => {

    const { userName,  password } = req.body;
    const result = await authService.loginUser(userName, password);

    res.status(200).json(result);
})





module.exports = {
    login,
    register
};