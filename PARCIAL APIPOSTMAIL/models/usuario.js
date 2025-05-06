const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuarioId: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: String,
  credito: Number,
});

module.exports = mongoose.model('Usuario', usuarioSchema);
