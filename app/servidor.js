require("dotenv").config();
const session = require("express-session");
const path = require("path");
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const ProductoService = require("./database/services/Producto.service");

const hbs = require("hbs");
const hbsutils = require("hbs-utils")(hbs);

hbsutils.registerPartials(path.join(__dirname, "components"));

// Configuración de aplicación
app.use(fileUpload());
app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.HOST_PASSWORD,
        resave: false,
        saveUninitialized: true,
    })
);

// Rutas
app.use("/cerrar", require("./routes/cerrar.route"));
app.use("/login", require("./routes/login.route"));
app.use("/registro", require("./routes/registro.route"));
app.use("/admin", require("./routes/admin.route"));

app.get("/producto/:id", async function (request, response) {
    const usuario = {
        ...request.session.usuario,
        conectado: request.session.usuario !== null && request.session.usuario !== undefined,
        administrador: request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR",
    };
    if (request.params.id) {
        const productoId = request.params.id;
        const producto = await ProductoService.buscarProducto({ id: productoId });
        if (producto) {
            response.render("producto", { usuario, ...producto });
            return;
        }
    }
    next();
});

// Ruta por defecto
app.get("*", async function (request, response) {
    const productos = await ProductoService.mostrarProductos(request.query && request.query.busqueda ? request.query.busqueda : null);
    const usuario = {
        ...request.session.usuario,
        conectado: request.session.usuario !== null && request.session.usuario !== undefined,
        administrador: request.session.usuario && request.session.usuario.tipo === "ADMINISTRADOR",
    };
    response.render("inicio", {
        usuario,
        productos,
    });
});

// Inicializar servidor
app.listen(80);
