// Cargar documento de configuración
require("dotenv").config();
const database = require("../app/database/database");

async function init() {
    await database.sequelize.sync({ force: true });
}

init();
