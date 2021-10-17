const { Model, DataTypes } = require("sequelize");

module.exports = class Pais extends Model {
    static init(sequelize) {
        return super.init(
            {
                nombre: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "paises",
                modelName: "Pais",
            }
        );
    }
};
