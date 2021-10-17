const { Model, DataTypes } = require("sequelize");

module.exports = class Imagen extends Model {
    static init(sequelize) {
        return super.init(
            {
                url_imagen: {
                    type: DataTypes.STRING(1234),
                    allowNull: true,
                },
              
            },
            {
                sequelize,
                tableName: "imagenes",
                modelName: "Imagen",
            }
        );
    }
    static relacionar(modelos) {
        modelos.Producto.hasMany(modelos.Imagen,{foreignKey:"producto_id"});
        modelos.Imagen.belongsTo(modelos.Producto,{foreignKey:"producto_id"});
    }
};