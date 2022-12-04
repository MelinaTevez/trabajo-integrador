const mongoose = require('mongoose')

/* Esquema del documento producto */
const productoSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    marca: String,
    categoria: String,
    detalles: String,
    foto: String,
    envio: Boolean
})

/* Modelo del documento almacenado en una colección */
const ProductoModel = mongoose.model('productos', productoSchema)

/* ---------------------------------------------------------- */

class ProductoModelMongoDB {

    async conectarDB() {

        try {
            await mongoose.connect(process.env.URI_MONGODB_LOCAL)
            console.log('Base de datos conectada!')
        } catch (error) {
            console.log(`MongoDB error al conectar ${error}`)
        }
    }

    /* CRUD -> C: Create -> http method POST */
    async createProducto(producto) {

        try {

            const productoSave = new ProductoModel(producto)
            await productoSave.save()

            return productoSave

        } catch (error) {
            console.log(`Error en el createProducto: ${error}`)
        }
    }

    /* CRUD -> R: Read ALL -> http method GET */
    async readProductos() {

        const productos = await ProductoModel.find({})
        return productos
    }

    /* CRUD -> R: Read ONE -> http method GET */
    async readProducto(id) {

        try {
            const producto = await ProductoModel.findById(id)
            return producto
        } catch (error) {
            console.log(error)
        }

    }

    /* CRUD -> U: UPDATE -> http method PUT */
    async updateProducto(id, producto) {

    }

    /* CRUD -> D: DELETE -> http method DELETE */
    async deleteProducto(id) {

    }
}

module.exports = ProductoModelMongoDB
