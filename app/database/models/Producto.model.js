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
            },
            {
                sequelize,
                tableName: "productos",
                modelName: "Producto",
            }
        );
    }

};