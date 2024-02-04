const express = require('express');
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();



router.post('/new',
    [// Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 carácteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);


router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 carácteres').isLength({ min: 6 }),
        validarCampos

    ], loginUsuario);


router.get('/renew', [

    validarCampos,
    validarJWT

], revalidarToken);


module.exports = router;