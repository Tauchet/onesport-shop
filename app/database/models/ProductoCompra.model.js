const { Model, DataTypes } = require("sequelize");

module.exports = class ProductoCompra extends Model {
    static init(sequelize) {
        return super.init(
            {
                
                cantidad: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                precio_compra: {
                    type: DataTypes.DOUBLE,
                    defaultValue:0,
                    allowNull: false,
                },
        
            },
            {
                sequelize,
                tableName: "productos_compras",
                modelName: "ProductoCompra",
            }
        );
    }
    static relacionar(modelos) {
        modelos.Producto.hasMany(modelos.ProductoCompra, { foreignKey: "producto_id" });
        modelos.ProductoCompra.belongsTo(modelos.Producto,{foreignKey:"producto_id"});

        modelos.Compra.hasMany(modelos.ProductoCompra,{foreignKey:"compra_id"});
        modelos.ProductoCompra.belongsTo(modelos.Compra,{foreignKey:"compra_id"});
    }
};