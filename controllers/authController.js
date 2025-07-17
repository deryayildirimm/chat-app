
const authService = require('../services/authService');
const wrap = require('../errors/wrapAsync');



const login = wrap(async (req, res) => {

    const { userName, password } = req.body;
    const msg = await authService.loginUser(userName, password);

    res.status(200).json({ message: msg });
})


const register = wrap(async (req, res) => {
    const { userName, password } = req.body;

    await authService.registerUser(userName, password);
    res.status(201).json({ message: 'Kayıt başarılı' });
})



module.exports = {
    login,
    register
};