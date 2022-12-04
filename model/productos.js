const ProductoModelMongoDB = require('./productosMongoDB')

class ProductoModel {
    static get(tipo){

        switch(tipo){
            case 'MONGODB':
                console.log('**** PRESISTENCIA EN MONGODB (productos) ****')
                const mongodb = new ProductoModelMongoDB()
                mongodb.conectarDB()
                return mongodb

            default:
                console.log('No paso ningún tipo')
                break

        }
    }
}

module.exports = ProductoModel