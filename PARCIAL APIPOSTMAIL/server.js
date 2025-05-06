const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());

// IMPORTAR Y USAR RUTAS
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes); 

// Conexión a Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB bebe'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
