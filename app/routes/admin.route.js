const express = require("express");
const router = express.Router();

//router.use(require("../middlewares/administrador"));
router.use("/productos", require("./admin/productos.route"));
router.use("/preguntas", require("./admin/preguntas.route"));

module.exports = router;
