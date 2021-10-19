const { Op } = require("sequelize");
const { modelos } = require("../database");
const validator = require("validator");

module.exports = {
    async actualizarProducto({ productoId, nombre, precio, descripcion, unidades_disponibles }) {
        //Si se crea el producto
        if (validator.isEmpty(nombre)) {
            return { error: "Debe ingresar un nombre", field: "nombre" };
        }
        if (validator.isEmpty(precio)) {
            return { error: "Debe ingresar un precio", field: "precio" };
        }
        if (validator.isEmpty(unidades_disponibles)) {
            return { error: "Debe ingresar las unidades disponibles", field: "unidadesDisponibles" };
        }

        const productoEncontrado = await modelos.Producto.findOne({ where: { id: productoId } });
        if (productoEncontrado === null || productoEncontrado === undefined) {
            return { error: "No existe el producto" };
        }

        productoEncontrado.nombre = nombre;
        productoEncontrado.precio = precio;
        productoEncontrado.descripcion = descripcion;
        productoEncontrado.unidades_disponibles = unidades_disponibles;
        await productoEncontrado.save();

        return { success: true, data: productoEncontrado.dataValues };
    },

    async crearProducto({ nombre, precio, descripcion, unidades_disponibles, imagenes = null }) {
        //Si se crea el producto
        if (validator.isEmpty(nombre)) {
            return { error: "Debe ingresar un nombre", field: "nombre" };
        }
        if (validator.isEmpty(precio)) {
            return { error: "Debe ingresar un precio", field: "precio" };
        }
        if (validator.isEmpty(unidades_disponibles)) {
            return { error: "Debe ingresar las unidades disponibles", field: "unidadesDisponibles" };
        }

        const productoCreado = await modelos.Producto.create({
            nombre,
            precio,
            descripcion,
            unidades_disponibles: unidades_disponibles,
        });

        if (imagenes != null && imagenes.length > 0) {
            for (var imagenId of imagenes) {
                const imagenCreada = await modelos.Imagen.create({
                    url_imagen: imagenId,
                    producto_id: productoCreado.id,
                });
            }
        }

        if (productoCreado === null || productoCreado === undefined) {
            return { error: "Ha ocurrido un error inesperado." };
        }
        return { success: true, data: productoCreado.dataValues };
    },

    async mostrarProductos(busqueda = null) {
        const where =
            busqueda == null
                ? {}
                : {
                      nombre: {
                          [Op.substring]: busqueda,
                      },
                  };
        const listaProductos = await modelos.Producto.findAll({
            attributes: ["id", "nombre", "precio", "descripcion", "unidades_disponibles"],
            where: where,
            include: {
                model: modelos.Imagen,
                as: "Imagens",
            },
        });
        return listaProductos;
    },

    async buscarProducto({ id }) {
        const productoEncontrado = await modelos.Producto.findOne({
            where: { id },
            include: {
                model: modelos.Imagen,
                as: "Imagens",
            },
        });
        return productoEncontrado && productoEncontrado.dataValues ? productoEncontrado.dataValues : false;
    },

    async eliminarProducto({ id }) {
        await modelos.Producto.destroy({
            where: {
                id: id,
            },
        });
        return true;
    },
};
