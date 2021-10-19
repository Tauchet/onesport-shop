module.exports = function (request, response, next) {
    if (request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR") {
        next();
        return;
    }
    response.redirect("/");
};
