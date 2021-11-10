const express = require("express");
const path = require("path");
const ProductoService = require("../../database/services/Producto.service");
const router = express.Router();

async function crearOModificar(request, response) {
    const usuario = {
        ...request.session.usuario,
        conectado: request.session.usuario !== null && request.session.usuario !== undefined,
        administrador: request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR",
    };
    let resultado;
    var modificar = null;
    if (request.body.productoId) {
        resultado = await ProductoService.actualizarProducto(request.body);
        modificar = request.body.productoId;
    } else {
        var imagenes = [];
        if (request.files && request.files.imagenes) {
            var array = Array.isArray(request.files.imagenes) ? request.files.imagenes : [request.files.imagenes];
            for (var file of array) {
                var fileId = Date.now() + file.md5;
                imagenes.push(fileId);
                const result = await new Promise((resolve, reject) => {
                    file.mv(path.join(__dirname, "../../public/productos-img", fileId), function (error) {
                        if (error) {
                            console.log(error);
                            resolve(false);
                            return;
                        }
                        resolve(true);
                    });
                });
                if (!result) {
                    response.render("productos/modificar-producto", {
                        formulario: request.body,
                        registro_estado: true,
                        modificar,
                        error: "¡No se ha logrado subir todas las imágenes!",
                        usuario,
                    });
                    return;
                }
            }
        }

        resultado = await ProductoService.crearProducto({ ...request.body, imagenes });


    }
    
    const data = { formulario: request.body, usuario, registro_estado: true, modificar, ...resultado };
    if (modificar && resultado.success) {
        data.formulario = resultado.data;
    }
    response.render("productos/modificar-producto", data);
}

router.get("/crear", function (request, response) {
    const usuario = {
        ...request.session.usuario,
        conectado: request.session.usuario !== null && request.session.usuario !== undefined,
        administrador: request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR",
    };
    response.render("productos/modificar-producto", { usuario });
});

router.post("/eliminar", async function (request, response) {
    await ProductoService.eliminarProducto(request.body);
    response.redirect("/admin/productos");
});

router.post("/crear", crearOModificar);
router.post("/:id", crearOModificar);

router.get("/:id", async function (request, response, next) {
    const usuario = {
        ...request.session.usuario,
        conectado: request.session.usuario !== null && request.session.usuario !== undefined,
        administrador: request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR",
    };
    if (request.params.id) {
        const productoId = request.params.id;
        const productoEncontrado = await ProductoService.buscarProducto({ id: productoId });
        if (productoEncontrado) {
            response.render("productos/modificar-producto", { usuario, modificar: productoId, formulario: { ...productoEncontrado } });
            return;
        }
    }
    next();
});

router.get("*", async function (request, response) {
    const usuario = {
        ...request.session.usuario,
        conectado: request.session.usuario !== null && request.session.usuario !== undefined,
        administrador: request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR",
    };
    const listaProductos = await ProductoService.mostrarProductos(null);
    response.render("productos/ver-productos", { listaProductos, usuario });
});

module.exports = router;
