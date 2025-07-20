
const authService = require('../services/authService');
const wrap = require('../errors/wrapAsync');

/**
 * @swagger
 *  /api/auth/register:
 *   post:
 *     summary: Kullanıcı kaydı
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               email :
 *                 type : string
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 */

const register = wrap(async (req, res) => {
    const { userName, password ,email } = req.body;

    await authService.registerUser(userName, password, email);
    res.status(201).json({ message: 'Kayıt başarılı' });
})

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Giriş başarılı
 *       401:
 *         description: Giriş bilgileri hatalı
 */
const login = wrap(async (req, res) => {

    const { userName,  password } = req.body;
    const msg = await authService.loginUser(userName, password);

    res.status(200).json({ message: msg });
})





module.exports = {
    login,
    register
};