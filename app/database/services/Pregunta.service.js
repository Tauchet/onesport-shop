const { Op } = require("sequelize");
const { modelos } = require("../database");
const validator = require("validator");

module.exports = {
    async crear({ email, asunto, descripcion }) {
        //Si se crea el producto
        if (validator.isEmpty(email)) {
            return { error: "Debe ingresar un email", field: "email" };
        }
        if (!validator.isEmail(email)) {
            return { error: "El correo ingresado no existe.", field: "email" };
        }
        if (validator.isEmpty(asunto)) {
            return { error: "Debe ingresar un asunto", field: "asunto" };
        }
        if (validator.isEmpty(descripcion)) {
            return { error: "Debe ingresar una descripción sobre el asunto", field: "descripcion" };
        }
        await modelos.Pregunta.create({
            email,
            asunto,
            descripcion 
        });
        return { success: true };
    },
    async buscar() {
        return await modelos.Pregunta.findAll({
            order: [
                ['createdAt', 'ASC']
            ]});
    },
    async eliminar(id) {
        const entidad = await modelos.Pregunta.findOne({
            where: {
                id: id
            }});
            entidad.destroy();
        return entidad;
    }
}