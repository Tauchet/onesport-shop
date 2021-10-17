const { Model, DataTypes } = require("sequelize");

module.exports = class Usuario extends Model {
    static init(sequelize) {
        return super.init(
            {
                nombre: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
                direccion: {
                    type: DataTypes.STRING(1234),
                    allowNull: true,
                },
                email: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
                contrasenia: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
                fechaNacimiento: {
                    type: DataTypes.STRING(1234),
                    allowNull: true,
                },
                tipoUsuario: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "usuarios",
                modelName: "Usuario",
            }
        );
    }
    static relacionar(modelos) {
        modelos.Ciudad.hasMany(modelos.Usuario, { foreignKey: "ciudadId" });
        modelos.Usuario.belongsTo(modelos.Ciudad, { foreignKey: "ciudadId" });
    }
};
