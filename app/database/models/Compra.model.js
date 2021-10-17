const { Model, DataTypes } = require("sequelize");

module.exports = class Compra extends Model {
    static init(sequelize) {
        return super.init(
            {
                direccion: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
                total: {
                    type: DataTypes.DOUBLE ,
                    allowNull: false,
                },
                estado: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "compras",
                modelName: "Compra",
            }
        );
    }
    static relacionar(modelos) {
        modelos.Usuario.hasMany(modelos.Compra, { foreignKey: "usuario_id" });
        modelos.Compra.belongsTo(modelos.Usuario, { foreignKey: "usuario_id" });
        
    }
};
