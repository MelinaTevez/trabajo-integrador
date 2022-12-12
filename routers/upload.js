const express = require('express')
const routerUpload = express.Router()

/* POST - request para agregar un producto */

routerUpload.post('/', (req, res) => {
    res.send('Recibiendo imagen')
})

module.exports = routerUpload