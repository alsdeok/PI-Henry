const { Router } = require("express");
const get = require("./get");
const post = require("./post");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(get)
router.use(post)

module.exports = router




