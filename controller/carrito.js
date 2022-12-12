const service = require('../service/carrito')

const guardarCarrito = async (req, res) => {
    const carrito = req.body
    const carritoGuardado = await service.guardarCarrito(carrito)
    res.status(201).json(carritoGuardado)
}

module.exports = {
    guardarCarrito
}