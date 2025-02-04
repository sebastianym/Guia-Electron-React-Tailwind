// backend/server.js
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const sequelize = require('./db');
const syncDb = require('./sync');
const Usuario = require('./models/Usuario');

const app = express();

// Configuración de variables de entorno
const PORT = process.env.PORT || 3002;
const JWT_SECRET = "d1748063fb4032af92d1e3637a858fc79a44e7db7c9171defc4b61e853601ca18e276601671369d13998d05900f2ca4e4628cd6f621cf0d7f073f2d7fe43ae060f9157989fae80311ce86f6ebfc63776464bfc9bf08739beefc9ac16b0e779e1775a5ce0ab906ebea4babf0fce023ab01ef406d27461a1de4876bd81ac2f303c486fd7819ca71d9978ad5a3ec71cd091fa9fa6c7a4f2f9ab439612cfe08f5825ead5e49de88b40d4c945bbf489517eaaca92d9a606758fe052e67ce03cefdd71eca9e2b077cdf77162f5ccce2ff04c7967baa9e79f7855e6a2e0bce0649b83c8d8f580da0cb09a552b8d004d220f8e60796c5c253f51c538a849df9455c45697";

if (!JWT_SECRET) {
  console.error("JWT_SECRET no está definido en el archivo .env");
  process.exit(1);
}

// Middlewares
app.use(express.json());
app.use(cors());

// Endpoint de login
app.post('/login', async (req, res) => {
  const { identificador, password } = req.body;

  try {
    // Buscar el usuario por identificador
    const user = await Usuario.findOne({ where: { identificador } });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.contrasena);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user.id, role: user.rol }, JWT_SECRET, {
      expiresIn: '1d',
    });

    // Datos del usuario sin la contraseña
    const userData = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      identificador: user.identificador,
      rol: user.rol,
    };

    return res.json({ jwt: token, user: userData });
  } catch (error) {
    console.error("Error en autenticación:", error);
    return res.status(500).json({ error: "Error al autenticar el usuario" });
  }
});

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express con Sequelize funcionando');
});

// Función para iniciar el servidor y sincronizar la base de datos
async function startServer() {
  try {
    await syncDb(); // Sincroniza los modelos con la base de datos
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error iniciando el servidor:", error);
  }
}

// Exporta la función para que pueda ser llamada desde otro archivo (por ejemplo, main.js)
module.exports = { startServer };
