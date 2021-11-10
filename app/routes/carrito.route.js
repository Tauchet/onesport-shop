const express = require("express");
const ProductoService = require("../database/services/Producto.service");
const router = express.Router();

router.get("*", async function (request, response) {
    const carrito = request.session && request.session.carrito ? request.session.carrito : [];
    const carritoVacio = carrito.length == 0;
    response.render("carrito", {carrito, carritoVacio, productos: carritoVacio ? [] : (await ProductoService.buscarProductosPorId(carrito))});
});

router.post("/agregar", async function (request, response) {
    if (request.session) {
        const arreglo = request.session.carrito ? request.session.carrito : [];
        arreglo.push(request.body.id);
        request.session.carrito = arreglo;
    } else {
        request.session.carrito = [request.body.id];
    }
    response.redirect("/producto/" + request.body.id);
});

router.post("/eliminar", async function (request, response) {
    if (request.session) {
        const arreglo = request.session.carrito ? request.session.carrito : [];
        arreglo.splice(arreglo.indexOf(request.body.id), 1);
        request.session.carrito = arreglo;
        console.log(arreglo);
    }
    response.redirect(request.body.redirect_url ? request.body.redirect_url : ("/producto/" + request.body.id));
});

module.exports = router;