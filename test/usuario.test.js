const database = require("../app/database/database");
const UsuarioServicio = require("../app/database/services/Usuario.service");

// Primero que se ejcutaz
beforeAll(async () => {
    
    // Iniciar base de datos
    const { Pais, Ciudad, Usuario } = database.modelos;
    await database.sequelize.sync({ force: true });
    
    const colombia = await Pais.create({ nombre: "Colombia" });
    await Ciudad.create({ nombre: "Armenia", pais_id: colombia.id });

});

test('Crear un usuario', async () => {
  const resultado = await UsuarioServicio.registrarUsuario({ nombre: "Cristian", email: "test@gmail.com", password: "test123!" });
  expect(resultado).toEqual({success: true});
});

test('Crear un usuario con un correo falso', async () => {
  const resultado = await UsuarioServicio.registrarUsuario({ nombre: "Cristian", email: "test...#gmail.com", password: "test123!" });
  expect(resultado).not.toEqual({success: true});
});

test('Crear un usuario con un mismo correo', async () => {

  // Creamos un usuario
  await UsuarioServicio.registrarUsuario({ nombre: "Cristian", email: "test@gmail.com", password: "test123!" });

  // Buscamos un usuario
  const resultado = await UsuarioServicio.registrarUsuario({ nombre: "Cristian 2", email: "test@gmail.com", password: "test123!33" });
  expect(resultado).not.toEqual({success: true});
  
});

test('Intento de logueo', async () => {

  // Creamos un usuario
  const EMAIL = "test@gmail.com";
  const PASSWORD = "test123!33";
  await UsuarioServicio.registrarUsuario({ nombre: "Cristian", email: EMAIL, password: PASSWORD });

  // Intento de logueo
  const resultado = await UsuarioServicio.buscarUsuario({ email: EMAIL, password: PASSWORD })
  expect(resultado.success).not.toBeUndefined();

});