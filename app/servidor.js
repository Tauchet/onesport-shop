require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

// Configuración de aplicación
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded());

// Rutas
app.use("/login", require("./routes/login.route"));
app.use("/registro", require("./routes/registro.route"));
app.use("/producto", require("./routes/producto.route"));
app.get("*", function (request, response) {
    response.send("NOT FOUND!");
});

// Inicializar servidor
app.listen(80);
