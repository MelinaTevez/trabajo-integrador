class ProductoService {
    
    URL_PRODUCTOS = 'https://633eca1d83f50e9ba3b84b17.mockapi.io/productos/'
    
    async obtenerProductosService() {
        let productos = await http.get(this.URL_PRODUCTOS)
        //console.log(productos)
        return productos
    }

    async guardarProductoService(producto) {
        const productoGuardado = await http.post(this.URL_PRODUCTOS, producto)
        return productoGuardado
    }

    async actualizarProductoService(id, producto){
        const productoActualizado = await http.put(this.URL_PRODUCTOS, id, producto)
        return productoActualizado
    }

    async borrarProductoService(id){
        const productoBorrado = await http.del(this.URL_PRODUCTOS, id)
        return productoBorrado
    }

}

const productoService = new ProductoService()

//guardarProductoService(producto) 
//actualizarProductoService(3, producto)
//borrarProductoService(2)