const { Model, DataTypes } = require("sequelize");

module.exports = class CategoriaProducto extends Model {
    static init(sequelize) {
        return super.init(
            {
              
              
            },
            {
                sequelize,
                tableName: "categorias_productos",
                modelName: "CategoriaProducto",
            }
        );
    }
    static relacionar(modelos) {
        modelos.Producto.hasMany(modelos.CategoriaProducto,{foreignKey:"producto_id"});
        modelos.CategoriaProducto.belongsTo(modelos.Producto,{foreignKey:"producto_id"});

        modelos.Categoria.hasMany(modelos.CategoriaProducto,{foreignKey:"categoria_id"});
        modelos.CategoriaProducto.belongsTo(modelos.Categoria,{foreignKey:"categoria_id"});

    }
};