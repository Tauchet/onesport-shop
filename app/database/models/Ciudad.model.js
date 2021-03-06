const { Model, DataTypes } = require("sequelize");

module.exports = class Ciudad extends Model {
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
                tableName: "ciudades",
                modelName: "Ciudad",
            }
        );
    }
    static relacionar(modelos) {
        modelos.Pais.hasMany(modelos.Ciudad, { foreignKey: "pais_id" });
        modelos.Ciudad.belongsTo(modelos.Pais, { foreignKey: "pais_id" });
    }
};
