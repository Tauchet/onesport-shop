const express = require("express");
const router = express.Router();

router.use(require("../middlewares/administrador"));
router.use("/productos", require("./admin/productos.route"));

module.exports = router;
