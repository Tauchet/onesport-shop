const express = require("express");
const path = require("path");
const PreguntaService = require("../../database/services/Pregunta.service");
const router = express.Router();

router.get("*", async function (request, response) {
    const usuario = {
        ...request.session.usuario,
        conectado: request.session.usuario !== null && request.session.usuario !== undefined,
        administrador: request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR",
    };
    response.render("preguntas/ver-preguntas", {
        usuario,
        preguntas: await PreguntaService.buscar()
    })
});

router.post("/eliminar", async function (request, response) {
    await PreguntaService.eliminar(request.body.id);
    response.redirect("/admin/preguntas");
});

module.exports = router;