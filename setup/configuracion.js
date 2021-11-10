// Cargar documento de configuración
require("dotenv").config();
const database = require("../app/database/database");

async function init() {
    const { Pais, Ciudad } = database.modelos;
    await database.sequelize.sync({ force: true });

    const colombia = await Pais.create({ nombre: "Colombia" });
    const armenia = await Ciudad.create({ nombre: "Armenia", pais_id: colombia.id });

    console.log(colombia, armenia);
    console.log("Se han registrado correctamente las bases de datos.");
    
    return true;

}

init();
