const { modelos } = require("../database");
const bcrypt = require("bcrypt");

module.exports = {
    async registrarUsuario({ nombre, email, password }) {
        // Exista cuenta
        const cantidadUsuarios = await modelos.Usuario.count({ where: { email } });
        if (cantidadUsuarios > 0) {
            return false;
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

        return true;
    },
};
