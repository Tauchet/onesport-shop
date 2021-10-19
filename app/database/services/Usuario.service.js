const validator = require("validator");
const { modelos } = require("../database");
const bcrypt = require("bcrypt");

module.exports = {
    async buscarUsuario({ email, password }) {
        if (validator.isEmpty(email)) {
            return { error: "No se ha ingresado un correo electronico.", field: "email" };
        }
        if (validator.isEmpty(password)) {
            return { error: "No se ha ingresado la contraseña.", field: "password" };
        }
        if (!validator.isEmail(email)) {
            return { error: "El correo ingresado no existe.", field: "email" };
        }
        const usuario = await modelos.Usuario.findOne({ where: { email: email } });
        if (usuario === null || usuario === undefined) {
            return { error: "No se ha encontrado la cuenta correspondiente.", field: "email" };
        }
        return { success: true, data: usuario.dataValues };
    },
    async registrarUsuario({ nombre, email, password }) {
        // Validaciones de un formulario
        if (validator.isEmpty(nombre)) {
            return { error: "No se ha ingresado un nombre.", field: "nombre" };
        }
        if (validator.isEmpty(email)) {
            return { error: "No se ha ingresado un correo electronico.", field: "email" };
        }
        if (validator.isEmpty(password)) {
            return { error: "No se ha ingresado la contraseña.", field: "password" };
        }
        if (!validator.isEmail(email)) {
            return { error: "El correo ingresado no existe.", field: "email" };
        }

        // Exista cuenta
        const cantidadUsuarios = await modelos.Usuario.count({ where: { email } });
        if (cantidadUsuarios > 0) {
            return { error: "Ya existe una cuenta con este correo." };
        }

        // Crear cuenta
        const passwordHash = await bcrypt.hash(password, 10);
        await modelos.Usuario.create({
            nombre,
            email,
            contrasenia: passwordHash,
            tipo_usuario: "USUARIO",
            ciudad_id: 1,
        });

        return { success: true };
    },
};
