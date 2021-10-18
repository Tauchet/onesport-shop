const validator = require("validator");
const express = require("express");
const router = express.Router();

const UsuarioServicio = require("../database/services/Usuario.service");

router.get("*", function (request, response) {
    response.render("registro");
});

router.post("*", async function (request, response) {
    if (!validator.isEmail(request.body.email)) {
        response.end("NO ES UN CORREO");
        return;
    }
    const result = await UsuarioServicio.registrarUsuario(request.body);
    if (result) {
        response.end("REGISTRADO");
    } else {
        response.end("YA EXISTE");
    }
});

module.exports = router;
