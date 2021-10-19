const express = require("express");
const router = express.Router();

const UsuarioServicio = require("../database/services/Usuario.service");

router.use(function (request, response, next) {
    if (request.session.usuario) {
        response.redirect("/");
        return;
    }
    next();
});

router.get("*", function (request, response) {
    response.render("registro");
});

router.post("*", async function (request, response) {
    const resultado = await UsuarioServicio.registrarUsuario(request.body);
    if (resultado.success) {
        response.render("registro", { registro_estado: true });
        return;
    }
    response.render("registro", { registro_estado: true, ...resultado });
});

module.exports = router;
