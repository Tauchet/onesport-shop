const { Model, DataTypes } = require("sequelize");

module.exports = class Telefono extends Model {
    static init(sequelize) {
        return super.init(
            {
                telefono: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
              
            },
            {
                sequelize,
                tableName: "telefonos",
                modelName: "Telefono",
            }
        );
    }
    static relacionar(modelos) {
        modelos.Usuario.hasMany(modelos.Telefono,{foreignKey:"usuario_id"});
        modelos.Telefono.belongsTo(modelos.Usuario,{foreignKey:"usuario_id"});
    }
};