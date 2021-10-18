const Sequelize = require("sequelize");

// Declarar las conexiones
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logQueryParameters: true,
});

// Declarar los modelos
const modelos = {
    Pais: require("./models/Pais.model").init(sequelize),
    Ciudad: require("./models/Ciudad.model").init(sequelize),
    Usuario: require("./models/Usuario.model").init(sequelize),
    Compra: require("./models/Compra.model").init(sequelize),
    Producto: require("./models/Producto.model").init(sequelize),
    ProductoCompra: require("./models/ProductoCompra.model").init(sequelize),
    Imagen: require("./models/Imagen.model").init(sequelize),
    Telefono: require("./models/Telefono.model").init(sequelize),
    Categoria: require("./models/Categoria.model").init(sequelize),
    CategoriaProducto: require("./models/CategoriaProducto.model").init(sequelize),
};

// Conectar las relaciones
for (var modeloNombre in modelos) {
    var modelo = modelos[modeloNombre];
    if (typeof modelo.relacionar === "function") {
        modelo.relacionar(modelos);
    }
}

module.exports = {
    modelos,
    sequelize,
};
