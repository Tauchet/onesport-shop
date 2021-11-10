const { Model, DataTypes } = require("sequelize");

module.exports = class Producto extends Model {
    static init(sequelize) {
        return super.init(
            {
                nombre: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
                precio: {
                    type: DataTypes.DOUBLE,
                    allowNull: false,
                },
                descripcion: {
                    type: DataTypes.STRING(1234),
                    allowNull: true,
                },
                unidades_disponibles: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                oferta: {
                    type: DataTypes.INTEGER,
                    allowNull: true
                },
                oferta_descripcion: {
                    type: DataTypes.STRING(1234),
                    allowNull: true,
                }
            },
            {
                sequelize,
                tableName: "productos",
                modelName: "Producto",
            }
        );
    }

};