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

//Ruta para crear un producto
router.post("/producto/crear-producto", async function (request, response) {
    const productoCreado = await ProductoServicio.crearProducto(request.body);
    if (productoCreado) {
        response.end(productoCreado);
    } else {
        response.end(productoCreado);
    }
});

//Ruta para editar un producto

router.post("/producto/buscar-producto", async function(request, response){
    const productoEncontrado = await ProductoServicio.buscarProducto(request.body);
    
        if(productoEncontrado != null){
        response.end("Se encontro");
    }else{
        response.end(productoEncontrado);
    }
    //console.log(productoEncontrado);
});

router.post("/producto/actualizar-producto", async function(request,response){
    console.log({productoEncontrado});
});

//Ruta para eliminar un producto
router.post("/producto/eliminar-producto", async function (request, response) {
    const productoEliminado = await ProductoServicio.eliminarProducto(request.body);
    if (productoEliminado) {
        response.end(productoEliminado);
    } else {
        response.end(productoEliminado);
    }
});




module.exports = router;