const express = require("express");
const router = express.Router();

const UsuarioServicio = require("../database/services/Usuario.service");
const gcaptcha = require("../middlewares/gcaptcha");

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

router.post("*", gcaptcha,async function (request, response) {
    const resultado = await UsuarioServicio.registrarUsuario(request.body);
    if (!request.captcha) {
        response.render("registro", {
            registro_estado: true,
            error: "¡No has solucionado el captcha!"
        });
        return;
    }
    if (resultado.success) {
        response.render("registro", { registro_estado: true });
        return;
    }
    response.render("registro", { registro_estado: true, ...resultado });
});

module.exports = router;
