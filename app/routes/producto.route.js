const express = require("express");
const router = express.Router();

const ProductoServicio = require("../database/services/Producto.service");
//ruta pagina principal de productos
router.get("/producto", function (request, response) {  
    response.render("producto/producto");
});
//Ruta para listar productos
router.get("/producto/listar-productos", async function (request, response) {
    const listaProductos = await ProductoServicio.mostrarProductos();
    response.render("producto/producto", { listaProductos: listaProductos });
});

//Ruta para eliminar un producto
router.post("/producto/eliminar-producto/:id", async function (request, response) {
    console.log('hola');
    const productoEliminado = await ProductoServicio.eliminarProducto(request.body);
    response.render('producto/listar-productos');

    if (productoEliminado) {
        response.render("producto");
    } else {
        response.render("producto");
    }

});

//Ruta para crear un producto
router.post("/crearProducto", async function (request, response) {

    const productoCreado = await ProductoServicio.crearProducto(request.body);
    if (productoCreado) {
        response.end(productoCreado);
    } else {
        response.end(productoCreado);
    }


});

module.exports = router;