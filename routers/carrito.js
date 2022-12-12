const express = require('express')
const routerCarrito = express.Router()

const controller = require('../controller/carrito')

/* POST - request para agregar un producto al carrito */

routerCarrito.post('/', (req, res) => {
    res.send('Recibiendo Imagen')
})

module.exports = routerCarrito