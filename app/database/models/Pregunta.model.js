const { Model, DataTypes } = require("sequelize");

module.exports = class Pregunta extends Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
                asunto: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                },
                descripcion: {
                    type: DataTypes.STRING(1234),
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: "preguntas",
                modelName: "Pregunta",
            }
        );
    }
 
};