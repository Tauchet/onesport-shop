const { Op } = require("sequelize");
const { modelos } = require("../database");
const validator = require("validator");

module.exports = {
    async actualizarProducto({ productoId, nombre, precio, descripcion, unidades_disponibles, categorias, oferta = 0, oferta_descripcion = null }) {
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
        if (validator.isEmpty(categorias)) {
            return { error: "Debe al menos existir una categoria", field: "categorias" };
        }

        const productoEncontrado = await modelos.Producto.findOne({ where: { id: productoId }, include: {
            model: modelos.CategoriaProducto,
            as: "CategoriaProductos",
        } });

        if (productoEncontrado === null || productoEncontrado === undefined) {
            return { error: "No existe el producto" };
        }

        const productoCategorias = [];

        if (categorias.length > 1) {

            const removeList = [];
            if (productoEncontrado.CategoriaProductos) {
                for (var item of productoEncontrado.CategoriaProductos) {
                    removeList.push(item.dataValues.categoria_id);
                }
            }

            const listaCategorias = categorias.split(", ");
            for (var i = 0; i < listaCategorias.length; i++) {
                const categoria = listaCategorias[i];
                if (categoria.length > 0) {
                    let categoriaEncontrada = await modelos.Categoria.findOne({ where: { nombre: categoria } });
                    if (categoriaEncontrada === null || categoriaEncontrada === undefined) {
                        categoriaEncontrada = await modelos.Categoria.create({nombre: categoria});
                    }
                    productoCategorias.push(categoria);
                    const itemIndex = removeList.indexOf(categoriaEncontrada.id);
                    if (itemIndex >= 0) {
                        removeList.splice(itemIndex, 1);
                    } else {
                        console.log("CREAR");
                        await modelos.CategoriaProducto.create({
                            producto_id: productoEncontrado.id,
                            categoria_id: categoriaEncontrada.id
                        });
                    }
                    
                }
            }

            for (categoriaId of removeList) {
                (await modelos.CategoriaProducto.findOne({
                    where: {
                        producto_id: productoEncontrado.id,
                        categoria_id: categoriaId
                    }
                })).destroy();
            }

        }

        productoEncontrado.nombre = nombre;
        productoEncontrado.precio = precio;
        productoEncontrado.descripcion = descripcion;
        productoEncontrado.unidades_disponibles = unidades_disponibles;
        productoEncontrado.oferta = oferta;
        productoEncontrado.oferta_descripcion = oferta_descripcion;
        await productoEncontrado.save();

        const producto = productoEncontrado.dataValues;
        producto.categorias = productoCategorias;
        producto.categorias_value = productoCategorias.join(", ");
        console.log("Actualizado", producto);

        return { success: true, data: producto };
    },

    async crearProducto({ nombre, precio, descripcion, unidades_disponibles, oferta = 0, oferta_descripcion = null, imagenes = null, categorias }) {
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
        if (validator.isEmpty(categorias)) {
            return { error: "Debe al menos existir una categoria", field: "categorias" };
        }

        const productoCreado = await modelos.Producto.create({
            nombre,
            precio,
            descripcion,
            unidades_disponibles,
            oferta,
            oferta_descripcion
        });

        if (categorias.length > 1) {
            const listaCategorias = categorias.split(", ");
            for (var i = 0; i < listaCategorias.length; i++) {
                const categoria = listaCategorias[i];
                if (categoria.length > 0) {
                    let categoriaEncontrada = await modelos.Categoria.findOne({ where: { nombre: categoria } });
                    if (categoriaEncontrada === null || categoriaEncontrada === undefined) {
                        categoriaEncontrada = await modelos.Categoria.create({nombre: categoria});
                    }
                    await modelos.CategoriaProducto.create({
                        producto_id: productoCreado.id,
                        categoria_id: categoriaEncontrada.id
                    });
                }
            }
        }

        if (imagenes != null && imagenes.length > 0) {
            for (var imagenId of imagenes) {
                await modelos.Imagen.create({
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

    async buscarProductosPorId(ids) {
        const listaProductos = await modelos.Producto.findAll({
            where: {
                id: {
                    [Op.or]: ids
                }
            }
        });
        return listaProductos;
    },

    async buscarProductosSugeridos(productoId, categorias = []) {
        if (categorias && categorias.length > 0) {
            const itemsCategorias = [];
            const categoriasProductos = await modelos.CategoriaProducto.findAll({
                where: {
                    categoria_id: {
                        [Op.or]: categorias
                    },
                    producto_id: {
                        [Op.not]: productoId
                    }
                },
                include: [{
                    model: modelos.Producto,
                    as: "Producto",
                    include: {
                        model: modelos.Imagen,
                        as: "Imagens",
                    }
                }]
            });
            for (var item of categoriasProductos) {
                itemsCategorias.push(item.Producto.dataValues);
            }
            return itemsCategorias;
        }
        return [];
    },

    async mostrarProductos(busqueda = null, categoriaId = null) {
        
        const where = {};
        if (busqueda != null) {
            where.nombre = {
                [Op.substring]: busqueda
            }
        }

        if (categoriaId != null) {
            const items = await modelos.CategoriaProducto.findAll({
                where: {categoria_id: categoriaId},
                include: [{
                    model: modelos.Producto,
                    as: "Producto",
                    include: {
                        model: modelos.Imagen,
                        as: "Imagens",
                    }
                }],
            });
            const array = [];
            for (var item of items) {
                if (busqueda == null || item.Producto.dataValues.nombre.includes(busqueda)) {
                    array.push(item.Producto);
                }
            }
            return array;
        }

        const listaProductos = await modelos.Producto.findAll({
            where: where,
            include: [{
                model: modelos.Imagen,
                as: "Imagens",
            }, {
                model: modelos.CategoriaProducto,
                as: "CategoriaProductos",
            }],
        });
        return listaProductos;
    },

    async buscarProducto({ id }) {
        const productoEncontrado = await modelos.Producto.findOne({
            where: { id },
            include: [{
                model: modelos.Imagen,
                as: "Imagens",
            }],
        });
        const productoCategorias = await modelos.CategoriaProducto.findAll({
            where: { producto_id: id },
            include: [{
                model: modelos.Categoria,
                as: "Categorium",
            }],
        });
        const producto = productoEncontrado && productoEncontrado.dataValues ? productoEncontrado.dataValues : null;
        producto.categorias = [];
        producto.categoriasIds = [];
        if (productoCategorias != null && productoCategorias.length > 0) {
            for (var item of productoCategorias) {
                producto.categorias.push(item.Categorium.dataValues.nombre);
                producto.categoriasIds.push(item.Categorium.dataValues.id);
            }
        }
        producto.categorias_value = producto.categorias.join(", ");
        console.log(producto);
        return producto;
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
