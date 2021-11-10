const express = require("express");
const PreguntaService = require("../database/services/Pregunta.service");
const gcaptcha = require("../middlewares/gcaptcha");
const router = express.Router();

router.get("*", function(request, response) {
    const usuario = {
        ...request.session.usuario,
        conectado: request.session.usuario !== null && request.session.usuario !== undefined,
        administrador: request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR",
    };
    response.render("contacto", {usuario});
});

router.post("*", gcaptcha, async function(request, response) {
    const usuario = {
        ...request.session.usuario,
        conectado: request.session.usuario !== null && request.session.usuario !== undefined,
        administrador: request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR",
    };
    if (!request.captcha) {
        response.render("contacto", {
            notificacion: "¡No has solucionado el captcha!",
            usuario
        });
        return;
    }
    const status = await PreguntaService.crear({ ...request.body });
    if (status.success) {
        response.render("contacto", {
            notificacion: "¡Se ha enviado correctamente el formulario! Te enviaremos un correo, cuando encontremos una solución.",
            success: true,
            usuario
        });
    } else {
        response.render("contacto", {
            notificacion: status.error,
            usuario
        });
    }
});

module.exports = router;
