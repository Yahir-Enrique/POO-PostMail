const Usuario = require('../models/usuario');
const Envio = require('../models/envio');
const Producto = require('../models/producto');

async function registrarEnvio(data) {
    const { usuarioId, producto } = data;

    // Buscar usuario
    const usuario = await Usuario.findOne({ usuarioId });
    if (!usuario) throw new Error('Usuario no encontrado');

    // Calcular créditos necesarios según peso
    const peso = producto.peso;
    const creditoNecesario = peso <= 3 ? 1 : Math.ceil(peso / 3);

    if (usuario.credito < creditoNecesario) {
        throw new Error('Créditos insuficientes');
    }

    const nuevoProducto = new Producto(producto);
    await nuevoProducto.save();

    const nuevoEnvio = new Envio({
        ...data,
        producto: nuevoProducto._id
    });

    await nuevoEnvio.save();

    usuario.credito -= creditoNecesario;
    await usuario.save();

    return nuevoEnvio;
}

module.exports = {
    registrarEnvio
};
