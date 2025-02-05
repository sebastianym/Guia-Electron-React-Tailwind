require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const authRoutes = require("./routes/authRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const clientRoutes = require("./routes/clientRoutes");
const materialRoutes = require("./routes/materialRoutes");
const cors = require("cors");
const syncDb = require("./sync");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/materials", materialRoutes);

// Configuración de variables de entorno
const PORT = 3002;
const JWT_SECRET =
  "d1748063fb4032af92d1e3637a858fc79a44e7db7c9171defc4b61e853601ca18e276601671369d13998d05900f2ca4e4628cd6f621cf0d7f073f2d7fe43ae060f9157989fae80311ce86f6ebfc63776464bfc9bf08739beefc9ac16b0e779e1775a5ce0ab906ebea4babf0fce023ab01ef406d27461a1de4876bd81ac2f303c486fd7819ca71d9978ad5a3ec71cd091fa9fa6c7a4f2f9ab439612cfe08f5825ead5e49de88b40d4c945bbf489517eaaca92d9a606758fe052e67ce03cefdd71eca9e2b077cdf77162f5ccce2ff04c7967baa9e79f7855e6a2e0bce0649b83c8d8f580da0cb09a552b8d004d220f8e60796c5c253f51c538a849df9455c45697";

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Servidor Express con Sequelize funcionando");
});

// Iniciar el servidor y sincronizar la base de datos
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
// startServer();
// Exporta la función para que pueda ser llamada desde otro archivo (por ejemplo, main.js)
module.exports = { startServer };
