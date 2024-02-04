const express = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = express.Router();
router.use(validarJWT);


// Todas tienen que pasar por el JWT
// Obtener eventos

router.get('/', getEventos)

// Crear un nuevo evento

router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de inicio es obligatoria').custom(isDate),
        validarCampos

    ], crearEvento);

// Actualizar Evento
router.put('/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de inicio es obligatoria').custom(isDate),
    validarCampos
], actualizarEvento);

// Borrar Evento
router.delete('/:id', eliminarEvento);



module.exports = router;

