const { modelos } = require("../database");
const validator = require("validator");

module.exports = {

        crearProducto ({nombre, precio,descripcion, unidadesDisponibles}){

        //Si se crea el producto
        if(validator.isEmpty(nombre)){
            return "Debe ingresar un nombre";
        }
        if(validator.isEmpty(precio)){
            return "Debe ingresar un precio";
        }
        if(validator.isEmpty(unidadesDisponibles)){
            return "Debe ingresar las unidades disponibles";
        }

        const productoCreado = modelos.Producto.create({
            nombre,
            precio,
            descripcion,
            unidades_disponibles: unidadesDisponibles,
        });

        if(productoCreado){
            return "Se creo";
        }else{
            return false;
        }

        //Si no se crea

    },

    async mostrarProductos(){
        const listaProductos = await modelos.Producto.findAll({
            attributes: ['id','nombre','precio','descripcion','unidades_disponibles']
        });    
        return listaProductos;
    },


    async buscarProducto({id}){
        console.log(id);
        const productoEncontrado = await modelos.Producto.findById(id);
        console.log(productoEncontrado.nombre);
        //return productoEncontrado;

    },

    async eliminarProducto({id}){
        const productoEliminado = await modelos.Producto.destroy({
            where: {
                id: id
            }
        });
        return "Producto eliminado";
    },

};