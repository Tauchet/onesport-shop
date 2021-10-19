const bcrypt = require("bcrypt");
const express = require("express");
const UsuarioService = require("../database/services/Usuario.service");
const router = express.Router();

router.use(function (request, response, next) {
    if (request.session.usuario) {
        response.redirect("/");
        return;
    }
    next();
});

router.get("*", function (request, response) {
    response.render("login");
});

router.post("*", async function (request, response) {
    let resultado = await UsuarioService.buscarUsuario(request.body);
    if (resultado.success) {
        const match = await bcrypt.compare(request.body.password, resultado.data.contrasenia);
        if (match) {
            request.session.usuario = {
                id: resultado.data.id,
                tipo: resultado.data.tipo_usuario,
                nombre: resultado.data.nombre,
            };
            response.redirect("/");
            return;
        }
        resultado = { error: "El correo ingresado no se ha encontrado.", field: "email" };
    }
    response.render("login", { peticion_estado: true, ...resultado });
});

module.exports = router;
