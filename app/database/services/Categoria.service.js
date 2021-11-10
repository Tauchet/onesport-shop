const { modelos } = require("../database");

module.exports = {
    async buscarCategorias() {
        return await modelos.CategoriaProducto.findAll({
            attributes: ["id", "categoria_id"],
            
            include: {
                model: modelos.Categoria,
                as: "Categorium",
                group: ["categoria_id"],
            }
        });
    }
}