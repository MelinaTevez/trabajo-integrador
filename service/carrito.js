const CarritoModel = require("../model/carrito");

// Instancia del modelo (model)
const model = CarritoModel.get(process.env.PERSISTENCIA || 'MONGODB')

const guardarCarrito = async carrito => {
    const carritoGuardado = await model.createCarrito(carrito)
    return carritoGuardado
}

module.exports = {
    guardarCarrito
}